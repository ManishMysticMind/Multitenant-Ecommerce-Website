"use client";
import { Suspense } from "react";
import OrderConfirmedMessage from "../../../../components/ui/orders/OrderConfirmedMessage";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmedMessage />
    </Suspense>
  );
}

