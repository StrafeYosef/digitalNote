import React, { useEffect, useState } from "react";
import bg from "../assets/bg.jpg";
import boat from "../assets/boat.png";
import axios from "axios";

function LoginAdmin() {
  const inputsStrings = ["Имя", "Пароль"];
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
  });

  const { name, password } = inputs;

  useEffect(() => {
    console.log(inputs)
  }, [name, password])

  const handleChange = (e, key) => {
    setInputs((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const addUser = async () => {
    try {
      const res = await axios.post(
        "https://digitalnote.onrender.com/users/postUsers",
        {
          name,
          password,
        }
      );

      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg flex jcac">
      <img src={bg} alt="Background" />
      <img src={boat} className="boat absolute" />
      <form
        onSubmit={handleSubmit}
        className="square absolute flex jcac bShadow"
      >
        <div className="fields flex">
          <p className="textGradient titleLogin">Авторизоваться</p>
          {inputsStrings.map((input, index) => {
            return (
              <div className="input-container flex" key={input}>
                <input
                  value={inputs[Object.keys(inputs)[index]]}
                  onChange={(e) => handleChange(e, Object.keys(inputs)[index])}
                  className="input-field text trans bShadow"
                  type={index === 0 ? "text" : "password"}
                  id="name"
                  required
                />
                <label className="input-label trans" htmlFor="name">
                  {input}
                </label>
              </div>
            );
          })}
          <button onClick={addUser} className="doneButton text pointer trans">
            Авторизоваться
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginAdmin;
