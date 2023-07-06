import React, { createContext, useState, useRef, createRef } from "react";

import {
  BsFillPersonFill,
  BsFillFileTextFill,
  BsCreditCardFill,
  BsCashStack,
} from "react-icons/bs";
import {
  MdOutlinePayment,
  MdFactCheck,
  MdAlternateEmail,
} from "react-icons/md";

import { GiPaperPlane } from "react-icons/gi";
import { AiOutlineQuestion } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";

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

  const [close, setClose] = useState(true);

  const [checkInputs, setCheckInputs] = useState(["", "", "", ""]);

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

  let oneWidth = createRef(null);
  // const [checkDetails, setCheckDetails] = useState(null);

  // setCheckDetails(checkInputs);

  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [email, setEmail] = useState("");

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
      label: "почта",
      icon: <MdAlternateEmail />,
      desc: "Электронная почта",
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
      desc: "Способ оплаты",
    },
    {
      value: "",
      label: "Results",
      icon: <MdFactCheck />,
      desc: "Краткое изложение информации",
    },
  ]);

  // const sendMission = async () => {
  //   try {
  //     await axios.post("http://localhost:5174/missions/postMission", {
  //       first,
  //       second,
  //       check: checkDetails,
  //       third,
  //       date,
  //     });
  //     inputs[0].value = "";
  //     setResultsOpen(false);
  //     setSecond(infoObject[0].text);
  //     setClickedIndex(0);
  //     setPriceInputs([]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [infoObject, setInfoObject] = useState([
    {
      text: "Cпособ Oплаты",
      icon: <AiOutlineQuestion />,
    },
    {
      text: "бит",
      icon: <GiPaperPlane />,
    },
    {
      text: "Наличные",
      icon: <BsCashStack />,
    },
    {
      text: "Kредитная Kарта",
      icon: <BsCreditCardFill />,
    },
    {
      text: "Чек ",
      icon: <FaMoneyCheck />,
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
    e.preventDefault();
    index === 2
      ? setShouldOpen((prev) => !prev)
      : index === 3
      ? setSelectOpen((prev) => !prev)
      : setResultsOpen((prev) => !prev);
  };

  const contextValues = {
    // sendMission,
    email,
    setEmail,
    clicked,
    setClicked,
    selectedDate,
    setSelectedDate,
    chosenIndex,
    setChosenIndex,
    inputs,
    close,
    setClose,
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
    first,
    second,
    setSecond,
    setFirst,
    setClickedIndex,
    resultsOpen,
    setResultsOpen,
    priceInputs,
    setPriceInputs,
    infoObject,
    checkInputs,
    setCheckInputs,
    setInfoObject,
    days,
    months,
    startAll,
  };

  return (
    <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>
  );
};
