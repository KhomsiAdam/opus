import SEO from '@/shared/components/SEO';
import Breadcrumbs from '@/shared/components/Breadcrumbs';
import BoardHeader from '@/shared/components/BoardHeader';
import BoardLists from '@/shared/components/BoardLists';
import Sidebar from '../layout/components/Sidebar';
import useMergeState from '@/shared/hooks/useMergeState';
import { useContext, useEffect, useState } from 'react';
import { updateArrayItemById } from '@/shared/helpers/arrays';
import ProjectContext from '@/context/ProjectProvider';
import { matchRoutes, Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom';
import Modal from '@/shared/components/Modal';
import IssueDetails from '@/shared/components/IssueDetails';
import IssueCreate from '@/shared/components/IssueCreate';
import IssueSearch from '@/shared/components/IssueSearch';
import { useGetProjectQuery } from '@/features/projects/projectsApiSlice';
import PageLoader from '@/shared/components/PageLoader';

const defaultFilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  recent: false,
};

const Home = () => {
  const { localData, setLocalData } = useContext(ProjectContext);
  const { isLoading, data, refetch } = useGetProjectQuery('62a9d72e902b10ec474f10cb');
  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const [searchModal, setSearchModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  const toggleSearchModal = () => setSearchModal(!searchModal);
  const toggleCreateModal = () => setCreateModal(!createModal);

  const navigate = useNavigate();

  const updateLocalProjectIssues = (issueId: any, updatedFields: any) => {
    // @ts-ignore
    setLocalData((currentData: any) => {
      return {
        ...currentData,
        issues: updateArrayItemById(currentData.issues, issueId, updatedFields),
      };
    });
  };
  const routes = [{ path: '/board/issues/:issueId' }];
  const location = useLocation();
  const match = matchRoutes(routes, location);
  const [filters, mergeFilters] = useMergeState(defaultFilters);
  if (localData && data)
    return (
      <>
        <SEO url="/" title="Home" />
        <Sidebar issueSearchModalOpen={toggleSearchModal} issueCreateModalOpen={toggleCreateModal} />

        {searchModal && (
          <Modal
            className="w-[600px]"
            isOpen
            testid="modal:issue-search"
            variant="aside"
            width={600}
            onClose={toggleSearchModal}
            renderContent={() => <IssueSearch project={localData} />}
          />
        )}

        {createModal && (
          <Modal
            className="flex items-center justify-center h-full"
            isOpen
            testid="modal:issue-create"
            width={800}
            withCloseIcon={false}
            onClose={toggleCreateModal}
            renderContent={(modal: any) => (
              <IssueCreate project={localData} fetchProject={refetch} onCreate={modal.close} modalClose={modal.close} />
            )}
          />
        )}

        <div className="w-full pt-[25px] pr-[20px] pb-[50px] pl-[84px] lg:pl-[234px] 4xl:pl-[314px]">
          <Breadcrumbs items={['Projects', 'Opus', 'Kanban Board']} />
          <BoardHeader title="Kanban Board" />
          <BoardLists project={localData} filters={filters} updateLocalProjectIssues={updateLocalProjectIssues} />
        </div>

        <Routes>
          <Route
            path="issues/:issueId"
            element={
              <Modal
                isOpen
                className="w-full"
                testid="modal:issue-details"
                width={1040}
                withCloseIcon={false}
                onClose={() => navigate('/board')}
                renderContent={(modal: any) => (
                  <IssueDetails
                    issueId={match ? match[0].params.issueId : ''}
                    // @ts-ignore
                    projectUsers={localData.users}
                    fetchProject={refetch}
                    updateLocalProjectIssues={updateLocalProjectIssues}
                    modalClose={modal.close}
                  />
                )}
              />
            }
          />
        </Routes>
      </>
    );
  return (
    <div className="flex items-center justify-center mx-auto">
      <PageLoader />
    </div>
  );
};

export default Home;
