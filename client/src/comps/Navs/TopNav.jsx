import { useEffect, useState, useContext } from "react";
import { MyContext } from "../Context/Context";
import axios from "axios";

function TopNav() {
  const [date, setDate] = useState(new Date());
  const { days } = useContext(MyContext);
  const { months } = useContext(MyContext);
  const [name, setName] = useState("");

  const [status, setStatus] = useState("online");

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getName = async () => {
      const checkStatus = async () => {
        try {
          const res = await axios.get("http://localhost:5174/users/getUsers");
          const { name } = res.data[0];
          setName(name);
          setStatus("online");
        } catch (error) {
          setStatus("offline");
        }
      };
      checkStatus();

      const intervalId = setInterval(checkStatus, 1000);

      return () => {
        clearInterval(intervalId);
      };
    };
    getName();
  }, []);

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <div className="TopNav bShadow">
      <ul className="ulTop flex">
        <li
          className="color flex"
          style={{ alignItems: "center", gap: "1vmin" }}
        >
          Добро пожаловать, {name}
          <span
            className={
              status === "online"
                ? "circleStatus trans online"
                : "circleStatus trans offline"
            }
          ></span>
        </li>
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
