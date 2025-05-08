/**
 * @type {import('gatsby').GatsbyConfig}
 */

// Define site colors config
const config = {
  colors: {
    green: '#64ffda', // Added this as it was missing in the original config
  },
};

module.exports = {
  siteMetadata: {
    title: `Omar Anas Portofolio`,
    description: `Your site description`,
    author: `Omar Anas`,
    image: '/icon.png',
    siteUrl: `https://omar-anas.vercel.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Omar Anas`,
        short_name: `OS`,
        start_url: `/`,
           
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      }

    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-external-links
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
         
   
          
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
  ]
};