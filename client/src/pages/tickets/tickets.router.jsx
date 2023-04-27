import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { getRequest, postRequest } from "../../api/api";
import jwt_decode from "jwt-decode";
import { Button1, getToken, Modal } from "../../components";
import "./tickets.styles.scss";
import rightArrow from "../../assest/svgs/rightArrow.svg";
import CircularCross from "../../assest/svgs/CircularCross.svg";
import dot from "../../assest/svgs/dot.svg";

export default function Tickets() {
  const [shouldFetchRes, setShouldFetchRes] = useState(false);
  const [shouldFetchUnRes, setShouldFetchUnRes] = useState(true);
  const [userData, setUserData] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [assignmentError, setAssignmentError] = useState("");
  const AssignmentHandler = async (ticketId) => {
    // console.log(ticketId);
    try {
      await postRequest(process.env.REACT_APP_API_TICKET_ASSIGN, {
        ticketId,
      });
    } catch (err) {
      setAssignmentError("Assignment Failed");
      // console.log(err.message);
    }
  };
  React.useEffect(() => {
    setUserData(jwt_decode(getToken()));
  }, []);
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
    <>
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
                    <p>{!shouldFetchRes ? "Active" : "Resolved"}</p>
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
                          <th>Escalated</th>
                          {shouldFetchUnRes && <th>&nbsp;</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {error && <p>{error.message}</p>}
                        {isLoading && <p>Data Loading</p>}
                        {tickets?.map((item) => (
                          <tr>
                            <td>{item?.ticketType}</td>
                            <td>
                              <Link to={`/${userData.isResolver?"resolver":"raiser"}/tickets/${item._id}`}>
                                {item?._id.slice(
                                  item?._id.length - 10,
                                  item?._id?.length - 1
                                )}
                              </Link>
                            </td>
                            <td>
                              <img src={CircularCross} alt="download" />
                              {item?.ticketStatus}
                            </td>
                            <td>
                              {item &&
                                `${new Date(item?.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    month: "long",
                                  }
                                )} ${new Date(
                                  item?.createdAt
                                ).getDate()},${new Date(
                                  item?.createdAt
                                ).getFullYear()}`}
                            </td>
                            <td>{item?.escalated ? "yes" : "No"}</td>
                            {!item?.isResolved && userData?.isResolver && (
                              <td>
                                {item.assigned ? (
                                  userData?.id === item.assignedTo ? (
                                    "Assigned"
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  <Button1
                                    text="Assign"
                                    type="submit"
                                    className="btn--green "
                                    onClick={() => {
                                      setTicketId(item._id);
                                      AssignmentHandler(item._id);
                                    }}
                                  />
                                )}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={ticketId} onClose={() => setTicketId(null)}>
        {assignmentError ? (
          <h1>{assignmentError}</h1>
        ) : (
          <>
            <h1>Ticket id :{ticketId}</h1>
            <h1>Assigned To You</h1>
          </>
        )}
        <Button1
          text="Close"
          className="btn--green "
          onClick={() => setTicketId(null)}
        />
      </Modal>
    </>
  );
}
