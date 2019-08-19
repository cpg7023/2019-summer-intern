import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from "styled-components";
import Header from "../blog_components/header";
import Footer from "../blog_components/footer";
import PostInfo from "../newPost/molecules/postInfo";
import TagList from "../newPost/molecules/tagList";
import SideLayout from "../newPost/templates/sideLayout";
import SEO from "../newPost/seo";

const PostHeader = styled.div`
    h1 {
        padding: 0;
        margin-bottom: 10px;
        border: none;
    }

    hr {
        margin: 20px 0 40px 0;
    }
`;

const PostContent = styled.div`
    .gatsby-highlight pre[class*="language-"] {
        padding: 20px;
    }
`;

const PostFooter = styled.div`
    margin-top: 40px;

    hr {
        margin: 20px 0;
    }
`;

class BlogPost extends React.Component {
    render() {
        const { next, previous } = this.props.pageContext
        console.log(this.props.pageContext)
        const post = this.props.data.markdownRemark;
        const {
            title,
            date,
            category,
            tags
        } = this.props.data.markdownRemark.frontmatter;

        return (
            <React.Fragment>
                <Header />
                <SideLayout></SideLayout>
                <SEO title={title} description={post.excerpt} keywords={tags || []} />
                <div className="container" style={{ padding: '20px', 'margin-right': 280, 'margin-left': 280, flexDirection: 'column', alignItems: 'center', fontFamily: 'avenir' }}>
                    <hr />
                    <PostHeader>
                        <h1>{title}</h1>
                        <PostInfo category={category} date={date} />
                        <hr />
                    </PostHeader>

                    <PostContent>
                        <div dangerouslySetInnerHTML={{ __html: post.html }} />
                    </PostContent>

                    <PostFooter>
                        <TagList data={tags} />
                        <hr />
                    </PostFooter>
                    <div style={{ display: 'inline' }}>
                        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'avenir' }}>
                            {next && <Link to={`/${next.fields.slug}`}>
                                다음
            </Link>}

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'avenir' }}>
                            {previous && <Link to={`/${previous.fields.slug}`}>
                                이전
            </Link>}
                            <p />
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default BlogPost;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                category
                tags
            }
        }
    }
`;
