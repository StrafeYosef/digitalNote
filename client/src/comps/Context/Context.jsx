import React, { createContext, useState } from "react";

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

  const contextValues = {
    clicked,
    setClicked,
    selectedDate,
    setSelectedDate,
    chosenIndex,
    setChosenIndex,
    days,
    months,
  };

  return (
    <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>
  );
};
