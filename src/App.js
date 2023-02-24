import "./App.css";
import Navigation from "./components/Navigation";
import MainContent from "./components/MainContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navigation />
      <hr />
      <MainContent />
      <ToastContainer />
    </>
  );
}

export default App;
