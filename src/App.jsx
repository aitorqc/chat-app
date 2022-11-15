import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from "./pages/Register"
import ProtectedRoute from './components/ProtectedRoute';

import "./style.scss";

function App() {

  return (
    <>
      <Routes>
        <Route path='/'>
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route path='/*' element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
