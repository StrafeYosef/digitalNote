import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./Context/Context";

function AddDetails() {
  const three = ["Quantity", "Type", "Price"];
  let [array, setArray] = useState([
    <div className="combine flex">
      {three.map((th) => {
        return (
          <div className="combine flex jcac specialOne">
            <input
              type="text"
              className="input-field text trans bShadow another"
              required
            />
            {/* <label className="input-label trans inputSpecial color">{th}</label> */}
          </div>
        );
      })}
    </div>,
  ]);

  const addNew = () => {
    const copyArray = [...array];
    copyArray.push(array);
    setArray(copyArray);
    array = [];
  };

  useEffect(() => {
    console.log(array);
  }, [array]);

  return (
    <div className="dialog combine flex jcac absolute">
      <div className="combine flex jcac titles color">
        {three.map((th) => {
          return <p>{th}</p>;
        })}
      </div>

      <div className="combine flex jcac list">{array}</div>
      <div className="buttonContainer flex jcac">
        <button className="doneButton trans" onClick={addNew}>Add new input</button>
      </div>
    </div>
  );
}

export default AddDetails;
