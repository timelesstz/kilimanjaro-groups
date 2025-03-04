import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-xl text-gray-600">Please read these terms carefully before booking your climb</p>
      </div>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">1. Booking and Payment</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">1.1 Deposit</h3>
              <p>A non-refundable deposit of 30% of the total trip cost is required to secure your booking. The remaining balance must be paid in full 60 days prior to departure.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">1.2 Payment Methods</h3>
              <p>We accept payments via bank transfer, credit card, or other specified payment methods. All prices are quoted in US Dollars (USD).</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">1.3 Price Changes</h3>
              <p>Prices are subject to change until full payment is received. Once paid, your price is guaranteed.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">2. Cancellation Policy</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">2.1 Cancellation by Client</h3>
              <ul className="list-disc ml-6">
                <li>More than 60 days before departure: Loss of deposit</li>
                <li>30-60 days before departure: 50% of total cost</li>
                <li>Less than 30 days before departure: 100% of total cost</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">2.2 Cancellation by Company</h3>
              <p>In the rare event that we must cancel your trip, you will receive a full refund of all payments made to Snow Africa Adventure.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">3. Health and Safety</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">3.1 Medical Requirements</h3>
              <p>Clients must:</p>
              <ul className="list-disc ml-6">
                <li>Be in good physical health</li>
                <li>Disclose any medical conditions</li>
                <li>Obtain travel insurance covering high-altitude trekking</li>
                <li>Get medical clearance if required</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">3.2 Safety Protocols</h3>
              <p>Clients must follow all safety instructions given by guides. We reserve the right to terminate your climb if you disregard safety instructions.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">4. Documentation</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">4.1 Required Documents</h3>
              <p>Clients are responsible for:</p>
              <ul className="list-disc ml-6">
                <li>Valid passport (6+ months validity)</li>
                <li>Tanzania visa</li>
                <li>Travel insurance certificate</li>
                <li>Vaccination records</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">5. Liability and Insurance</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">5.1 Company Liability</h3>
              <p>Snow Africa Adventure acts in good faith and cannot be held responsible for:</p>
              <ul className="list-disc ml-6">
                <li>Natural disasters or weather conditions</li>
                <li>Political unrest or border closures</li>
                <li>Personal injury or loss of property</li>
                <li>Altitude-related health issues</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">5.2 Insurance Requirements</h3>
              <p>All clients must have comprehensive travel insurance covering:</p>
              <ul className="list-disc ml-6">
                <li>High-altitude trekking up to 6,000m</li>
                <li>Emergency evacuation</li>
                <li>Trip cancellation</li>
                <li>Medical expenses</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">6. Changes and Amendments</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">6.1 Route Changes</h3>
              <p>We reserve the right to modify routes or itineraries if necessary for safety or weather-related reasons.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">6.2 Transfer of Booking</h3>
              <p>Bookings may be transferred to another person subject to our approval and payment of any applicable fees.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">7. Contact and Communication</h2>
          <div className="space-y-4">
            <p>For any questions or concerns regarding these terms, please contact us:</p>
            <div className="bg-gray-50 p-4 rounded">
              <p>Snow Africa Adventure</p>
              <p>Email: info@snowafricaadventure.com</p>
              <p>Phone: +255 123 456 789</p>
              <p>Address: Arusha, Tanzania</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
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