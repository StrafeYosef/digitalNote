import { useEffect, useState, useContext } from "react";
import { MyContext } from "../Context/Context";
import axios from 'axios';

function TopNav() {
  const [date, setDate] = useState(new Date());
  const { days } = useContext(MyContext);
  const { months } = useContext(MyContext);
  const [name, setName] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getName = async() => {

      const res = await axios.get('http://localhost:5174/users/getUsers');

      const {name} = res.data[0]
      setName(name)
    }
    getName()

  }, [])

  return (
    <div className="TopNav bShadow">
      <ul className="ulTop flex">
        <li className="color">Добро пожаловать, {name}</li>
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
