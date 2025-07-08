import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import api from "../../../api";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;

  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setUsers(newArray);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

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
    let filteredUsers = searchQuery
      ? users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;
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
          <div className="col-lg-3 mb-4 d-flex flex-column align-items-center profession-panel">
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
                  onClick={clearFilter}
                >
                  Очистить
                </button>
              </>
            ) : (
              <div>Загрузка профессий...</div>
            )}
          </div>
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
