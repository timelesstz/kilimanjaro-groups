import Image from "next/image"
import Link from "next/link"
import { climbGroups } from "@/lib/data"
import { GroupList } from "@/components/group-list"
import { RouteMap } from "@/components/route-map"
import { DifficultyMeter } from "@/components/difficulty-meter"

interface RoutePageProps {
  params: {
    route: string
  }
}

export default function RoutePage({ params }: RoutePageProps) {
  const routeName = params.route.replace(/-/g, " ")

  // Filter groups by route (in a real app, this would be a database query)
  const filteredGroups = climbGroups.filter((group) => group.route.toLowerCase().includes(routeName.toLowerCase()))

  // Get route details (this would come from a database in a real app)
  const routeDetails = {
    "lemosho route": {
      name: "Lemosho Route",
      description:
        "The Lemosho route is considered one of the most scenic trails on Kilimanjaro, granting panoramic vistas on various sides of the mountain. This route has a high success rate due to its ideal acclimatization profile and is less crowded than other popular routes.",
      duration: "7-8 days",
      difficulty: "Moderate",
      success: "90%",
      scenery: "Spectacular",
      traffic: "Low to Moderate",
      image: "/placeholder.svg?height=600&width=800",
      highlights: [
        "Shira Plateau crossing",
        "Lava Tower acclimatization",
        "Barranco Wall climb",
        "Southern Circuit views",
      ],
      itinerary: [
        { day: 1, description: "Arrive at Londorossi Gate, drive to Lemosho trailhead, hike to Mti Mkubwa Camp" },
        { day: 2, description: "Trek to Shira 1 Camp" },
        { day: 3, description: "Trek to Shira 2 Camp" },
        { day: 4, description: "Trek to Barranco Camp via Lava Tower" },
        { day: 5, description: "Trek to Karanga Camp" },
        { day: 6, description: "Trek to Barafu Camp" },
        { day: 7, description: "Summit attempt, then descend to Mweka Camp" },
        { day: 8, description: "Descend to Mweka Gate, transfer to hotel" },
      ],
    },
    "machame route": {
      name: "Machame Route",
      description:
        'Known as the "Whiskey Route," Machame is a popular path that offers stunning views through diverse landscapes. The route includes steeper sections and requires a good level of fitness, but rewards climbers with amazing scenery and a variety of terrains.',
      duration: "6-7 days",
      difficulty: "Challenging",
      success: "85%",
      scenery: "Excellent",
      traffic: "High",
      image: "/placeholder.svg?height=600&width=800",
      highlights: [
        "Rainforest to heath zone transitions",
        "Shira Ridge views",
        "Barranco Wall challenge",
        "Sunrise at Stella Point",
      ],
      itinerary: [
        { day: 1, description: "Machame Gate to Machame Camp" },
        { day: 2, description: "Machame Camp to Shira Camp" },
        { day: 3, description: "Shira Camp to Barranco Camp" },
        { day: 4, description: "Barranco Camp to Karanga Camp" },
        { day: 5, description: "Karanga Camp to Barafu Camp" },
        { day: 6, description: "Summit Day - Uhuru Peak and descend to Mweka Camp" },
        { day: 7, description: "Mweka Camp to Mweka Gate" },
      ],
    },
    "rongai route": {
      name: "Rongai Route",
      description:
        "The only route that approaches Kilimanjaro from the north, near the Kenyan border. Rongai offers a true wilderness experience with diverse landscapes and is known for its consistent weather patterns, making it ideal during the rainy season.",
      duration: "6-7 days",
      difficulty: "Moderate",
      success: "80%",
      scenery: "Good",
      traffic: "Low",
      image: "/placeholder.svg?height=600&width=800",
      highlights: [
        "Northern wilderness experience",
        "Mawenzi tarn views",
        "Diverse ecological zones",
        "Less crowded trail",
      ],
      itinerary: [
        { day: 1, description: "Rongai Gate to Simba Camp" },
        { day: 2, description: "Simba Camp to Second Cave Camp" },
        { day: 3, description: "Second Cave Camp to Kibo Camp" },
        { day: 4, description: "Summit Day - Uhuru Peak and descend to Mawenzi Tarn Camp" },
        { day: 5, description: "Mawenzi Tarn Camp to Rongai Camp" },
        { day: 6, description: "Rongai Camp to Rongai Gate" },
      ],
    },
  }

  // Find the matching route details or use a default
  const route = Object.entries(routeDetails).find(([key]) => routeName.toLowerCase().includes(key))?.[1] || {
    name: routeName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: "This route offers climbers a unique Kilimanjaro experience with varying terrain and stunning views.",
    duration: "6-8 days",
    difficulty: "Moderate to Challenging",
    success: "80%",
    scenery: "Good to Excellent",
    traffic: "Varies",
    image: "/placeholder.svg?height=600&width=800",
    highlights: ["Summit success", "Diverse ecosystems", "Experienced guides", "Quality equipment"],
    itinerary: [
      { day: 1, description: "Start of the trek" },
      { day: 2, description: "Acclimatization day" },
      { day: 3, description: "Trekking through diverse landscapes" },
      { day: 4, description: "Reaching higher altitudes" },
      { day: 5, description: "Preparing for the summit" },
      { day: 6, description: "Summit attempt" },
      { day: 7, description: "Descent" },
    ],
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[300px]">
        <Image src={route.image || "/placeholder.svg"} alt={route.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{route.name}</h1>
          <p className="text-xl max-w-3xl">Kilimanjaro Climbing Route</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-6">About the {route.name}</h2>
          <p className="text-lg mb-6">{route.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="font-bold text-primary mb-1">Duration</h3>
              <p>{route.duration}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="font-bold text-primary mb-1">Difficulty</h3>
              <DifficultyMeter difficulty={route.difficulty} />
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="font-bold text-primary mb-1">Success Rate</h3>
              <p>{route.success}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="font-bold text-primary mb-1">Traffic</h3>
              <p>{route.traffic}</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4">Route Highlights</h3>
          <ul className="list-disc pl-6 mb-8">
            {route.highlights.map((highlight, index) => (
              <li key={index} className="mb-2">
                {highlight}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold mb-4">Route Map</h3>
          <RouteMap routeName={route.name} className="mb-8" />

          <h3 className="text-2xl font-bold mb-4">Itinerary</h3>
          <div className="space-y-4 mb-8">
            {route.itinerary.map((day, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Day {day.day}</h4>
                <p>{day.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Available Departures */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">Available {route.name} Departures</h2>
          {filteredGroups.length > 0 ? (
            <GroupList groups={filteredGroups} />
          ) : (
            <div className="text-center py-8">
              <p className="text-lg mb-4">No upcoming departures found for this route.</p>
              <Link href="/" className="btn-primary">
                View All Available Departures
              </Link>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-primary text-white rounded-lg p-8 mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Conquer Kilimanjaro?</h2>
          <p className="text-xl mb-6">
            Join one of our upcoming group climbs or contact us for a custom private expedition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-secondary">
              View All Departures
            </Link>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 font-bold py-2 px-6 rounded transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

