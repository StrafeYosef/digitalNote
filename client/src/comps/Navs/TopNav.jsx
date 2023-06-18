import { useEffect, useState, useContext } from "react";
import { MyContext } from "../Context/Context";

function TopNav() {
  const [date, setDate] = useState(new Date());
  const { days } = useContext(MyContext);
  const { months } = useContext(MyContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="TopNav bShadow">
      <ul className="ulTop flex">
        <li className="color">Добро пожаловать, Name</li>
        <div className="center flex">
          <p>{days[date.getDay()]},</p>
          <p>{months[date.getMonth()]}</p>
          <p>{date.getFullYear()}</p>
        </div>
        <div className="color flex">
          <p>
            {date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}
          </p>
          :
          <p>
            {" "}
            {date.getMinutes() < 10
              ? `0${date.getMinutes()}`
              : date.getMinutes()}
          </p>
          :
          <p>
            {date.getSeconds() < 10
              ? `0${date.getSeconds()}`
              : date.getSeconds()}
          </p>
        </div>
      </ul>
    </div>
  );
}

export default TopNav;
