import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";

export default function AddSelect() {
  const { clickedIndex, setClickedIndex } = useContext(MyContext);

  const { infoObject, setInfoObject } = useContext(MyContext);

  const { close, setClose } = useContext(MyContext);

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
          Сохранить
        </button>
        <ul className="special">
          {infoObject.map((info, index) => (
            <li
              key={index}
              onClick={() =>
                index === 4
                  ? (getSelected(index), setClose(true))
                  : getSelected(index)
              }
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
