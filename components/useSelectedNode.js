import { createContext, useContext, useState } from 'react';

const SelectedNodeContext = createContext();

export const SelectedNodeProvider = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  return (
    <SelectedNodeContext.Provider value={{ selectedNode, setSelectedNode }}>
      {children}
    </SelectedNodeContext.Provider>
  );
};

const useSelectedNode = () => useContext(SelectedNodeContext);

export default useSelectedNode; 