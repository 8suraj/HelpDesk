import React from "react";
import CircularCross from "../../assest/svgs/CircularCross.svg";
import rightArrow from "../../assest/svgs/rightArrow.svg";
import dot from "../../assest/svgs/dot.svg";
import "./1.scss";
const data = [
  {
    id: 1,
    slNO: "Quant (Equities & CFC)",
    topic: "$495 (January)",
    date: "Inactive",
    queries: "04-01-2022",
    attachment: "Pay",
  },
  {
    id: 2,
    slNO: "Quant (Equities & CFC)",
    topic: "$495 (January)",
    date: "Inactive",
    queries: "04-01-2022",
    attachment: "Pay",
  },
  {
    id: 3,
    slNO: "Quant (Equities & CFC)",
    topic: "$495 (January)",
    date: "Inactive",
    queries: "04-01-2022",
    attachment: "Pay",
  },
  {
    id: 4,
    slNO: "Quant (Equities & CFC)",
    topic: "$495 (January)",
    date: "Inactive",
    queries: "04-01-2022",
    attachment: "Pay",
  },
  {
    id: 5,
    slNO: "Quant (Equities & CFC)",
    topic: "$495 (January)",
    date: "Inactive",
    queries: "04-01-2022",
    attachment: "Pay",
  },
];
export const Q = () => {
  return (
    <div>
      <div className="ticket__container--form">
        <div className="ticket__container--form--texts">
          <h1>Quick Links</h1>
          <ul>
            <li
              className=".active"
              style={{
                background: "#071d47",
              }}
            >
              <p>
                <img src={dot} alt="" className="dot" />
                <span>User ticket</span>
              </p>
              <img src={rightArrow} alt="" />
            </li>
            <li>
              <p>
                <img src={dot} alt="" className="dot" />
                <span>Accounts & Subscription</span>
              </p>
              <img src={rightArrow} alt="" />
            </li>
            <li>
              <p>
                <img src={dot} alt="" className="dot" />
                <span>Risk Profile</span>
              </p>
              <img src={rightArrow} alt="" />
            </li>
            <li>
              <p>
                <img src={dot} alt="" className="dot" />
                <span>Broker Settings</span>
              </p>
              <img src={rightArrow} alt="" />
            </li>
            <li>
              <p>
                <img src={dot} alt="" className="dot" />
                <span>My Orders</span>
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
                <p>114 days left</p>
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
                      <th>Plan</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>End Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.slNO}</td>
                        <td>{item.topic}</td>
                        <td>
                          <img src={CircularCross} alt="download" />
                          {item.date}
                        </td>
                        <td>{item.queries}</td>
                        <td>{item.attachment}</td>
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
  );
};
