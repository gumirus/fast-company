import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import api from "../../../api";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import { FaBars } from "react-icons/fa"; // импорт иконки гамбургера

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;

  const [allUsers, setAllUsers] = useState();
  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setAllUsers(data);
      setUsers(data);
    });
  }, []);
  const handleDelete = (userId) => {
    const updated = (allUsers || users).filter((user) => user._id !== userId);
    setAllUsers(updated);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated)); // сохраняем изменения
  };
  const handleToggleBookMark = (id) => {
    const newArray = (allUsers || users).map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setAllUsers(newArray);
    setUsers(newArray);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [isProfMenuOpen, setProfMenuOpen] = useState(false);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      console.log("Professions loaded:", data);
      setProfession(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  if (users) {
    let filteredUsers = allUsers || users;
    if (searchQuery) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    } else if (selectedProf) {
      filteredUsers = filteredUsers.filter(
        (user) => user.profession._id === selectedProf._id
      );
    }
    if (showFavorites) {
      filteredUsers = filteredUsers.filter((user) => user.bookmark);
    }
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="container mt-5">
        <div className="row">
          {/* Мобильный гамбургер */}
          <div className="d-lg-none mb-3">
            <button
              className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
              onClick={() => setProfMenuOpen(true)}
              style={{ fontSize: 22 }}
            >
              <FaBars className="me-2" />
              Профессии
            </button>
          </div>
          {/* Панель профессий для десктопа */}
          <div className="col-lg-3 mb-4 d-none d-lg-flex flex-column align-items-center profession-panel">
            {professions ? (
              <>
                <h5>Профессии:</h5>
                <GroupList
                  selectedItem={selectedProf}
                  items={
                    Array.isArray(professions)
                      ? professions
                      : Object.values(professions)
                  }
                  onItemSelect={handleProfessionSelect}
                  valueProperty="_id"
                  contentProperty="name"
                />
                <button
                  className="btn btn-outline-secondary mt-2"
                  onClick={() => setSelectedProf()}
                >
                  Очистить
                </button>
              </>
            ) : (
              <div>Загрузка профессий...</div>
            )}
          </div>
          {/* Overlay меню профессий для мобильных */}
          {isProfMenuOpen && (
            <div className="prof-overlay">
              <div
                className="prof-overlay-backdrop"
                onClick={() => setProfMenuOpen(false)}
              />
              <div className="prof-overlay-content">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Профессии</h5>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setProfMenuOpen(false)}
                  >
                    ×
                  </button>
                </div>
                {professions ? (
                  <>
                    <GroupList
                      selectedItem={selectedProf}
                      items={
                        Array.isArray(professions)
                          ? professions
                          : Object.values(professions)
                      }
                      onItemSelect={(item) => {
                        handleProfessionSelect(item);
                        setProfMenuOpen(false);
                      }}
                      valueProperty="_id"
                      contentProperty="name"
                    />
                    <button
                      className="btn btn-outline-secondary mt-2 w-100"
                      onClick={() => {
                        setSelectedProf();
                        setProfMenuOpen(false);
                      }}
                    >
                      Очистить
                    </button>
                  </>
                ) : (
                  <div>Загрузка профессий...</div>
                )}
              </div>
            </div>
          )}
          {/* Основная область */}
          <div className="col-lg-9">
            <SearchStatus length={count} />
            <input
              type="text"
              name="searchQuery"
              placeholder="Search..."
              onChange={handleSearchQuery}
              value={searchQuery}
              className="form-control mb-3"
            />
            <button
              className={`btn btn-sm mb-3 me-2 ${
                showFavorites ? "btn-warning" : "btn-outline-warning"
              }`}
              onClick={() => setShowFavorites((prev) => !prev)}
            >
              {showFavorites ? "Показать всех" : "Показать избранных"}
            </button>
            {count > 0 && (
              <UsersTable
                users={usersCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
              />
            )}
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <h3>Loading...</h3>;
};
UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;
