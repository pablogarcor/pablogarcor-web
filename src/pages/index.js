import React, { Component } from "react";
import { Helmet } from "react-helmet";
import {Link} from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import SEO from "../components/SEO/SEO";
import Blurb from "../components/Blurb/Blurb";

class IndexPage extends Component {
    render() {
        return (
          <Layout>
            <SEO />
            <Helmet title={`${config.siteTitle}`} />
            <Blurb title="-Bienvenidos a mi web-">
              <p>
                Soy ingeniero y desarrollador de software. Esta web es mi taller digital
                &mdash; donde, como artesano del codigo, guardo todo lo que he aprendido y creado
                a lo largo del tiempo
              </p>
              <p className="stack-mobile">
                <Link className="button blurb-about" to="/sobre-mi">
                  <figure>►</figure>
                  &nbsp;Sobre mi&nbsp;
                  <figure>◄</figure>
                </Link>
                <Link className="button blurb-blog" to="/sobre-mi">
                  <figure>►</figure>
                  &nbsp;Artículos&nbsp;
                  <figure>◄</figure>
                </Link>
                <a
                  className="button"
                  href="https://github.com/pablogarcor"
                  target="_blank"
                  rel="noreferrer"
                >
                  <figure>►</figure>
                  &nbsp;Mi Github&nbsp;
                  <figure>◄</figure>
                </a>
              </p>
            </Blurb>
          </Layout>
        );
    }
}

export default IndexPage;
