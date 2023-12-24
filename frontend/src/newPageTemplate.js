import BottomMenu from "../Components/BottomMenu";

// Phone layout
const appStyle = {
  maxWidth: "393px",
  margin: "auto",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  height: "852px",
  overflow: "hidden",
  borderRadius: "25px",
};

function THENEWNAME() {
  return (
    <div className="container d-flex flex-column" style={appStyle}>
      <div className="flex-grow-1"></div>
      <BottomMenu></BottomMenu>
    </div>
  );
}

export default THENEWNAME;
