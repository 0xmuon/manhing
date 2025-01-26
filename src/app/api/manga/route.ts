import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Manga from '@/models/Manga';

export async function GET() {
  try {
    await connectDB();
    const mangas = await Manga.find({}).lean();
    return NextResponse.json(mangas || []);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json([], { status: 500 });
  }
} 