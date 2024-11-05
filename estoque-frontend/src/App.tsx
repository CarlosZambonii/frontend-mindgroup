import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Mercadorias from './components/Mercadorias';
import PrivateRoute from './PrivateRoute'; // Certifique-se de que está importando
import { AuthProvider } from './context/AuthContext'; // Importa o AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route 
            path="/mercadorias" 
            element={<PrivateRoute component={Mercadorias} />} // Use o PrivateRoute aqui
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
