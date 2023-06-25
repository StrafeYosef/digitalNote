import React, { createContext, useState } from "react";

import { BsFillPersonFill, BsFillFileTextFill } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";

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

  const [addInputs, setAddInputs] = useState([]);

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
      method: ["", "Method", <MdOutlinePayment />, "Payment Method", "", ""],
      // a: ["", "Method", <MdOutlinePayment />, "Payment Method", "", ""],
      // b: ["", "Method", <MdOutlinePayment />, "Payment Method", "", ""],
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
  const [selectOpen, setSelectOpen] = useState(false);

  const startAll = (e, index) => {
    console.log(index);
    e.preventDefault();
    index === 1
      ? setShouldOpen((prev) => !prev)
      : setSelectOpen((prev) => !prev);
  };

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
    selectOpen,
    setSelectOpen,
    handleInputs,
    access,
    addInputs,
    setAddInputs,
    setAccess,
    days,
    months,
    startAll,
  };

  return (
    <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>
  );
};
