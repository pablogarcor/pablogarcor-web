import React, {useMemo} from "react";
import { Helmet } from "react-helmet";
import {Link,graphql} from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import SEO from "../components/SEO/SEO";
import Blurb from "../components/Blurb/Blurb";
import {getSimplifiedPosts} from "../utils/helpers";
import Posts from "../components/Posts/Posts";

export default function IndexPage ({data}) {
  const latest = data.latest.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const Section = ({ title, children, button}) => (
    <section>
      <h2>
        {title}
        {button && (
          <Link className="section-button" to="/blog">
            Ver todos
          </Link>
        )}
      </h2>
      {children}
    </section>
  )
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
      <div className="container index">
        <Section title="Últimos posts" button>
          <Posts data={simplifiedLatest} />
        </Section>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`

