import { sortByNewest } from '@/shared/helpers/arrays';

import Create from './Create';
import Comment from './Comment';

const Comments = ({ issue, fetchIssue }: any) => (
  <div className='pt-[40px]'>
    <div className='font-medium text-[15px]'>Comments</div>
    <Create issueId={issue._id} fetchIssue={fetchIssue} />

    {issue.comments && sortByNewest(issue.comments, 'createdAt').map((comment: any) => (
      <Comment key={comment._id} comment={comment} fetchIssue={fetchIssue} />
    ))}
  </div>
);

export default Comments;
