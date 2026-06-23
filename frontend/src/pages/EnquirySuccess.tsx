import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const EnquirySuccess = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="rounded-2xl bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900">
            Enquiry Submitted
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Your inspection request has been received. An agent will contact you
            shortly.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/properties"
              className="rounded-lg bg-black px-6 py-3 text-white"
            >
              Browse More Properties
            </Link>

            <Link
              to="/"
              className="rounded-lg border px-6 py-3 text-gray-800"
            >
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EnquirySuccess;