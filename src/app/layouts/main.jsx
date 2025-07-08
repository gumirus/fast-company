import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Avatar from "../components/ui/avatar";

const Main = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProfessions: 0,
    totalQualities: 0,
    topRatedUser: null,
    recentUsers: [],
    maxRate: 5
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, professions, qualities] = await Promise.all([
          api.users.fetchAll(),
          api.professions.fetchAll(),
          api.qualities.fetchAll()
        ]);

        const topRated = users.sort((a, b) => b.rate - a.rate)[0];
        const recent = users.slice(0, 3);
        const maxRate =
          users.length > 0 ? Math.max(...users.map((u) => u.rate)) : 5;

        setStats({
          totalUsers: users.length,
          totalProfessions: Object.keys(professions).length,
          totalQualities: Object.keys(qualities).length,
          topRatedUser: topRated,
          recentUsers: recent,
          maxRate
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Функция для процента и цвета бейджа
  const getRatingInfo = (rate) => {
    const percent = stats.maxRate
      ? Math.round((rate / stats.maxRate) * 100)
      : 0;
    let color = "bg-danger";
    if (percent >= 70) color = "bg-success";
    else if (percent >= 40) color = "bg-warning text-dark";
    return { percent, color };
  };

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center">
            <h1 className="display-4 mb-3">Fast Company</h1>
            <p className="lead text-muted">
              Управление пользователями и их качествами
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title text-primary">
                <i className="bi bi-people-fill me-2"></i>
                Пользователи
              </h5>
              <h2 className="card-text">{stats.totalUsers}</h2>
              <p className="text-muted">Всего пользователей в системе</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title text-success">
                <i className="bi bi-briefcase-fill me-2"></i>
                Профессии
              </h5>
              <h2 className="card-text">{stats.totalProfessions}</h2>
              <p className="text-muted">Доступных профессий</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title text-warning">
                <i className="bi bi-star-fill me-2"></i>
                Качества
              </h5>
              <h2 className="card-text">{stats.totalQualities}</h2>
              <p className="text-muted">Различных качеств</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 className="mb-4">Быстрые действия</h3>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/users" className="btn btn-primary btn-lg">
              <i className="bi bi-people me-2"></i>
              Просмотреть пользователей
            </Link>
            <Link to="/login" className="btn btn-outline-primary btn-lg">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Войти в систему
            </Link>
            <Link to="/login/signUp" className="btn btn-outline-success btn-lg">
              <i className="bi bi-person-plus me-2"></i>
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>

      {/* Top Rated User */}
      {stats.topRatedUser && (
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="mb-4">Лучший пользователь</h3>
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <Avatar user={stats.topRatedUser} size="xl" />
                  <div className="ms-3">
                    <h4 className="mb-1">{stats.topRatedUser.name}</h4>
                    <p className="text-muted mb-1">
                      {stats.topRatedUser.profession.name}
                    </p>
                    <div className="d-flex align-items-center">
                      <span
                        className={`badge ${
                          getRatingInfo(stats.topRatedUser.rate).color
                        } me-2`}
                      >
                        Рейтинг:{" "}
                        {getRatingInfo(stats.topRatedUser.rate).percent}%
                      </span>
                      <span className="badge bg-info">
                        Встреч: {stats.topRatedUser.completedMeetings}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Users */}
      {stats.recentUsers.length > 0 && (
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="mb-4">Недавние пользователи</h3>
            <div className="row">
              {stats.recentUsers.map((user) => (
                <div key={user._id} className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <Avatar user={user} size="md" />
                        <div className="ms-3">
                          <h6 className="mb-0">{user.name}</h6>
                          <small className="text-muted">
                            {user.profession.name}
                          </small>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span
                          className={`badge ${getRatingInfo(user.rate).color}`}
                        >
                          Рейтинг: {getRatingInfo(user.rate).percent}%
                        </span>
                        <Link
                          to={`/users/${user._id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Подробнее
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 className="mb-4">Возможности системы</h3>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <i className="bi bi-search text-primary fs-4"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5>Поиск и фильтрация</h5>
                  <p className="text-muted">
                    Быстрый поиск пользователей по имени и фильтрация по
                    профессиям
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <i className="bi bi-star text-warning fs-4"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5>Система рейтингов</h5>
                  <p className="text-muted">
                    Оценка пользователей и отслеживание их активности
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <i className="bi bi-bookmark text-success fs-4"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5>Избранное</h5>
                  <p className="text-muted">
                    Сохранение важных пользователей в избранное
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <i className="bi bi-pencil text-info fs-4"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5>Редактирование</h5>
                  <p className="text-muted">
                    Удобное редактирование профилей пользователей
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
