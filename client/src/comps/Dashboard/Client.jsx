import React, { useEffect, useState, useRef } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

function Client() {
  const [access, setAccess] = useState(false);

  let oneWidth = useRef(null);
  const [valueChange, setValueChange] = useState(0);

  const [neededWidth, setNeededWidth] = useState(4);

  const [inputs, setInputs] = useState([
    {
      // isAdmin: '', yosef remove the comment once the server is ready, so only admin can send a request
      for: ["", "Для", <BsFillPersonFill />],
      details: ["", ""],
      price: ["", ""],
      priceAll: ["", ""],
      wayPay: ["", ""],
      check: ["", ""],
      date: ["", ""],
    },
  ]);

  const buttons = [<AiOutlineLeft />, <AiOutlineRight />];

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

  const handleButtons = (e, index) => {
    const theWidth = oneWidth.current.offsetWidth;
    e.preventDefault();
    if (index === 1) {
      setValueChange((prev) => prev + theWidth);
      setNeededWidth((prev) => prev + 6);
    } else {
      setValueChange((prev) => prev - theWidth);
      setNeededWidth((prev) => prev - 6);
    }
    oneWidth.current.scrollTo({
      left:
        index === 1
          ? valueChange + oneWidth.current?.offsetWidth
          : valueChange - oneWidth.current?.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="insideArea flex jcac s">
      <p className="p textGradient">Добавить новый клиентский билет</p>
      <div className="clientTicket bg bShadow">
        <div className="mainInformation fullWidth">
          <p>Ticket number 0001 /1</p>
          <div className="combine">
            <form
              ref={oneWidth}
              className="fullWidth flex clientForm trans"
              action="POST"
            >
              {inputs.map((input, inputIndex) => {
                return (
                  <React.Fragment key={inputIndex}>
                    <div className="carousel flex">
                      {Object.entries(input).map(([key, value], index) => {
                        return (
                          <div
                            className="input-container flex fullWidth oneArea"
                            style={{ height: "100%", minWidth: "100%" }}
                          >
                            <React.Fragment key={index}>
                              <p
                                style={{ fontSize: "12vmin", color: "#9a58bb" }}
                              >
                                {value[2]}
                              </p>
                              <div className="combine flex jcac">
                                <input
                                  value={value[0]}
                                  onChange={(e) =>
                                    handleInputs(e, inputIndex, key)
                                  }
                                  className="input-field text trans bShadow"
                                  type="text"
                                  // required
                                />
                                <label className="input-label trans inputSpecial color">
                                  {value[1]}
                                </label>
                              </div>
                            </React.Fragment>
                          </div>
                        );
                      })}
                    </div>
                  </React.Fragment>
                );
              })}

              {/* <button className="doneButton text pointer trans smaller">
              SEND
            </button> */}
            </form>
            <div className="buttons flex jcac hm">
              {buttons.map((b, index) => {
                return (
                  <button
                    className={
                      (valueChange === 0 && index === 0) ||
                      (valueChange ===
                        (oneWidth.current?.children[0]?.children?.length - 1) *
                          oneWidth.current?.offsetWidth &&
                        index === 1)
                        ? "doneButton pointer smaller notAllowed trans"
                        : "doneButton pointer bigger trans"
                    }
                    onClick={(e) => {
                      handleButtons(e, index);
                    }}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
            <div className="circles flex jcac">
              {Object.keys(inputs[0]).map((key, index) => (
                <p className="mCircle" key={key}>{<RiCheckboxBlankCircleFill />}</p>
              ))}
              <p
                className="squareMove trans green"
                style={{ width: `${neededWidth}vmin` }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;

{
  /* <p>טניה אבן-חן ינושוק</p>
          <p>קוסמטיקה רפואית - הסרת שיער בלייזר</p>
          <div className="combine">
          <p>הרימון 34 באר-גנים 7928900</p>
          <p>טל' 054-745-9178</p>
          <div className="combine">
            <p>אי מייל: tec1@012.net.il</p>
            <p>עוסק פטור מס' 317956951</p>
          </div>
          </div> */
}
