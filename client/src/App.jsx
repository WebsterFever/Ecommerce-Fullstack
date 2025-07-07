import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CreateProductForm from './components/CreateProductForm';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOnly from './components/AdminOnly';
import CreateHomeProductForm from './components/CreateHomeProductForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/create-product" element={<AdminOnly><CreateProductForm /></AdminOnly>} />
      <Route path="/admin/dashboard" element={<AdminOnly><AdminDashboard /></AdminOnly>} />
      <Route path="/admin/create-home-product" element={<CreateHomeProductForm />} />
    </Routes>
  );
}

export default App;
