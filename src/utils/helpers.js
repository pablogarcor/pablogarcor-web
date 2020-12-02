export function getSimplifiedPosts(posts, options = {}) {
  return posts.map((post) => ({
    id: post.node.id,
    date: post.node.published_at,
    slug: post.node.slug,
    tags: post.node.tags,
    categories: post.node.categories,
    title: post.node.title,
    description: post.node.description,
    topic: post.node.topic,
    ...(options.thumbnails && {
      thumbnail: post.node.thumbnail.childImageSharp.fixed,
    }),
  }))
}

export function slugify(string) {
  return (
    string &&
    string
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}
