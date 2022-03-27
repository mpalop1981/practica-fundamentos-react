import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage/LoginPage';
import AdvertsPage from './components/adverts/AdvertsPage/AdvertsPage';
import { AuthContextProvider } from './components/auth/context';
import RequireAuth from './components/auth/requireAuth';
import Layout from './components/layout/Layout';
import AdvertPage from './components/adverts/AdvertPage/AdvertPage';
import NewAdvert from './components/adverts/NewAdvertPage/NewAdvertPage';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <div className="App">
      <AuthContextProvider value={{ isLogged, handleLogin, handleLogout }}>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/adverts"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<AdvertsPage />} />
            <Route path=":advertId" element={<AdvertPage />} />
            <Route path="new" element={<NewAdvert />}/>
          </Route>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Navigate to="/adverts" />
              </RequireAuth>
            }
          />
          <Route path="/404" element={<div>404 | Not Found Page</div>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
