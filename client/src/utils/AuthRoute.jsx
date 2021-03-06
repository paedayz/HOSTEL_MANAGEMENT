import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({component: Component, ...rest}) => {
    const authenticated = useSelector(state => state.user.authenticated)
    
    return (
        <Route
        {...rest}
        render={(props) =>
            authenticated === true ? (
            <Component {...props} />
            ) : (
            <Redirect to="/auth" />
            )
        }
        />
    );
};


export default AuthRoute;