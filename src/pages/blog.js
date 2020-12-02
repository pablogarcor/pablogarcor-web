import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Layout from '../layout/index'
import SEO from '../components/SEO/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from "../../data/SiteConfig";
import Posts from "../components/Posts/Posts";

export default function BlogIndex({ data }) {
  const posts = data.allGhostPost.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])

  return (
    <Layout>
      <Helmet title={`Blog | ${config.siteTitle}`} />
      <SEO customDescription="Articulos, tutoriales, proyectos, codigo, y todo lo demas." />
      <header>
        <div className="container">
          <h1>Artículos</h1>
          <p className="subtitle">
            Posts, tutoriales, proyectos, código, y todo lo demás.
          </p>
        </div>
      </header>
      <section className="container">
        <Posts data={simplifiedPosts} showYears />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogQuery {
    allGhostPost(sort: {fields: published_at, order: DESC}) {
    edges {
      node {
        id
        slug
        published_at(locale: "es", formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
  }
`
