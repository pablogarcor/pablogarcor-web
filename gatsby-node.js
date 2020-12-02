/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({ node, name: "date", value: date.toISOString() });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve("src/templates/post.jsx");
  const tagPage = path.resolve("src/templates/tag.jsx");
  const categoryPage = path.resolve("src/templates/category.jsx");

  // Get a full list of markdown posts
  const ghostQueryResult = await graphql(`
      {
        allGhostPost(sort: {order: DESC, fields: published_at}) {
          edges {
            node {
              title
              id
              slug
              published_at
            }
          }
        }
      }
  `);
  if (ghostQueryResult.errors) {
    console.error(ghostQueryResult.errors);
    throw ghostQueryResult.errors;
  }
  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = ghostQueryResult.data.allGhostPost.edges;

  // Sort posts
  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.published_at,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.published_at,
      siteConfig.dateFromFormat
    );
    console.log(dateA)
    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // =====================================================================================
  // Posts
  // =====================================================================================

  postsEdges.forEach((post, i) => {
    const previous = i === postsEdges.length - 1 ? null : postsEdges[i + 1].node
    const next = i === 0 ? null : postsEdges[i - 1].node
    if (post.node.tags) {
      post.node.tags.forEach((tag) => {
        tagSet.add(tag)
      })
    }

    createPage({
      path: post.node.slug,
      component: postPage,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    })
  })

  //  Create tag pages
  tagSet.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: { tag }
    });
  });

  // Create category pages
  categorySet.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: { category }
    });
  });

  createPage({
    path: '/',
    component: path.resolve('./src/pages/index.js'),
    context: {ghostQueryResult}
  })
  createPage({
    path: '/sobre-mi',
    component: path.resolve('./src/components/About/About.jsx'),
  })
};