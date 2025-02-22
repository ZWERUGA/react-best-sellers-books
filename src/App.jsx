import { Outlet } from "react-router";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
