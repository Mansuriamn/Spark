const Newsletter = () => (
  <section className="bg-purple-100 py-12 px-6 mt-16 rounded-2xl text-center max-w-4xl mx-auto shadow-md ">
    <h2 className="text-2xl font-bold text-gray-800 mb-3">Subscribe to Our Newsletter</h2>
    <p className="text-gray-700 mb-6">Get updates on new courses, events, and learning tips!</p>
    <form className="flex flex-col sm:flex-row justify-center gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-2 rounded-full border border-gray-300 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
      >
        Subscribe
      </button>
    </form>
  </section>
);
export default Newsletter;