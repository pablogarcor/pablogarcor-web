import React from 'react'

export default function Blurb({ title, children }) {
  return (
    <section className="blurb">
      <div className="container">
        <div>
        </div>
        <div>
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    </section>
  )
}
