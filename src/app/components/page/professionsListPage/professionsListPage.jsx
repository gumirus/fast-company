import React, { useEffect, useState } from "react";
import api from "../../../api";

const ProfessionsListPage = () => {
  const [professions, setProfessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      // data может быть объектом, преобразуем в массив
      const list = Array.isArray(data) ? data : Object.values(data);
      setProfessions(list);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="container mt-5">Загрузка...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Список профессий</h2>
      <ul className="list-group">
        {professions.map((prof) => (
          <li key={prof._id} className="list-group-item">
            {prof.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessionsListPage;
