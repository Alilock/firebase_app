// App.js
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/HomePage';
import Users from './components/User';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import AuthProvider from './context/AuthContext';
import MainNavigation from './navigation/MainNavigation';

function App() {
  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>
  );
}

export default App;
