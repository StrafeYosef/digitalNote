import React, { createContext, useState } from "react";

import { BsFillPersonFill, BsFillFileTextFill } from "react-icons/bs";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const date = new Date();

  const [clicked, setClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    clickedYear: date.getUTCFullYear(),
    clickedMonth: date.getUTCMonth(),
    clickedDay: date.getUTCDate(),
  });

  const [chosenIndex, setChosenIndex] = useState(0);

  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const [access, setAccess] = useState(false);

  const [inputs, setInputs] = useState([
    {
      // isAdmin: '', yosef remove the comment once the server is ready, so only admin can send a request
      for: ["", "Для", <BsFillPersonFill />, "Получатель лечения"],
      details: [
        "",
        "",
        <BsFillFileTextFill style={{ padding: "1vmin" }} />,
        "Детали заказа",
        "",
        "",
      ],
      price: ["", ""],
      priceAll: ["", ""],
      wayPay: ["", ""],
      check: ["", ""],
      date: ["", ""],
    },
  ]);

  const handleInputs = (e, index, key) => {
    const { value } = e.target;
    const updatedInputs = [...inputs];
    updatedInputs[index][key][0] = value;
    setInputs(updatedInputs);
    if (value !== "") {
      setAccess(false);
    } else {
      setAccess(true);
    }
  };

  const [shouldOpen, setShouldOpen] = useState(false);

  const contextValues = {
    clicked,
    setClicked,
    selectedDate,
    setSelectedDate,
    chosenIndex,
    setChosenIndex,
    inputs,
    setInputs,
    shouldOpen,
    setShouldOpen,
    handleInputs,
    access,
    setAccess,
    days,
    months,
  };

  return (
    <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>
  );
};
