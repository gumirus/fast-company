import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import Avatar from "../components/ui/avatar";
import UsersTable from "../components/ui/usersTable";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";
import Quality from "../components/ui/qualities/quality";
import { useAuth } from "../hooks/useAuth";

const Main = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProfessions: 0,
    totalQualities: 0,
    topRatedUser: null,
    recentUsers: [],
    maxRate: 5
  });
  const [professionsList, setProfessionsList] = useState([]);
  const [showProfModal, setShowProfModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const usersPageSize = 6;
  const navigate = useNavigate();
  const [showQualModal, setShowQualModal] = useState(false);
  const [qualitiesList, setQualitiesList] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [qualityUsersPage, setQualityUsersPage] = useState(1);
  const qualityUsersPageSize = 6;
  const [qualityUsers, setQualityUsers] = useState([]);
  const { currentUser, logOut } = useAuth();

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
        setProfessionsList(Object.values(professions));
        setAllUsers(users);
        setQualitiesList(Object.values(qualities));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

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
      {/* Верхние кнопки */}
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          {currentUser ? (
            <>
              <button
                className="btn btn-outline-danger btn-lg"
                onClick={logOut}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary btn-lg me-2">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Войти в систему
              </Link>
              <Link
                to="/login/signUp"
                className="btn btn-outline-success btn-lg"
              >
                <i className="bi bi-person-plus me-2"></i>
                Зарегистрироваться
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Статистика: пользователи, профессии, качества */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title text-primary">
                <i className="bi bi-people-fill me-2"></i>
                Пользователи
              </h5>
              <h2 className="card-text">{stats.totalUsers}</h2>
              <p className="text-muted">Всего пользователей в системе</p>
              {currentUser && (
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() => setShowUsersModal(true)}
                >
                  Просмотреть пользователей
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div
            className="card text-center h-100"
            style={{ cursor: "pointer" }}
            onClick={() => setShowProfModal(true)}
          >
            <div className="card-body">
              <h5 className="card-title text-success">
                <i className="bi bi-briefcase-fill me-2"></i>
                Профессии
              </h5>
              <h2 className="card-text">{stats.totalProfessions}</h2>
              <p className="text-muted">Доступных профессий</p>
              <p className="text-muted">(нажмите, чтобы посмотреть)</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title text-warning">
                <i className="bi bi-stars me-2"></i>
                Качества
              </h5>
              <h2 className="card-text">{stats.totalQualities}</h2>
              <p className="text-muted">Различных качеств</p>
              <button
                className="btn btn-outline-warning mt-2"
                onClick={() => {
                  setShowQualModal(true);
                  setSelectedQuality(null);
                }}
              >
                Просмотреть качества
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно со списком профессий */}
      {showProfModal && (
        <div
          className="avatar-modal-backdrop"
          onClick={() => setShowProfModal(false)}
        >
          <div
            className="avatar-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 500 }}
          >
            <button
              className="btn-close avatar-modal-close"
              onClick={() => setShowProfModal(false)}
            ></button>
            <h4 className="mb-3">Список профессий</h4>
            <div className="row">
              {(() => {
                const half = Math.ceil(professionsList.length / 2);
                const left = professionsList.slice(0, half);
                const right = professionsList.slice(half);
                const handleProfClick = (prof) => {
                  setShowProfModal(false);
                  navigate("/users", { state: { profession: prof } });
                };
                return (
                  <>
                    <div className="col-6">
                      <ul className="list-group mb-2">
                        {left.map((prof) => (
                          <li
                            key={prof._id}
                            className="list-group-item text-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleProfClick(prof)}
                          >
                            {prof.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-6">
                      <ul className="list-group mb-2">
                        {right.map((prof) => (
                          <li
                            key={prof._id}
                            className="list-group-item text-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleProfClick(prof)}
                          >
                            {prof.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно со всеми пользователями */}
      {showUsersModal && (
        <div
          className="avatar-modal-backdrop"
          onClick={() => setShowUsersModal(false)}
        >
          <div
            className="avatar-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 900,
              minWidth: 320,
              maxHeight: "90vh",
              overflowY: "auto",
              width: "100%",
              touchAction: "pan-y",
              WebkitOverflowScrolling: "touch"
            }}
          >
            <button
              className="btn-close avatar-modal-close"
              onClick={() => setShowUsersModal(false)}
            ></button>
            <h4 className="mb-3">Все пользователи</h4>
            <UsersTable
              users={paginate(allUsers, usersPage, usersPageSize)}
              onSort={() => {}}
              selectedSort={{ path: "name", order: "asc" }}
              onToggleBookMark={() => {}}
              onDelete={() => {}}
            />
            <div className="d-flex justify-content-center mt-3">
              <Pagination
                itemsCount={allUsers.length}
                pageSize={usersPageSize}
                currentPage={usersPage}
                onPageChange={setUsersPage}
              />
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно со всеми качествами и пользователями по качеству */}
      {showQualModal && (
        <div
          className="avatar-modal-backdrop"
          onClick={() => {
            setShowQualModal(false);
            setSelectedQuality(null);
            setQualityUsersPage(1);
          }}
        >
          <div
            className="avatar-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: window.innerWidth >= 992 ? 900 : "100vw",
              minWidth: window.innerWidth >= 992 ? 320 : "100vw",
              maxHeight: "90vh",
              overflowY: "auto",
              width: "100%",
              touchAction: "pan-y",
              WebkitOverflowScrolling: "touch",
              borderRadius: window.innerWidth < 576 ? 0 : undefined
            }}
          >
            <button
              className="btn-close avatar-modal-close"
              onClick={() => {
                setShowQualModal(false);
                setSelectedQuality(null);
                setQualityUsersPage(1);
              }}
            ></button>
            <h4 className="mb-3">
              {selectedQuality
                ? `Пользователи с качеством: ${selectedQuality.name}`
                : "Список качеств"}
            </h4>
            {!selectedQuality ? (
              <div className="row">
                {(() => {
                  const half = Math.ceil(qualitiesList.length / 2);
                  const left = qualitiesList.slice(0, half);
                  const right = qualitiesList.slice(half);
                  const handleQualClick = (qual) => {
                    setSelectedQuality(qual);
                    const usersWithQual = allUsers.filter(
                      (u) =>
                        Array.isArray(u.qualities) &&
                        u.qualities.some((q) => q._id === qual._id)
                    );
                    setQualityUsers(usersWithQual);
                    setQualityUsersPage(1);
                  };
                  return (
                    <>
                      <div className="col-6">
                        <ul className="list-group mb-2">
                          {left.map((qual) => (
                            <li
                              key={qual._id}
                              className="list-group-item text-center"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleQualClick(qual)}
                            >
                              <Quality {...qual} />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-6">
                        <ul className="list-group mb-2">
                          {right.map((qual) => (
                            <li
                              key={qual._id}
                              className="list-group-item text-center"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleQualClick(qual)}
                            >
                              <Quality {...qual} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <>
                <UsersTable
                  users={paginate(
                    qualityUsers,
                    qualityUsersPage,
                    qualityUsersPageSize
                  )}
                  onSort={() => {}}
                  selectedSort={{ path: "name", order: "asc" }}
                  onToggleBookMark={() => {}}
                  onDelete={() => {}}
                />
                <div className="d-flex justify-content-center mt-3">
                  <Pagination
                    itemsCount={qualityUsers.length}
                    pageSize={qualityUsersPageSize}
                    currentPage={qualityUsersPage}
                    onPageChange={setQualityUsersPage}
                  />
                </div>
                <button
                  className="btn btn-outline-secondary mt-3 w-100"
                  onClick={() => setSelectedQuality(null)}
                >
                  Назад к списку качеств
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Лучший пользователь */}
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

      {/* Недавние пользователи */}
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

      {/* Возможности системы */}
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
                  <i className="bi bi-people-fill text-primary fs-4"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5>Управление пользователями</h5>
                  <p className="text-muted">
                    Просмотр, редактирование и удаление пользователей
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
