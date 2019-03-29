module.exports = {
  siteMetadata: {
    title: 'Ben Booth',
    description: `Hi 👋 I'm Ben and I make things for the web.///Sometimes I write things here and sometimes I talk about things. I'm also a husband & father, football (soccer) addict and a Christian.`,
    siteUrl: 'https://benboothdev.netlify.com', // TODO: change to benbooth.dev before go live!
    author: {
      name: 'Ben Booth',
      bio:
        'Software developer specialising in JavaScript, husband & father, football (soccer) addict and Christian.',
      location: 'Wollongong, Australia',
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
    'gatsby-plugin-feed',
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
