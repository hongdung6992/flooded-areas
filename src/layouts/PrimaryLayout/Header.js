import React, { Component } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./style.scss";

export default class Header extends Component {
  render() {
    const { collapsed, toggle } = this.props;
    return (
      <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: toggle,
          }
        )}
      </Layout.Header>
    );
  }
}

Header.propTypes = {
  collapsed: PropTypes.bool,
};

Header.defaultProps = {
  collapsed: false,
};
