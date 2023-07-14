import {NavLink} from "react-router-dom";

const NavLinkStyle = ({isActive}:any) => {
    return {
        margin: 0,
        padding: '0 5px',
        textDecoration: 'none',
        color: isActive? 'white' : 'gray',
    }
}
export const StyledNavbar = () => {
    return (
        <div style={{
            position: 'fixed',
            bottom: 3,
            height: '16px',
            width: '100%',
            backgroundColor: 'transparent',
        }}>
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                }}
            >
                <NavLink style={NavLinkStyle} to="/">Home</NavLink>
                <NavLink style={NavLinkStyle} to="/menu">Menu</NavLink>
                <NavLink style={NavLinkStyle} to="/shopping">Interactive Menu</NavLink>
            </div>
        </div>

    )
}

export default StyledNavbar;