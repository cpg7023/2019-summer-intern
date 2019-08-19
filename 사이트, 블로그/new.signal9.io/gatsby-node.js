/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`);
const { paginate } = require(`gatsby-awesome-pagination`);
const siteConfig = require("./config.js");

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    //const locales = ["en", "kor"];
    const blogPost = path.resolve(`./src/blog_templates/blogPost.js`);

    /*locales.forEach(locale => {
        const prefix = locale === "kor" ? "" : `/${locale}`;
        createPage({
          path: `${prefix}/`,
          component: path.resolve(`./src/pages/en.js`),
          context: { locale }
        });
      });*/
    return graphql(
        `
            {
                allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: DESC }
                    limit: 1000
                ) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                tags
                                category
                                date(formatString: "YYYY-MM-DD")
                                cover {
                                    childImageSharp {
                                        fixed(width: 1000) {
                                            src
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    ).then(result => {
        if (result.errors) {
            throw result.errors;
        }
        const posts = result.data.allMarkdownRemark.edges;
        let tags = [];
        let category = [];
 

        // Create blog posts pages.
        posts.forEach((post, index) => {
            const previous = index === posts.length - 1 ? null : posts[index + 1].node;
            const next = index === 0 ? null : posts[index - 1].node;
            const cat = post.node.frontmatter.category;

            // Create tag & category list
            if (post.node.frontmatter.tags) {
                tags = Array.from(
                    new Set([...tags, ...post.node.frontmatter.tags])
                );
            }

            if (cat) {
                category = Array.from(new Set([...category, ...[cat]]));
            }


            createPage({
                path: post.node.fields.slug,
                component: blogPost,
                context: {
                    slug: post.node.fields.slug,
                    previous,
                    next,
                    
                }
            });
        });

        paginate({
            createPage,
            items: posts,
            itemsPerPage: siteConfig.postsPerPage,
            pathPrefix: "/blog",
            component: path.resolve("./src/newPost/templates/blog.js")
        });
        
        category.forEach(cat => {
            const catEdges = posts.filter(
                ({ node }) =>
                    node.frontmatter.category &&
                    node.frontmatter.category.includes(cat)
            );
            paginate({
                createPage,
                items: catEdges,
                itemsPerPage: siteConfig.postsPerPage,
                pathPrefix: `/blog/category/${cat}`,
                component: path.resolve(
                    "./src/newPost/templates/index4Category.js"
                ),
                context: {
                    category: `${cat}`
                }
            });
        });

        tags.forEach(tag => {
            const tagEdges = posts.filter(
                ({ node }) =>
                    node.frontmatter.tags && node.frontmatter.tags.includes(tag)
            );
            paginate({
                createPage,
                items: tagEdges,
                itemsPerPage: siteConfig.postsPerPage,
                pathPrefix: `/blog/tags/${tag}`,
                component: path.resolve(
                    "./src/newPost/templates/index4Tag.js"
                ),
                context: {
                    tag: `${tag}`
                }
            });
        });

        return null;
    });
}

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value
        });
    }
};


/*exports.onCreateBabelConfig = ({ actions }) => {
    actions.setBabelPlugin({
        name: 'babel-plugin-import',
        options: {
            libraryName: 'antd',
            style: true
        }
    })
}*/