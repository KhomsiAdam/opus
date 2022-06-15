import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import IssueTypeIcon from './IssueTypeIcon';
import IssuePriorityIcon from './IssuePriorityIcon';
import Avatar from './Avatar';

const Issue = ({ projectUsers, issue, index }: any) => {
  const assignees = issue.users.map((userId: any) => projectUsers.find((user: any) => user._id === userId));
  
  return (
    <Draggable draggableId={issue._id.toString()} index={index}>
      {(provided, snapshot) => (
        <Link
          className="block mb-[5px]"
          to={`issues/${issue._id}`}
          ref={provided.innerRef}
          data-testid="list-issue"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={`issue p-[10px] rounded-[3px] bg-white select-none ${snapshot.isDragging ? 'rotated' : ''}`}>
            <p className="pb-[11px] text-[15px]">{issue.title}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between w-9">
                <IssueTypeIcon type={issue.type} />
                <IssuePriorityIcon priority={issue.priority} top={-1} left={4} />
              </div>
              <div className="flex flex-row-reverse ml-[2px]">
                {assignees.map((user: any) => (
                  <Avatar key={user._id} size={24} avatarUrl={user.avatarUrl} name={user.firstname} />
                ))}
              </div>
            </div>
          </div>
        </Link>
      )}
    </Draggable>
  );
};

export default Issue;
