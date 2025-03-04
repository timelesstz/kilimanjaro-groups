import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Climbing Kilimanjaro with Snow Africa Adventure was the experience of a lifetime. The guides were knowledgeable and supportive, making our journey to the summit unforgettable.",
    location: "USA",
  },
  {
    name: "Michael Chen",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "I was impressed by the professionalism and attention to detail. The team ensured we were safe, comfortable, and well-prepared for the challenges of the climb.",
    location: "Canada",
  },
  {
    name: "Emma Thompson",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "As a solo traveler, I felt welcomed and supported throughout the entire trip. The group dynamics were fantastic, and I made friends for life.",
    location: "UK",
  },
]

export function Testimonials() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">What Our Climbers Say</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

