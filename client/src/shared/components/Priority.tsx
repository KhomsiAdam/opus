import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { IssuePriority, IssuePriorityCopy } from '@/App/constants/issues';
import Select from './Select';
import IssuePriorityIcon from './IssuePriorityIcon';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsPriority = ({ issue, updateIssue }: any) => {
  return (
    <Fragment>
      <div className="mt-[24px] mx-0 mb-[5px] uppercase text-[#5E6C84] text-[12.5px] font-bold">Priority</div>
      <Select
        variant="empty"
        withClearValue={false}
        dropdownWidth={343}
        name="priority"
        value={issue.priority}
        options={Object.values(IssuePriority).map((priority) => ({
          value: priority,
          label: IssuePriorityCopy[priority],
        }))}
        onChange={(priority: any) => updateIssue({ priority })}
        renderValue={({ value: priority }: any) => renderPriorityItem(priority, true)}
        renderOption={({ value: priority }: any) => renderPriorityItem(priority)}
      />
    </Fragment>
  );
};

const renderPriorityItem = (priority: any, isValue?: any) => (
  <div
    className={`flex items-center ${
      isValue && 'py-[3px] pr-[4px] pl-0 rounded-[4px] hover:bg-[#ebecf0] focus:bg-[#ebecf0]'
    }`}
  >
    <IssuePriorityIcon priority={priority} />
    <div className="py-0 pr-[3px] pl-[8px] text-[14.5px]">{IssuePriorityCopy[priority]}</div>
  </div>
);

ProjectBoardIssueDetailsPriority.propTypes = propTypes;

export default ProjectBoardIssueDetailsPriority;
