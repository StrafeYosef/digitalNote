import React, { useContext } from "react";
import { MyContext } from "../Context/Context";

function Results() {
  const { resultsOpen, setResultsOpen } = useContext(MyContext);

  // INPUTS
  const { inputs, setInputs } = useContext(MyContext);
  const { priceInputs, setPriceInputs } = useContext(MyContext);

  return (
    <div
      className={
        resultsOpen
          ? "dialog combine flex jcac absolute back trans"
          : "dialog combine flex jcac absolute close trans"
      }
    >
      <p>{inputs[0].value}</p>;
      {priceInputs.map((input, index) => {
        return (
          <div key={index} id={index} className="flex jcac dadInputs">
            {Object.entries(input).map(([key, value]) => (
              <React.Fragment key={key}>
                <p>{value}</p>
                {/* <input
                  className="input-field text trans bShadow another"
                  value={value}
                  onChange={({ target }) => {
                    const newInputs = [...priceInputs];
                    newInputs[index] = {
                      ...input,
                      [key]: target.value,
                    };
                    setPriceInputs(newInputs);
                  }}
                /> */}
              </React.Fragment>
            ))}
          </div>
        );
      })}
      <button onClick={() => setResultsOpen(false)}>close</button>
    </div>
  );
}

export default Results;
