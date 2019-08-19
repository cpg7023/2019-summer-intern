import React from "react"
import styled from "styled-components";
import { graphql, Link } from 'gatsby'
import Footer from "../../blog_components/footer"
import Header from "../../blog_components/header"
import SideLayout from "../templates/sideLayout";
import PostList from "../organisms/postList";
import SEO from "../seo";


const Main = styled.div`
    margin-top: 50px;
    margin-left: 0;
    margin-right: 20px;
    @media all and (min-width: 992px) {
        margin-top: 0;
        margin-left: 20px !important;
    }
`;

//const BlogPage = () =>{
class BlogPage extends React.Component {
    render() {
        const { data, location, pageContext } = this.props;
        const { title, pageListSize } = data.site.siteMetadata;
        const posts = data.allMarkdownRemark.edges;

        return (
            <React.Fragment>
                <Header />
                <SideLayout location={location} title={title}>
                    <SEO title="Main" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
                    <div className="container" style={{'margin-right': 280, flexDirection: 'column', alignItems: 'center'}}>
                        <PostList
                            data={posts}
                            page={pageContext}
                            path={"/blog"}
                            pageListSize={pageListSize}
                        />
                    </div>
                </SideLayout>
                <Footer />
            </React.Fragment>
        );
    }
}

export default BlogPage

export const pageQuery = graphql`
    query($skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
                pageListSize
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            skip: $skip
            limit: $limit
        ) {
            edges {
                node {
                    excerpt(pruneLength: 300)
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "YYYY-MM-DD")
                        title
                        category
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
