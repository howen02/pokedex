import { useNavigate } from "@remix-run/react";
import Searchbar from "./Searchbar";

const Navbar = () => {
    const navigate = useNavigate();
    const returnToHomeScreen = () => {
        navigate(`/`);
    };

    return (
        <div className="bg-blue-900 flex gap-5 px-5 py-6 items-center fixed w-full">
            <h1 className="text-4xl text-yellow-400 font-semibold hover:cursor-pointer" onClick={() => returnToHomeScreen()}>Pokedex</h1>
            <Searchbar />
        </div>
    );
};

export default Navbar;
