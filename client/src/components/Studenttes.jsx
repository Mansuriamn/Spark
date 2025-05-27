import React, { useState, useEffect } from 'react';
import TestimonialCard from './Testimonial';

function StudentTestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
       
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        
        setTestimonials([
          {
            id: 't1',
            studentName: 'Star Rosann',
            text: 'Lorem ipsum dolor amet, consectetur adipiscing elit.',
            rating: 5,
            avatar: 'https://randomuser.me/api/portraits/women/5.jpg', // Placeholder
          },
          
        ]);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="container mx-auto p-6 md:py-16">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What our happy Students say
        </h2>
        <a href="#" className="text-purple-600 font-semibold hover:underline">
          View all
        </a>
      </div>

      <div className="flex  ">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            studentName={testimonial.studentName}
            text={testimonial.text}
            rating={testimonial.rating}
            avatar={testimonial.avatar}
          />
        ))}
      </div>
    </section>
  );
}

export default StudentTestimonialsSection;