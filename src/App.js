import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DeliverySetup } from "./components/deliverySetup";
import { LinkToDelivery } from "./components/linkToDelivery";
import { OrderSetup } from "./components/orderSetup";
import { Payment } from "./components/payment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderSetup />} />
        <Route path="/:id" element={<DeliverySetup />} />
        <Route path="/:id/payment" element={<Payment />} />
        <Route path="/:id/link" element={<LinkToDelivery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
