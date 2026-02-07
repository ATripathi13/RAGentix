import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import AskAgent from './pages/AskAgent';
import RAGViewer from './pages/RAGViewer';
import WorkflowViewer from './pages/WorkflowViewer';
import Evaluation from './pages/Evaluation';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="ask" element={<AskAgent />} />
          <Route path="rag" element={<RAGViewer />} />
          <Route path="workflow" element={<WorkflowViewer />} />
          <Route path="evaluation" element={<Evaluation />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
