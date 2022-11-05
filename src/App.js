import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BuyerSetup } from "./components/buyerSetup";
import { OrderSetup } from "./components/orderSetup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderSetup />} />
        <Route path="/:id" element={<BuyerSetup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
