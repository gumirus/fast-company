import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "", // Добавил имя
    profession: "",
    sex: "male",
    qualities: [],
    licence: false,
    avatarUrl: "" // Исправил название поля
  });
  const [qualities, setQualities] = useState([]);
  const [professions, setProfession] = useState([]);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    name: {
      // Добавил валидацию для имени
      isRequired: {
        message: "Имя обязательно для заполнения"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите вашу профессию"
      }
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const { profession, qualities, ...rest } = data;
    const newData = {
      ...rest,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    };

    try {
      await signUp(newData);
      navigate("/users");
    } catch (error) {
      setErrors(error);
    }
  };

  function getProfessionById(id) {
    for (const prof in professions) {
      if (professions[prof].value === id) {
        return { _id: professions[prof].value, name: professions[prof].label };
      }
    }
  }
  function getQualities(elements) {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  }

  return (
    <>
      <h3 className="mb-4">Register</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя"
          placeholder="Ваше имя"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextField
          label="Почта"
          placeholder="@mail :"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label="Пароль"
          placeholder="Пароль :"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <TextField
          label="Аватар (URL)"
          placeholder="https://example.com/avatar.jpg"
          name="avatarUrl"
          value={data.avatarUrl}
          onChange={handleChange}
          error={errors.avatarUrl}
        />
        <SelectField
          label="Выбери свою профессию"
          defaultOption="Choose..."
          name="profession"
          options={professions}
          onChange={handleChange}
          value={data.profession}
          error={errors.profession}
        />
        <RadioField
          options={[
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
            { name: "Other", value: "other" }
          ]}
          value={data.sex}
          name="sex"
          onChange={handleChange}
          label="Выберите ваш пол"
        />
        <MultiSelectField
          options={qualities}
          onChange={handleChange}
          defaultValue={data.qualities}
          name="qualities"
          label="Выберите ваши качества"
        />
        <CheckBoxField
          value={data.licence}
          onChange={handleChange}
          name="licence"
          error={errors.licence}
        >
          Подтвердить <a>лицензионное соглашение</a>
        </CheckBoxField>

        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary w-100 mx-auto"
        >
          Submit
        </button>
      </form>
      <p className="mt-3 text-center">
        Уже есть аккаунт? <Link to="../signIn">Войти</Link>
      </p>
    </>
  );
};

export default RegisterForm;
