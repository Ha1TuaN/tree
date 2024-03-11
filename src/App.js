import TreeView from "./components/TreeView";
import {TreeProvider } from "./static/TreeProvider";


function App() {
  return (
    <TreeProvider>
      <TreeView />
    </TreeProvider>
  );
}

export default App;
