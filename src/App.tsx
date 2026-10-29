import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Timetable from './pages/Timetable';
import CalendarPage from './pages/CalendarPage';
import Reminders from './pages/Reminders';
import Announcements from './pages/Announcements';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import AdminUpload from './pages/AdminUpload';
import AdminTimetable from './pages/AdminTimetable';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        <Route element={<StudentLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/timetable" element={<AdminTimetable />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
