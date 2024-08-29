import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import Settings from './pages/profile/settings/Settings';
import ProfileLayout from './components/profile/layout/ProfileLayout';
import { useEffect } from 'react';
import userStore from './store/UserStore';
import PrivateRoute from './components/protectedRoute/ProtectedRoute';

function App() {

  useEffect(() => {
    userStore.loadUserFromCookies();
    console.log(userStore.user)
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='profile' element={<PrivateRoute element={<ProfileLayout />} />}>
          <Route path='settings' element={<Settings />} />
          <Route path='dashboard' element={<></>} />
          <Route path='courses' element={<></>} />
          <Route path='teachers' element={<></>} />
          <Route path='message' element={<></>} />
          <Route path='history' element={<></>} />
          <Route path='wishlist' element={<></>} />
          <Route path='*' element={<div>oshibka profile</div>}/>
        </Route>
        <Route path='*' element={<div>oshibka prirodi</div>}/>

      </Route>
      <Route path='/auth/:option' element={<Auth />}/>
    </Routes>
  );
}

export default App;
