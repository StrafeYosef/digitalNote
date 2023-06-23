import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./Context/Context";

function AddDetails() {
  const three = ["Quantity", "Type", "Price", 'Delete'];
  const [array, setArray] = useState([
    <div className="area flex">
      {three.map((th) => (
        <div className="combine flex jcac specialOne" key={th}>
          <input
            type="text"
            className="input-field text trans bShadow another"
            required
          />
        </div>
      ))}
      <button className="doneButton half trans pointer">remove</button>
    </div>,
  ]);

  const addNew = () => {
    const copyArray = [
      <div className="area flex">
        {three.map((th) => (
          <div className="combine flex jcac specialOne" key={th}>
            <input
              type="text"
              className="input-field text trans bShadow another"
              required
            />
          </div>
        ))}
        <button className="doneButton half trans pointer">remove</button>
      </div>,
      ...array,
    ];
    setArray(copyArray);
  };

  return (
    <div className="dialog combine flex jcac absolute">
      <div className="buttonContainer flex jcac">
        <button className="doneButton trans" onClick={addNew}>
          Add new input
        </button>
      </div>
      <div className="combine flex jcac titles color">
        {three.map((th) => (
          <p key={th}>{th}</p>
        ))}
      </div>

      <div className="combine contai flex jcac">
        <div className="combine flex jcac list">
          <div className="scrollable-list">
            {array.map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDetails;
