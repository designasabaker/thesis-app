import {FC} from "react";
import {Link} from "react-router-dom";

export const Home:FC = () => {
    return (
        <div className={"h-screen flex justify-center items-center"}>
            <div className={"text-center flex flex-col"}>
                <h1 className={"text-2xl text-white"}>Sang-Ji</h1>
                <p className={"pb-12 text-white"}>A unique interactive shopping experience</p>
                <Link
                    to={'/shopping'}
                    className={"text-sky-500 border border-sky-500 px-6 py-3 rounded-full hover:text-white hover:bg-sky-500 transition duration-300 ease-in-out"}
                >
                    Browse our interactive menu :)
                </Link>
                <Link
                    className={'text-slate-500 hover:text-white transition duration-300 ease-in-out mt-4'}
                    to={'/menu'}>
                    Use the default menu
                </Link>
            </div>
        </div>
    )
}

export default Home