import React, { useMemo } from 'react'
import { Link } from 'gatsby'
import { es } from 'date-fns/locale'
import { format, differenceInCalendarMonths, isAfter } from 'date-fns'

const Cell = ({ node }) => {
  const date = new Date(node.date)
  const oneMonthAgo = differenceInCalendarMonths(new Date(),1)
  const isNew = isAfter(date,oneMonthAgo)

  const isPopular = node.categories && node.categories.includes('Popular')

  const dateArr = format(date,'dd MMMM, yyyy',{ locale:es })
    .split(' ')
  dateArr.pop()
  dateArr[1] = dateArr[1].slice(0, 3)
  const formattedDate = dateArr.join(' ')
  return (
    <div className="post" key={node.id}>
      <Link to={node.slug}>
        <div className="post-row">
          <time>{formattedDate}</time>
          <h3>{node.title}</h3>
        </div>
        {isNew && <div className="new-post">¡Nuevo!</div>}
        {isPopular && <div className="popular-post">Popular</div>}
      </Link>
    </div>
  )
}

export default function Posts({ data, showYears }) {
  const postsByYear = {}

  data.forEach((post) => {
    const year = post.date.split(', ')[1]

    postsByYear[year] = [...(postsByYear[year] || []), post]
  })

  const years = useMemo(() => Object.keys(postsByYear).reverse(), [postsByYear])

  if (showYears) {
    return years.map((year) => (
      <section key={year}>
        <h2>{year}</h2>
        <div className="posts">
          {postsByYear[year].map((node) => (
            <Cell key={node.id} node={node} />
          ))}
        </div>
      </section>
    ))
  } else {
    return (
      <div className="posts">
        {data.map((node) => (
          <Cell key={node.id} node={node} />
        ))}
      </div>
    )
  }
}