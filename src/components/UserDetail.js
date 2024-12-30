// importar librerias necesarias
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
// función general
const UserDetail = () => {
  // datos generales
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // función para obtener los datos del usuario, envuelta en useCallback
  const fetchUser = useCallback(async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const data = await response.json();
    setUser(data);
  }, [id]);
  // cargar los datos del usuario
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  // pantalla de cargue
  if (!user) {
    return <p className="loading">Cargando...</p>;
  }
  // manejar acción de volver
  const handleBack = () => {
    navigate(-1); // Navega a la página anterior
  };
  // renderizado del componente
  return (
    <div className="user-detail-container">
      <h2 className="user-detail-title">Detalle del Usuario</h2>
      <div className="user-detail-card">
      <p>
        <strong>Nombre:</strong> {user.name}
      </p>
      <p>
        <strong>Usuario:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Teléfono:</strong> {user.phone}
      </p>
      <p>
        <strong>Ciudad:</strong> {user.address.city}
      </p>
      </div>
      <button className="back-button" onClick={handleBack}>
        Volver
      </button>
    </div>
  );
};
// exportar la función
export default UserDetail;
