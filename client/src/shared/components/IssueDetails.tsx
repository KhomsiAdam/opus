import { AiOutlineClose } from 'react-icons/ai';

import PageError from './PageError';
import CopyLinkButton from './CopyLinkButton';
import Button from './Button';

import Loader from './Loader';
import Type from './Type';
import Delete from './Delete';
import Title from './Title';
import Description from './Description';
import Comments from './Comments';
import Status from './Status';
import AssigneesReporter from './AssigneesReporter';
import Priority from './Priority';
import EstimateTracking from './EstimateTracking';
import Dates from './Dates';

import { useGetIssueQuery, useUpdateIssueMutation } from '@/features/issues/issuesApiSlice';
import toast from '../helpers/toast';

const IssueDetails = ({ issueId, projectUsers, fetchProject, updateLocalProjectIssues, modalClose }: any) => {
  const { data, isLoading, isError, isSuccess, error, refetch } = useGetIssueQuery(issueId);
  const [updateIssueMutation] = useUpdateIssueMutation();

  const optimisticUpdate = async (issueId: any, { updatedFields, currentFields, setData }: any) => {
    try {
      setData(updatedFields);
      const response = await updateIssueMutation({ id: issueId, fields: updatedFields }).unwrap();
      refetch();
      console.log(response);
    } catch (error) {
      setData(currentFields);
      toast.error(error);
      console.log(error);
    }
  };

  const updateIssue = (updatedFields: any) => {
    optimisticUpdate(issueId, {
      updatedFields,
      currentFields: data,
      setData: (fields: any) => {
        updateLocalProjectIssues(data._id, fields);
      },
    });
  };

  if (!data) return <Loader />;
  if (error) return <PageError />;
  return (
    <>
      <div className="flex justify-between pt-[21px] px-[18px] pb-0">
        <Type issue={data} updateIssue={updateIssue} />
        <div className="flex items-center">
          <CopyLinkButton variant="empty" />
          <Delete issue={data} fetchProject={fetchProject} modalClose={modalClose} />
          <Button icon={<AiOutlineClose color="#212121" />} onClick={modalClose} />
        </div>
      </div>
      <div className="flex pt-0 px-[30px] pb-[60px]">
        <div className="w-[65%] pr-[50px]">
          <Title issue={data} updateIssue={updateIssue} />
          <Description issue={data} updateIssue={updateIssue} />
          <Comments issue={data} fetchIssue={refetch} />
        </div>
        <div className="w-[35%] pt-[5px]">
          <Status issue={data} updateIssue={updateIssue} />
          <AssigneesReporter issue={data} updateIssue={updateIssue} projectUsers={projectUsers} />
          <Priority issue={data} updateIssue={updateIssue} />
          <EstimateTracking issue={data} updateIssue={updateIssue} />
          <Dates issue={data} />
        </div>
      </div>
    </>
  );
};

export default IssueDetails;
