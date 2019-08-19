
const siteConfig = require("./config.js");

module.exports = {
  siteMetadata: {
    title: siteConfig.title,
    description: siteConfig.description,
    defaultKeywords: siteConfig.defaultKeywords,
    authorNickName: siteConfig.authorNickName,
    authorFullName: siteConfig.authorFullName,
    category: siteConfig.category,
    pageListSize: siteConfig.pageListSize
  },
  plugins: [
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [`en`, `ko`],
        // language file path
        defaultLanguage: `ko`,
        // option to redirect to `/ko` when connecting `/`
        redirect: false,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'signal9.com'
      },
    },
    `gatsby-plugin-react-helmet`,
    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `post`,
        path: `${__dirname}/post`,
      },
    },
    
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
          plugins: [
              {
                  resolve: `gatsby-remark-images`,
                  options: {
                      maxWidth: 590
                  }
              },
              {
                  resolve: `gatsby-remark-responsive-iframe`,
                  options: {
                      wrapperStyle: `margin-bottom: 1.0725rem`
                  }
              },
              {
                  resolve: `gatsby-remark-prismjs`,
                  options: {
                      classPrefix: "language-",
                      inlineCodeMarker: null,
                      aliases: {},
                      showLineNumbers: false,
                      noInlineHighlight: false,
                      languageExtensions: [
                          {
                              language: "superscript",
                              extend: "javascript",
                              definition: {
                                  superscript_types: /(SuperType)/
                              },
                              insertBefore: {
                                  function: {
                                      superscript_keywords: /(superif|superelse)/
                                  }
                              }
                          }
                      ]
                  }
              },
              
              `gatsby-remark-smartypants`
          ]
      }
  },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `assets/img/logo-dark.png`, // This path is relative to the root of the site.
      },
    },
   
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#663399',
          'font-family': 'Arial',
          'layout-body-background': '#66ff79'
        }
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
          src: `${__dirname}/src`,
          pages: `${__dirname}/src/pages`

      }
    },
    {
      resolve: `gatsby-plugin-styled-components`
    },
    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
