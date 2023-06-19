import { Outlet } from 'react-router-dom';
import StyledNavbar from "../Components/StyledNavbar";

const SharedLayout = () => {
    return (
        <div className={"bg-black"}>
            <StyledNavbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};
export default SharedLayout;
