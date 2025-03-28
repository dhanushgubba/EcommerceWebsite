import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';

const App = () => {
  const Layout = () => {
    const location = useLocation();
    const showNavbar = ['/'].includes(location.pathname);

    return (
      <>
        {showNavbar && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
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
