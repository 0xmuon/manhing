import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Manga from '@/models/Manga';

export async function GET() {
  try {
    await connectDB();

    // Clear existing data
    await Manga.deleteMany({});

    // Add sample data
    const sampleMangas = [
      {
        title: 'Sample Manga 1',
        description: 'This is a sample manga description',
        coverImage: 'https://via.placeholder.com/300x400',
        chapters: [
          {
            chapterNumber: 1,
            title: 'Chapter 1',
            pages: ['https://via.placeholder.com/800x1200']
          }
        ],
        bgMusic: 'https://example.com/music.mp3'
      },
      {
        title: 'Sample Manga 2',
        description: 'Another sample manga description',
        coverImage: 'https://via.placeholder.com/300x400',
        chapters: [
          {
            chapterNumber: 1,
            title: 'Chapter 1',
            pages: ['https://via.placeholder.com/800x1200']
          }
        ],
        bgMusic: 'https://example.com/music2.mp3'
      }
    ];

    await Manga.insertMany(sampleMangas);

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
} 