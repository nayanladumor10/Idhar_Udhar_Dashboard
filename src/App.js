import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Aboutpage from './Components/AboutPage/Pages/Aboutpage';
import Allcities from './Components/AboutPage/Pages/Allcities';
import DriverDashboard from './Components/DriverDashboard/Page/DriverDashboard';
import { GlobalContext } from './Components/DriverDashboard/Context/GlobalContext';
import DriverPannle from './Components/DriverDashboard/DriverPannle';
import RideHistory from './Components/DriverDashboard/Page/RideHistory';
import Earnings from './Components/DriverDashboard/Page/Earnings';
import Profile from './Components/DriverDashboard/Page/Profile';
import Support from './Components/DriverDashboard/Page/Support';
import Settings from './Components/DriverDashboard/Page/Settings';
import { AuthProvider } from './Components/DriverDashboard/Context/AuthContext';
import AuthPage from './Components/DriverDashboard/Page/Login-signUp/AuthPage';
import LoginPage from './Components/DriverDashboard/Page/Login-signUp/LoginPage';
import SignupPage from './Components/DriverDashboard/Page/Login-signUp/SignUpPage';
import { ProtectedRoute } from './Components/DriverDashboard/Context/ProtectedRoute';
import { ThemeProvider } from './Components/DriverDashboard/Context/ThemeContext';

function App() {
  return (
    <AuthProvider>
      <GlobalContext>
        <ThemeProvider>
          <div className="App">
            <Routes>

              <Route path='/' element={<Aboutpage />} />
              <Route path='/allcities' element={<Allcities />} />

              {/* Auth routes */}
              <Route path='/auth' element={<AuthPage />} />
              <Route path='/auth/login' element={<LoginPage />} />
              <Route path='/auth/signup' element={<SignupPage />} />

              {/* Protected driver routes */}
              <Route path='/driver' element={
                <ProtectedRoute>
                  <DriverPannle />
                </ProtectedRoute>
              }>
                <Route path='' element={<DriverDashboard />} />
                <Route path='ridehistory' element={<RideHistory />} />
                <Route path='earnings' element={<Earnings />} />
                <Route path='profile' element={<Profile />} />
                <Route path='support' element={<Support />} />
                <Route path='settings' element={<Settings />} />
              </Route>
            </Routes>
          </div>
        </ThemeProvider>
      </GlobalContext>
    </AuthProvider>
  );
}

export default App;