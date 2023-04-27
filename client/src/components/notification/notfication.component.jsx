import React from "react";
import {
  NotifcationModal,
  NotificationHeader,
  Notifications,
  Slideright,
} from "./notification.styles";
import { Overlay } from "../modal/modal.styles";
import cross from "../../assest/svgs/cross.svg";

import profile from "../../assest/svgs/profile.svg";
export default function Notification({ open, onClose,data }) {
  const [children, setChildren] = React.useState([1]);
  const [clear, setClear] = React.useState(null);
  if (!open) return null;
  return (
    <>
      <NotifcationModal>
        <NotificationHeader>
          <h2> Notifications</h2>
          <div>
            <h2
              onClick={() => {
                setClear(true);
                setTimeout(() => setChildren([]), 1000);
                setTimeout(() => onClose(), 1000);
              }}
            >
              Clear
            </h2>
            <img src={cross} alt="" onClick={onClose} />
          </div>
        </NotificationHeader>
        {children?.map((item) => (
          <>
            {clear ? (
              <Slideright>
                <Notifications className="">
                  <img src={profile} alt="" />
                  <div>
                    <strong>{data.username}</strong>
                    <strong>{data.action}</strong>
                    {data.body}
                  </div>
                </Notifications>
                {() => setClear(null)}
              </Slideright>
            ) : (
              <Notifications className="">
                <img src={profile} alt="" />
                <div>
                  <strong>Mandira</strong>
                  <strong>commented</strong>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  consectetur obcaecati perspiciatis nostrum possimus, molestiae
                  sint doloremque reprehenderit cumque impedit ipsum quis
                  inventore eius non fugit iure qui! Ab, delectus.
                </div>
              </Notifications>
            )}
          </>
        ))}
      </NotifcationModal>
      <Overlay />
    </>
  );
}
