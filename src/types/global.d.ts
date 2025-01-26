import { Mongoose } from 'mongoose';

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
} 