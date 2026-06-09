const Home = () => {
    return (
        <main className="min-h-screen bg-gray-100">
            <section className="mx-auto max-w-6xl px-6 py-20">
                <h1 className="text-4xl font-bold text-gray-900">
                    Find Your Next Apartment with RentNest           
                </h1>

                <p className="mt-4 max-w-2xl text-lg text-gray-600">
                    Browse rental properties, request inspections, and connect with trusted agents.
                </p>

                <button className="mt-8 rounded-lg bg-black px-6 py-3 text-white">
                    Browse Properties
                </button>
            </section>
        </main>
    );
};

export default Home;