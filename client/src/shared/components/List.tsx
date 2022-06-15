import moment from 'moment';
import { Droppable } from 'react-beautiful-dnd';
import { intersection } from 'lodash';

import { IssueStatusCopy } from '@/App/constants/issues';

import Issue from './Issue';


const List = ({ status, project, filters, currentUserId }: any) => {
  const filteredIssues = project.issues ? filterIssues(project.issues, filters, currentUserId) : [];
  const filteredListIssues = project.issues ? getSortedListIssues(filteredIssues, status) : [];
  const allListIssues = project.issues ? getSortedListIssues(project.issues, status) : [];
  
  return (
    <Droppable key={status} droppableId={status}>
      {(provided: any) => (
        <div className='flex flex-col my-0 mx-[5px] min-h-[400px] w-[25%] rounded-[3px] bg-[#F4F5F7]'>
          <div className='pt-[13px] px-[10px] pb-[17px] uppercase text-[#5E6C84] text-[12.5px] overflow-hidden text-ellipsis whitespace-nowrap'>
            {`${IssueStatusCopy[status]} `}
            <span className='lowercase text-[13px]'>{formatIssuesCount(allListIssues, filteredListIssues)}</span>
          </div>
          <div className='h-full py-0 px-[5px]' {...provided.droppableProps} ref={provided.innerRef} data-testid={`board-list:${status}`}>
            {Array.isArray(filteredListIssues) && filteredListIssues.length > 0 && filteredListIssues.map((issue: any, index: any) => (
              <Issue key={issue._id} projectUsers={project.users} issue={issue} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

const filterIssues = (projectIssues: any, filters: any, currentUserId: any) => {
  const { searchTerm, userIds, myOnly, recent } = filters;
  let issues = projectIssues;

  if (searchTerm) {
    issues = issues.filter((issue: any) => issue.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (userIds.length > 0) {
    issues = issues.filter((issue: any) => intersection(issue.userIds, userIds).length > 0);
  }
  if (myOnly && currentUserId) {
    issues = issues.filter((issue: any) => issue.userIds.includes(currentUserId));
  }
  if (recent) {
    issues = issues.filter((issue: any) => moment(issue.updatedAt).isAfter(moment().subtract(3, 'days')));
  }
  return issues;
};

const getSortedListIssues = (issues: any, status: any) =>
  issues.filter((issue: any) => issue.status === status).sort((a: any, b: any) => a.listPosition - b.listPosition);

const formatIssuesCount = (allListIssues: any, filteredListIssues: any) => {
  if (allListIssues.length !== filteredListIssues.length) {
    return `${filteredListIssues.length} of ${allListIssues.length}`;
  }
  return allListIssues.length;
};

export default List;
