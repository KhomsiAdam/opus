import { IssueType, IssueStatus, IssuePriority, IssueTypeCopy, IssuePriorityCopy } from '@/App/constants/issues';
import Form from './Form';
import IssueTypeIcon from './IssueTypeIcon';
import IssuePriorityIcon from './IssuePriorityIcon';
import Avatar from './Avatar';

import { FaWindowClose } from 'react-icons/fa';
import Button from './Button';
import { useCreateIssueMutation } from '@/features/issues/issuesApiSlice';
import toast from '../helpers/toast';

const IssueCreate = ({ project, fetchProject, onCreate, modalClose }: any) => {
  // const user = useSelector(selectCurrentUser);
  const [createIssueMutation, { isLoading }] = useCreateIssueMutation();
  return (
    <Form
      enableReinitialize
      initialValues={{
        type: IssueType.TASK,
        title: '',
        description: '',
        reporter: 239031,
        users: [],
        priority: IssuePriority.MEDIUM,
      }}
      validations={{
        type: Form.is.required(),
        title: [Form.is.required(), Form.is.maxLength(200)],
        description: [Form.is.required(), Form.is.maxLength(1000)],
        reporter: Form.is.required(),
        priority: Form.is.required(),
      }}
      onSubmit={async (values: any, form: any) => {
        try {
          const response = await createIssueMutation({
            ...values,
            status: IssueStatus.BACKLOG,
            project: project._id,
          }).unwrap();
          fetchProject();
          console.log(response);
          toast.success(response?.message || 'Issue created successfully');
          onCreate();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <Form.Element className="pt-[25px] px-[40px] pb-[35px]">
        <div className="pb-[15px] text-[21px]">Create issue</div>
        <Form.Field.Select
          name="type"
          label="Issue Type"
          tip="Start typing to get a list of possible matches."
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <div className="mt-[22px] border-t border-solid border-[#dfe1e6]" />
        <Form.Field.Input
          name="title"
          label="Short Summary"
          tip="Concisely summarize the issue in one or two sentences."
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Describe the issue in as much detail as you'd like."
        />
        <Form.Field.Select
          name="reporter"
          label="Reporter"
          options={userOptions(project)}
          renderOption={renderUser(project)}
          renderValue={renderUser(project)}
        />
        <Form.Field.Select
          isMulti
          name="users"
          label="Assignees"
          tio="People who are responsible for dealing with this issue."
          options={userOptions(project)}
          renderOption={renderUser(project)}
          renderValue={renderUser(project)}
        />
        <Form.Field.Select
          name="priority"
          label="Priority"
          tip="Priority in relation to other issues."
          options={priorityOptions}
          renderOption={renderPriority}
          renderValue={renderPriority}
        />
        <div className="flex justify-end pt-[30px]">
          <Button className="ml-[10px] btn-primary" type="submit" variant="primary" isWorking={isLoading}>
            Create Issue
          </Button>
          <Button className="ml-[10px] btn-danger" type="button" variant="empty" onClick={modalClose}>
            Cancel
          </Button>
        </div>
      </Form.Element>
    </Form>
  );
};

const typeOptions = Object.values(IssueType).map((type) => ({
  value: type,
  label: IssueTypeCopy[type],
}));

const priorityOptions = Object.values(IssuePriority).map((priority) => ({
  value: priority,
  label: IssuePriorityCopy[priority],
}));

const userOptions = (project: any) => project.users.map((user: any) => ({ value: user._id, label: user.firstname + ' ' + user.lastname }));

const renderType = ({ value: type }: any) => (
  <div className="flex items-center mr-[15px]">
    <IssueTypeIcon type={type} top={1} />
    <div className="py-0 pr-[3px] pl-[3px]">{IssueTypeCopy[type]}</div>
  </div>
);

const renderPriority = ({ value: priority }: any) => (
  <div className="flex items-center mr-[15px]">
    <IssuePriorityIcon priority={priority} top={1} />
    <div className="py-0 pr-[3px] pl-[3px]">{IssuePriorityCopy[priority]}</div>
  </div>
);

const renderUser =
  (project: any) =>
  ({ value: userId, removeOptionValue }: any) => {
    const user = project.users.find(({ _id }: any) => _id === userId);

    return (
      <div
        className="flex items-center mr-[15px]"
        key={user._id}
        // withBottomMargin={!!removeOptionValue}
        style={{ marginBottom: `${removeOptionValue ? '5px' : ''}` }}
        onClick={() => removeOptionValue && removeOptionValue()}
      >
        <Avatar size={20} avatarUrl={user.avatarUrl} name={user.firstname} />
        <div className="py-0 pr-[3px] pl-[3px]">
          {user.firstname} {user.lastname}
        </div>
        {removeOptionValue && <FaWindowClose />}
      </div>
    );
  };

export default IssueCreate;
