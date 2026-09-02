import { NextRequest, NextResponse } from 'next/server';
import { getDbPool, initDatabaseTables } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Lütfen kullanıcı adı ve şifrenizi giriniz.' },
        { status: 400 }
      );
    }

    await initDatabaseTables();
    const pool = getDbPool();
    if (!pool) {
      return NextResponse.json(
        { error: 'Veritabanı bağlantısı yapılandırılamadı.' },
        { status: 500 }
      );
    }

    const cleanUsername = username.trim().toLowerCase();

    // Query user
    const result = await pool.query(
      'SELECT id, username, full_name, password_hash, grade FROM users WHERE username = $1',
      [cleanUsername]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı.' },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı.' },
        { status: 401 }
      );
    }

    // Fetch saved progress
    let sessionData = null;
    const progressRes = await pool.query(
      'SELECT session_data FROM student_progress WHERE user_id = $1',
      [user.id]
    );

    if (progressRes.rows.length > 0) {
      sessionData = progressRes.rows[0].session_data;
    } else {
      sessionData = {
        userId: user.id,
        username: user.username,
        fullName: user.full_name,
        grade: user.grade || '5. Sınıf',
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
        completedTasks: [],
        quizScores: {},
        oralHistoryAnswers: {},
        projectAnswers: {},
      };
    }

    // Update login status
    sessionData.isLoggedIn = true;
    sessionData.loginTime = new Date().toISOString();
    sessionData.userId = user.id;
    sessionData.username = user.username;
    sessionData.fullName = user.full_name;
    sessionData.grade = user.grade || '5. Sınıf';

    return NextResponse.json({
      success: true,
      message: `Hoş geldin, ${user.full_name || user.username}!`,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        grade: user.grade || '5. Sınıf',
      },
      session: sessionData,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.';
    console.error('Login API Error:', errorMsg);
    return NextResponse.json(
      { error: 'Giriş yapılırken bir hata oluştu.', details: errorMsg },
      { status: 500 }
    );
  }
}
