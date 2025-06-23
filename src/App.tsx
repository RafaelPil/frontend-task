import Navigation from "./components/Navigation";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="app">
      <main className="main-content">
        <div className="header-card">
          <Navigation />
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
