import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import Button from "../components/Button";

const myAccount = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    console.log("VISIBLE", popupVisible);
  }, [popupVisible]);

  return (
    <div>
      <button onClick={() => setPopupVisible(true)}>Edit List</button>
      <Modal
        title="Edit List"
        visible={popupVisible}
        onOk={() => setPopupVisible(false)}
        onCancel={() => setPopupVisible(false)}
      >
        <p>Something</p>
      </Modal>
    </div>
  );
};

export default myAccount;
