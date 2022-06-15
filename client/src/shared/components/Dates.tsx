import React from 'react';
import PropTypes from 'prop-types';

import { formatDateTimeConversational } from '@/shared/helpers/dateTime';

const propTypes = {
  issue: PropTypes.object.isRequired,
};

const ProjectBoardIssueDetailsDates = ({ issue }: any) => (
  <div className="mt-[11px] pt-[13px] leading-6 border-t border-solid border-[#dfe1e6] text-[#5E6C84] text-[13px]">
    <div>Created at {formatDateTimeConversational(issue.createdAt)}</div>
    <div>Updated at {formatDateTimeConversational(issue.updatedAt)}</div>
  </div>
);

ProjectBoardIssueDetailsDates.propTypes = propTypes;

export default ProjectBoardIssueDetailsDates;
