import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export default class Sider extends Component {
  render() {
    const { collapsed } = this.props;
    return (
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}

Sider.propTypes = {
  collapsed: PropTypes.bool,
};

Sider.defaultProps = {
  collapsed: false,
};
