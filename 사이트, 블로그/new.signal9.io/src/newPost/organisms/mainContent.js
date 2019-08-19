import React from "react";
import styled from "styled-components";

const StyledMainContent = styled.section`
    overflow: auto;
    padding: 20px;

    @media all and (min-width: 992px) {
        padding: 50px 75px 50px 50px;
    }
`;

const MainContent = ({ children }) => {
    return <StyledMainContent>{children}</StyledMainContent>;
};

export default MainContent;
