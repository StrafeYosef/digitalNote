import { useContext, useState } from "react";
import TopNav from "../Navs/TopNav";
import { MyContext } from "../Context/Context";
import Calendar from "./Calendar";
import Client from "./Client";
import Private from "./Private";
import Data from "./Data";

function Content() {
  const { clicked } = useContext(MyContext);
  const { selectedDate } = useContext(MyContext);
  const { chosenIndex } = useContext(MyContext);

  const [privateIndex, setPrivateIndex] = useState(0);

  const titles = ["дневной", "месячный", "Годовой"];

  const giveIndex = (index) => {
    setPrivateIndex(index);
    console.log
  };

  const { clickedDay, clickedMonth, clickedYear } = selectedDate;
  return (
    <>
      <div className={clicked ? "Content" : "Content full"}>
        <TopNav />
        {chosenIndex === 0 ? (
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
              <Data />
            </div>
            <Calendar />
          </div>
        ) : chosenIndex === 1 ? (
          <Client />
        ) : (
          <Private />
        )}
      </div>
    </>
  );
}

export default Content;
