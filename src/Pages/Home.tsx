import {FC} from "react";
import {Link} from "react-router-dom";

export const Home:FC = () => {
    return (
        <>
            <h1
                style={{
                    textAlign: 'center',
                    }}
            >Welcome to Sang-ji</h1>
            <div
                style={{
                    textAlign: 'center',
                    width: '100%',
                    margin: ' 30px 0'
                    }}
            >
                <Link to={'/shopping'}
                      style={{
                          textAlign: 'center',
                          textDecoration: 'none',
                          fontSize: '2rem',
                      }}>
                    Go to the 3D Menu
                </Link>
            </div>

        </>
    )
}

export default Home