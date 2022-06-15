import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import { FaStopwatch } from 'react-icons/fa';

const propTypes = {
  issue: PropTypes.object.isRequired,
};

const ProjectBoardIssueDetailsTrackingWidget = ({ issue }: any) => (
  <div className="flex items-center justify-between">
    <FaStopwatch size={26} color="#5E6C84" />
    <div className="w-[90%]">
      <div className="h-[5px] rounded-[4px] bg-[#dfe1e6]">
        <div
          className="h-[5px] rounded-[4px] bg-[#0052cc] transition-all"
          style={{ width: `${calculateTrackingBarWidth(issue)}` }}
        />
      </div>
      <div className='flex justify-between pt-[3px] text-[14.5px]'>
        <div>{issue.timeSpent ? `${issue.timeSpent}h logged` : 'No time logged'}</div>
        {renderRemainingOrEstimate(issue)}
      </div>
    </div>
  </div>
);

const calculateTrackingBarWidth = ({ timeSpent, timeRemaining, estimate }: any) => {
  if (!timeSpent) {
    return 0;
  }
  if (isNil(timeRemaining) && isNil(estimate)) {
    return 100;
  }
  if (!isNil(timeRemaining)) {
    return (timeSpent / (timeSpent + timeRemaining)) * 100;
  }
  if (!isNil(estimate)) {
    return Math.min((timeSpent / estimate) * 100, 100);
  }
};

const renderRemainingOrEstimate = ({ timeRemaining, estimate }: any) => {
  if (isNil(timeRemaining) && isNil(estimate)) {
    return null;
  }
  if (!isNil(timeRemaining)) {
    return <div>{`${timeRemaining}h remaining`}</div>;
  }
  if (!isNil(estimate)) {
    return <div>{`${estimate}h estimated`}</div>;
  }
};

ProjectBoardIssueDetailsTrackingWidget.propTypes = propTypes;

export default ProjectBoardIssueDetailsTrackingWidget;
