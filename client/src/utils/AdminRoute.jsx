import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({component: Component, ...rest}) => {
    const authenticated = useSelector(state => state.user.authenticated)
    const status = useSelector(state => state.user.credentials.status)
    
    return (
        <Route
        {...rest}
        render={(props) =>
            authenticated === true && status === 'admin' ? (
            <Component {...props} />
            ) : (
            <Redirect to="/" />
            )
        }
        />
    );
};


export default AdminRoute;