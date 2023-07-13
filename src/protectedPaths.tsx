import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { ROUTE_PATHS } from "@constants/routePaths";
import { RootState } from "store";

export const requireAuth = ({ child }: { child: React.ReactNode }) => {
    const isLoggedIn = useSelector(
        (state: RootState) => state.isLoggedIn.value
    );
    const docCreated = useSelector(
        (state: RootState) => state.isLoggedIn.docCreated
    );
    return isLoggedIn && docCreated ? (
        child
    ) : (
        <Navigate to={ROUTE_PATHS.auth} />
    );
};

export const notLoggedIn = ({ child }: { child: React.ReactNode }) => {
    const isLoggedIn = useSelector(
        (state: RootState) => state.isLoggedIn.value
    );
    const docCreated = useSelector(
        (state: RootState) => state.isLoggedIn.docCreated
    );
    return isLoggedIn && docCreated ? (
        <Navigate to={ROUTE_PATHS.home} />
    ) : (
        child
    );
};
