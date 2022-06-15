import { Types } from 'mongoose';

export interface IssueEntity {
  title: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  listPosition: number;
  reporter: Types.ObjectId;
  project: Types.ObjectId;
  estimate?: number;
  timeSpent?: number;
  timeRemaining?: number;
  comments?: Array<Types.ObjectId>;
  users?: Array<Types.ObjectId>;
}
