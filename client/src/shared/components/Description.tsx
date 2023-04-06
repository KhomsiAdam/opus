import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { getTextContentsFromHtmlString } from '@/shared/helpers/browser';
import TextEditor from './TextEditor';
import TextEditedContent from './TextEditedContent';
import Button from './Button';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsDescription = ({ issue, updateIssue }: any) => {
  const [description, setDescription] = useState(issue.description);
  const [isEditing, setEditing] = useState(false);

  const handleUpdate = () => {
    setEditing(false);
    updateIssue({ description });
  };

  // @ts-ignore
  const isDescriptionEmpty = getTextContentsFromHtmlString(description).trim().length === 0;

  return (
    <Fragment>
      <div className="mt-[24px] mx-0 mb-[5px] uppercase text-[#5E6C84] text-[12.5px] font-bold">Description</div>
      {isEditing ? (
        <Fragment>
          <TextEditor placeholder="Describe the issue" defaultValue={description} onChange={setDescription} />
          <div className="flex pt-[12px]">
            <Button className="mr-[6px]" variant="primary" onClick={handleUpdate}>
              Save
            </Button>
            <Button className="mr-[6px]" variant="empty" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {isDescriptionEmpty ? (
            <div
              className="ml-[-7px] p-[7px] rounded-[3px] text-[#5E6C84] transition-colors text-[15px] cursor-pointer select-none hover:bg-[#ebecf0]"
              onClick={() => setEditing(true)}
            >
              Add a description...
            </div>
          ) : (
            <TextEditedContent content={description} onClick={() => setEditing(true)} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectBoardIssueDetailsDescription.propTypes = propTypes;

export default ProjectBoardIssueDetailsDescription;
