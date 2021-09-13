import React from 'react';
import { Link } from 'gatsby';

export const ToC = ({ mdx, slugger }) => {
  return mdx && mdx.headings ? (
    <nav className="lg:flex-1 mb-12">
      <h2 className="mb-4 font-bold text-2xl">Table of Contents</h2>
      <ol className="p-0">
        {mdx.headings.map((heading, i) => (
          <li key={`${heading.value} - ${i}`}>
            <Link to={`${mdx.fields.slug}#${slugger.slug(heading.value)}`}>
              {heading.value}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  ) : null;
};
