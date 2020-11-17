import React from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
import "../style.css";
import "../new-moon.css"
import Header from "../components/Header/Header";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="layout-container">
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
        </Helmet>
        <Header />
        <main>{children}</main>
      </div>
    );
  }
}
