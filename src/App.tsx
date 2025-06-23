import { Outlet } from "react-router";
import "./App.css";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
