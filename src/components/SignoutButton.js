import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import React from 'react';
import { Link } from "react-router-dom";


const StyledLink = styled(Link)({
    textDecoration: 'none'
});

function SignoutButton(props) {

    

    return (
        <StyledLink to={props.to}>
            <Button variant='contained' {...props}>{props.children}</Button>
        </StyledLink>
    )
}

export default SignoutButton;