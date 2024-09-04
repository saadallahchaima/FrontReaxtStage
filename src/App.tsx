import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import { getStoredTokens, refreshTokens } from './Services/api';
import { jwtDecode } from 'jwt-decode';

export interface TokenPayload {
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const hideSidebar = pathname === '/' || pathname.startsWith('/auth');
  const hideSearch = pathname === '/' || pathname.startsWith('/auth');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<TokenPayload | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      // Skip token check if user is on the signup page
      if (pathname === '/auth/signup') {
        setLoading(false);
        return;
      }
   
      const { accessToken, refreshToken } = getStoredTokens();
      console.log('Stored accessToken:', accessToken);
      console.log('Stored refreshToken:', refreshToken);
   
      if (accessToken) {
        try {
          const decodedUser = jwtDecode<TokenPayload>(accessToken);
          console.log('Decoded User:', decodedUser);
          setUserInfo(decodedUser);
          setIsAuthenticated(true);
          if (pathname === '/') {
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Error decoding token', error);
          setIsAuthenticated(false);
          navigate('/auth/signin');
        }
      } else if (refreshToken) {
        console.log('Refreshing tokens...');
        await refreshTokens();
        const newAccessToken = localStorage.getItem('access_token');
        console.log('New accessToken after refresh:', newAccessToken);
        if (newAccessToken) {
          try {
            const decodedUser = jwtDecode<TokenPayload>(newAccessToken);
            console.log('Decoded User after refresh:', decodedUser);
            setUserInfo(decodedUser);
            setIsAuthenticated(true);
            if (pathname === '/') {
              navigate('/dashboard');
            }
          } catch (error) {
            console.error('Error decoding token after refresh', error);
            setIsAuthenticated(false);
            navigate('/auth/signin');
          }
        } else {
          setIsAuthenticated(false);
          navigate('/auth/signin');
        }
      } else {
        setIsAuthenticated(false);
        navigate('/auth/signin');
      }
      setLoading(false);
    };
   
    checkAuth();
  }, [navigate, pathname]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <DefaultLayout hideSidebar={hideSidebar} hideSearch={hideSearch}>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<><PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" /><ECommerce /></>} />
                <Route path="/calendar" element={<><PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" /><Calendar /></>} />
                <Route path="/profile" element={<><PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" /><Profile /></>} />
                <Route path="/forms/form-elements" element={<><PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" /><FormElements /></>} />
                <Route path="/forms/form-layout" element={<><PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" /><FormLayout /></>} />
                <Route path="/tables" element={<><PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" /><Tables /></>} />
                <Route path="/settings" element={<><PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" /><Settings /></>} />
                <Route path="/chart" element={<><PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" /><Chart /></>} />
                <Route path="/ui/alerts" element={<><PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" /><Alerts /></>} />
                <Route path="/ui/buttons" element={<><PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" /><Buttons /></>} />
              </>
            ) : (
              <>
                <Route index path="/auth/signin" element={<><PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" /><SignIn /></>} />
                <Route path="/auth/signup" element={<SignUp />} />
              </>
            )}
          </Routes>
        </DefaultLayout>
      )}
      <ToastContainer /> {/* Ajouter le conteneur Toast */}
    </>
  );
}

export default App;
