import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('idharUdharUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const storedUser = localStorage.getItem('idharUdharUser');
    if (!storedUser) {
      alert('No user found. Please sign up.');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    console.log(parsedUser)

    if (userData.email === parsedUser.email && userData.password === parsedUser.password) {
      setUser(parsedUser);
      navigate('/driver');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = (userData) => {
    localStorage.setItem('idharUdharUser', JSON.stringify(userData));
    navigate('/auth/login');
  };

  const logout = () => {
    localStorage.removeItem('idharUdharUser');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);