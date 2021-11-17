import React from "react";
import { Modal } from "antd";

const DeleteWarn = (props) => {
  return (
    <Modal visible={props.visible}>
      <p>Delete?</p>
    </Modal>
  );
};

export default DeleteWarn;
