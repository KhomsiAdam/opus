import React, { Fragment, useState } from 'react';

import { formatDateTimeConversational } from '@/shared/helpers/dateTime';

import ConfirmModal from './ConfirmModal';
import BodyForm from './BodyForm';

import Avatar from './Avatar';
import toast from '../helpers/toast';
import { useDeleteCommentMutation, useUpdateCommentMutation } from '@/features/comments/commentsApiSlice';

const Comment = ({ comment, fetchIssue }: any) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.body);

  const [updateCommentMutation] = useUpdateCommentMutation();
  const [deleteCommentMutation] = useDeleteCommentMutation();

  const handleCommentDelete = async () => {
    try {
      const response: any = await deleteCommentMutation(comment._id);
      console.log(response);
      toast.success(response.data.message);
      fetchIssue();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleCommentUpdate = async () => {
    try {
      setUpdating(true);
      const response: any = await updateCommentMutation({ id: comment._id, body: { body: commentBody } });
      console.log(response);
      toast.success(response.data.message);
      fetchIssue();
      setUpdating(false);
      setFormOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="relative flex mt-[25px] text-[15px]" data-testid="issue-comment">
      <Avatar name={comment.user.firstname} avatarUrl={comment.user.avatarUrl} />
      <div className="pl-[44px]">
        <div className="inline-block pr-[12px] pb-[10px] font-medium text-[#42526E]">
          {comment.user.firstname} {comment.user.lastname}
        </div>
        <div className="inline-block pb-[10px] text-[14.5px] text-[#42526E]">
          {formatDateTimeConversational(comment.createdAt)}
        </div>

        {isFormOpen ? (
          <BodyForm
            value={commentBody}
            onChange={setCommentBody}
            isWorking={isUpdating}
            onSubmit={handleCommentUpdate}
            onCancel={() => setFormOpen(false)}
          />
        ) : (
          <Fragment>
            <p className="pb-[10px] whitespace-pre-wrap">{comment.body}</p>
            <div
              className="inline-block py-[2px] px-0 text-[14.5px] cursor-pointer select-none hover:underline mr-[12px]"
              onClick={() => setFormOpen(true)}
            >
              Edit
            </div>
            <ConfirmModal
              className="pt-[35px] px-[40px] pb-[40px]"
              title="Are you sure you want to delete this comment?"
              message="Once you delete, it's gone for good."
              confirmText="Delete comment"
              onConfirm={handleCommentDelete}
              renderLink={(modal: any) => (
                <div
                  className="inline-block py-[2px] px-0 text-[14.5px] cursor-pointer select-none hover:underline before:relative before:right-[6px] before:content-['·'] before:inline-block"
                  onClick={modal.open}
                >
                  Delete
                </div>
              )}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Comment;
