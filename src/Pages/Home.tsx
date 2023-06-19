import {FC} from "react";
import {Link} from "react-router-dom";

export const Home:FC = () => {
    return (
        <div className={"h-screen flex justify-center items-center"}>
            <div className={"text-center"}>
                <h1 className={"text-2xl text-white"}>Welcome to Sang-ji</h1>
                <p className={"pb-12 text-white"}>A unique 2D shopping experience</p>
                <Link
                    to={'/shopping'}
                    className={"text-sky-500 border border-sky-500 px-6 py-3 rounded-full hover:text-white hover:bg-sky-500 transition duration-300 ease-in-out"}
                >
                    Go to the 3D Menu
                </Link>
            </div>
        </div>
    )
}

export default Home