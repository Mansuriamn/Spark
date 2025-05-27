import React from "react";

const testimonials = [
  {
    name: "Star Rosann",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "Lorem ipsum dolor amet, consectetur adipiscing elit.",
    rating: 5,
  },
  {
    name: "Susan Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    quote: "Lorem ipsum dolor amet, consectetur adipiscing elit.",
    rating: 5,
  },
  {
    name: "Eliza Jensen",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "Lorem ipsum dolor amet, consectetur adipiscing elit.",
    rating: 5,
  },
];

const StarRating = ({ count }) => (
  <div className="text-yellow-400 mb-2">
    {Array(count).fill("★").join(" ")}
  </div>
);

const StudentTestimonial = () => {
  return (
    <section className=" bg-white">
      <div className="max-w-20xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">What our happy Students say</h2>
        <p className="text-purple-600 mb-10">View all</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <StarRating count={testimonial.rating} />
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
              />
              <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
              <p className="italic text-sm text-gray-600 mt-2">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonial;
