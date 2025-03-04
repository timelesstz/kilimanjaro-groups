import Image from "next/image"
import Link from "next/link"
import { climbGroups } from "@/lib/data"
import { GroupFilter } from "@/components/group-filter"
import { GroupList } from "@/components/group-list"
import { FAQSection } from "@/components/faq-section"
import { Testimonials } from "@/components/testimonials"
import { PhotoGallery } from "@/components/photo-gallery"

const photos = [
  { src: "/placeholder.svg?height=600&width=800&text=Kilimanjaro+Summit", alt: "Climbers at Kilimanjaro Summit" },
  { src: "/placeholder.svg?height=600&width=800&text=Base+Camp", alt: "Base Camp" },
  { src: "/placeholder.svg?height=600&width=800&text=Scenic+Route", alt: "Scenic Route on Kilimanjaro" },
  // Add more photos as needed
]

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image src="/kilimanjaro-hero.jpg" alt="Kilimanjaro Group Climbs" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kilimanjaro Group Climbs</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Join our scheduled departures and share the adventure with fellow climbers
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Join a Group Departure</h2>
          <p className="text-lg mb-4">
            If you'd rather not climb solo or don't want to pay for a private climb, our Kilimanjaro group departures
            are the perfect solution. By selecting your preferred dates, you'll join other trekkers to split costs and
            enjoy the camaraderie of a group trip.
          </p>
          <p className="text-lg mb-4">
            Our groups range from 2-12 trekkers. We consider it a group even if you're the first to sign up, as we'll
            customize your climb for you at the same cost or upgrade prices based on your requirements.
          </p>
        </div>

        {/* Filter and Group List */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <GroupFilter />
          <GroupList groups={climbGroups} />
        </div>

        {/* Photo Gallery Section */}
        <div className="container mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Kilimanjaro Adventure Gallery</h2>
          <PhotoGallery photos={photos} />
        </div>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Why Choose Us */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Group Climbs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Shared Experience</h3>
              <p>Connect with like-minded adventurers from around the world and create lasting friendships.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Cost-Effective</h3>
              <p>
                Group climbs offer significant savings compared to private expeditions without compromising quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Guaranteed Departures</h3>
              <p>All listed departures are guaranteed to run, even if you're the first to book.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA */}
        <div className="bg-primary text-white rounded-lg p-8 mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for the Adventure of a Lifetime?</h2>
          <p className="text-xl mb-6">Book your spot on one of our upcoming Kilimanjaro group climbs today!</p>
          <Link href="#group-list" className="btn-secondary inline-block">
            View Available Dates
          </Link>
        </div>
      </div>
    </div>
  )
}

