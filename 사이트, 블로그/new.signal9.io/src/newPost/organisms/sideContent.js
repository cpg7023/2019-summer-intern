import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import TagList from "../molecules/tagList";
import { injectIntl, FormattedMessage, Link } from "gatsby-plugin-intl";

const StyledSideContent = styled.nav`
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
        display: none;
    }

    overflow: auto;
    padding: 20px 0;
    margin-left: 10px;
    alignItems: center;
   

    ul {
        height: 100%;
        margin: 0;
        list-style: none;
    }

    ul li {
        margin: 0;
    }

    ul li div {
        padding: 5px;
        margin-left: 50px;
    }

   
`;

const Category = styled(Link)`
    display: block;
    color: ${props => (props.active ? "white" : "black")};
    background-color: ${props => props.active && "#49c39e"};
    text-transform: uppercase;
    height: 70px;

    &:hover {
        text-decoration: none;
        background-color: #49c39e;
        color: black !important;
    }

    i {
        padding-left: 30px;
        margin: 10px 20px 10px 30px;
        vertical-align: middle;
    }

    span {
        vertical-align: middle;
    }
`;

const SideContent = ({ activeMenu }) => (
    <StaticQuery
        query={query}
        render={data => {
            const posts = data.allMarkdownRemark.edges;
            const category = data.site.siteMetadata.category;
            let tag = [];
            posts.forEach((post, index) => {
                if (post.node.frontmatter.tags) {
                    tag = Array.from(
                        new Set([...tag, ...post.node.frontmatter.tags])
                    );
                }
            });
                
            return (
                <StyledSideContent>
                    <h2 style={{alignItems:'center'}}><FormattedMessage id="category" /></h2>
                    {category.map(node => {
                        const isActive = activeMenu === node.id;
                        return (
                            <Category
                                key={node.id}
                                to={`/blog/category/${node.id}`}
                                active={isActive ? 1 : 0}
                            >
                                <i className={`fas fa-fw`} />
                                <span><h4>{node.id}</h4></span>
                            </Category>   
                        );
                    })}
                    <p/>
                    <hr/>
                    <h2 style={{alignItems:'center'}}><FormattedMessage id="tag" /></h2>
                    <div className="container" style={{width:210}}>
                    <TagList data={tag}/>
                    </div>
                </StyledSideContent>
            );
        }}
    />
);

const query = graphql`
    query {
        site {
            siteMetadata {
                title
                category {
                    id
                }
            }
        }
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
                    }
                }
            }
        }
    }
`;

export default injectIntl(SideContent);
