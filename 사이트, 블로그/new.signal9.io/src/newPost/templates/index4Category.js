import React from "react";
import { graphql } from "gatsby";
import SEO from "../seo";
import Header from "../../blog_components/header";
import Footer from "../../blog_components/footer";
import PostList from "../organisms/postList";
import SideLayout from "./sideLayout";


const CategoryList = ({ location, pageContext, data }) => {
    const category = pageContext.category;
    const { title, pageListSize } = data.site.siteMetadata;
    const posts = data.allMarkdownRemark.edges;
    console.log(data);
    console.log(pageContext);


    return (
        <React.Fragment>
            <Header />
            <SideLayout location={location} title={`"${category}" 관련 글 목록`} activeMenu={category}>
                <SEO title={`"${category}" 관련 글 목록`} />
                <div className="container" style={{ 'margin-right': 280, flexDirection: 'column', alignItems: 'center' }}>
                    <PostList
                        data={posts}
                        page={pageContext}
                        path={`/category/${category}`}
                        pageListSize={pageListSize}
                    />
                </div>
            </SideLayout>
            <Footer />
        </React.Fragment>

    );
};

export const pageQuery = graphql`
    query($skip: Int!, $limit: Int!, $category: String) {
        site {
            siteMetadata {
                pageListSize
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { category: { eq: $category } } }
            skip: $skip
            limit: $limit
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    excerpt(pruneLength: 300)
                    frontmatter {
                        title
                        date(formatString: "YYYY-MM-DD")
                        category
                        tags
                        cover {
                            childImageSharp {
                                fixed(width: 120, height: 120) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default CategoryList;
