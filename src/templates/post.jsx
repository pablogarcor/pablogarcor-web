import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import {Helmet} from 'react-helmet'
import Img from 'gatsby-image'

import Layout from '../layout/index'

import SEO from '../components/SEO/SEO'

import config from "../../data/SiteConfig";
import {slugify} from '../utils/helpers'

export default function PostTemplate({ data, pageContext }) {
  const post = data.ghostPost
  const { previous, next } = pageContext
  const { tags, thumbnail, title, description, date } = post
  const commentBox = React.createRef()

  useEffect(() => {
    const commentScript = document.createElement('script')
    const theme =
      typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
        ? 'github-dark'
        : 'github-light'
    commentScript.async = true
    commentScript.src = 'https://utteranc.es/client.js'
    commentScript.setAttribute('issue-term', 'pathname')
    commentScript.setAttribute('id', 'utterances')
    commentScript.setAttribute('theme', theme)
    commentScript.setAttribute('crossorigin', 'anonymous')
    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(commentScript)
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`)
    }
  }, []) // eslint-disable-line

  return (
    <Layout>
      <Helmet title={`${post.title} | ${config.siteTitle}`} />
      <SEO postPath={post.slug} postNode={post} postSEO />
      <div className="container">
        <article>
          <header className="article-header">
            <div className="container">
              <div className="thumb">
                {thumbnail && (
                  <Img
                    fixed={thumbnail.childImageSharp.fixed}
                    className="post-thumbnail"
                  />
                )}
                <div>
                  <h1>{title}</h1>
                  <div className="post-meta">
                    <div>
                      Por <Link to="/me">Pablo Garcia Ortega</Link> el{' '}
                      <time>{date}</time>
                    </div>
                    {tags && (
                      <div className="tags">
                        {tags.map((tag) => (
                          <Link
                            key={tag}
                            to={`/tags/${slugify(tag)}`}
                            className={`tag-${tag}`}
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {description && <p className="description">{description}</p>}
          </header>
          <div
            className="article-post"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
      ghostPost(slug: {eq: $slug}) {
        title
        slug
        published_at(locale: "es", formatString: "MMMM DD, YYYY")
        html
        excerpt
      }
    }
`
