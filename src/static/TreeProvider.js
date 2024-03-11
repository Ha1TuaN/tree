import React, { createContext, useState, useEffect } from "react";
import { getApi } from "./api";

const TreeContext = createContext();

const TreeProvider = ({ children }) => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    fetchTreeData();
  }, []);

  const fetchTreeData = async () => {
    try {
      const response = await getApi(); 
      setTreeData(response.data)
    } catch (error) {
      console.error("Error fetching tree data:", error);
      throw error;
    }
  };

  return (
    <TreeContext.Provider value={{ treeData }}>
      {children}
    </TreeContext.Provider>
  );
};

export { TreeProvider, TreeContext };
