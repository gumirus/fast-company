import { professionsObject as professions } from "./professions.api";
import { qualities } from "./qualities";

const users = [
  {
    _id: "67rdca3eeb7f6fgeed471815",
    name: "Джон Дориан",
    email: "Jony7351@tw.com",
    sex: "male",
    profession: professions.doctor,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    qualities: [
      { ...qualities.tedious },
      { ...qualities.uncertain },
      { ...qualities.strange }
    ],
    completedMeetings: 36,
    rate: 2.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471816",
    name: "Кокс",
    email: "white4571@twipet.com",
    sex: "male",
    profession: professions.doctor,
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    qualities: [
      { ...qualities.buller },
      { ...qualities.handsome },
      { ...qualities.alcoholic }
    ],
    completedMeetings: 15,
    rate: 2.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471817",
    name: "Боб Келсо",
    email: "bob007@tw.com",
    sex: "male",
    profession: professions.doctor,
    avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    qualities: [{ ...qualities.buller }],
    completedMeetings: 247,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471818",
    name: "Рэйчел Грин",
    email: "green7311@fam.biz",
    sex: "female",
    profession: professions.waiter,
    avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg",
    qualities: [{ ...qualities.uncertain }],
    completedMeetings: 148,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471819",
    name: "Шелдон Купер",
    email: "mindgames6878@phis.tech",
    sex: "male",
    profession: professions.physics,
    avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    qualities: [{ ...qualities.strange }, { ...qualities.tedious }],
    completedMeetings: 37,
    rate: 4.6,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471820",
    name: "Леонард Хофстедтер",
    email: "mindes000@phis.tech",
    sex: "male",
    profession: professions.physics,
    avatarUrl: "https://randomuser.me/api/portraits/men/14.jpg",
    qualities: [{ ...qualities.strange }, { ...qualities.uncertain }],
    completedMeetings: 147,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471821",
    name: "Говард Воловиц",
    email: "gov1903@phis.tech",
    sex: "male",
    profession: professions.engineer,
    avatarUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    qualities: [{ ...qualities.strange }, { ...qualities.tedious }],
    completedMeetings: 72,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471822",
    name: "Никола Тесла",
    email: "electro@underground.tech",
    sex: "male",
    profession: professions.engineer,
    avatarUrl: "https://randomuser.me/api/portraits/men/77.jpg",
    qualities: [{ ...qualities.handsome }],
    completedMeetings: 72,
    rate: 5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471823",
    name: "Моника Геллер",
    email: "mono@super.com",
    sex: "female",
    profession: professions.cook,
    avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    qualities: [{ ...qualities.strange }, { ...qualities.uncertain }],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471824",
    name: "Рататуй",
    email: "ratatatata@underground.com",
    sex: "male",
    profession: professions.cook,
    avatarUrl: "https://randomuser.me/api/portraits/men/88.jpg",
    qualities: [{ ...qualities.handsome }, { ...qualities.buller }],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed47181f",
    name: "Джоуи Триббиани",
    email: "joe@trib.com",
    sex: "male",
    profession: professions.actor,
    avatarUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    qualities: [{ ...qualities.uncertain }, { ...qualities.strange }],
    completedMeetings: 434,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed47181r",
    name: "Брэд Питт",
    email: "superstar@star.com",
    sex: "male",
    profession: professions.actor,
    avatarUrl: "https://randomuser.me/api/portraits/men/90.jpg",
    qualities: [{ ...qualities.handsome }],
    completedMeetings: 434,
    rate: 5,
    bookmark: false
  }
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("users")));
    }, 2000);
  });
const update = (id, data) =>
  new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const userIndex = users.findIndex((u) => u._id === id);
    // Глубокое копирование qualities, если они есть
    let newData = { ...data };
    if (Array.isArray(newData.qualities)) {
      newData.qualities = newData.qualities.map((q) => ({ ...q }));
    }
    users[userIndex] = { ...users[userIndex], ...newData };
    localStorage.setItem("users", JSON.stringify(users));
    resolve(users[userIndex]);
  });

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("users")).find(
          (user) => user._id === id
        )
      );
    }, 1000);
  });

const create = (data) =>
  new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const newUser = {
      ...data,
      _id: String(Date.now()),
      completedMeetings: 0,
      rate: 0,
      bookmark: false,
      created_at: Date.now()
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    resolve(newUser);
  });

export default {
  fetchAll,
  getById,
  update,
  create
};
