export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';


let mockData = { cervical: 0, thoracic: 0, lumbar: 0 };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    mockData = {
      cervical: body.cervical || 0,
      thoracic: body.thoracic || 0,
      lumbar: body.lumbar || 0
    };
    return NextResponse.json({ message: "Mock Data Updated", data: mockData });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(mockData);
}