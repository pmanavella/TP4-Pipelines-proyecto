import React, { useState } from "react";
import swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bienvenido</h1>
      <div className="button-container">
        <button onClick={() => navigate("/users")}>Administrador</button>
        <button onClick={() => navigate("/users")}>Alumno</button>
      </div>
    </div>
  );
}
