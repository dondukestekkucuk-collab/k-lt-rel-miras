import { NextRequest, NextResponse } from 'next/server';
import { getDbPool, initDatabaseTables } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { session } = body;

    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Geçersiz oturum.' }, { status: 400 });
    }

    await initDatabaseTables();
    const pool = getDbPool();
    if (!pool) {
      return NextResponse.json(
        { error: 'Veritabanı bağlantısı yapılandırılamadı.' },
        { status: 500 }
      );
    }

    await pool.query(
      `INSERT INTO student_progress (user_id, session_data, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET session_data = EXCLUDED.session_data, updated_at = NOW()`,
      [session.userId, JSON.stringify(session)]
    );

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.';
    console.error('Sync API Error:', errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
