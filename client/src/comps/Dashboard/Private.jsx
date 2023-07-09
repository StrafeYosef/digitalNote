import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../Context/Context";
import axios from "axios";
import { TbZoomQuestion } from "react-icons/tb";

function Private() {
  const arrayKeys = [
    "מס' סדורי",
    "תאריך",
    "פרטים",
    "מס' חשבונית מ.ע.מ.",
    "תקבולים",
  ];

  const [db, setDB] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        await axios
          .get("http://localhost:5174/missions/getMissions")
          .then((res) => {
            setDB(res.data);
          })
          .catch((err) => {
            throw err;
          });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  let number = 1

  return (
    <div className="insideArea flex jcac s">
      <p className="title gradientText p">Поступления и платежи</p>
      <div className="table">
        <div className="titles flex jcac">
          {arrayKeys.map((arr) => {
            return <h4 className="title gradientText">{arr}</h4>;
          })}
        </div>
        <div className="someData combine flex" style={{ direction: "rtl" }}>
          {db?.map((values, index) => {
          
            return values.third.map((third, thirdIndex ) => {
              return (
                <>
                  <div className="theData trans">
                    <p>{number++}</p>
                    <p>{values.date}</p>
                    <p>{values.first}</p>
                    <p>
                      {values.theIndex} / {values.mainIndex}
                    </p>
                    <p>{values.third[thirdIndex][2]}</p>
                  </div>
                </>
              );
            });
          })}
          {db.length === 0 && (
            <div className="combine flex jcac noFound color someFix"
          >
              <TbZoomQuestion />
              <p className="defaultValue title gradientText">
                Вам необходимо заполнить подробную информацию о лечении, чтобы
                показать ее здесь.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Private;
