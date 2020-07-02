import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { Footer } from '../components/Footer';
import BlogLayout from '../Layouts/BlogLayout';
import GradientHeading from '../components/GradientHeading/GradientHeading';
import { BlogSearchContainer } from '../components/BlogPost/BlogSearchContainer';
import SEO from '../components/seo';
import { motion } from 'framer-motion';

const BlogIndex = ({ data, location }) => {
  const { edges: posts } = data.allMdx;

  return (
    <Layout location={location}>
      <SEO title="webanimation.blog" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
        {
          "@context": "http://schema.org",
          "@type": "WebSite",
          "name": "webanimation.blog",
          "url": "https://webanimation.blog"
        }
        `,
        }}
      />
      <BlogLayout>
        <GradientHeading>webanimation.blog</GradientHeading>
        <BlogSearchContainer posts={posts} homepage />
      </BlogLayout>
      <Footer />
    </Layout>
  );
};

export const pageQuery = graphql`
  query blogIndex {
    allMdx(
      sort: { fields: [frontmatter___datePublished], order: DESC }
      filter: { fields: { instance: { eq: "blog" } } }
    ) {
      edges {
        node {
          id
          excerpt(truncate: false, pruneLength: 100)
          frontmatter {
            title
            datePublished(formatString: "MMMM DD, YYYY")
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 400, quality: 60) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
export default BlogIndex;
