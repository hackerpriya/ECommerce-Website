import { Navigate, useLocation } from "react-router-dom";
const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation(); //Current page ka URL lene ke liye

    // Agar user logged in nahi hai aur login/register page pe bhi nahi hai
    if (!isAuthenticated &&
       !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
           return <Navigate to="/auth/login"/>; // Login page pe redirect karo
    }

    // Agar user already logged in hai aur phir bhi /login ya /register page pe jata hai
    if (isAuthenticated &&
       (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard"/>; // Admin ko admin panel pe bhejo
        } else {
            return <Navigate to="/shop/home"/>; // Normal user ko shop page pe bhejo
        }
    }

    // Agar non-admin user admin pages access karne ki koshish karega
    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes('/admin')) {
        return <Navigate to="/unauth-page"/>; // Unauthorized page dikhao
    }

    // Agar admin user shopping pages access karega
    if (isAuthenticated && user?.role === "admin" && location.pathname.includes('/shop')) {
        return <Navigate to="/admin/dashboard"/>; // Wapas admin panel pe bhejo
    }

    return <>{children}</>; //  Jo bhi child component hai usko render karo
};

export default CheckAuth

