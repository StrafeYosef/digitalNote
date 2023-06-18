import { useEffect, useState, useContext } from "react";
import { MyContext } from "../Context/Context";

function Calendar() {
  const date = new Date();
  // const dispatch = useDispatch();
  const [maxDays, setMaxDays] = useState(0);
  const { selectedDate, setSelectedDate } = useContext(MyContext);

  const { clickedYear, clickedMonth, clickedDay } = selectedDate;


  const [currentDate, setCurrentDate] = useState({
    currentDay: clickedYear,
    currentMonth: clickedMonth,
    currentYear: clickedDay,
  });

  const [theAmount, setTheAmount] = useState(0);

  const [shouldShrink, setShouldShrink] = useState(false);

  // const shouldShrink = useSelector((state) => state.shouldShrink);

  const { months } = useContext(MyContext);
  const { days } = useContext(MyContext);

  const [daysArray, setDaysArray] = useState([]);
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  useEffect(() => {
    const generalDate = new Date(year, month + 1, 0);
    const maxNum = generalDate.getDate();

    const generalPreviousDate = new Date(year, month, 0);
    const lastDayOfPreviousMonth = generalPreviousDate.getDate();

    const dayLastDayOfPreviousMonth = generalPreviousDate.getDay();

    setMaxDays(maxNum);

    const days = [];
    const amount = [];

    //previous month
    for (
      let j = lastDayOfPreviousMonth - dayLastDayOfPreviousMonth;
      j <= lastDayOfPreviousMonth;
      j++
    ) {
      amount.push(j);
      days.push(j);
      setTheAmount(amount);
    }
    //current month
    for (let i = 1; i <= maxNum; i++) {
      days.push(i);
    }

    //next month
    for (let z = 1; z < 7 - generalDate.getDay(); z++) {
      days.push(z);
    }
    setDaysArray(days);
  }, [month, year]);

  const handleArrow = (direction) => {
    if (direction === "next") {
      setMonth((prevMonth) => (prevMonth + 1) % 12);
      setYear((prevYear) => (month === 11 ? prevYear + 1 : prevYear));
    } else {
      setMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
      setYear((prevYear) => (month === 0 ? prevYear - 1 : prevYear));
    }
  };

  const calendarClick = (day) => {
    setSelectedDate({
      clickedYear: year,
      clickedMonth: month,
      clickedDay: day,
    });
  };

  return (
    <>
      <div
        className={
          shouldShrink ? "calendar flex goDown trans" : "calendar flex trans"
        }
      >
        <div className="topTitle grid">
          <button
            className="arrow trans pointer"
            onClick={() => handleArrow("prev")}
          >
            ˂
          </button>
          <h3 className="title jcac gradientText flex">
            {months[month]} {year}
          </h3>
          <button
            className="arrow trans pointer"
            onClick={() => handleArrow("next")}
          >
            ˃
          </button>
        </div>
        <div className="dates grid">
          {days.map((d, i) => {
            return (
              <p className="flex shrink gradientText" key={i}>
                {d}
              </p>
            );
          })}
          {daysArray.map((day, index) => {
            return (
              <p
                onClick={() => calendarClick(day)}
                className={
                  index < theAmount.length ||
                  index - theAmount.length >= maxDays
                    ? "flex trans pointer gray"
                    : day === currentDate.currentDay &&
                      month == currentDate.currentMonth &&
                      year === currentDate.currentYear
                    ? "flex trans pointer currentDay"
                    : "flex trans pointer"
                }
                key={index}
              >
                {day}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Calendar;
