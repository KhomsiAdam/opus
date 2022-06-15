import { createContext, useEffect, useState } from 'react';

interface ProjectData {
  project?: object;
}

interface ProjectContextInterface {
  localData: ProjectData;
  setLocalData: (auth: ProjectData) => void;
}

const ProjectContext = createContext<ProjectContextInterface>({
  localData: {},
  setLocalData: () => {},
});

export function ProjectProvider({ children }: any) {
  const [localData, setLocalData] = useState<ProjectData>({});
  return <ProjectContext.Provider value={{ localData, setLocalData }}>{children}</ProjectContext.Provider>
}

export default ProjectContext;
