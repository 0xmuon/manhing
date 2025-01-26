import mongoose from 'mongoose';

const MangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  chapters: [{
    chapterNumber: Number,
    pages: [String],
    title: String,
  }],
  bgMusic: {
    type: String,
    default: null,
  }
});

export default mongoose.models.Manga || mongoose.model('Manga', MangaSchema); 