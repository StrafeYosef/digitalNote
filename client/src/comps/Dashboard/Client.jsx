import React, { useEffect, useState, useRef, useContext } from "react";
import { MyContext } from "../Context/Context";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import AddDetails from "../Dialogs/AddDetails";
import AddSelect from "../Dialogs/AddSelect";

function Client() {
  let oneWidth = useRef(null);
  const [valueChange, setValueChange] = useState(0);
  const [neededWidth, setNeededWidth] = useState(4);

  const array = ["", ""];

  const { inputs, setInputs } = useContext(MyContext);
  const { handleInputs } = useContext(MyContext);
  const { shouldOpen, setShouldOpen } = useContext(MyContext);
  const { addInput, setAddInputs } = useContext(MyContext);

  const { startAll } = useContext(MyContext);

  const buttons = [<AiOutlineLeft />, <AiOutlineRight />];

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
      <AddDetails />
      <AddSelect />
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
                                  style={{
                                    fontSize: "12vmin",
                                    color: "#9a58bb",
                                  }}
                                >
                                  {value[2]}
                                </p>
                                <p className="desc">{value[3]}</p>
                                <div className="combine flex jcac">
                                  {index === 1 || index === 2 ? (
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
                                        value={value[0]}
                                        onChange={(e) =>
                                          handleInputs(e, inputIndex, key)
                                        }
                                        className="input-field text trans bShadow half"
                                        type="text"
                                        required
                                      />
                                      <label className="input-label trans color">
                                        {value[1]}
                                      </label>
                                    </>
                                  )}
                                </div>
                              </React.Fragment>
                            </div>
                          );
                        })}
                      </div>
                    </React.Fragment>
                  );
                })}
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
