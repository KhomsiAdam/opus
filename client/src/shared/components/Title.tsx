import React, { Fragment, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { KeyCodes } from '@/App/constants/keyCodes';
import { is, generateErrors } from '@/shared/helpers/validation';

import Textarea from './Textarea';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsTitle = ({ issue, updateIssue }: any) => {
  const $titleInputRef = useRef<any>(null);
  const [error, setError] = useState(null);

  const handleTitleChange = () => {
    setError(null);

    const title = $titleInputRef.current.value;
    if (title === issue.title) return;

    const errors = generateErrors({ title }, { title: [is.required(), is.maxLength(200)] });

    if (errors.title) {
      setError(errors.title);
    } else {
      updateIssue({ title });
    }
  };

  return (
    <Fragment>
      <Textarea
        minRows={1}
        className="text-area-title"
        placeholder="Short summary"
        defaultValue={issue.title}
        ref={$titleInputRef}
        onBlur={handleTitleChange}
        onKeyDown={(event: any) => {
          if (event.keyCode === KeyCodes.ENTER) {
            event.target.blur();
          }
        }}
      />
      {error && <div className='pt-[5px] text-[#E13C3C] text-[13px] font-medium'>{error}</div>}
    </Fragment>
  );
};

ProjectBoardIssueDetailsTitle.propTypes = propTypes;

export default ProjectBoardIssueDetailsTitle;
