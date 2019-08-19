import React from "react";
import PostListItem from "../molecules/postListItem";
import Pagination from "../molecules/pagination";

const PostList = ({ data, page, path, pageListSize }) => {
    return (
        <React.Fragment>
            {data.map(({ node }) => {
                return <PostListItem key={node.fields.slug} node={node}>{node}</PostListItem>;
            })}
            {page && (
                <Pagination page={page} path={path} listSize={pageListSize} />
            )}
        </React.Fragment>
    );
};

export default PostList;
