import {NavLink} from "react-router-dom";

const NavLinkStyle = ({isActive}:any) => {
    return {
        margin: 0,
        padding: '0 5px',
        textDecoration: 'none',
        color: isActive? 'blue' : 'black',
    }
}
export const StyledNavbar = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                height: '16px',
                width: '120px',
            }}
        >
            <NavLink style={NavLinkStyle} to="/">Home</NavLink>
            <NavLink style={NavLinkStyle} to="/shopping">3dMenu</NavLink>
        </div>
    )
}

export default StyledNavbar;