import { DragDropContext } from 'react-beautiful-dnd';

import { moveItemWithinArray, insertItemIntoArray } from '@/shared/helpers/arrays';
import { IssueStatus } from '@/App/constants/issues';

import List from './List';
import { useContext } from 'react';
import ProjectContext from '@/context/ProjectProvider';
import { useUpdateIssueMutation } from '@/features/issues/issuesApiSlice';
import toast from '../helpers/toast';

const BoardLists = ({ project, filters, updateLocalProjectIssues }: any) => {
  const { localData } = useContext(ProjectContext);
  const currentUserId = '629a16a1c74339d4bbd9ff98';
  const [updateIssueMutation] = useUpdateIssueMutation();

  const handleIssueDrop = ({ draggableId, destination, source }: any) => {
    if (!isPositionChanged(source, destination)) return;

    const optimisticUpdate = async (issueId: any, { updatedFields, currentFields, setData }: any) => {
      try {
        setData(updatedFields);
        try {
          const response = await updateIssueMutation({ id: issueId, fields: updatedFields }).unwrap();
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        setData(currentFields);
        toast.error(error);
        console.log(error);
      }
    };

    optimisticUpdate(draggableId, {
      updatedFields: {
        status: destination.droppableId,
        listPosition: calculateIssueListPosition(project.issues, destination, source, draggableId),
      },
      currentFields: project.issues.find(({ _id }: any) => _id === draggableId),
      setData: (fields: any) => updateLocalProjectIssues(draggableId, fields),
    });
  };

  return (
    <DragDropContext onDragEnd={handleIssueDrop}>
      <div className="flex mt-[26px] mb-0 mx-[-5px]">
        {Object.values(IssueStatus).map((status) => (
          <List status={status} project={project} filters={filters} currentUserId={currentUserId} key={status} />
        ))}
      </div>
    </DragDropContext>
  );
};

const isPositionChanged = (destination: any, source: any) => {
  if (!destination) return false;
  if (!source) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const calculateIssueListPosition = (...args: any) => {
  // @ts-ignore
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(...args);
  let position;

  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.listPosition - 1;
  } else if (!nextIssue) {
    position = prevIssue.listPosition + 1;
  } else {
    position = prevIssue.listPosition + (nextIssue.listPosition - prevIssue.listPosition) / 2;
  }
  return position;
};

const getAfterDropPrevNextIssue = (allIssues: any, destination: any, source: any, droppedIssueId: any) => {
  const beforeDropDestinationIssues = getSortedListIssues(allIssues, destination.droppableId);
  const droppedIssue = allIssues.find((issue: any) => issue._id === droppedIssueId);
  const isSameList = destination.droppableId === source.droppableId;

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(beforeDropDestinationIssues, droppedIssue, destination.index)
    : insertItemIntoArray(beforeDropDestinationIssues, droppedIssue, destination.index);

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  };
};

const getSortedListIssues = (issues: any, status: any) =>
  issues.filter((issue: any) => issue.status === status).sort((a: any, b: any) => a.listPosition - b.listPosition);

export default BoardLists;
