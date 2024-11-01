import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Mercadorias from './components/Mercadorias';
import EditarMercadoria from './components/EditarMercadoria';
import Estoque from './components/Estoque';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/mercadorias" element={<Mercadorias />} />
        <Route path='/editar-mercadoria' element={<EditarMercadoria/>}/>
        <Route path="/estoque" element={<Estoque />} />
      </Routes>
    </Router>
  );
}

export default App;
