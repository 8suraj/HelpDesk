import React, { useEffect, useState } from "react";
import "./createTicket.styles.scss";
import right from "../../assest/svgs/done100.svg";
import wrong from "../../assest/svgs/close100.svg";
import cross from "../../assest/svgs/cross.svg";
import { Form, Formik } from "formik";
import { postRequest } from "../../api/api";
import Button from "../../components/button/button.component";
import ValidationSchema from "../../components/authentication/validationSchemaTicket";
import {
  InputField,
  TextField,
} from "../../components/inputField/inputField.component";
import Select from "react-select";
const tickets = [
  { label: "Grievance", value: "Grievance" },
  { label: "Reimbursement", value: "Reimbursement" },
  { label: "Asset allocation", value: "Asset allocation" },
  { label: "Client request", value: "Client request" },
  { label: "Onboarding", value: "Onboarding" },
  { label: "Change request", value: "Change request" },
  { label: "Marketing", value: "Marketing" },
];
export const CreateTicket = () => {
  const [error, setError] = useState(null);
  const [ticketID, setTicketID] = useState(false);
  const [ticketType, setTicketType] = useState(null);
  const [ticketCreator, setTicketCreator] = useState(true);
  const handleSubmit = (values) => {
    const payload = JSON.stringify({ ...values, ticketType });
    console.log(payload);
    postRequest(process.env.REACT_APP_API_RAISER_CREATE_TICKET, payload)
      .then((result) => setTicketID(result.data.ticketId))
      .catch((err) => setError(err.message));
  };
  const clickHandler = () => {
    setTicketCreator(!ticketCreator);
  };
  // useEffect(() => {
  //   setTicketCreator(true);
  // }, []);
  return (
    <div>
      {ticketCreator && (
        <div className="createTicket">
          <div className="createTicket__head">
            <div className="createTicket__head__1">Create Ticket</div>
            <div className="createTicket__head__2" onClick={clickHandler}>
              <img src={cross} alt="" />
            </div>
          </div>
          <div className="createTicket__body">
            {!ticketID && (
              <Formik
                initialValues={{
                  ticketType: "",
                  name: "",
                  email: "",
                  description: "",
                }}
                enableReinitialize
                validationSchema={ValidationSchema}
                onSubmit={handleSubmit}
              >
                <div className="ticket__form">
                  <Form>
                    <div className="selectDiv">
                      <label htmlFor="ticketType">Ticket Type*</label>
                      <Select
                        onChange={(e) => setTicketType(e.value)}
                        name="ticketType"
                        className="selectInput"
                        options={tickets}
                      />
                    </div>
                    {/* <InputField
                  name="ticketType"
                  className="ticketField"
                  type="text"
                  label="Ticket Type*"
                /> */}
                    <InputField
                      name="name"
                      className="ticketField"
                      type="text"
                      label="Name*"
                    />
                    <InputField
                      name="email"
                      className="ticketField"
                      type="email"
                      label="Email*"
                    />
                    <TextField
                      name="description"
                      className="ticketFieldtextarea"
                      label="Description"
                    />
                    {error && <div>{error}</div>}
                    <Button
                      text="Submit"
                      type="submit"
                      className="btn--squareBlue"
                    />
                  </Form>
                </div>
              </Formik>
            )}
            {ticketID && (
              <div className="holder">
                <img src={right} alt="" />
                <p>Ticket id:{ticketID}</p>
              </div>
            )}
            {error && (
              <div className="holder">
                <img src={wrong} alt="" />
                <p>Your Computer sucks:{error}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
