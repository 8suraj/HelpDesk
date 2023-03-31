import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { getRequest } from "../../api/api";
import "./tickets.styles.scss";
import rightArrow from "../../assest/svgs/rightArrow.svg";
import CircularCross from "../../assest/svgs/CircularCross.svg";
import dot from "../../assest/svgs/dot.svg";

export default function Tickets() {
  const [shouldFetchRes, setShouldFetchRes] = useState(false);
  const [shouldFetchUnRes, setShouldFetchUnRes] = useState(true);
  let Data1 = useSWR(
    shouldFetchUnRes ? [process.env.REACT_APP_API_TICKET_UNRESOLVED] : null,
    getRequest
  );
  let Data2 = useSWR(
    shouldFetchRes ? [process.env.REACT_APP_API_TICKET_RESOLVED] : null,
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
      <div>
        <div className="ticket__container--form">
          <div className="ticket__container--form--texts">
            <h1>Quick Links</h1>
            <ul>
              <li
                className={shouldFetchUnRes && "active"}
                onClick={unresolvedHandler}
              >
                <p>
                  <img src={dot} alt="" className="dot" />
                  <span>Active Tickets</span>
                </p>
                <img src={rightArrow} alt="" />
              </li>
              <li
                onClick={resolvedHandler}
                className={shouldFetchRes && "active"}
              >
                <p>
                  <img src={dot} alt="" className="dot" />
                  <span>Resolved Tickets</span>
                </p>
                <img src={rightArrow} alt="" />
              </li>
            </ul>
          </div>

          <div className="ticket__container--form__accSub">
            <div className="ticket__container--form__accSub--status">
              <div className="ticket__container--form__accSub--status__First">
                <div className="ticket__container--form__accSub--status__First__subCon">
                  <p>Active</p>
                  <p>{tickets && tickets.length}</p>
                </div>
              </div>

              <div className="ticket__container--form__accSub--status__First"></div>
            </div>
            <div className="ticket__container--form__accSub--tableContainer">
              <div className="ticket__container--form__accSub--tableContainer--table">
                <div className="ticket__container--form__accSub--tableContainer--table__tableBody">
                  <table>
                    <thead>
                      <tr>
                        <th>Ticket Type</th>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Creation Date</th>
                        <th>Escalateable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {error && <p>{error.message}</p>}
                      {isLoading && <p>Data Loading</p>}
                      {tickets && tickets.map((item) => <Trs item={item} />)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
      <td>
        <img src={CircularCross} alt="download" />
        {item.ticketStatus}
      </td>
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
