import React, { createContext, useState } from "react";

import { BsFillPersonFill, BsFillFileTextFill } from "react-icons/bs";
import { MdOutlinePayment, MdFactCheck } from "react-icons/md";

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

  const [clickedIndex, setClickedIndex] = useState(0);

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
      value: "",
      label: "Для",
      icon: <BsFillPersonFill />,
      desc: "Получатель лечения",
    },
    {
      value: "",
      label: "Expenses",
      icon: <BsFillFileTextFill style={{ padding: "1vmin" }} />,
      desc: "Детали заказа",
    },
    {
      value: "",
      label: "Method",
      icon: <MdOutlinePayment />,
      desc: "Payment Method",
    },
    {
      value: "",
      label: "Results",
      icon: <MdFactCheck />,
      desc: "Summary of your inputs",
    },
  ]);

  const [priceInputs, setPriceInputs] = useState([]);

  const handleInputs = (e, index) => {
    const { value } = e.target;
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index] = { ...updatedInputs[index], value };
      return updatedInputs;
    });
    if (value !== "") {
      setAccess(false);
    } else {
      setAccess(true);
    }
  };

  const [shouldOpen, setShouldOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);

  const startAll = (e, index) => {
    console.log(index);
    e.preventDefault();
    index === 1
      ? setShouldOpen((prev) => !prev)
      : index === 2
      ? setSelectOpen((prev) => !prev)
      : setResultsOpen((prev) => !prev);
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
    clickedIndex,
    setClickedIndex,
    resultsOpen,
    setResultsOpen,
    priceInputs,
    setPriceInputs,
    days,
    months,
    startAll,
  };

  return (
    <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>
  );
};
