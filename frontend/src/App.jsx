import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <Home />
    </>
  );
}

export default App;