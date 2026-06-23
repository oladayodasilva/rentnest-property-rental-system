import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Find your next apartment with ease.
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            Browse verified rental properties, request inspections, and connect
            with trusted real estate agents.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/properties"
              className="rounded-lg bg-black px-6 py-3 text-white"
            >
              Browse Properties
            </Link>

            <Link
              to="/properties"
              className="rounded-lg border px-6 py-3 text-gray-800"
            >
              Request Inspection
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
            alt="Modern house"
            className="h-[420px] w-full rounded-xl object-cover"
          />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          <div className="rounded-xl border p-6">
            <h3 className="text-xl font-semibold">Verified Listings</h3>
            <p className="mt-3 text-gray-600">
              Browse properties with clear details and transparent pricing.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="text-xl font-semibold">Easy Inspections</h3>
            <p className="mt-3 text-gray-600">
              Request inspection dates directly from the property page.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="text-xl font-semibold">Agent Dashboard</h3>
            <p className="mt-3 text-gray-600">
              Agents can manage listings, enquiries, and property status.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;