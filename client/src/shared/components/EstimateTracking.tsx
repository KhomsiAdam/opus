import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';

import Modal from './Modal';
import InputDebounced from './InputDebounced';
import Button from './Button';

import TrackingWidget from './TrackingWidget';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsEstimateTracking = ({ issue, updateIssue }: any) => (
  <Fragment>
    <div className="mt-[24px] mx-0 mb-[5px] uppercase text-[#5E6C84] text-[12.5px] font-bold">
      Original Estimate (hours)
    </div>
    {renderHourInput('estimate', issue, updateIssue)}

    <div className="mt-[24px] mx-0 mb-[5px] uppercase text-[#5E6C84] text-[12.5px] font-bold">Time Tracking</div>
    <Modal
      testid="modal:tracking"
      width={400}
      renderLink={(modal: any) => (
        <div
          className="pt-[4px] pr-[4px] pb-[2px] pl-0 rounded-[4px] transition-colors cursor-pointer select-none hover:bg-[#ebecf0]"
          onClick={modal.open}
        >
          <TrackingWidget issue={issue} />
        </div>
      )}
      renderContent={(modal: any) => (
        <div className="pt-[20px] px-[25px] pb-[25px]">
          <div className="pb-[14px] font-medium text-[20px]">Time tracking</div>
          <TrackingWidget issue={issue} />
          <div className="flex mt-[20px] mx-[-5px] mb-[30px]">
            <div className="my-0 mx-[5px] w-[50%]">
              <div className="pb-[5px] text-[#5E6C84] font-medium text-[13px]">Time spent (hours)</div>
              {renderHourInput('timeSpent', issue, updateIssue)}
            </div>
            <div className="my-0 mx-[5px] w-[50%]">
              <div className="pb-[5px] text-[#5E6C84] font-medium text-[13px]">Time remaining (hours)</div>
              {renderHourInput('timeRemaining', issue, updateIssue)}
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" onClick={modal.close}>
              Done
            </Button>
          </div>
        </div>
      )}
    />
  </Fragment>
);

const renderHourInput = (fieldName: any, issue: any, updateIssue: any) => (
  <InputDebounced
    placeholder="Number"
    filter={/^\d{0,6}$/}
    value={isNil(issue[fieldName]) ? '' : issue[fieldName]}
    onChange={(stringValue: any) => {
      const value = stringValue.trim() ? Number(stringValue) : null;
      updateIssue({ [fieldName]: value });
    }}
  />
);

ProjectBoardIssueDetailsEstimateTracking.propTypes = propTypes;

export default ProjectBoardIssueDetailsEstimateTracking;
