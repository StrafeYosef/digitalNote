import SideNav from "../Navs/SideNav.jsx";
import Content from "./Content.jsx";
import { MyContextProvider } from "../Context/Context.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAccess = async () => {
      try {
        if (!token) navigate("/login");
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
      const response = await axios.get("http://localhost:5174/users/getUsers", {
        headers: {
          Authorization: token,
        },
      });
      if (response.status !== 200) {
        navigate("/login");
      }
    };
    checkAccess();
  }, []);

  return (
    <MyContextProvider>
      <SideNav />
      <Content />
    </MyContextProvider>
  );
}

export default Dashboard;
