
import Navigation from "./components/Navigation";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="app">
      <main className="main-content">
        <div className="header-card">
          <h1 className="app-title">Frontend Task</h1>
          <Navigation />
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
