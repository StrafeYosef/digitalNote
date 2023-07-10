import { useContext, useState, useEffect } from "react";
import TopNav from "../Navs/TopNav";
import { MyContext } from "../Context/Context";
import Calendar from "./Calendar";
import Client from "./Client";
import Private from "./Private";
import Home from "./Home";
import axios from "axios";
import { BiShekel } from "react-icons/bi";
import { AiOutlineQuestion } from "react-icons/ai";
import { TbNumbers, TbZoomQuestion } from "react-icons/tb";

function Content() {
  const { clicked } = useContext(MyContext);
  const { selectedDate } = useContext(MyContext);
  const { chosenIndex } = useContext(MyContext);

  const [wasClicked, setWasClicked] = useState(0);

  const [db, setDB] = useState([]);

  useEffect(() => {
    const getDB = async () => {
      try {
        await axios
          .get("https://worktickets.onrender.com/missions/getMissions")
          .then((res) => {
            setDB((prev) => {
              return [...prev], res.data;
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getDB();
  }, [db]);

  const [privateIndex, setPrivateIndex] = useState(0);

  const [tabIndex, setTabIndex] = useState(0);

  const titles = ["дневной", "месячный", "Годовой"];
  const types = [<BiShekel />, <AiOutlineQuestion />, <TbNumbers />];

  const giveIndex = (index) => {
    setPrivateIndex(index);
  };

  const showMore = (index) => {
    setTabIndex(index);
    setWasClicked((prev) => prev + 1);
    wasClicked === 2 && setWasClicked(0);
  };

  const { clickedDay, clickedMonth, clickedYear } = selectedDate;

  const matchedDataFound = db.some((oneData) => {
    const [dayDB, monthDB, yearDB] = oneData.date.split(".");
    return (
      (privateIndex === 0 && clickedDay === Number(dayDB)) ||
      (privateIndex === 1 && clickedMonth === Number(monthDB - 1)) ||
      (privateIndex === 2 && clickedYear === Number(yearDB))
    );
  });

  return (
    <>
      <div className={clicked ? "full" : chosenIndex === 2 ? "Content agada" : "Content"}>
        <TopNav />
        {chosenIndex === 1 ? (
          <div className="insideArea flex jcac">
            <div className="moreInside bg bShadow">
              <div className="bg special">
                <div className="choose flex color">
                  {titles.map((title, index) => {
                    return (
                      <h5
                        key={index}
                        onClick={() => giveIndex(index)}
                        className={
                          index === privateIndex
                            ? "trans pointer bShadow active"
                            : "trans pointer bShadow"
                        }
                      >
                        {title}
                      </h5>
                    );
                  })}
                </div>
                <div
                  className="combine flex jcac"
                  style={{ justifyContent: "space-around"}}
                >
                  <p className="title datesToday gradientText">
                    Данные{" "}
                    {privateIndex === 0
                      ? `${clickedDay}.${clickedMonth + 1}.${clickedYear}`
                      : privateIndex === 1
                      ? `${clickedMonth + 1}.${clickedYear}`
                      : clickedYear}
                  </p>
                  {matchedDataFound && (
                    <p
                      className="color flex jcac"
                      style={{ fontSize: "3.5vmin" }}
                    >
                      {types[wasClicked]}
                    </p>
                  )}
                </div>
              </div>
              <div className="allData half flex">
                {db.length > 0
                  ? db.map((oneData, index) => {
                      const [dayDB, monthDB, yearDB] = oneData.date.split(".");
                      return (privateIndex === 0 &&
                        clickedDay === Number(dayDB)) ||
                        (privateIndex === 1 &&
                          clickedMonth === Number(monthDB - 1)) ||
                        (privateIndex === 2 &&
                          clickedYear === Number(yearDB)) ? (
                        <div className="dataArea combine flex jcac">
                          <div
                            className="dataArea combine flex jcac"
                            onClick={() => {
                              showMore(index);
                            }}
                          >
                            <h1 className="flex jcac combine">
                              {oneData.first}
                            </h1>
                            <p
                              className={`combine flex trans jcac absolute ${
                                wasClicked === 0 ? "appear" : "dissapear"
                              }`}
                            >
                              {oneData.third[0][2]}
                            </p>
                            <div className="combine flex jcac oneData">
                              {oneData.third.map((data, index) => (
                                <>
                                  <h2
                                    className={`flex jcac combine trans ${
                                      wasClicked === 1
                                        ? "appear "
                                        : "dissapear absolute"
                                    }`}
                                  >
                                    {data[1]}
                                  </h2>
                                  <h2
                                    className={`flex jcac combine trans ${
                                      wasClicked === 2
                                        ? "appear "
                                        : "dissapear absolute"
                                    }`}
                                  >
                                    {data[0]}
                                  </h2>
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })
                  : null}
                {!matchedDataFound && (
                  <div className="combine flex jcac noFound color">
                    <TbZoomQuestion />
                    <h2>На эту дату ничего не было назначено.</h2>
                  </div>
                )}
              </div>
            </div>
            <div className="op flex jcac">
              <p className="title gradientText">Нажмите любую дату, чтобы отобразить ее данные.</p>
              <Calendar />
            </div>
          </div>
        ) : chosenIndex === 2 ? (
          <Client />
        ) : chosenIndex === 0 ? (
          <Home />
        ) : (
          <Private />
        )}
      </div>
    </>
  );
}

export default Content;
