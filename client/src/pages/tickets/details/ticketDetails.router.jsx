import React from "react";
import { Formik, Form } from "formik";
import Send from "./send.svg";
import "./ticketDetails.styles.scss";
import { Comment, Button1, TextField } from "../../../components";
export default function TicketDetails() {
  return (
    <div className="ticketDetails">
      <div className="ticketDetails__container">
        <div className="ticketDetails__header">
          <div className="ticketDetails__header1">
            <div>Ticket Id:</div>
            <div className="ticketDetails__header1--status">
              Status:<span>In-queue</span>
            </div>
          </div>
          <div className="ticketDetails__header2">
            <Button1 text="Esclate" />
          </div>
        </div>
        <div className="ticketDetails__body">
          <Comment />
        </div>

        <Formik
          initialValues={{
            textData: "",
          }}
        >
          <Form className="ticketDetails__footer">
            <div className="ticketDetails__footer--textField">
              <TextField
                name="textData"
                className="ticketDetails__footer--textFieldtextarea"
              />
            </div>
            <div className="ticketDetails__footer--sendBtn">
              <img src={Send} alt="" />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
