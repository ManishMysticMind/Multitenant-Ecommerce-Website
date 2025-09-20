import axiosWrapper, { baseUrl } from "../hooks/api/axiosWrapper";

export type ConnectIPSPaymentResponse = {
  TOKEN: string;
  gateway_url: string;
  merchant_id: string;
  app_id: string;
  app_name: string;
  txn_id: string;
  txn_date: string;
  txn_currency: string;
  txn_amount: string;
  reference_id: string;
  remarks: string;
  particulars: string;
  pfx_used: string;
};

export type ConnectIPSPaymentRequest = {
  TOKEN: string;
  MERCHANTID: string;
  APPID: string;
  APPNAME: string;
  TXNID: string;
  TXNDATE: string;
  TXNCRNCY: string;
  TXNAMT: string;
  REFERENCEID: string;
  REMARKS: string;
  PARTICULARS: string;
};

export const initConnectIPSPayment = async (
  amount: string,
  transactionRemarks: string
) => {
  const url =
    baseUrl + "/api/connectips-payment/?order_id=" + transactionRemarks;
  const response = await axiosWrapper.post(url, {});

  if (response.status === 200) {
    const data = response.data as ConnectIPSPaymentResponse;

    console.log("Response from server:", data);

    const fields: ConnectIPSPaymentRequest = {
      MERCHANTID: data.merchant_id,
      APPID: data.app_id,
      APPNAME: data.app_name,
      TXNID: data.txn_id,
      TXNDATE: data.txn_date,
      TXNCRNCY: data.txn_currency,
      TXNAMT: data.txn_amount,
      REFERENCEID: data.reference_id,
      REMARKS: data.remarks,
      PARTICULARS: data.particulars,
      TOKEN: data.TOKEN,
    };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.gateway_url;

    // Add fields to form
    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    // Add form to document and submit
    document.body.appendChild(form);
    form.submit();
  }
};

const handleConnectIPSError = (
  message: string,
  setError: (message: string) => void
) => {
  setError(message);
};
