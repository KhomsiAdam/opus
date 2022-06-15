import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';
import { IssueStatus, IssueStatusCopy, IssuePriority } from '@/App/constants/issues';
const issueStatusBackgroundColors = {
  [IssueStatus.BACKLOG]: '#dfe1e6',
  [IssueStatus.INPROGRESS]: '#0052cc',
  [IssueStatus.SELECTED]: '#dfe1e6',
  [IssueStatus.DONE]: '#0B875B',
};
const issueStatusColors = {
  [IssueStatus.BACKLOG]: '#42526E',
  [IssueStatus.INPROGRESS]: '#fff',
  [IssueStatus.SELECTED]: '#42526E',
  [IssueStatus.DONE]: '#fff',
};
import Select from './Select';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsStatus = ({ issue, updateIssue }: any) => (
  <Fragment>
    <div className="mt-[24px] mx-0 mb-[5px] uppercase text-[#5E6C84] text-[12.5px] font-bold">Status</div>
    <Select
      variant="empty"
      dropdownWidth={343}
      withClearValue={false}
      name="status"
      value={issue.status}
      options={Object.values(IssueStatus).map((status) => ({
        value: status,
        label: IssueStatusCopy[status],
      }))}
      onChange={(status: any) => updateIssue({ status })}
      renderValue={({ value: status }: any) => (
        <div
          className={`uppercase transition-all tag !py-0 !px-[12px] !h-[32px] hover:scale-105`}
          style={{ backgroundColor: `${issueStatusBackgroundColors[status]}`, color: `${issueStatusColors[status]}` }}

        >
          <div>{IssueStatusCopy[status]}</div>
          <FaChevronDown className="ml-2" size={12} />
        </div>
      )}
      renderOption={({ value: status }: any) => (
        <div
          className={`uppercase transition-all tag`}
          style={{ backgroundColor: `${issueStatusBackgroundColors[status]}`, color: `${issueStatusColors[status]}` }}
        >
          {IssueStatusCopy[status]}
        </div>
      )}
    />
  </Fragment>
);

ProjectBoardIssueDetailsStatus.propTypes = propTypes;

export default ProjectBoardIssueDetailsStatus;
