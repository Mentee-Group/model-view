import HomePage from './pages/HomePage';
import DatasetPage from './pages/DatasetPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CompetitionPage from './pages/CompetitionPage';
import LeaderboardPage from './pages/LeaderboardPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar /> 
      <div className="max-w-screen-xl mx-auto p-6 mt-30">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/competitions" element={<CompetitionPage />} />
          <Route path="/datasets" element={<DatasetPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
