import React, { useContext } from "react";
import { MyContext } from "../Context/Context";
import { BsCreditCardFill } from "react-icons/bs";

export default function AddSelect() {
  const { selectOpen, setSelectOpen } = useContext(MyContext);
  return (
    <div
      style={{ flexDirection: "initial" }}
      className={`dialog combine flex jcac absolute trans ${
        selectOpen ? "back" : "close"
      }`}
    >
      <div className="illustration">
        <div
          className="combine item flex jcac color gatherThem trans"
        >
          <BsCreditCardFill
            style={{ filter: "drop-shadow(0 0 1vmin black)" }}
          />
          <div className="stand"></div>
        </div>
      </div>
      <div className="optionsArea">
        <button
          onClick={() => setSelectOpen(false)}
          className="doneButton trans pointer"
        >
          закрывать
        </button>
      </div>
    </div>
  );
}
