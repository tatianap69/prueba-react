// importar librerias necesarias
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PullToRefresh from "react-pull-to-refresh";

// función general
const SearchCom = () => {
  // hook para almacenar la lista de usuarios obtenidos de la API
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // función para traer los datos de la API
  const fetchData = async (limit = 5) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
    );
    const data = await response.json();
    setUsers(data);
  };

  // función de recarga
  const handleRefresh = async () => {
    await fetchData(10); // Recarga con un límite mayor
  };

  // método de filtrado (para que busque por nombre o usuario)
  const results = !search
    ? users
    : users.filter(
        (dato) =>
          dato.name.toLowerCase().includes(search.toLowerCase()) ||
          dato.username.toLowerCase().includes(search.toLowerCase())
      );

  // cargar los datos de la API al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // renderizado del componente
  return (
    <PullToRefresh onRefresh={handleRefresh} style={{ height: "100vh" }}>
      <div className="container">
        <br></br>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Buscar"
          className="form-control"
        />
        <table className="table table-striped table-hover mt-5 shadow-lg">
          <thead>
            <tr>
              <th className="bg-titulos text-white">Nombre</th>
              <th className="bg-titulos text-white">Usuario</th>
              <th className="bg-titulos text-white">Email</th>
            </tr>
          </thead>
          <tbody>
            {results.map((user) => (
              <tr
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PullToRefresh>
  );
};

// exportar la función
export default SearchCom;
