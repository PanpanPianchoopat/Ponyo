import React, { useState, useEffect } from "react";
import { TOP_5 } from "./constant";
import { Modal } from "antd";
import Button from "../components/Button";
import EditList from "./components/EditList";
import { Popup } from "./styled";
import colors from "../../public/constant/colors";

const myAccount = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    console.log("VISIBLE", popupVisible);
  }, [popupVisible]);

  return (
    <div>
      {/* <EditList list={TOP_5} /> */}
      <Button variant="transparent" onClick={() => setPopupVisible(true)}>
        Edit List
      </Button>
      {/* <Modal
        title="Edit List"
        visible={popupVisible}
        onOk={() => setPopupVisible(false)}
        onCancel={() => setPopupVisible(false)}
      >
        <EditList list={TOP_5} />
      </Modal> */}
      <Popup
        title="Edit Top 5 Favourite List"
        visible={popupVisible}
        okText="Save"
        onOk={() => setPopupVisible(false)}
        onCancel={() => setPopupVisible(false)}
      >
        <EditList list={TOP_5} />
      </Popup>
    </div>
  );
};

export default myAccount;
