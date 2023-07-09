import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import { FaShekelSign } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [checkDetails, setCheckDetails] = useState(null);

  const [date, setDate] = useState("");

  let { theIndex, setTheIndex } = useContext(MyContext);
  let { mainIndex, setMainIndex } = useContext(MyContext);

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
    setCheckDetails(checkInputs);
  }, [inputs, priceInputs, infoObject, checkInputs, clickedIndex]);

  const {total} = useContext(MyContext);

  const sendMission = async () => {
    try {
      setTheIndex((prev) => (prev === 9 ? 1 : prev + 1));
      setMainIndex((prev) => (theIndex === 9 ? prev + 1 : prev));
      await axios.post("http://localhost:5174/missions/postMission", {
        first,
        email,
        second,
        checkDetails,
        third,
        date,
        total: total + '₪',
        theIndex,
        mainIndex: mainIndex.toString().padStart(4, "0"),
      });

      toast.success('Билет успешно добавлен', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      for (let i = 0; i <= 1; i++) {
        inputs[i].value = "";
      }
      localStorage.setItem("index", theIndex === 9 ? 1 : theIndex + 1);
      localStorage.setItem(
        "mainIndex",
        theIndex === 9
          ? (mainIndex + 1).toString().padStart(4, "0")
          : mainIndex.toString().padStart(4, "0")
      );
      

      setResultsOpen(false);
      setSecond(infoObject[0].text);
      setClickedIndex(0);
      setPriceInputs([]);
      setCheckInputs(["", "", "", ""]);
    } catch (error) {
      toast.error('Не удалось добавить билет', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
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
            <p className="title gradientText">{first || "Пользователь не указан."}</p>
          </div>
          <div className="email combine flex jcac">
            <p className="title gradientText">{email || "Адрес электронной почты не предоставлен."}</p>
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
