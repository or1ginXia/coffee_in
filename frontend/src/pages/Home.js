import SearchBar from "../Components/SearchBar";
import CoffeeList from "../Components/CoffeeList";
import BottomMenu from "../Components/BottomMenu";
import { Divider } from "antd";
import "./home.css";

// Phone layout
const appStyle = {
  maxWidth: "393px",
  margin: "auto",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  height: "852px",
  overflow: "hidden",
  borderRadius: "25px",
};

function Home() {
  return (
    <>
      <div className="container d-flex flex-column" style={appStyle}>
        <h1 className="text-center my-4">CAFFEE IN</h1>
        <Divider orientation="center">Recomended</Divider>
        <SearchBar />
        <div id="cfl">
          <CoffeeList />
        </div>
        <BottomMenu />
      </div>
    </>
  );
}

export default Home;
