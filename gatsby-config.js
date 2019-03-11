module.exports = {
  siteMetadata: {
    title: 'Ben Booth',
    author: 'Ben Booth',
    description: `Hi 👋 I'm Ben and I make things for the web. Sometimes I write things here and sometimes I talk about things. I'm also a husband & father, football (soccer) addict and a Christian.`,
    siteUrl: 'http://benbooth.dev',
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
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
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
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
        omitGoogleFont: true,
      },
    },
  ],
};
