const path = require('path');

module.exports = {
    siteMetadata: {
        title: `WILLIAM JAY`,
        description: `Website of William Jay, writer, software developer, and educator`,
        author: `willjw3`
    },
    plugins: [
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-transformer-remark`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `articles`,
              path: `${__dirname}/data/articles`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `topics`,
              path: `${__dirname}/data/topics`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `info`,
              path: `${__dirname}/data/info`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `Raleway`,
                    `Montserrat`,
                    `source sans pro\:300, 400,400i,700`
                ],
                display: `swap`
            }
        }
    ]
}