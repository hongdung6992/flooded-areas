import React, { useState } from "react";
import { Button, Layout } from "antd";
import Modal from "./Modal";

export default function Floodplain() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <React.Fragment>
      <Layout style={{ marginTop: "10%", alignItems: "center" }}>
        <Button
          type="primary"
          onClick={() => setModalVisible(true)}
          style={{ width: 200 }}
        >
          Add floodplain
        </Button>
        <Modal visible={modalVisible} cancel={() => setModalVisible(false)} />
      </Layout>
    </React.Fragment>
  );
}
