import { Routes, Route } from "react-router-dom";

import InvalidUrlPage from "@components/InvalidUrlPage";
import { ROUTE_PATHS } from "@constants/routePaths";
import AuthPage from "@containers/AuthPage";
import HomePage from "@containers/HomePage";
import ItemRequestPage from "@containers/ItemRequestPage";
import MyItemRequests from "@containers/MyItemRequests";
import NewItemRequestPage from "@containers/NewItemRequestPage";
import ProfilePage from "@containers/ProfilePage";
import { requireAuth, notLoggedIn } from "protectedPaths";

/**
 * To provide routes for app
 */
const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path={ROUTE_PATHS.home}
                element={requireAuth({ child: <HomePage /> })}
            />
            <Route
                path={ROUTE_PATHS.newItemRequest}
                element={requireAuth({ child: <NewItemRequestPage /> })}
            />
            <Route
                path={ROUTE_PATHS.myItemRequests}
                element={requireAuth({ child: <MyItemRequests /> })}
            />
            <Route
                path={`${ROUTE_PATHS.itemRequest}:itemid`}
                element={requireAuth({ child: <ItemRequestPage /> })}
            />
            <Route
                path={ROUTE_PATHS.auth}
                element={notLoggedIn({ child: <AuthPage /> })}
            />
            <Route
                path={ROUTE_PATHS.profile}
                element={requireAuth({ child: <ProfilePage /> })}
            />
            <Route
                path={"*"}
                element={requireAuth({ child: <InvalidUrlPage /> })}
            />
        </Routes>
    );
};

export default AppRoutes;
