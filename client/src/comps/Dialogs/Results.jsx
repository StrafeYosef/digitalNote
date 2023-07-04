import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import { FaShekelSign } from "react-icons/fa";
import axios from "axios";

function Results() {
  const { resultsOpen, setResultsOpen } = useContext(MyContext);

  const { inputs, setInputs } = useContext(MyContext);
  const { priceInputs, setPriceInputs } = useContext(MyContext);

  const { infoObject, setInfoObject } = useContext(MyContext);
  const { clickedIndex, setClickedIndex } = useContext(MyContext);

  const { checkInputs, setCheckInputs } = useContext(MyContext);

  const { first, setFirst } = useContext(MyContext);
  const { email, setEmail } = useContext(MyContext);
  const { second, setSecond } = useContext(MyContext);
  const [third, setThird] = useState(null);

  const [date, setDate] = useState("");

  const theDate = new Date();

  useEffect(() => {
    setDate(
      `${theDate.getDate()}.${
        theDate.getMonth() + 1
      }.${theDate.getUTCFullYear()}`
    );
    setFirst(inputs[0].value);
    setEmail(inputs[1].value);
    setSecond(infoObject[clickedIndex].text);
    setThird(
      priceInputs.map((input) => {
        return Object.entries(input).map(([key, value], index) => {
          return index === 2 ? `${value}₪` : value;
        });
      })
    );
  }, [inputs, priceInputs, infoObject, checkInputs, clickedIndex]);

  const sendMission = async () => {
    try {
      await axios.post("http://localhost:5174/missions/postMission", {
        first,
        email,
        second,
        check: checkInputs.map((check) => check),
        third,
        date,
      });
      for (let i = 0; i <= 1; i++) {
        inputs[i].value = ""
      }
      setResultsOpen(false);
      setSecond(infoObject[0].text);
      setClickedIndex(0);
      setPriceInputs([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`dialog dialogResult combine flex jcac absolute back trans ${
        resultsOpen ? "back" : "close"
      }`}
    >
      <p className="p gradientText results">результаты</p>
      <div className="combine flex jcac some">
        <div className="combine flex jcac" style={{ height: "initial" }}>
          <div className="receiver combine half flex jcac">
            <p className="title gradientText">{first || "No user provided"}</p>
          </div>
          <div className="email combine flex jcac">
            <p className="title gradientText">{email || "No email provided"}</p>
          </div>
          <div className="paymentMethod combine half flex jcac">
            <p className="title gradientText">
              {infoObject[clickedIndex].icon}
            </p>
            <p className="title gradientText">
              {infoObject[clickedIndex].text}
            </p>
            <div className="check color">
              {checkInputs.map((check) => {
                return <p>{check}</p>;
              })}
            </div>
          </div>
        </div>
        <div className="details combine flex jcac list">
          <div className="scrollable-list">
            {priceInputs.map((input, index) => {
              return (
                <div
                  key={index}
                  id={index}
                  className="flex jcac dadInputs"
                  style={{ justifyContent: "space-between" }}
                >
                  {Object.entries(input).map(([key, value], index) => (
                    <React.Fragment key={key}>
                      <p
                        className="title gradientText color flex jcac"
                        style={{ gap: "1vmin" }}
                      >
                        {index === 2 ? (
                          <>
                            {value}
                            <FaShekelSign />
                          </>
                        ) : (
                          value
                        )}
                      </p>
                    </React.Fragment>
                  ))}
                </div>
              );
            })}
            {priceInputs.length === 0 && (
              <p className="defaultValue title gradientText">
                Вам необходимо заполнить подробную информацию о лечении, чтобы
                показать ее здесь.
              </p>
            )}
          </div>
        </div>
        <div
          className="combine flex jcac finalButtons"
          style={{ height: "7vmin" }}
        >
          <button
            className="doneButton combine pointer trans"
            style={{ height: "100%" }}
            onClick={sendMission}
          >
            Сохранить
          </button>
          <button
            className="doneButton combine pointer trans"
            style={{ height: "100%" }}
            onClick={() => setResultsOpen(false)}
          >
            Закрывать
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
