import { Types } from 'mongoose';

export interface ProjectEntity {
  name: string;
  category: string;
  description: string;
  issues?: Array<Types.ObjectId>;
  users?: Array<Types.ObjectId>;
}
