import { Minus, Plus } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">Common questions about climbing Kilimanjaro</p>
      </div>

      <div className="space-y-6">
        {/* General Questions */}
        <section>
          <h2 className="text-2xl font-bold mb-6">General Questions</h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-md">
              <summary className="p-6 cursor-pointer flex items-center justify-between">
                <span className="font-semibold">How difficult is climbing Kilimanjaro?</span>
                <Plus className="w-5 h-5 text-primary" />
              </summary>
              <div className="px-6 pb-6">
                <p>Climbing Kilimanjaro is challenging but achievable for most people with good fitness levels. The main challenges are:</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Altitude and altitude sickness</li>
                  <li>Multiple days of consecutive hiking</li>
                  <li>Variable weather conditions</li>
                  <li>Mental stamina required</li>
                </ul>
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md">
              <summary className="p-6 cursor-pointer flex items-center justify-between">
                <span className="font-semibold">What is the best time to climb?</span>
                <Plus className="w-5 h-5 text-primary" />
              </summary>
              <div className="px-6 pb-6">
                <p>The best times to climb Kilimanjaro are:</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>January-February: Warm and dry</li>
                  <li>June-October: Cool and dry</li>
                  <li>Avoid March-May and November (rainy seasons)</li>
                </ul>
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md">
              <summary className="p-6 cursor-pointer flex items-center justify-between">
                <span className="font-semibold">How long does it take to climb?</span>
                <Plus className="w-5 h-5 text-primary" />
              </summary>
              <div className="px-6 pb-6">
                <p>The duration depends on your chosen route:</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Marangu Route: 5-6 days</li>
                  <li>Machame Route: 6-7 days</li>
                  <li>Lemosho Route: 7-8 days</li>
                  <li>Northern Circuit: 8-9 days</li>
                </ul>
                <p className="mt-2">Longer routes offer better acclimatization and higher success rates.</p>
              </div>
            </details>
          </div>
        </section>

        {/* Preparation Questions */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Preparation</h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-md">
              <summary className="p-6 cursor-pointer flex items-center justify-between">
                <span className="font-semibold">How fit do I need to be?</span>
                <Plus className="w-5 h-5 text-primary" />
              </summary>
              <div className="px-6 pb-6">
                <p>You should be able to:</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Walk 4-7 hours with a light pack</li>
                  <li>Handle consecutive days of physical activity</li>
                  <li>Complete regular cardiovascular exercise</li>
                  <li>Train with a weighted pack</li>
                </ul>
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md">
              <summary className="p-6 cursor-pointer flex items-center justify-between">
                <span className="font-semibold">What equipment do I need?</span>
                <Plus className="w-5 h-5 text-primary" />
              </summary>
              <div className="px-6 pb-6">
                <p>Essential equipment includes:</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Quality hiking boots and socks</li>
                  <li>Layered clothing for various temperatures</li>
                  <li>Sleeping bag rated for -10°C</li>
                  <li>Trekking poles</li>
                  <li>Headlamp and batteries</li>
                </ul>
                <p className="mt-2">View our complete <Link href="/preparation-guide" className="text-primary hover:underline">equipment list</Link> for details.</p>
              </div>
            </details>
          </div>
        </section>

        {/* Health & Safety */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Health & Safety</h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-md">
              <summary className="p-6 cursor-pointer flex items-center justify-between">
                <span className="font-semibold">What about altitude sickness?</span>
                <Plus className="w-5 h-5 text-primary" />
              </summary>
              <div className="px-6 pb-6">
                <p>Altitude sickness is a common concern. To minimize risk:</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Choose a longer route for better acclimatization</li>
                  <li>Walk slowly and stay hydrated</li>
                  <li>Consider altitude medication (consult your doctor)</li>
                  <li>Listen to your guides and your body</li>
                </ul>
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md">
              <summary className="p-6 cursor-pointer flex items-center justify-between">
                <span className="font-semibold">What medical preparations are needed?</span>
                <Plus className="w-5 h-5 text-primary" />
              </summary>
              <div className="px-6 pb-6">
                <ul className="list-disc ml-6">
                  <li>Get a thorough medical check-up</li>
                  <li>Obtain necessary vaccinations</li>
                  <li>Discuss altitude medication with your doctor</li>
                  <li>Bring personal medications and first aid supplies</li>
                  <li>Purchase comprehensive travel insurance</li>
                </ul>
              </div>
            </details>
          </div>
        </section>

        {/* Booking & Logistics */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Booking & Logistics</h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-md">
              <summary className="p-6 cursor-pointer flex items-center justify-between">
                <span className="font-semibold">What's included in the price?</span>
                <Plus className="w-5 h-5 text-primary" />
              </summary>
              <div className="px-6 pb-6">
                <p>Our packages typically include:</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Professional guides and porters</li>
                  <li>Park fees and permits</li>
                  <li>Camping/hut accommodation on the mountain</li>
                  <li>All meals during the climb</li>
                  <li>Transfer to/from the mountain</li>
                  <li>Emergency oxygen and first aid kit</li>
                </ul>
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md">
              <summary className="p-6 cursor-pointer flex items-center justify-between">
                <span className="font-semibold">How do I book a climb?</span>
                <Plus className="w-5 h-5 text-primary" />
              </summary>
              <div className="px-6 pb-6">
                <p>Booking process:</p>
                <ol className="list-decimal ml-6 mt-2">
                  <li>Choose your preferred route and dates</li>
                  <li>Complete the online booking form</li>
                  <li>Pay the deposit to secure your spot</li>
                  <li>Receive confirmation and preparation materials</li>
                  <li>Complete final payment before the climb</li>
                </ol>
                <p className="mt-4">
                  <Link href="/#group-list" className="text-primary hover:underline">
                    View available dates and book now
                  </Link>
                </p>
              </div>
            </details>
          </div>
        </section>
      </div>

      {/* Contact Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="mb-6">Contact us and we'll be happy to help you plan your Kilimanjaro adventure.</p>
        <Link 
          href="/contact" 
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
} 