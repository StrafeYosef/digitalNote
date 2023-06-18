import SideNav from "../Navs/SideNav.jsx";
import Content from "./Content.jsx";
import { MyContextProvider } from "../Context/Context.jsx";

function Dashboard() {
  return (
    <MyContextProvider>
      <SideNav />
      <Content />
    </MyContextProvider>
  );
}

export default Dashboard;
