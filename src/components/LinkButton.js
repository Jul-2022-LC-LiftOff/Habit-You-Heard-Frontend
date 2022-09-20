import React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { styled } from '@mui/system';

const StyledLink = styled(Link)({
    textDecoration: 'none'
});

function LinkButton(props) {
    return (
        <>
            <a href={props.to}>
                <Button variant='contained' {...props}>{props.children}</Button>
            </a>
                    {/*<StyledLink to={props.to}>
            <Button variant='contained' {...props}>{props.children}</Button>
        </StyledLink>*/}
        </>
    )
}

export default LinkButton;