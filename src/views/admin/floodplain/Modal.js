import React, { useState } from "react";
import { Modal, Row, Col, Form, Input, Upload } from "antd";
import DrawingPolygon from "../../../components/DrawingPolygon";
import { PlusOutlined } from "@ant-design/icons";
import { floodplainApi } from "../../../api";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function FloodplainModal({ visible, cancel }) {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Choose image</div>
    </div>
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const beforeUpload = (file) => {
    const isJPG = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJPG) {
      alert("You can only upload JPG or PNG file!");
    } else {
      return false;
    }
  };

  const handleDrawingPolygon = (coordinates) => {
    setCoordinates(coordinates);
  };

  const handleOk = (e) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    fileList.forEach((image, i) => {
      formData.append(`images[${i}]`, image.originFileObj);
    });
    coordinates.forEach((coordinate, i) => {
      formData.append(`coordinates[${i}][lat]`, coordinate.lat);
      formData.append(`coordinates[${i}][lng]`, coordinate.lng);
    });

    floodplainApi
      .create(formData)
      .then((response) => {
        if (response) cancel();
      })
      .catch((error) => console.log("error", error.response));
  };

  return (
    <Modal
      title="Add floodplain"
      visible={visible}
      onCancel={cancel}
      width={1140}
      onOk={handleOk}
      okText="Save"
    >
      <Row>
        <Col xs={24} xl={12}>
          <Form {...layout}>
            <Form.Item
              label="Floodplain"
              name="floodplain"
              rules={[{ required: true, message: "Please input floodplain!" }]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Images">
              <Upload
                beforeUpload={beforeUpload}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} xl={12} style={{ height: 450 }}>
          <DrawingPolygon onDrawingPolygon={handleDrawingPolygon} />
        </Col>
      </Row>
    </Modal>
  );
}
