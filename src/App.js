import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';

const App = () => {
  const Layout = () => {
    const location = useLocation();
    const showNavbar = ['/', '/login', '/register'].includes(location.pathname);

    return (
      <>
        {showNavbar && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
