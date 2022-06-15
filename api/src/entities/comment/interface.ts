import { Types } from 'mongoose';

export interface CommentEntity {
  body: string;
  date: Date;
  issue?: Types.ObjectId;
  user?: Types.ObjectId;
}
