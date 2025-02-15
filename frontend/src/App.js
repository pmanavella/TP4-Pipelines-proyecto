import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister/LoginRegister.jsx';
import Cursos from './components/Courses/Cursos.jsx';
import Curso from './components/Courses/Curso.jsx';
import MyCourses from './components/MyCourses/Mycourses.jsx'; // Importar el componente MyCourses
import AdmControl from './components/AdminControl/AdminControl.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Cursos />} />
          <Route path="/users" element={<LoginRegister />} />
          <Route path="/courses" element={<Cursos />} />
          <Route path="/course/:id" element={<Curso />} />
          <Route path="/mycourses" element={<MyCourses />} /> 
          <Route path="/AdminControl" element={<AdmControl />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
