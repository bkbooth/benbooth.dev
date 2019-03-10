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
    'gatsby-plugin-netlify-cms',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
        omitGoogleFont: true,
      },
    },
    'gatsby-plugin-netlify',
  ],
};
