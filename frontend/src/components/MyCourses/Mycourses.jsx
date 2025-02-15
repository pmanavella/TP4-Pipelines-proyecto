import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mycurses.css';
import Swal from 'sweetalert2';
import { FaUserAlt } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const navigate = useNavigate();
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/users');
    } else {
      cargarCursosInscritos(); // Cargar cursos inscritos si el usuario está autenticado
    }
  }, [navigate]);

  const cargarCursosInscritos = async () => {
    try {
      const token = sessionStorage.getItem('token'); // Suponiendo que el objeto usuario tiene un atributo id que representa el ID del usuario
      const url = `http://localhost:8080/courses/${token}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Error en la carga de cursos inscritos');
      }
  
      const data = await response.json();
      setCursosInscritos(data); 
    } catch (error) {
      console.error("Error durante la carga de cursos inscritos:", error);
      alert('Error durante la carga de cursos inscritos');
    }
  };

  return (
    <div className="container">
      <h1>Mis Cursos Inscritos</h1>
      <button type="button" className="boton-arriba-derecha">
        <FaUserAlt className="icon" />
      </button>
      <Link to='/courses'>
        <button type="button2" className="boton-arriba-derecha2">
          <FaHome className="icon" />
        </button>
      </Link>
      <ul className="grid">
        {cursosInscritos != null ? (
          cursosInscritos.map((curso) => (
            <li key={curso.id} className="card">
              <Link to={`/course/${curso.id}`}>
                <h2>{curso.name}</h2>
              </Link>
              <p>{curso.description}</p>
            </li>
          ))
        ) : (
          <p>No estás inscrito en ningún curso</p>
        )}
      </ul>
    </div>
  ); 
};

export default MyCourses;
