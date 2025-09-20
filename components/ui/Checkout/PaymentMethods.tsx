import React from "react";
import { Dropdown, Form } from "react-bootstrap";
import { styled } from "styled-components";
import Image from "next/image";

interface DataItem {
  InstitutionName: string;
  LogoUrl: string;
}

interface Method {
  id: number;
  method: string;
  enable: boolean;
  logo: string;
  title: string;
  data: DataItem[];
}

interface Props {
  selectedPaymentMethod: Method | null;
  setSelectedPaymentMethod: (m: Method) => void;
  paymentMethods: Method[];
}

const PaymentMethods: React.FC<Props> = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  paymentMethods,
}) => {
  if (!paymentMethods?.length) return null;

  return (
    <PaymentMethodsContainer>
      <div className="d-flex flex-column">
        <div className="fw-bold px-2 mb-3">Select a Payment Method</div>
        <Form>
          {paymentMethods
            .filter((method) => method.enable)
            .map((method) => {
              const checked = selectedPaymentMethod?.id === method.id;
              const hasData =
                Array.isArray(method.data) && method.data.length > 0;

              return (
                <div key={method.id}>
                  {method.enable && (
                    <>
                      <PaymentContainer
                        className={` ${checked ? "active-method" : ""}`}
                        onClick={() => setSelectedPaymentMethod(method)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex align-items-center">
                          <span className="me-2 d-flex gap-3 align-items-center">
                            <Image
                              src={method.logo || "/placeholder.png"}
                              width={32}
                              height={32}
                              className="object-fit-contain"
                              alt={method.title}
                              unoptimized
                              style={{ borderRadius: "50%" }}
                            />
                            {method.title}
                          </span>
                          <Form.Check
                            type="radio"
                            name="paymentMethod"
                            id={`pm-${method.id}`}
                            checked={checked}
                            readOnly
                            className="ms-auto payment-method"
                          />
                        </div>
                        {checked && hasData && (
                          <DropdownContainer className="d-flex align-items-center gap-2">
                            Select an Option:
                            <Form.Select
                              aria-label={`Select option for ${method.title}`}
                              defaultValue=""
                              className="w-auto"
                            >
                              {method.data.map((item, index) => (
                                <option
                                  key={index}
                                  value={item.InstitutionName}
                                >
                                  {item.InstitutionName}
                                </option>
                              ))}
                            </Form.Select>
                          </DropdownContainer>
                        )}
                      </PaymentContainer>
                    </>
                  )}
                </div>
              );
            })}
        </Form>
      </div>
    </PaymentMethodsContainer>
  );
};

export default PaymentMethods;

const PaymentMethodsContainer = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 0px 12px 2px #0000000a;
  border-radius: 6px;
  padding: 10px 15px; /* Add padding for spacing */
  margin-bottom: 1rem;
`;
const DropdownContainer = styled.div`
  margin-top: 1.5rem;
  width: 100%;
`;
const PaymentContainer = styled.div`
  padding: 1rem;
  border-radius: 6px;
  border: 0.5px solid #e7e7e7;
  margin-bottom: 0.8rem;
  .form-check-input:checked {
    border-color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.primary};
  }
`;
