import { NextRequest, NextResponse } from 'next/server';
import { getDbPool, initDatabaseTables } from '@/lib/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, fullName, password, grade } = body;

    if (!username || typeof username !== 'string' || username.trim().length < 3) {
      return NextResponse.json(
        { error: 'Kullanıcı adı en az 3 karakter olmalıdır.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 4) {
      return NextResponse.json(
        { error: 'Şifre en az 4 karakter olmalıdır.' },
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
    const cleanFullName = (fullName || username).trim();
    const cleanGrade = (grade || '5. Sınıf').trim();

    // Check if user already exists
    const existing = await pool.query('SELECT id FROM users WHERE username = $1', [cleanUsername]);
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'Bu kullanıcı adı zaten kullanılmaktadır. Lütfen başka bir ad seçiniz veya giriş yapınız.' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    // Insert user
    await pool.query(
      `INSERT INTO users (id, username, full_name, password_hash, grade, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [userId, cleanUsername, cleanFullName, passwordHash, cleanGrade]
    );

    // Initialize progress record
    const initialSession = {
      userId,
      username: cleanUsername,
      fullName: cleanFullName,
      grade: cleanGrade,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
      completedTasks: [],
      quizScores: {},
      oralHistoryAnswers: {},
      projectAnswers: {},
    };

    await pool.query(
      `INSERT INTO student_progress (user_id, session_data, updated_at)
       VALUES ($1, $2, NOW())`,
      [userId, JSON.stringify(initialSession)]
    );

    return NextResponse.json({
      success: true,
      message: 'Kayıt işlemi başarıyla tamamlandı! Giriş yapıldı.',
      user: {
        id: userId,
        username: cleanUsername,
        fullName: cleanFullName,
        grade: cleanGrade,
      },
      session: initialSession,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.';
    console.error('Register API Error:', errorMsg);
    return NextResponse.json(
      { error: 'Kayıt işlemi sırasında bir hata oluştu.', details: errorMsg },
      { status: 500 }
    );
  }
}
