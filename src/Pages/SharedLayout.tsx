import { Outlet } from 'react-router-dom';
import StyledNavbar from "../Components/StyledNavbar";

const SharedLayout = () => {
    return (
        <>
            <StyledNavbar />
            <div
                style={{
                    margin: '16px 0 0 0',
                    }}
            >
                <Outlet />
            </div>
        </>
    );
};
export default SharedLayout;
