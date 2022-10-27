import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const pageSize = 8;
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    if (sortBy.iter === item) {
      setSortBy((prevState) => ({
        ...prevState,
        order: prevState.order === "asc" ? "desc" : "asc"
      }));
    } else {
      setSortBy({ iter: item, order: "asc" });
    }
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  const filteredUsers = selectedProf
    ? allUsers.filter((user) => user.profession === selectedProf)
    : allUsers;
  const count = filteredUsers.length;
  const sortedUsers = _.orderBy(
    filteredUsers,
    [sortBy.iter],
    [sortBy.order]
  );
  const usersGrop = paginate(sortedUsers, currentPage, pageSize);
  const clearFilter = () => {
    setSelectedProf();
  };
  const renderTable = () => {
    return allUsers && count !== 0 ? (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              {" "}
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          {count > 0 && (
            <UserTable users={usersGrop} onSort={handleSort} {...rest} />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageShange={handlePageChange}
            />
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  };
  return <>{renderTable()}</>;
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Users;
