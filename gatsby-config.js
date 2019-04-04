module.exports = {
  siteMetadata: {
    title: 'Ben Booth',
    description: `Hi 👋 I'm Ben and I make things for the web. Sometimes I write things here and sometimes I talk about things. I'm also a husband & father, football (soccer) addict and a Christian.`,
    shortDescription: `Hi 👋 I'm Ben and I make things for the web.`,
    siteUrl: 'https://benbooth.dev',
    copyright: `© ${new Date().getFullYear()} Ben Booth`,
    author: 'Ben Booth',
    social: {
      github: 'bkbooth',
      twitter: 'bkbooth11',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets`,
        name: 'assets',
        ignore: ['**/README.md'],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 710,
              quality: 60,
              withWebp: { quality: 80 },
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                copyright
                author
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(({ node }) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.description || node.excerpt,
                  url: `${site.siteMetadata.siteUrl}/${node.fields.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/${node.fields.slug}`,
                  custom_elements: [{ 'content:encoded': node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Ben Booth',
        short_name: 'Ben Booth',
        start_url: '/',
        background_color: '#0f6d94',
        theme_color: '#2197c8',
        display: 'minimal-ui',
        icon: 'src/assets/bb-logo.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
        omitGoogleFont: true,
      },
    },
    'gatsby-plugin-netlify', // Must be last plugin
  ],
};
