import React, { useEffect, useState, useRef } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";

function Client() {
  const [access, setAccess] = useState(false);

  const [valueChange, setValueChange] = useState(0);

  let oneWidth = useRef(null);

  const [grabIndex, setGrabIndex] = useState(0);

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

  const buttons = [
    // <AiOutlineDoubleLeft />,
    <AiOutlineLeft />,
    <AiOutlineRight />,
    // <AiOutlineDoubleRight />,
  ];

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

  function calculateValues(elementRef) {
    const theWidth = elementRef.current?.offsetWidth;
    const maxLength = elementRef.current?.children.length;
    const maxValue = maxLength * theWidth;
    return { theWidth, maxLength, maxValue };
  }

  const values = calculateValues(oneWidth);

  const handleButtons = (e, index) => {
    setGrabIndex(index);
    e.preventDefault();
    // setValueChange(oneWidth.current.offsetWidth);
    index === 1
      ? setValueChange((prev) => prev - values.theWidth)
      : setValueChange((prev) => prev + values.theWidth);
    console.log(values.valueChange - values.theWidth);
    console.log(-values.maxValue);
    if (values.valueChange - values.theWidth === -values.maxValue) {
      setAccess(true);
    }

    setGrabIndex(4);
  };

  return (
    <div className="insideArea flex jcac s">
      <p className="p textGradient">Добавить новый клиентский билет</p>
      <div className="clientTicket bg bShadow">
        <div className="mainInformation fullWidth">
          <p>Ticket number 0001 /1</p>
          <div className="combine">
            <form
              className="fullWidth flex clientForm trans"
              action="POST"
              style={{
                transform: `translateX(${
                  grabIndex === 1
                    ? values.valueChange + oneWidth.current?.offsetWidth
                    : values.valueChange - oneWidth.current?.offsetWidth
                }px)`,
              }}
            >
              {inputs.map((input, inputIndex) => {
                return (
                  <React.Fragment key={inputIndex}>
                    <div className="carousel flex" ref={oneWidth}>
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
                                  style={{ height: "25%" }}
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
                      values.valueChange - values.theWidth ===
                        -values.maxValue && index === 1
                        ? "doneButton pointer smaller notAllowed trans"
                        : values.theWidth < 1 && index === 0
                        ? "doneButton pointer smaller notAllowed trans"
                        : "doneButton pointer smaller trans"
                      // !access
                      //   ? "doneButton pointer bigger trans"
                      //   : "doneButton pointer smaller notAllowed trans"
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
