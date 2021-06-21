const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const articleTemplate = path.resolve(`./src/templates/articleTemplate.js`);
    const result = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                pagetype
              }
            }
          }
        }
      }
    `)
  
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.pagetype === 'article') {
        createPage({
          path: node.fields.slug,
          component: articleTemplate,
          context: {
            slug: node.fields.slug
          }
        }); 
      }   
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    _.each(result.data.allMarkdownRemark.edges, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: path.resolve("src/templates/tagTemplate.js"),
        context: {
          tag,
        },
      })
    })

    const articlesPerPage = 3
    const articles = []
    result.data.allMarkdownRemark.edges.forEach(edge => {
      if (edge.node.frontmatter.pagetype === 'article') {
        articles.push(edge)
      }
    })
    const numPages = Math.ceil(articles.length / articlesPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/articles` : `/articles/${i+1}`,
        component: path.resolve("./src/templates/articlesTemplate.js"),
        context: {
          limit: articlesPerPage,
          skip: i*articlesPerPage, 
          numPages,
          currentPage: i+1
        }
      })
    })


}