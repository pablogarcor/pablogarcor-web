export function getSimplifiedPosts(posts, options = {}) {
  return posts.map((post) => ({
    id: post.node.id,
    date: post.node.frontmatter.date,
    slug: post.node.fields.slug,
    tags: post.node.frontmatter.tags,
    categories: post.node.frontmatter.categories,
    title: post.node.frontmatter.title,
    description: post.node.frontmatter.description,
    topic: post.node.frontmatter.topic,
    ...(options.thumbnails && {
      thumbnail: post.node.frontmatter.thumbnail.childImageSharp.fixed,
    }),
  }))
}