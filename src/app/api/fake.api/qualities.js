const qualities = {
  tedious: {
    _id: "67rdca3eeb7f6fgeed471198",
    name: "Нудила",
    color: "primary",
    positive: false
  },
  strange: {
    _id: "67rdca3eeb7f6fgeed471100",
    name: "Странный",
    color: "secondary",
    positive: false
  },
  buller: {
    _id: "67rdca3eeb7f6fgeed4711012",
    name: "Троль",
    color: "success",
    positive: false
  },
  alcoholic: {
    _id: "67rdca3eeb7f6fgeed471101",
    name: "Алкоголик",
    color: "danger",
    positive: false
  },
  handsome: {
    _id: "67rdca3eeb7f6fgeed471102",
    name: "Красавчик",
    color: "info",
    positive: true
  },
  uncertain: {
    _id: "67rdca3eeb7f6fgeed471103",
    name: "Неуверенный",
    color: "dark",
    positive: false
  },
  persistent: {
    _id: "67rdca3eeb7f6fgeed471104",
    name: "Усидчивый",
    color: "warning",
    positive: true
  },
  attentive: {
    _id: "67rdca3eeb7f6fgeed471105",
    name: "Внимательный",
    color: "info",
    positive: true
  },
  communicative: {
    _id: "67rdca3eeb7f6fgeed471106",
    name: "Коммуникабельный",
    color: "primary",
    positive: true
  },
  friendly: {
    _id: "67rdca3eeb7f6fgeed471107",
    name: "Доброжелательный",
    color: "success",
    positive: true
  }
};
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(qualities);
    }, 2000);
  });

export { qualities };

export default {
  fetchAll
};
