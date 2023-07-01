import { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";

function Check() {
  const { clickedIndex, setClickedIndex } = useContext(MyContext);

  const { checkInputs, setCheckInputs } = useContext(MyContext);

  const { close, setClose } = useContext(MyContext);

  const handleInputChange = (e, inputIndex) => {
    const updatedInputs = [...checkInputs];
    updatedInputs[inputIndex] = e.target.value;
    setCheckInputs(updatedInputs);
  };

  const inputs = ["Check num", "Bank", "ZP", "total"];

  return (
    <div
      className={`combine absolute checkContainer flex jcac trans ${
        close && clickedIndex === 4 ? "back" : "close"
      }`}
    >
      {checkInputs.map((input, index) => (
        <input
          key={index}
          value={input}
          onChange={(e) => handleInputChange(e, index)}
          className="input-field text trans bShadow half"
          type="text"
          placeholder={inputs[index]}
          style={{ width: "75%" }}
        />
      ))}
      <button
        className="doneButton trans pointer combine"
        onClick={() => setClose(false)}
        style={{ height: "50%" }}
      >
        SAVE
      </button>
    </div>
  );
}

export default Check;
