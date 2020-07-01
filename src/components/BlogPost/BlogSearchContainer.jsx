import React, { useState, useEffect } from 'react';
import ZeroState from '../../images/blog_empty_state.inline.svg';
import { MemoizedBlogPostCardList } from './BlogPostCardList';

export const BlogSearchContainer = props => {
  const { posts, homepage = false } = props;

  const [allPosts, setAllPosts] = useState(() => posts);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search.length > 0) {
      const formattedSearch = search.toLowerCase().trim();

      const filteredPosts = posts.filter(post =>
        post.node.frontmatter.title
          .toLowerCase()
          .trim()
          .includes(formattedSearch)
      );

      setAllPosts(filteredPosts);
      return;
    }

    setAllPosts(posts);
  }, [search, posts]);

  return (
    <React.Fragment>
      <form role="search" onSubmit={event => event.preventDefault()}>
        <label>
          <span className="text-xs text-white-700">Search</span>
          <input
            aria-label="On this page"
            name="search"
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-8
    text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-sm flex"
            type="search"
            value={search}
            placeholder="Search posts"
            onChange={e => setSearch(e.target.value)}
          />
        </label>
      </form>
      {renderBlogPostsORZeroState(allPosts, homepage)}
    </React.Fragment>
  );
};

function renderBlogPostsORZeroState(allPosts, homepage) {
  if (allPosts.length) {
    return renderBlogPosts(allPosts, homepage);
  }

  return renderZeroState();
}

function renderZeroState() {
  return (
    <ZeroState
      alt="No blog posts found image"
      className="max-w-xs mx-auto my-16"
    />
  );
}

export function renderBlogPosts(allPosts, homepage) {
  return <MemoizedBlogPostCardList posts={allPosts} homepage={homepage} />;
}
