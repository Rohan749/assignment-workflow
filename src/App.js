import { ReactFlowProvider } from 'reactflow';
import './App.css';
import Designer from './Components/Designer';
import WorkFlowList from './Components/WorkFlowList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ReactFlowProvider>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='*' element={<WorkFlowList />} />
          <Route path='/Designer' element={<Designer />} />
        </Routes>
      </div>
    </BrowserRouter>
    </ReactFlowProvider>
  );
}

export default App;
