import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
// import * as yup from "yup";

const LoginForm = () => {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false
  });
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  // const validateScheme = yup.object().shape({

  //     .required("Пароль обязателен для заполнения")
  //     .matches(
  //       /(?=.*[A-Z])/,
  //       "Пароль должен содержать хотя бы одну заглавную букву"
  //     )
  //     .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одно число")
  //     .matches(
  //       /(?=.*[!@#$%^&*])/,
  //       "Пароль должен содержать один из специальных символов !@#$%^&*"
  //     )
  //     .matches(/(?=.*[8,])/, "Пароль должен состоять минимум из 8 символов")
  //     email: yup.string()
  //     .string()
  //     .required("Электронная почта обязательна для заполнения")
  //     .email("Email введен некорректно"),
  //   password: yup.object
  // });

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
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
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    // validateScheme
    //   .validate(data)
    //   .then(() => setErrors({}))
    //   .catch((err) => setErrors({ [err.path]: err.message }));
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await logIn(data);
      navigate("/");
    } catch (error) {
      if (error.message && error.message.includes("не найден")) {
        setShowRegisterPrompt(true);
      } else {
        setErrorMessage(error.message || "Ошибка входа");
        setShowErrorModal(true);
      }
    }
  };

  return (
    <>
      <h3 className="mb-4">Login</h3>
      <form onSubmit={handleSubmit}>
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
        <CheckBoxField
          value={data.stayOn}
          onChange={handleChange}
          name="stayOn"
        >
          Оставаться в системе
        </CheckBoxField>
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary w-100 mx-auto"
        >
          Войти
        </button>
      </form>
      {showErrorModal && (
        <div
          className="avatar-modal-backdrop"
          onClick={() => setShowErrorModal(false)}
        >
          <div
            className="avatar-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 400, textAlign: "center" }}
          >
            <button
              className="btn-close avatar-modal-close"
              onClick={() => setShowErrorModal(false)}
            ></button>
            <div style={{ fontSize: 32, marginBottom: 12 }}>😕</div>
            <h5 className="mb-2">Ошибка входа</h5>
            <div className="mb-3 text-danger">{errorMessage}</div>
            <button
              className="btn btn-primary w-100"
              onClick={() => setShowErrorModal(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
      {showRegisterPrompt && (
        <div
          className="avatar-modal-backdrop"
          onClick={() => setShowRegisterPrompt(false)}
        >
          <div
            className="avatar-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 400, textAlign: "center" }}
          >
            <button
              className="btn-close avatar-modal-close"
              onClick={() => setShowRegisterPrompt(false)}
            ></button>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🆕</div>
            <h5 className="mb-2">Пользователь не найден</h5>
            <div className="mb-3">Хотите зарегистрироваться?</div>
            <button
              className="btn btn-success w-100 mb-2"
              onClick={() => {
                setShowRegisterPrompt(false);
                navigate("/login/signUp");
              }}
            >
              Зарегистрироваться
            </button>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setShowRegisterPrompt(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
      <p className="mt-3 text-center">
        Нет аккаунта? <Link to="../signUp">Зарегистрироваться</Link>
      </p>
    </>
  );
};

export default LoginForm;
