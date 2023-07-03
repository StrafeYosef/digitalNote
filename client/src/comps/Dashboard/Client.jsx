import React, { useEffect, useState, useRef, useContext } from "react";
import { MyContext } from "../Context/Context";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import AddDetails from "../Dialogs/AddDetails";
import AddSelect from "../Dialogs/AddSelect";
import Check from "../Dialogs/Check";
import Results from "../Dialogs/Results";

function Client() {
  let oneWidth = useRef(null);
  const [valueChange, setValueChange] = useState(0);
  const [neededWidth, setNeededWidth] = useState(10);

  const array = ["", ""];

  const { resultsOpen } = useContext(MyContext);

  const { inputs } = useContext(MyContext);
  const { handleInputs } = useContext(MyContext);

  useEffect(() => {
    oneWidth.current.scrollTo({
      left: -1 * (window.innerWidth * window.innerHeight),
      behavior: "smooth",
    });
    setValueChange(0)
    setNeededWidth(10)
  }, [resultsOpen])
 
  const { startAll } = useContext(MyContext);

  const buttons = [<AiOutlineLeft />, <AiOutlineRight />];

  const handleButtons = (e, index) => {
    const theWidth = oneWidth.current.offsetWidth;
    e.preventDefault();
    if (index === 1) {
      setValueChange((prev) => prev + theWidth);
      setNeededWidth((prev) => prev + 10);
    } else {
      setValueChange((prev) => prev - theWidth);
      setNeededWidth((prev) => prev - 10);
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
      <AddDetails />
      <AddSelect />
      <Check />
      <Results />
      <p className="p textGradient">Добавить новый клиентский билет</p>
      <div className="clientTicket bg bShadow">
        <div className="mainInformation flex fullWidth">
          <p className="desc absolute ticketNum">Номер билета 0001 /1</p>
          <div className="combine flex container">
            <div className="rail flex">
              {array.map((arr, index) => {
                return (
                  <>
                    <div
                      className={`line combine flex jcac ${
                        index === 0 ? "" : "bottom"
                      }`}
                    >
                      <p
                        className={`combine coolSquare trans ${
                          index === 0 ? "firstColor" : "secondColor"
                        }`}
                      ></p>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="combine">
              <form
                ref={oneWidth}
                className="fullWidth flex clientForm trans"
                action="POST"
              >
                <div className="combine">
                  {inputs.map((input, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div className="carousel flex">
                          <div
                            className="input-container flex fullWidth oneArea"
                            style={{ height: "100%", minWidth: "100%" }}
                            key={index}
                          >
                            <React.Fragment>
                              <p
                                style={{
                                  fontSize: "12vmin",
                                  color: "#9a58bb",
                                }}
                              >
                                {inputs[index].icon}
                              </p>
                              <p className="desc">{inputs[index].desc}</p>
                              <div className="combine flex jcac">
                                {index === 2 || index === 3 || index === 4 ? (
                                  <>
                                    <button
                                      onClick={(e) => startAll(e, index)}
                                      className="doneButton trans pointer color addMoreButton"
                                      style={{
                                        height: "50%",
                                        fontSize: "4vmin",
                                      }}
                                    >
                                      {index === 1 ? (
                                        <MdOutlineAddCircle />
                                      ) : (
                                        <IoIosArrowDropdownCircle />
                                      )}
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <input
                                      value={inputs[index].value}
                                      onChange={(e) => handleInputs(e, index)}
                                      className="input-field text trans bShadow half"
                                      type="text"
                                      required
                                    />
                                    <label className="input-label trans color">
                                      {inputs[index].label}
                                    </label>
                                  </>
                                )}
                              </div>
                            </React.Fragment>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </form>

              <div className="buttons flex jcac hm">
                {buttons.map((b, index) => {
                  return (
                    <button
                      className={
                        (valueChange === 0 && index === 0) ||
                        (valueChange ===
                          (oneWidth.current?.children[0]?.children?.length -
                            1) *
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
              <div className="combine flex jcac" style={{ height: "10%" }}>
                <div className="circles flex jcac">
                  {Object.keys(inputs[0]).map((key, index) => (
                    <p className="mCircle" key={key}>
                      {<RiCheckboxBlankCircleFill />}
                    </p>
                  ))}
                  <p
                    className="squareMove trans green"
                    style={{ width: `${neededWidth}vmin` }}
                  ></p>
                </div>
              </div>
            </div>
            <div className="rail flex">
              {array.map((arr, index) => {
                return (
                  <>
                    <div
                      className={`line combine flex jcac ${
                        index === 0 ? "" : "bottom"
                      }`}
                    >
                      <p
                        className={`combine coolSquare trans ${
                          index === 0 ? "firstColor" : "secondColor"
                        }`}
                      ></p>
                    </div>
                  </>
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
