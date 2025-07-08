export const professionsObject = {
  doctor: { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" },
  waiter: { _id: "67rdca3eeb7f6fgeed471820", name: "Официант" },
  physics: { _id: "67rdca3eeb7f6fgeed471814", name: "Физик" },
  engineer: { _id: "67rdca3eeb7f6fgeed471822", name: "Инженер" },
  actor: { _id: "67rdca3eeb7f6fgeed471824", name: "Актёр" },
  cook: { _id: "67rdca3eeb7f6fgeed471829", name: "Повар" },
  programmer: { _id: "67rdca3eeb7f6fgeed471900", name: "Программист" },
  driver: { _id: "67rdca3eeb7f6fgeed471901", name: "Водитель" },
  manager: { _id: "67rdca3eeb7f6fgeed471902", name: "Менеджер" },
  police: { _id: "67rdca3eeb7f6fgeed471903", name: "Полицейский" },
  teacher: { _id: "67rdca3eeb7f6fgeed471904", name: "Учитель" },
  designer: { _id: "67rdca3eeb7f6fgeed471905", name: "Дизайнер" },
  marketer: { _id: "67rdca3eeb7f6fgeed471906", name: "Маркетолог" },
  electrician: { _id: "67rdca3eeb7f6fgeed471907", name: "Электрик" },
  nurse: { _id: "67rdca3eeb7f6fgeed471908", name: "Медсестра" }
};

export const professions = [
  { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" },
  { _id: "67rdca3eeb7f6fgeed471820", name: "Официант" },
  { _id: "67rdca3eeb7f6fgeed471814", name: "Физик" },
  { _id: "67rdca3eeb7f6fgeed471822", name: "Инженер" },
  { _id: "67rdca3eeb7f6fgeed471824", name: "Актёр" },
  { _id: "67rdca3eeb7f6fgeed471829", name: "Повар" },
  { _id: "67rdca3eeb7f6fgeed471900", name: "Программист" },
  { _id: "67rdca3eeb7f6fgeed471901", name: "Водитель" },
  { _id: "67rdca3eeb7f6fgeed471902", name: "Менеджер" },
  { _id: "67rdca3eeb7f6fgeed471903", name: "Полицейский" },
  { _id: "67rdca3eeb7f6fgeed471904", name: "Учитель" },
  { _id: "67rdca3eeb7f6fgeed471905", name: "Дизайнер" },
  { _id: "67rdca3eeb7f6fgeed471906", name: "Маркетолог" },
  { _id: "67rdca3eeb7f6fgeed471907", name: "Электрик" },
  { _id: "67rdca3eeb7f6fgeed471908", name: "Медсестра" }
];

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(professionsObject);
    }, 2000);
  });

export default {
  fetchAll
};
