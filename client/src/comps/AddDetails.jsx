import React, { useContext } from "react";
import { MyContext } from "./Context/Context";

function AddDetails() {
  const { inputs, handleInputs } = useContext(MyContext);

  return (
    <div className="combine flex jcac absolute">
      {inputs.map((input, inputIndex) => (
        <div className="dialog" key={inputIndex}>
          {Object.entries(input).map(([key, value], index) => (
            <div key={index}>
              <input
                value={value[0]}
                onChange={(e) => handleInputs(e, inputIndex, key)}
                className="input-field text trans bShadow half"
                type="text"
                required
              />
              <label className="input-label trans inputSpecial color">
                {value[1]}
              </label>
            </div>
          ))}
          <button className="doneButton">close</button>
        </div>
      ))}
    </div>
  );
}

export default AddDetails;
