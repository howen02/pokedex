import Searchbar from "./Searchbar";

const Navbar = () => {
    return (
        <div className="bg-red-500 flex gap-5 px-5 py-6 items-center">
            <h1 className="text-4xl font-semibold">Pokemon</h1>
            <Searchbar />
        </div>
    );
};

export default Navbar;
