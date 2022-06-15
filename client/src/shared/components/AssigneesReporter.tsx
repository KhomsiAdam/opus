import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import Avatar from './Avatar';
import Select from './Select';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  projectUsers: PropTypes.array.isRequired,
};

const ProjectBoardIssueDetailsAssigneesReporter = ({ issue, updateIssue, projectUsers }: any) => {
  const getUserById = (userId: any) => projectUsers.find((user: any) => user._id === userId);
  const userOptions = projectUsers.map((user: any) => ({
    value: user._id,
    label: user.firstname + ' ' + user.lastname,
  }));

  return (
    <Fragment>
      <div className="mt-[24px] mx-0 mb-[5px] uppercase text-[#5E6C84] text-[12.5px] font-bold">Assignees</div>
      <Select
        isMulti
        variant="empty"
        dropdownWidth={343}
        placeholder="Unassigned"
        name="assignees"
        value={issue.users.map((user: any) => user._id)}
        options={userOptions}
        onChange={(userIds: any) => {
          updateIssue({ userIds, users: userIds.map(getUserById) });
        }}
        renderValue={({ value: userId, removeOptionValue }: any) =>
          renderUser(getUserById(userId), true, removeOptionValue)
        }
        renderOption={({ value: userId }: any) => renderUser(getUserById(userId), false)}
      />

      <div className="mt-[24px] mx-0 mb-[5px] uppercase text-[#5E6C84] text-[12.5px] font-bold">Reporter</div>
      <Select
        variant="empty"
        dropdownWidth={343}
        withClearValue={false}
        name="reporter"
        value={issue.reporter._id}
        options={userOptions}
        onChange={(userId: any) => updateIssue({ reporterId: userId })}
        renderValue={({ value: userId }: any) => renderUser(getUserById(userId), true)}
        renderOption={({ value: userId }: any) => renderUser(getUserById(userId))}
      />
    </Fragment>
  );
};

const renderUser = (user: any, isSelectValue?: any, removeOptionValue?: any) => (
  <div
    className={`flex items-center cursor-pointer select-none ${
      isSelectValue &&
      'mt-[0] mr-[10px] mb-[5px] ml-0 py-[4px] px-[8px] rounded-[4px] bg-[#ebecf0] transition-colors hover:bg-[#dfe1e6]'
    }`}
    key={user._id}
    // withBottomMargin={!!removeOptionValue}
    onClick={() => removeOptionValue && removeOptionValue()}
  >
    <Avatar avatarUrl={user.avatarUrl} name={user.firstname} size={24} />
    <div className="py-0 pr-[3px] pl-[8px] text-[14.5px]">
      {user.firstname} {user.lastname}
    </div>
    {removeOptionValue && <AiOutlineClose />}
  </div>
);

ProjectBoardIssueDetailsAssigneesReporter.propTypes = propTypes;

export default ProjectBoardIssueDetailsAssigneesReporter;
