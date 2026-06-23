import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          RentNest
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-black">
            Home
          </Link>

          <Link to="/properties" className="text-gray-700 hover:text-black">
            Properties
          </Link>

          <Link
            to="/admin/login"
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;