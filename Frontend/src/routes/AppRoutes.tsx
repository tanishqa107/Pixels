import { Routes, Route } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import CreatePinPage from '../pages/CreatePinPage';
import LandingPage from '../pages/LandingPage';
import YourPinsPage from '../pages/YourPins';
import MessagingPage from '../pages/MessagingPage';
import LikesPage from '../pages/LikesPage';

const AppRoutes: React.FC = () => {
  return (
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/createpinpage" element={<CreatePinPage />} />
        <Route path="/yourpinspage" element={<YourPinsPage />} />
        <Route path="/likespage" element={<LikesPage />} />
        <Route path="/messagingpage" element={<MessagingPage />} />

      </Routes>
    
  );
};

export default AppRoutes;
