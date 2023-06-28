import Product from "./components/Product";
import "./App.css";
import Checkoutt from "./components/Checkoutt";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={2} autoHideDuration={1000}>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/checkout" element={<Checkoutt />} exact />
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
