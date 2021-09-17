import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import GradientHeading from '../components/GradientHeading/GradientHeading';
import Layout, { textVariants, fade } from '../components/layout';
import Code from '../components/Code';
import HeaderImage from '../components/HeaderImage/HeaderImage';
import theme from 'prism-react-renderer/themes/nightOwl';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import BlogContentLayout from '../Layouts/BlogContentLayout';
import Slugger from 'github-slugger';
import { Helmet } from 'react-helmet';
import { Share } from '../components/share';
import { motion } from 'framer-motion';
import { renderBlogPosts } from '../components/BlogPost/BlogSearchContainer';
import { Footer } from '../components/Footer';
import { closestIndexTo } from 'date-fns';

const slugger = new Slugger();

const LiveCode = props => (
  <div id="react-live">
    <LiveProvider code={props.children.props.children.trim()} theme={theme}>
      <LiveEditor />
      <LiveError />
      <center>
        <LivePreview />
      </center>
    </LiveProvider>
  </div>
);

const shortcodes = { Link }; // Provide common components here

const replacedComponents = {
  pre: preProps => {
    if (preProps.children.props['react-live']) {
      return <LiveCode {...preProps} />;
    }
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />;
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />;
    }
  },
  h1: props => <GradientHeading headingLevel={1} {...props} />,
  //   h2: props => <GradientHeading headingLevel={2} {...props} />,
  //   h3: props => <GradientHeading headingLevel={3} {...props} />,
  //   h4: props => <GradientHeading headingLevel={4} {...props} />,
  //   h5: props => <GradientHeading headingLevel={5} {...props} />,
  //   h6: props => <GradientHeading headingLevel={6} {...props} />,
};

const allComponents = { ...shortcodes, ...replacedComponents };

export default function PageTemplate({ location, data: { mdx, allMdx } }) {
  slugger.reset();
  const { edges: posts } = allMdx;

  console.log(posts);
  const allPosts = posts
    .filter(post => post.node.id !== mdx.id)
    .sort(
      (a, b) =>
        new Date(b.node.frontmatter.dateCreated) -
        new Date(a.node.frontmatter.dateCreated)
    );
  const allPostsDates = allPosts.map(
    post => new Date(post.node.frontmatter.dateCreated)
  );
  const dateToCompare = new Date(mdx.frontmatter.dateCreated);
  const result = closestIndexTo(dateToCompare, allPostsDates);
  console.log(dateToCompare, allPosts, result);

  let related = allPosts.splice(result, result + 3);
  console.log(related);

  if (related.length !== 3) {
    related = allPosts.splice(allPosts.length - 3, allPosts.length);
  }

  if (related.length > 3) related.length = 3;

  return (
    <Layout location={location} showProgressBar={true}>
      <Helmet>
        <title>{mdx.frontmatter.title}</title>
        <meta name="title" content={mdx.frontmatter.title} />
        <meta name="description" content={mdx.frontmatter.undertitle} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://webanimation.blog${mdx.fields.slug}`}
        />
        <meta property="og:title" content={mdx.frontmatter.title} />
        <meta property="og:description" content={mdx.frontmatter.undertitle} />
        <meta
          property="og:image"
          content={mdx.frontmatter.featuredImage.childImageSharp.fluid.src}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://webanimation.blog${mdx.fields.slug}`}
        />
        <meta property="twitter:title" content={mdx.frontmatter.title} />
        <meta
          property="twitter:description"
          content={mdx.frontmatter.undertitle}
        />
        <meta
          property="twitter:image"
          content={mdx.frontmatter.featuredImage.childImageSharp.fluid.src}
        />
        <meta name="author" content="Mees Rutten" />
        <link
          rel="canonical"
          href={`https://webanimation.blog${mdx.fields.slug}`}
        />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context":"http://schema.org",
            "@type": "BlogPosting",
            "image": "${
              mdx.frontmatter.featuredImage.childImageSharp.fluid.src
            }",
            "url": "${location.href}",
            "headline": "${mdx.frontmatter.title}",
            "alternativeHeadline": "${mdx.frontmatter.undertitle}",
            "dateCreated": "${new Date(
              mdx.frontmatter.dateCreated
            ).toISOString()}",
            "datePublished": "${new Date(
              mdx.frontmatter.datePublished
            ).toISOString()}",
            "dateModified": "${new Date(
              mdx.frontmatter.dateModified
            ).toISOString()}",
            "inLanguage": "nl-NL",
            "isFamilyFriendly": "true",
            "copyrightYear": "${new Date().getFullYear}",
            "copyrightHolder": "Mees Rutten",
            "contentLocation": {
              "@type": "Place",
              "name": "Amsterdam, Netherlands"
            },
            "accountablePerson": {
              "@type": "Person",
              "name": "${mdx.frontmatter.author || "Mees Rutten"}",
              "url": "https://webanimation.blog"
            },
            "author": {
              "@type": "Person",
              "name": "${mdx.frontmatter.author || "Mees Rutten"}",
              "url": "https://webanimation.blog"
            },
            "creator": {
              "@type": "Person",
              "name": "Mees Rutten",
              "url": "https://webanimation.blog"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Level30Wizards",
              "url": "https://level30wizards.com/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.level30wizards.com/images/logo.png",
                "width":"400",
                "height":"55"
              }
            },
            "mainEntityOfPage": "True",
            "keywords": [
              "web",
              "animation",
              "blog"
            ],
            "genre":["webdevelopment","animation"],
            "articleSection": "animation",
            "articleBody": "${mdx.frontmatter.undertitle}"
          }
          `,
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Blog",
              "item": "https://webanimation.blog/blog"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "${mdx.frontmatter.title}",
              "item": "https://webanimation.blog${mdx.fields.slug}"
            }]
          }
        `,
        }}
      />

      <BlogContentLayout>
        <MDXProvider components={allComponents}>
          <div
            style={{ minHeight: '60vh' }}
            className="relative lg:flex-1 flex items-center before-shadow"
          >
            <motion.div
              initial="exit"
              animate="enter"
              exit="exit"
              variants={textVariants}
              className="blog-content lg:flex-1 mx-auto py-8 lg:py-24 px-8"
            >
              <h1>{mdx.frontmatter.title}</h1>
              <p className="mt-2 italic">{mdx.frontmatter.undertitle}</p>
              <div
                style={{
                  marginBottom: '1rem',
                }}
              >
                <Share
                  socialConfig={{
                    twitterHandle: 'meesrttn',
                    config: {
                      url: location.href,
                      title: mdx.frontmatter.title,
                      text: mdx.frontmatter.undertitle,
                    },
                  }}
                />
              </div>
              <small>{mdx.fields.readingTime.text}</small>
              <footer
                className="text-xs font-bold mt-16"
                style={{
                  marginBottom: '0',
                }}
              >
                by {mdx.frontmatter.author || "Mees Rutten"} | {new Date(mdx.frontmatter.date).toDateString()}
              </footer>
              {mdx.frontmatter.imgCredit.length ? (
                <motion.p
                  className="absolute"
                  initial="exit"
                  animate="enter"
                  exit="exit"
                  variants={fade}
                  transition={{
                    delay: 3,
                    duration: 1,
                  }}
                  style={{
                    bottom: '-1rem',
                    right: '0.5rem',
                    fontSize: '.675rem',
                    margin: 0,
                    opacity: 0.35,
                  }}
                >
                  source: {mdx.frontmatter.imgCredit}
                </motion.p>
              ) : null}
            </motion.div>
          </div>
          <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={fade}
            transition={{
              delay: 2.5,
              duration: 0.5,
            }}
          >
            <HeaderImage
              fluid={mdx.frontmatter.featuredImage.childImageSharp.fluid}
            />
          </motion.div>
          <div className="blog-content lg:flex-1 mx-auto py-8 lg:py-24 px-8">
            <MDXRenderer mdx={mdx} slugger={slugger} headings={mdx.headings}>
              {mdx.body}
            </MDXRenderer>
          </div>
        </MDXProvider>
        <div className="flex justify-center items-center lg:flex-1 mx-auto py-4 lg:py-8 px-8">
          <Share
            socialConfig={{
              twitterHandle: 'meesrttn',
              config: {
                url: location.href,
                title: mdx.frontmatter.title,
                text: mdx.frontmatter.undertitle,
              },
            }}
          />
        </div>
        {related.length ? (
          <div className="lg:flex-1 mx-auto py-8 lg:py-24 px-8">
            <h3 className="font-bold text-xl text-center my-8">
              Other posts you might like
            </h3>
            {renderBlogPosts(related)}
          </div>
        ) : null}
      </BlogContentLayout>
      <Footer />
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }, fields: { instance: { eq: "blog" } }) {
      id
      body
      tableOfContents
      headings {
        depth
        value
      }
      fields {
        slug
        instance
        readingTime {
          text
        }
      }
      frontmatter {
        title
        undertitle
        date(formatString: "MMMM DD, YYYY")
        dateCreated(formatString: "MMMM DD, YYYY")
        datePublished(formatString: "MMMM DD, YYYY")
        dateModified(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1040, quality: 85) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        imgCredit
      }
    }
    allMdx(filter: { fields: { instance: { eq: "blog" } } }) {
      edges {
        node {
          id
          excerpt(truncate: false, pruneLength: 100)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            dateCreated(formatString: "MMMM DD, YYYY")
            datePublished(formatString: "MMMM DD, YYYY")
            dateModified(formatString: "MMMM DD, YYYY")
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 700, quality: 85) {
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

function preToCodeBlock(preProps) {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.props.mdxType === 'code'
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      className = '',
      ...props
    } = preProps.children.props;

    const matches = className.match(/language-(?<lang>.*)/);

    return {
      codeString: codeString.trim(),
      className,
      language:
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : '',
      ...props,
    };
  }
}
