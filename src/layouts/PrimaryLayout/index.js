import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Sider from "./Sider";
import "./style.scss";

export default class PrimaryLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children } = this.props;
    const { collapsed } = this.state;

    return (
      <Layout style={{ height: "100%" }}>
        <Sider collapsed={collapsed} />
        <Layout className="site-layout">
          <Header collapsed={collapsed} toggle={this.toggle} />
          {children}
        </Layout>
      </Layout>
    );
  }
}
