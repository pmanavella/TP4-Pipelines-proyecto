import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminControl.css';
import Swal from 'sweetalert2';
import { FaHome, FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { TiPlus } from "react-icons/ti";
import ModalComponent from './ModalComponent';

const AdmControl = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [cursos, setCursos] = useState([]);
  const [cursosFiltrados, setCursosFiltrados] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cursoActual, setCursoActual] = useState({ id: '', name: '', description: '' });
  const [cursoNuevo, setCursoNuevo] = useState({ name: '', description: '' });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/users');
    } else {
      cargarCursos();
    }
  }, [navigate]);

  const cargarCursos = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/courses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error en la carga de cursos');
      }

      const data = await response.json();
      setCursos(data); // Asignar los cursos obtenidos al estado cursos
      setCursosFiltrados(data); // Mostrar todos los cursos al inicio
    } catch (error) {
      console.error("Error durante la carga de cursos:", error);
      alert('Error durante la carga de cursos');
    }
  };

  const crearCurso = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cursoNuevo)
      });

      if (!response.ok) {
        throw new Error('Error al crear el curso');
      }

      const data = await response.json();
      setCursos([...cursos, data]); // Agregar el nuevo curso a la lista existente
      setCursosFiltrados([...cursos, data]);
      setIsAddModalOpen(false); // Cerrar el modal después de crear el curso
      Swal.fire('Curso creado exitosamente', '', 'success');
    } catch (error) {
      console.error("Error al crear el curso:", error);
      alert('Error al crear el curso');
    }
  };

  const editarCurso = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/courses`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cursoActual)
      });

      if (!response.ok) {
        throw new Error('Error al editar el curso');
      }

      const data = await response.json();
      const nuevosCursos = cursos.map((curso) => (curso.id === data.id ? data : curso));
      setCursos(nuevosCursos); // Actualizar la lista de cursos con el curso editado
      setCursosFiltrados(nuevosCursos);
      setIsEditModalOpen(false); // Cerrar el modal después de editar el curso
      Swal.fire('Curso editado exitosamente', '', 'success');
    } catch (error) {
      console.error("Error al editar el curso:", error);
      alert('Error al editar el curso');
    }
  };

  const manejarCambio = (e) => {
    const value = e.target.value.toLowerCase();
    setBusqueda(value);
    const nuevosCursos = cursos.filter((curso) => {
      return curso.name && curso.name.toLowerCase().includes(value);
    });
    setCursosFiltrados(nuevosCursos);
  };

  const eliminarCurso = async (cursoId) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el curso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = sessionStorage.getItem('token');
          const url = `http://localhost:8080/courses/delete/${cursoId}`;
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_course: cursoId })
          });

          if (response.ok) {
            Swal.fire('Curso eliminado', '', 'success');
            const nuevosCursos = cursosFiltrados.filter(curso => curso.id !== cursoId);
            setCursosFiltrados(nuevosCursos);
          } else {
            Swal.fire('Error', 'No se pudo eliminar el curso', 'error');
          }
        } catch (error) {
          console.error("Error al eliminar el curso:", error);
          alert('Error al eliminar el curso');
        }
      }
    });
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (curso) => {
    setCursoActual(curso);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleNuevoCursoChange = (e) => {
    const { name, value } = e.target;
    setCursoNuevo((prevCurso) => ({
      ...prevCurso,
      [name]: value
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCursoActual((prevCurso) => ({
      ...prevCurso,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <h1>Administracion de cursos</h1>
      <button className="boton-arriba-derecha" onClick={handleOpenAddModal}>
        <TiPlus className="icon" />
      </button>

      <Link to='/courses'>
        <button type="button" className="boton-arriba-derecha2">
          <FaHome className="icon" />
        </button>
      </Link>
      <input
        type="text"
        className='busqueda'
        placeholder="Buscar curso..."
        onChange={manejarCambio}
        value={busqueda}
      />
      <ul className="grid">
        {cursosFiltrados && cursosFiltrados.length > 0 ? (
          cursosFiltrados.map((curso) => (
            <li key={curso.id} className="card">
              <Link to={`/course/${curso.id}`}>
                <h2>{curso.name}</h2>
              </Link>
              <p>{curso.description}</p>
              <div className="botones">
                <button className="boton-admin" onClick={() => handleOpenEditModal(curso)}>
                  <FaUserEdit className="icon" />
                </button>
                <button className="boton-admin" onClick={() => eliminarCurso(curso.id)}>
                  <MdDelete className="icon" />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No hay cursos disponibles</p>
        )}
      </ul>
      <ModalComponent isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
        <h2>Nuevo Curso</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre del curso"
          value={cursoNuevo.name}
          onChange={handleNuevoCursoChange}
        />
        <textarea
          name="description"
          placeholder="Descripción del curso"
          value={cursoNuevo.description}
          onChange={handleNuevoCursoChange}
        ></textarea>
        <button onClick={crearCurso}>Crear Curso</button>
      </ModalComponent>

      <ModalComponent isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <h2>Editar Curso</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre del curso"
          value={cursoActual.name}
          onChange={handleEditChange}
        />
        <textarea
          name="description"
          placeholder="Descripción del curso"
          value={cursoActual.description}
          onChange={handleEditChange}
        ></textarea>
        <button onClick={editarCurso}>Guardar Cambios</button>
      </ModalComponent>
    </div>
  );
};

export default AdmControl;