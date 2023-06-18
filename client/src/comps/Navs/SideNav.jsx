import { GoNote } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import React, { useContext } from "react";
import { MyContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

function SideNavContainer() {
  const navigate = useNavigate();

  const { clicked, setClicked } = useContext(MyContext);

  const { chosenIndex, setChosenIndex } = useContext(MyContext);

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  const titlesIcons = [
    {
      first: ["Общие", AiFillHome],
      second: ["Клиент", GoNote],
      third: ["Личный", BsFillPersonFill],
    },
  ];

  const giveIndex = (index) => {
    setChosenIndex(index);
  };

  return (
    <div
      className={
        clicked
          ? "SideNavContainer miniSideNav flex trans"
          : "SideNavContainer flex trans"
      }
    >
      <div className="sideNav trans">
        <ul className="flex jcac trans">
          {titlesIcons.map((title) => {
            return (
              <>
                {Object.entries(title).map(([key, value], index) => (
                  <li
                    key={key}
                    className={
                      chosenIndex === index
                        ? "flex jcac pointer trans text active"
                        : "flex jcac pointer trans text"
                    }
                    onClick={() => {
                      giveIndex(index);
                      navigate(index === 0 ? '/dashboard/main' : index === 1 ? '/dashboard/client' : '/dashboard/private')
                    }}
                  >
                    {clicked ? (
                      <>{value[1] && value[1]()} </>
                    ) : (
                      <>
                        {value[1] && value[1]()} <span>{value[0]}</span>{" "}
                      </>
                    )}
                  </li>
                ))}
              </>
            );
          })}
        </ul>
      </div>
      <div onClick={handleClick} className="closer flex jcac pointer trans">
        <AiOutlineRight />
      </div>
    </div>
  );
}

export default SideNavContainer;
