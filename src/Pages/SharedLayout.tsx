import { Outlet } from 'react-router-dom';
import StyledNavbar from "../Components/StyledNavbar";

const SharedLayout = () => {
    return (
        <>
            <StyledNavbar />
            <Outlet />
        </>
    );
};
export default SharedLayout;
