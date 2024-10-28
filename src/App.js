import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import Settings from './pages/profile/settings/Settings';
import ProfileLayout from './components/profile/layout/ProfileLayout';
import { useEffect } from 'react';
import userStore from './store/UserStore';
import PrivateRoute from './components/protectedRoute/ProtectedRoute';
import './FontStyles.css';
import './ComponentStyles.css';
import './Color.css';
import Dashboard from './pages/profile/dashboard/Dashboard';
import Cookies from 'js-cookie';
import InstructorLayout from './components/profile/layout/instructor/Layout';
import InstructorSettings from './pages/instructor/settings/InstructorSettings';
import InstructorDashboard from './pages/instructor/dashboard/InstructorDashboard';
import CreateCourse from './pages/instructor/create-course/CreateCourse';
import Courses from './pages/courses/Courses';
import Course from './pages/course/Course';

function App() {

  useEffect(() => {
    if(Cookies.get('user') !== undefined){
      console.log('app.js');
      userStore.loadUserFromCookies();
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='courses' element={<Courses />} />
        <Route path='course/:id' element={<Course />} />
        <Route path='profile' element={<PrivateRoute element={<ProfileLayout />} />}>
          <Route path='settings' element={<Settings />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='courses' element={<></>} />
          <Route path='teachers' element={<></>} />
          <Route path='message' element={<></>} />
          <Route path='history' element={<></>} />
          <Route path='wishlist' element={<></>} />
          <Route path='*' element={<div>oshibka profile</div>}/>
        </Route>
        <Route path='*' element={<div>oshibka prirodi</div>}/>
      </Route>
      <Route path='/instructor' element={<InstructorLayout />}>
        <Route path='settings' element={<InstructorSettings/>}/>
        <Route path='dashboard' element={<InstructorDashboard />} />
        <Route path='new-course' element={<CreateCourse /> } />
        <Route path='*' element={<div>oshibka instructor</div>} />
      </Route>
      <Route path='/auth/:option' element={<Auth />}/>
    </Routes>
  );
}

export default App;
