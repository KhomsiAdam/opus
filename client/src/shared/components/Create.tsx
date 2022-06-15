import React, { Fragment, useState } from 'react';

import BodyForm from './BodyForm';
import ProTip from './ProTip';

import Avatar from './Avatar';
import toast from '../helpers/toast';
import { useCreateCommentMutation } from '@/features/comments/commentsApiSlice';

const ProjectBoardIssueDetailsCommentsCreate = ({ issueId, fetchIssue }: any) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [comment, setComment] = useState('');

  const [createCommentMutation] = useCreateCommentMutation();

  const role = 'Kurtis Weissnat';

  const handleCommentCreate = async () => {
    try {
      setCreating(true);
      const response = await createCommentMutation({ body: comment, issue: issueId, user: '629a16a1c74339d4bbd9ff98' });
      console.log(response);
      fetchIssue();
      setFormOpen(false);
      setCreating(false);
      setComment('');
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div className="relative flex mt-[25px] text-[15px]">
      {role && <Avatar name={role} avatarUrl="" />}
      <div className="pl-[44px]">
        {isFormOpen ? (
          <BodyForm
            value={comment}
            onChange={setComment}
            isWorking={isCreating}
            onSubmit={handleCommentCreate}
            onCancel={() => setFormOpen(false)}
          />
        ) : (
          <Fragment>
            <div
              className="py-[12px] px-[16px] rounded-[4px] border border-solid border-[#dfe1e6] cursor-pointer select-none hover:border-[#C1C7D0]"
              onClick={() => setFormOpen(true)}
            >
              Add a comment...
            </div>
            <ProTip setFormOpen={setFormOpen} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ProjectBoardIssueDetailsCommentsCreate;
