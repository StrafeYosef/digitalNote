import { useContext, useState, useEffect } from "react";
import TopNav from "../Navs/TopNav";
import { MyContext } from "../Context/Context";
import Calendar from "./Calendar";
import Client from "./Client";
import Private from "./Private";
import Home from "./Home";
import axios from "axios";
// import addDetails from "../Dialogs/AddDetails";

function Content() {
  const { clicked } = useContext(MyContext);
  const { selectedDate } = useContext(MyContext);
  const { chosenIndex } = useContext(MyContext);

  const [db, setDB] = useState([]);

  useEffect(() => {
    const getDB = async () => {
      try {
        await axios
          .get("http://localhost:5174/missions/getMissions")
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

  const titles = ["дневной", "месячный", "Годовой"];

  const giveIndex = (index) => {
    setPrivateIndex(index);
  };

  const { clickedDay, clickedMonth, clickedYear } = selectedDate;
  return (
    <>
      <div className={clicked ? "Content" : "Content full"}>
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
                <p className="title datesToday gradientText">
                  Данные{" "}
                  {privateIndex === 0
                    ? `${clickedDay}.${clickedMonth + 1}.${clickedYear}`
                    : privateIndex === 1
                    ? `${clickedMonth + 1}.${clickedYear}`
                    : clickedYear}
                </p>
              </div>
              <div className="half flex">
                {db.length > 0 ? (
                  db.map((oneData) => {
                    return (
                      <div className="dataArea combine flex jcac">
                        <h2 className="flex jcac combine">{oneData.first}</h2>
                        <p className="flex jcac combine">{oneData.third}</p>
                      </div>
                    );
                  })
                ) : (
                  <h2
                    className="combine flex jcac color"
                    style={{ margin: "auto" }}
                  >
                    Current date is empty.
                  </h2>
                )}
              </div>
            </div>
            <Calendar />
          </div>
        ) : chosenIndex === 2 ? (
          <Client />
        ) : chosenIndex === 3 ? (
          <Private />
        ) : (
          <Home />
        )}
      </div>
    </>
  );
}

export default Content;
