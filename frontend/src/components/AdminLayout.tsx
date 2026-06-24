import { Link, useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("rentnest_token");
    localStorage.removeItem("rentnest_admin");
    navigate("/admin/login");
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 h-full w-64 bg-black p-6 text-white">
        <h1 className="text-2xl font-bold">RentNest Admin</h1>

        <nav className="mt-10 flex flex-col gap-4">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/properties">Properties</Link>
          <Link to="/admin/properties/new">Add Property</Link>
          <Link to="/admin/enquiries">Enquiries</Link>
          <button onClick={handleLogout} className="mt-8 text-left text-red-300">
            Logout
          </button>
        </nav>
      </aside>

      <section className="ml-64 p-8">{children}</section>
    </main>
  );
};

export default AdminLayout;