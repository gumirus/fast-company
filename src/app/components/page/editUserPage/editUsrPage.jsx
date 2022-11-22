import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [data, setData] = useState();
  const [professions] = useState();
  
  return null;
};

export default EditUserPage;
