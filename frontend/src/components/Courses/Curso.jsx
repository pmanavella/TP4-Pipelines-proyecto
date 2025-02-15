import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Curso.css';
import Swal from 'sweetalert2';
import { FaUserAlt, FaHome } from 'react-icons/fa';
import {IoIosCreate } from 'react-icons/io';
import { Link } from 'react-router-dom';
import ModalComponent from "../AdminControl/ModalComponent";

const Curso = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [inscripto, setInscripto] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [curso, setCurso] = useState({id: '', name: '', description: ''});
    const [comment, setComment] = useState({id: '', id_user: '', text: '', id_course: id, created_at: ''});
    const [comments, setComments] = useState([
        {
            id: '1',
            id_user: 'Juan',
            text: 'Este es un comentario de prueba',
            id_course: '2',
            created_at: 'Hoy'}]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/users');
        } else {
            getCourse(); // Cargar cursos si el usuario está autenticado
            getComments();
        }
    }, [navigate]);

    const getCourse = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const url = `http://localhost:8080/course/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setCurso(data);
        } catch (error) {
            console.error("Error al obtener el curso:", error);
            alert('Error al obtener el curso');
        }
    }

    const deleteComment = async (id) => {
        try {
            const token = sessionStorage.getItem('token');
            const url = `http://localhost:8080/comments/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                Swal.fire('Comentario eliminado', 'El comentario fue eliminado con éxito', 'success');
                getComments();
            } else {
                Swal.fire('Error', 'No se pudo eliminar el comentario', 'error');
            }
        } catch (error) {
            console.error("Error al eliminar el comentario:", error);
            alert('Error al eliminar el comentario');
        }
    }

    const createComment = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const url = `http://localhost:8080/comments`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: comment.text,
                    id_course: Number(id)
                })
            });
            if (response.status === 201) {
                Swal.fire('Comentario creado', 'El comentario fue creado con éxito', 'success');
                getComments();
            } else {
                Swal.fire('Error', 'No se pudo crear el comentario', 'error');
            }
        } catch (error) {
            console.error("Error al crear el comentario:", error);
            alert('Error al crear el comentario');
        }

        handleCloseAddModal()
    }

    const getComments = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const url = `http://localhost:8080/comments/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            let data = await response.json();
            if(data === null){
                data = [];
            }
            setComments(data);
        } catch (error) {
            console.error("Error al obtener los comentarios:", error);
            alert('Error al obtener los comentarios');
        }
    }

    const inscripcion = async (curso) => {
        try {
            const token = sessionStorage.getItem('token');
            const idCourse = curso.id; // Suponiendo que el objeto curso tiene un atributo id que representa el ID del curso
            const url = `http://localhost:8080/inscriptions/${idCourse}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                Swal.fire('Inscripción exitosa', 'Bienvenido al curso', 'success');
            } else {
                Swal.fire('Error', 'No se pudo inscribir al curso', 'error');
            }
        } catch (error) {
            console.error("Error durante la inscripción:", error);
            alert('Error durante la inscripción');
        }
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div className="container-curso">

            <Link to='/courses'>
                <button type="button" className="boton-arriba-derecha2">
                    <FaHome className="icon" />
                </button>
            </Link>

            <li className="card-curso">
                <h2>{curso.name}</h2>
                <p>{curso.description}</p>

                {comments.map((comment) => (


                    <div key={comment.id} className="comentario">
                        <div className="comentario-texto">
                            <div className="comment">
                                <div className="comment-image-container">
                                    <FaUserAlt />
                                </div>
                                <div className="comment-right-part">
                                    <div className="comment-content">
                                        <div className="comment-author">{comment.id_user}</div>
                                        <div>{comment.created_at}</div>
                                    </div>
                                    <div className="comment-text">{comment.text}</div>
                                </div>
                            </div>
                        </div>
                        <button className="eliminar-comentario" onClick={() => deleteComment(comment.id)}> X </button>
                    </div>))
                }
                <button onClick={() => setIsAddModalOpen(true)}>
                    <IoIosCreate className="icon" /> Crear comentario
                </button>

                <ModalComponent isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
                    <h2>Nuevo Comentario</h2>

                    <textarea placeholder="Soy un super comentario..." onChange={(e) => {
                        let nuevo_comment = comment;
                        nuevo_comment.text = e.target.value;
                        setComment(nuevo_comment);
                    }}></textarea>
                    <button onClick={createComment}>Comentar</button>

                </ModalComponent>
                {!inscripto ? (<div className="inscripcion">
                    <button onClick={() => inscripcion(curso)}>
                    Inscribirse
                    </button>
                    </div>) : void(0)}
            </li>


        </div>
    );
};

export default Curso;
