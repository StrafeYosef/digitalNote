import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import { BsCreditCardFill, BsCashStack } from "react-icons/bs";
import { GiPaperPlane } from "react-icons/gi";
import { AiOutlineQuestion } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";

export default function AddSelect() {
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

  const {clickedIndex, setClickedIndex} = useContext(MyContext);

  const getSelected = (index) => {
    setClickedIndex(index);
  };

  const { selectOpen, setSelectOpen } = useContext(MyContext);
  return (
    <div
      style={{ flexDirection: "initial" }}
      className={`dialog combine flex jcac absolute trans ${
        selectOpen ? "back" : "close"
      }`}
    >
      <div className="illustration flex jcac" style={{ height: "90%" }}>
        <p className="title gradientText titleInfo">
          {infoObject[clickedIndex].text}
        </p>
        <div className="item flex jcac color gatherThem trans">
          {infoObject[clickedIndex].icon}
        </div>
        <div className="stand"></div>
      </div>
      <div className="optionsArea flex">
        <button
          onClick={() => setSelectOpen(false)}
          className="doneButton trans pointer"
        >
          закрывать
        </button>
        <ul className="special">
          {infoObject.map((info, index) => (
            <li
              key={index}
              onClick={() => getSelected(index)}
              className={
                index === 0
                  ? "flex jcac color title gradientText"
                  : clickedIndex === index
                  ? "flex jcac color pointer trans active"
                  : "flex jcac color pointer trans"
              }
            >
              {info.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
