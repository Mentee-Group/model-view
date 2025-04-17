import HomePage from './pages/HomePage';
import DatasetPage from './pages/DatasetPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <Link to="/" className="font-bold text-lg">Model-View</Link>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/datasets">Datasets</Link>
        </div>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/datasets" element={<DatasetPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
