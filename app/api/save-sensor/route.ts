import { NextResponse } from 'next/server';
import { connection } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cervical, thoracic, lumbar } = body;

    const threshold = 20.0;
    const isBad = cervical > threshold || thoracic > threshold || lumbar > threshold;
    const status = isBad ?  'Bad Posture' : 'Good Posture';

    const db = await connection();
    const query = `
      INSERT INTO sensor_logs (cervical, thoracic, lumbar, posture_status)
      VALUES (?, ?, ?)
    `;

    await db.execute(
      'INSERT INTO sensor_logs (cervical, thoracic, lumbar, posture_status) VALUES (?, ?, ?, ?)',
      [cervical, thoracic, lumbar, status]
    );

    await db.end();

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Gagal Simpan' }, { status: 500 });
  }
}