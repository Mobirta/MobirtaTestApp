import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

import { Route, Routes, BrowserRouter } from "react-router-dom";
import BlankPage from "./pages/BlankPage";
import LoginPage from "./pages/LoginPage";
import UpLoad from "./pages/UpLoad";

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/blank" element={<BlankPage />} />
        <Route path="/upload" element={<UpLoad />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
