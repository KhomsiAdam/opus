import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { sortByNewest } from '@/shared/helpers/arrays';
import IssueTypeIcon from './IssueTypeIcon';
import { AiOutlineSearch } from 'react-icons/ai';
import NoResultsSVG from './NoResultsSvg';

import InputDebounced from './InputDebounced';
import StyledSpinner from './StyledSpinner';

import { useGetIssuesQuery } from '@/features/issues/issuesApiSlice';

const IssueSearch = ({ project }: any) => {
  const [isSearchTermEmpty, setIsSearchTermEmpty] = useState(true);

  const { data, isLoading, isError, isSuccess, error } = useGetIssuesQuery({});

  const matchingIssues = get(data, 'issues', []);

  // const recentIssues =
  //   Array.isArray(project.issues) &&
  //   project.issues.length > 0 &&
  //   sortByNewest(project.issues, 'createdAt').slice(0, 10);

  const handleSearchChange = (value: any) => {
    const searchTerm = value.trim();

    setIsSearchTermEmpty(!searchTerm);

    if (searchTerm) {
      // fetchIssues({ searchTerm });
      console.log(searchTerm);
    }
  };

  return (
    <div className="pt-[25px] px-[35px] pb-[60px]">
      <div className="relative pr-[30px] mb-[40px]">
        <InputDebounced
          className="h-[40px] pt-0 pr-0 pb-0 pl-[32px] border-b-2 border-solid border-[#0052cc] bg-white text-[21px] input-focus-hover"
          autoFocus
          placeholder="Search issues by summary, description..."
          onChange={handleSearchChange}
        />
        <AiOutlineSearch className="absolute top-[8px] left-0" color="#5E6C84" size={22} />
        {isLoading && <StyledSpinner className="absolute top-[5px] right-[30px]" />}
      </div>

      {isSearchTermEmpty && Array.isArray(project.issues) && project.issues.length > 0 && (
        <Fragment>
          <div className="pb-[12px] uppercase text-[#5E6C84] font-bold text-[11.5px]">Recent Issues</div>
          {project.issues.slice(0).reverse().map(renderIssue)}
        </Fragment>
      )}

      {!isSearchTermEmpty && matchingIssues.length > 0 && (
        <Fragment>
          <div className="pb-[12px] uppercase text-[#5E6C84] font-bold text-[11.5px]">Matching Issues</div>
          {matchingIssues.map(renderIssue)}
        </Fragment>
      )}

      {!isSearchTermEmpty && !isLoading && matchingIssues.length === 0 && (
        <div className="pt-[50px] flex flex-col items-center">
          <NoResultsSVG />
          <div className="pt-[30px] font-[CircularStdMedium] text-[20px] text-[#172b4d]">
            We couldn't find anything matching your search
          </div>
          <div className="pt-[10px] text-[15px]">Try again with a different term.</div>
        </div>
      )}
    </div>
  );
};

const renderIssue = (issue: any) => (
  <Link key={issue._id} to={`/board/issues/${issue._id}`}>
    <div className="flex items-center py-[4px] px-[10px] rounded-[4px] transition-colors cursor-pointer select-none hover:bg-[#ebecf0]">
      <IssueTypeIcon type={issue.type} size={25} />
      <div className="pl-[15px]">
        <div className="text-[#42526E] text-[15px]">{issue.title}</div>
        <div className="uppercase text-[12.5px] text-[#5E6C84]">{`${issue.type}-${issue._id}`}</div>
      </div>
    </div>
  </Link>
);

export default IssueSearch;
