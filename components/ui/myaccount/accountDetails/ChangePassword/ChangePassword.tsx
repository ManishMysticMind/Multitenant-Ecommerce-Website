"use client";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionTitle from "../../../common/SectionTitle";
import ChangePasswordForm from "../../../forms/changePassword/ChangePasswordForm";

const PasswordReset = () => {
  return (
    <>
      <SectionTitle
        label="Change Password"
        size="30px"
        className="pb-2 pt-0 pl-0"
      />
      <Row>
        <Col sm={12} md={10} lg={7}>
          <p>Set your new password below.</p>
          <ChangePasswordForm />
        </Col>
      </Row>
    </>
  );
};

export default PasswordReset;

// below is the old code, that displays verify with email or google, and then OTP
// import React, { useState } from "react";
// import { styled } from "styled-components";
// import SectionTitle from "../../../common/SectionTitle";
// import { MdOutlineSecurity } from "react-icons/md";
// import { Button, Col } from "react-bootstrap";
// import { FcGoogle } from "react-icons/fc";
// import { MdMailOutline } from "react-icons/md";
// import VerifyOTP from "../../../forms/verifyOTP/VerifyOTP";
// import { AiOutlineArrowLeft } from "react-icons/ai";

// const ChangePassword = () => {
//   const [activeForm, setActiveForm] = useState("changePassword");

//   const handleForgotPassword = () => setActiveForm("forgotPassword");
//   const handleBack = () => setActiveForm("changePassword");

//   return (
//     <>
//       {activeForm === "changePassword" && (
//         <ChangePasswordContainer>
//           <SectionTitle
//             label="Change Password"
//             size="md"
//             className="pt-0 pb-3"
//           />
//           <div className="d-flex flex-column align-items-center gap-3">
//             <MdOutlineSecurity className="security-icon" />
//             <SecurityText>
//               To protect your account security, we need to verify your identity
//               <br />
//               Please choose between these two options to verify :
//             </SecurityText>
//             <Button>
//               <FcGoogle className="google-icon" />
//               Verify through Google
//             </Button>
//             <Button onClick={handleForgotPassword}>
//               <MdMailOutline className="google-icon" />
//               Verify through E-mail
//             </Button>
//           </div>
//         </ChangePasswordContainer>
//       )}
//       {activeForm === "forgotPassword" && (
//         <>
//           <Col sm={12} lg={7}>
//             <SectionTitle
//               label="Verify your Identity"
//               size="40px"
//               className="pb-2 pt-0"
//             />
//             <p>We have sent you an OTP to your mail</p>
//             <div className="d-flex gap-4">
//               <p className="m-0">
//                 E-mail : <strong>xyz@gmail.com</strong>
//               </p>
//             </div>
//             <VerifyOTP email={""} />
//             <Button
//               className="text-decoration-none edit-user-detail"
//               onClick={handleBack}
//             >
//               <AiOutlineArrowLeft /> Go back
//             </Button>
//           </Col>
//         </>
//       )}
//     </>
//   );
// };

// export default ChangePassword;

// const ChangePasswordContainer = styled.div`
//   .security-icon {
//     font-size: 5.5rem;
//     color: #fed700;
//     border: 1px solid #fed700;
//     border-radius: 50%;
//     padding: 1rem;
//     background-color: #fffadc;
//   }
//   button {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     padding: 0.7rem;
//     background-color: unset;
//     border: none;
//     font-weight: 500;
//     color: #757575;
//     box-shadow: 1px 1px 4px 0px #00000022;
//     .google-icon {
//       font-size: 1.5rem;
//     }
//   }
//   button:hover {
//     background-color: unset;
//     color: #757575;
//   }
//   button:active {
//     background-color: unset !important;
//     color: #757575 !important;
//   }
// `;
// const SecurityText = styled.div`
//   color: #9f9f9f;
//   text-align: center;
// `;
