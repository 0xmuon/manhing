import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Manga from '@/models/Manga';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const manga = await Manga.findById(params.id);
    if (!manga) {
      return NextResponse.json({ error: 'Manga not found' }, { status: 404 });
    }
    return NextResponse.json(manga);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch manga' }, { status: 500 });
  }
} 