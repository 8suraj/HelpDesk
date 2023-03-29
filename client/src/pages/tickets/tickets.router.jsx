import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { Button2 } from "../../components";
import { getRequest } from "../../api/api";
import "./tickets.styles.scss";
import rightArrow from "../../assest/svgs/rightArrow.svg";
import square from "../../assest/svgs/square.svg";
export default function Tickets() {
  const [shouldFetchRes, setShouldFetchRes] = useState(false);
  const [shouldFetchUnRes, setShouldFetchUnRes] = useState(true);
  let Data1 = useSWR(
    shouldFetchUnRes
      ? [process.env.REACT_APP_API_RAISER_TICKET_UNRESOLVED]
      : null,
    getRequest
  );
  let Data2 = useSWR(
    shouldFetchRes ? [process.env.REACT_APP_API_RAISER_TICKET_RESOLVED] : null,
    getRequest
  );
  let Data = shouldFetchUnRes ? Data1 : Data2;
  let { data, error, isLoading } = Data;

  const tickets = data && data.data.tickets;
  const resolvedHandler = () => {
    Data1 = null;
    setShouldFetchRes(!shouldFetchRes);
    setShouldFetchUnRes(!shouldFetchUnRes);
  };
  const unresolvedHandler = () => {
    Data2 = null;
    setShouldFetchUnRes(!shouldFetchUnRes);
    setShouldFetchRes(!shouldFetchRes);
  };
  return (
    <div className="TicketView">
      <div className="TicketView__container">
        <div className="TicketView__container1">
          <div onClick={resolvedHandler}>
            <Button2
              text="Active Tickets"
              className="btn--transparent"
              active={shouldFetchUnRes && shouldFetchUnRes}
              img2={rightArrow}
              img1={square}
            />
          </div>
          <div onClick={unresolvedHandler}>
            <Button2
              text="Resolved Tickets"
              className="btn--transparent"
              active={shouldFetchRes && shouldFetchRes}
              img2={rightArrow}
              img1={square}
            />
          </div>
        </div>
        <div className="TicketView__container2">
          <span className="TicketView__container2-head">Tickets</span>
          <div className="TicketView__container2-status">
            <span>Status</span>
            <div className="TicketView__container2-statusMain">
              <div className="TicketView__container2-statusMain-active">
                Active{" "}
              </div>
              <div>{tickets && tickets.length}</div>
            </div>
          </div>
          <div>
            <table className="TicketView__container2-table">
              <thead>
                <tr>
                  <th className="TicketView__container2-table--id">
                    Ticket Type
                  </th>
                  <th className="TicketView__container2-table--id">ID</th>
                  <th className="TicketView__container2-table--id">Status</th>
                  <th className="TicketView__container2-table--id">
                    Creation Date
                  </th>
                  <th className="TicketView__container2-table--id">Escalate</th>
                </tr>
              </thead>
              <tbody>
                {tickets && tickets.map((item) => <Trs item={item} />)}
              </tbody>
            </table>
            {error && <p>{error.message}</p>}
            {isLoading && <p>Data Loading</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Trs({ item }) {
  return (
    <tr>
      <td>{item.ticketType}</td>
      <td>
        <Link to={`/raiser/tickets/${item._id}`}>
          {item._id.slice(item._id.length - 10, item._id.length - 1)}
        </Link>
      </td>
      <td>{item.ticketStatus}</td>
      <td>
        {item &&
          `${new Date(item.created_at).toLocaleString("en-US", {
            month: "long",
          })} ${new Date(item.created_at).getDate()},${new Date(
            item.created_at
          ).getFullYear()}`}
      </td>
      <td>{item.escalatable && "yes"}</td>
    </tr>
  );
}
