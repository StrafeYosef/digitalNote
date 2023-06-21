import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./Context/Context";

function AddDetails() {
  let [array, setArray] = useState([]);

  const addNew = () => {
    const copyArray = [...array];
    copyArray.push("");
    setArray(copyArray)
  };

  // const handleInputs = (e) => {

  // }

  return (
    <div className="dialog combine flex jcac absolute">
      <input
        onChange={(e) => handleInputs()}
        className="input-field text trans bShadow half"
        type="text"
        required
      />
      <label className="input-label trans inputSpecial color">{}</label>
      <button onClick={addNew}>Add new input</button>
        {array.map((arr) => {
          return (
            <>
              <input type="text" />
              <label className="input-label trans inputSpecial color">
                {arr}
              </label>
            </>
          );
        })}
    </div>
  );
}

export default AddDetails;
