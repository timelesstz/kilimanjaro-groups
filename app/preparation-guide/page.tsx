'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import { 
  Clock, 
  Mountain, 
  Thermometer, 
  Heart, 
  ShoppingBag, 
  Footprints, 
  Compass, 
  Tent,
  Sun,
  Droplets,
  Wind,
  AlertTriangle,
  Passport,
  Plane,
  Calendar,
  Map
} from "lucide-react"
import PreparationProgress from "../components/PreparationProgress"

// Image component with error handling
const SafeImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <ShoppingBag className="w-12 h-12 text-gray-400" />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-lg"
        onError={() => setError(true)}
      />
    </div>
  )
}

export default function PreparationGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Kilimanjaro Climb Preparation Guide</h1>
        <p className="text-xl text-gray-600">Everything you need to know to prepare for your Kilimanjaro adventure</p>
      </div>

      {/* Quick Facts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
          <h3 className="font-semibold mb-2">Duration</h3>
          <p>6-8 days</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Mountain className="w-8 h-8 mx-auto mb-3 text-primary" />
          <h3 className="font-semibold mb-2">Altitude</h3>
          <p>5,895m (19,341 ft)</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Thermometer className="w-8 h-8 mx-auto mb-3 text-primary" />
          <h3 className="font-semibold mb-2">Temperature</h3>
          <p>-20°C to +30°C</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Heart className="w-8 h-8 mx-auto mb-3 text-primary" />
          <h3 className="font-semibold mb-2">Success Rate</h3>
          <p>85% with proper prep</p>
        </div>
      </div>

      {/* Physical Preparation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Physical Preparation</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SafeImage 
              src="/images/training.jpg"
              alt="Training for Kilimanjaro"
              className="w-full h-[300px]"
            />
            <div>
              <h3 className="text-xl font-semibold mb-4">Training Program (3-6 months before)</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Footprints className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Cardiovascular Training</p>
                    <p className="text-gray-600">3-4 times per week: hiking, running, cycling, or swimming</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mountain className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Hill/Stair Training</p>
                    <p className="text-gray-600">2-3 times per week: focus on uphill walking with a loaded backpack</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Heart className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Strength Training</p>
                    <p className="text-gray-600">2 times per week: focus on legs, core, and back</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Equipment with visual guide */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Essential Equipment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <PlaceholderImage className="rounded-lg w-full h-[200px]" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Clothing</h3>
            <ul className="space-y-2">
              <li>• Waterproof jacket and pants</li>
              <li>• Insulated down jacket</li>
              <li>• Thermal base layers</li>
              <li>• Fleece mid-layers</li>
              <li>• Hiking pants (convertible recommended)</li>
              <li>• Warm hat and sun hat</li>
              <li>• Gloves (thin liner + warm outer)</li>
              <li>• Hiking socks (multiple pairs)</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <PlaceholderImage className="rounded-lg w-full h-[200px]" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Equipment</h3>
            <ul className="space-y-2">
              <li>• Hiking boots (broken in)</li>
              <li>• Sleeping bag (-10°C rating)</li>
              <li>• Trekking poles</li>
              <li>• Headlamp with spare batteries</li>
              <li>• Daypack (30-35L)</li>
              <li>• Water bottles/hydration system</li>
              <li>• Sun protection (sunscreen, sunglasses)</li>
              <li>• First aid kit</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Health & Safety */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Health & Safety</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Altitude Sickness Prevention</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Compass className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
                  <span>Climb slowly and follow guide's pace</span>
                </li>
                <li className="flex items-start">
                  <Droplets className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
                  <span>Drink 3-4 liters of water daily</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
                  <span>Report any symptoms immediately</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Medical Considerations</h3>
              <ul className="space-y-2">
                <li>• Get medical check-up before climb</li>
                <li>• Discuss altitude medication with doctor</li>
                <li>• Bring personal medications</li>
                <li>• Get necessary vaccinations</li>
                <li>• Purchase travel insurance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Weather & Climate */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Weather & Climate</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Sun className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Temperature Zones</h3>
              <p className="text-gray-600">Varies from tropical to arctic conditions</p>
            </div>
            <div className="text-center">
              <Droplets className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Rainfall</h3>
              <p className="text-gray-600">March-May & November are wettest</p>
            </div>
            <div className="text-center">
              <Wind className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Wind</h3>
              <p className="text-gray-600">Can be strong at higher altitudes</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Visa & Travel Requirements Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Visa & Travel Requirements</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Passport className="w-6 h-6 mr-2 text-primary" />
                Required Documents
              </h3>
              <ul className="space-y-2">
                <li>• Valid passport (6+ months validity)</li>
                <li>• Tanzania tourist visa</li>
                <li>• Travel insurance certificate</li>
                <li>• Vaccination records</li>
                <li>• Emergency contact information</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Plane className="w-6 h-6 mr-2 text-primary" />
                Travel Tips
              </h3>
              <ul className="space-y-2">
                <li>• Arrive 2 days before climb</li>
                <li>• Book return flight 2 days after</li>
                <li>• Consider travel insurance</li>
                <li>• Pack essentials in carry-on</li>
                <li>• Arrange airport transfers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* New Acclimatization Guide Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Acclimatization Guide</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-6">
            <div className="flex items-start">
              <Calendar className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Pre-Climb Acclimatization</h3>
                <p className="text-gray-600">Spend 1-2 days in Moshi (950m) to begin adjustment to altitude</p>
              </div>
            </div>
            <div className="flex items-start">
              <Map className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">During the Climb</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Walk slowly ("pole pole" in Swahili)</li>
                  <li>• Take regular breathing breaks</li>
                  <li>• Stay well hydrated</li>
                  <li>• Eat regular meals</li>
                  <li>• Sleep at lower altitude than highest point reached</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Progress Tracker */}
      <PreparationProgress />

      {/* Additional Resources */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/routes" className="text-primary hover:underline">
                    • Route Descriptions
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-primary hover:underline">
                    • Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-primary hover:underline">
                    • Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <p className="mb-2">For any additional questions:</p>
              <p className="text-gray-600">Email: info@snowafricaadventure.com</p>
              <p className="text-gray-600">Phone: +255 123 456 789</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Adventure?</h2>
        <p className="mb-6">Book your Kilimanjaro climb today and begin your journey to the roof of Africa.</p>
        <Link 
          href="/#group-list" 
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          View Available Dates
        </Link>
      </div>
    </div>
  )
}

