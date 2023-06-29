import { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";

function Check() {
  const { clickedIndex, setClickedIndex } = useContext(MyContext);
  const [checkInputs, setCheckInputs] = useState([
    {
      checkNum: "",
      Bank: "",
      ZP: "",
      Total: "",
    },
  ]);

  // useEffect(() => {
  //   console.log(checkInputs);
  // }, [checkInputs]);

  const handleInputs = (e, input) => {
    setCheckInputs({
      ...checkInputs,
      [input]: e.target.value,
    });
  };

  const inputs = ["Check num", "Bank", "ZP", "total"];

  return (
    <div
      className={`combine absolute checkContainer flex jcac trans ${
        clickedIndex === 4 ? "back" : "close"
      }`}
    >
      {inputs.map((input) => {
        return (
          <div className="combine flex jcac">
            <input
              value={checkInputs[input]}
              onChange={(e) => handleInputs(e, input)}
              className="input-field text trans bShadow half"
              type="text"
              placeholder={input}
              style={{ width: "75%" }}
            />
          </div>
        );
      })}
      <button
        className="doneButton trans pointer combine"
        onClick={() => setClickedIndex(0)}
        style={{ height: "50%" }}
      >
        SAVE
      </button>
    </div>
  );
}

export default Check;
