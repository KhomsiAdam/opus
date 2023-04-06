import { sortByNewest } from '@/shared/helpers/arrays';

import Create from './Create';
import Comment from './Comment';

const Comments = ({ issue, fetchIssue }: any) => (
  <div className='pt-[40px]'>
    <div className='mt-[24px] mx-0 mb-[5px] uppercase text-[#5E6C84] text-[12.5px] font-bold'>Comments</div>
    <Create issueId={issue._id} fetchIssue={fetchIssue} />

    {issue.comments && sortByNewest(issue.comments, 'createdAt').map((comment: any) => (
      <Comment key={comment._id} comment={comment} fetchIssue={fetchIssue} />
    ))}
  </div>
);

export default Comments;
