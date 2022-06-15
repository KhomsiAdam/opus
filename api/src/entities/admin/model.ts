import { Schema, model } from 'mongoose';
import { hash as bcryptHash, genSalt as bcryptGenSalt } from 'bcryptjs';

import { AuthModel } from '@entities/auth/model';
import { CommentModel } from '@entities/comment/model';
import { IssueModel } from '@entities/issue/model';
import { ProjectModel } from '@entities/project/model';
import type { AdminEntity } from './interface';
import { SALT_ROUNDS } from './constants';

const AdminSchema = new Schema<AdminEntity>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: [],
      },
    ],
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Issue',
        default: [],
      },
    ],
  },
  { timestamps: true },
);

// Before creating an admin
AdminSchema.pre('save', async function save(next) {
  // Only hash password if it has been modified or new
  if (!this.isModified('password')) return next();
  // Generate salt and hash password
  const salt = await bcryptGenSalt(SALT_ROUNDS);
  this.password = await bcryptHash(this.password, salt);
  next();
});
// After creating an admin
AdminSchema.post('save', async (doc) => {
  // Create admin in auth collection
  await AuthModel.create({ email: doc.email, role: 'Admin' });
});
// After deleting an admin
AdminSchema.post('findOneAndDelete', async (doc) => {
  // Delete admin from auth collection
  await AuthModel.deleteOne({ email: doc.email });
  // Delete all comments of admin
  await CommentModel.deleteMany({ user: doc._id });
  // Remove admin reference from assigned issues
  await IssueModel.updateMany({ users: doc._id }, { $pull: { users: doc._id } });
  // Remove admin reference from projects
  await ProjectModel.updateMany({ users: doc._id }, { $pull: { users: doc._id } });
});

export const AdminModel = model<AdminEntity>('Admin', AdminSchema);
