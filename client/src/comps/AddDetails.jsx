import React, { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "./Context/Context";
import { v4 as uuidv4 } from "uuid";
import { ImFileEmpty } from "react-icons/im";
import { FaShekelSign } from "react-icons/fa";


function AddDetails() {
  const { shouldOpen, setShouldOpen } = useContext(MyContext);
  const scrollRef = useRef(null);
  const three = ["Количество", "Тип", "Цена"];
  const [theIndex, setTheIndex] = useState(1);
  const [inputs, setInputs] = useState([]);
  const [total, setTotal] = useState(0);

  const removeNeeded = (index) => {
    setInputs((prevArray) => prevArray.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(total);
  }, [total]);

  const addObjects = () => {
    const newObject = {};
    setTheIndex((prev) => prev + 3);
    for (let i = theIndex; i < theIndex + 3; i++) {
      newObject[i] = "";
    }
    setInputs((prevInputs) => [...prevInputs, newObject]);
  };

  useEffect(() => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight * 2,
      behavior: "smooth",
    });
  }, [theIndex]);

  useEffect(() => {
    const calculateTotal = () => {
      let sum = 0;
      inputs.forEach((input) => {
        Object.entries(input).map(([key, value]) => {
          if (key % 3 === 0) {
            const parsedValue = Number(value);
            if (!isNaN(parsedValue)) {
              sum += parsedValue;
            }
          }
        });
      });
      setTotal(sum);
    };
    calculateTotal();
  }, [inputs]);

  return (
    <div
      className={
        shouldOpen
          ? "dialog combine flex jcac absolute back trans"
          : "dialog combine flex jcac absolute close trans"
      }
    >
      <div className="buttonContainer flex jcac">
        <button className="doneButton trans pointer" onClick={addObjects}>
          Добавить новый
        </button>
        <p className="color flex jcac" style={{fontSize: '3.5vmin'}}>{total} <FaShekelSign/></p>
        <button
          onClick={() => setShouldOpen(false)}
          className="doneButton trans pointer"
        >
          закрывать
        </button>
      </div>
      <div className="combine flex jcac titles color">
        {three.map((th, i) => (
          <p key={th}>{th}</p>
        ))}
      </div>
      <div className="combine contai flex jcac">
        <div className="combine flex jcac list">
          <div
            className={
              Object.keys(inputs).length === 0
                ? "scrollable-list trans noItems flex jcac"
                : "scrollable-list trans"
            }
            ref={scrollRef}
          >
            {Object.keys(inputs).length === 0 ? (
              <div
                className="combine flex jcac"
                style={{ flexDirection: "column", gap: "5vmin" }}
              >
                <p className="color" style={{ fontSize: "5vmin" }}>
                  <ImFileEmpty />{" "}
                </p>
                <p className="color">
                  Текущий список пуст. <br />
                  Нажмите добавить новый, чтобы добавить процедуры.
                </p>
              </div>
            ) : (
              inputs.map((input, index) => (
                <div key={index} id={index} className="flex jcac dadInputs">
                  {Object.entries(input).map(([key, value]) => (
                    <>
                      <input
                        className="input-field text trans bShadow another"
                        key={key}
                        value={value}
                        onChange={({ target }) => {
                          const newInputs = [...inputs];
                          newInputs[index] = {
                            ...input,
                            [key]: target.value,
                          };
                          setInputs(newInputs);
                        }}
                      />
                    </>
                  ))}
                  <div className="combine flex jcac" style={{ height: "5vh" }}>
                    <button
                      onClick={() => removeNeeded(index)}
                      className="doneButton trans pointer"
                      style={{ height: "100%" }}
                    >
                      удалить
                    </button>
                  </div>
                </div>
              ))
            )}
            {/* {array.map((item) => (
              <React.Fragment>{item.content}</React.Fragment>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDetails;
