import React from 'react';
import { FaTrash } from 'react-icons/fa';
import toast from '@/shared/helpers/toast';
import Button from './Button';
import ConfirmModal from './ConfirmModal';
import { useDeleteIssueMutation } from '@/features/issues/issuesApiSlice';

const ProjectBoardIssueDetailsDelete = ({ issue, fetchProject, modalClose }: any) => {
  const [deleteMutation] = useDeleteIssueMutation();

  const handleIssueDelete = async () => {
    try {
      const response: any = await deleteMutation(issue._id);
      console.log(response);
      toast.success(response?.data?.message || 'Issue deleted successfully');
      fetchProject();
      modalClose();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <ConfirmModal
      className='pt-[35px] px-[40px] pb-[40px]'
      title="Are you sure you want to delete this issue?"
      message="Once you delete, it's gone for good."
      confirmText="Delete issue"
      onConfirm={handleIssueDelete}
      renderLink={(modal: any) => <Button icon={<FaTrash />} iconSize={19} variant="empty" onClick={modal.open} />}
    />
  );
};

export default ProjectBoardIssueDetailsDelete;
