"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import type { ClimbGroup } from "@/lib/types"
import { Calendar, DollarSign, Users, Mountain, Mail, Phone, Globe, Flag, Info, ChevronDown, Search, X } from "lucide-react"

// Add countries data
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", 
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", 
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", 
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", 
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", 
  "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", 
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", 
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", 
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", 
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", 
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
]

// Add phone country codes data with more countries
const phoneCountries = [
  { code: "US", name: "United States", dial_code: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial_code: "+44", flag: "🇬🇧" },
  { code: "TZ", name: "Tanzania", dial_code: "+255", flag: "🇹🇿" },
  { code: "KE", name: "Kenya", dial_code: "+254", flag: "🇰🇪" },
  { code: "UG", name: "Uganda", dial_code: "+256", flag: "🇺🇬" },
  { code: "RW", name: "Rwanda", dial_code: "+250", flag: "🇷🇼" },
  { code: "ZA", name: "South Africa", dial_code: "+27", flag: "🇿🇦" },
  { code: "DE", name: "Germany", dial_code: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial_code: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dial_code: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dial_code: "+34", flag: "🇪🇸" },
  { code: "PT", name: "Portugal", dial_code: "+351", flag: "🇵🇹" },
  { code: "NL", name: "Netherlands", dial_code: "+31", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", dial_code: "+32", flag: "🇧🇪" },
  { code: "CH", name: "Switzerland", dial_code: "+41", flag: "🇨🇭" },
  { code: "AT", name: "Austria", dial_code: "+43", flag: "🇦🇹" },
  { code: "SE", name: "Sweden", dial_code: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", dial_code: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", dial_code: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finland", dial_code: "+358", flag: "🇫🇮" },
  { code: "AU", name: "Australia", dial_code: "+61", flag: "🇦🇺" },
  { code: "NZ", name: "New Zealand", dial_code: "+64", flag: "🇳🇿" },
  { code: "CA", name: "Canada", dial_code: "+1", flag: "🇨🇦" },
  { code: "JP", name: "Japan", dial_code: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dial_code: "+82", flag: "🇰🇷" },
  { code: "CN", name: "China", dial_code: "+86", flag: "🇨🇳" },
  { code: "IN", name: "India", dial_code: "+91", flag: "🇮🇳" },
  { code: "SG", name: "Singapore", dial_code: "+65", flag: "🇸🇬" },
  { code: "MY", name: "Malaysia", dial_code: "+60", flag: "🇲🇾" },
  { code: "ID", name: "Indonesia", dial_code: "+62", flag: "🇮🇩" },
  { code: "TH", name: "Thailand", dial_code: "+66", flag: "🇹🇭" },
  { code: "VN", name: "Vietnam", dial_code: "+84", flag: "🇻🇳" },
  { code: "PH", name: "Philippines", dial_code: "+63", flag: "🇵🇭" },
  { code: "AE", name: "UAE", dial_code: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", dial_code: "+966", flag: "🇸🇦" },
  { code: "BR", name: "Brazil", dial_code: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dial_code: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dial_code: "+54", flag: "🇦🇷" },
  { code: "CL", name: "Chile", dial_code: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", dial_code: "+57", flag: "🇨🇴" }
].sort((a, b) => a.name.localeCompare(b.name))

// Phone number formatting helper
function formatPhoneNumber(phoneNumber: string, countryCode: string) {
  // Remove all non-numeric characters except the plus sign
  const cleaned = phoneNumber.replace(/[^\d+]/g, '')
  
  // If empty, return empty
  if (!cleaned) return ''
  
  // If doesn't start with country code, add it
  if (!cleaned.startsWith(countryCode)) {
    return countryCode + cleaned
  }
  
  // Format the number based on length
  const local = cleaned.slice(countryCode.length)
  if (local.length <= 3) return cleaned
  if (local.length <= 7) return `${countryCode} ${local.slice(0, 3)} ${local.slice(3)}`
  return `${countryCode} ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
}

// Country selector dropdown component
function CountrySelect({ 
  value, 
  onChange,
  className 
}: { 
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredCountries = phoneCountries.filter(country => 
    country.name.toLowerCase().includes(search.toLowerCase()) ||
    country.dial_code.includes(search)
  )

  const selectedCountry = phoneCountries.find(c => c.dial_code === value)

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <span className="text-xl mr-2">{selectedCountry?.flag}</span>
          <span>{selectedCountry?.dial_code}</span>
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-64 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-8 pr-4 py-1 border border-gray-300 rounded-md text-sm"
                placeholder="Search countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearch("")}
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-left"
                onClick={() => {
                  onChange(country.dial_code)
                  setIsOpen(false)
                  setSearch("")
                }}
              >
                <span className="text-xl mr-2">{country.flag}</span>
                <span className="flex-1">{country.name}</span>
                <span className="text-gray-500">{country.dial_code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Add validation helpers
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Add booking code generator
function generateBookingCode(): string {
  // Format: KLM-YYYY-XXXX where:
  // KLM = Kilimanjaro
  // YYYY = Year
  // XXXX = Random alphanumeric
  const year = new Date().getFullYear()
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Excluding similar looking characters I,O,0,1
  let randomCode = ''
  
  for (let i = 0; i < 4; i++) {
    randomCode += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  
  return `KLM-${year}-${randomCode}`
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  group: ClimbGroup
}

// Add tooltip component
function Tooltip({ text }: { text: string }) {
  return (
    <div className="group relative inline-block ml-1">
      <Info className="h-4 w-4 text-gray-400 cursor-help" />
      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-sm rounded-md py-1 px-2 absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-48 text-center">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
          <div className="border-4 border-transparent border-t-black" />
        </div>
      </div>
    </div>
  )
}

// Add progress bar component
function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between mb-2">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`flex-1 ${
              index < totalSteps - 1 ? "mr-2" : ""
            }`}
          >
            <div
              className={`h-2 rounded ${
                index + 1 <= currentStep ? "bg-primary" : "bg-gray-200"
              } transition-all duration-300`}
            />
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-500 text-center">
        Step {currentStep} of {totalSteps}: {currentStep === 1 ? "Personal Information" : currentStep === 2 ? "Travel Details" : "Additional Information"}
      </div>
    </div>
  )
}

export function BookingModal({ isOpen, onClose, group }: BookingModalProps) {
  const [formData, setFormData] = useState({
    bookingCode: "",
    fullName: "",
    email: "",
    phone: "",
    phoneCountry: phoneCountries[0],
    nationality: "",
    numberOfTrekkers: 1,
    dietaryRequirements: "",
    medicalConditions: "",
    previousExperience: "",
    fitnessLevel: "moderate",
    rentalEquipment: [] as string[],
    additionalServices: [] as string[],
    specialRequirements: "",
    acceptedTerms: false,
    sendCopyEmail: true,
  })

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    phone: "",
  })

  const validatePhoneNumber = (phone: string, countryCode: string) => {
    if (!phone) return "Phone number is required"
    if (!phone.startsWith(countryCode)) return "Invalid country code"
    
    // Remove country code and all non-numeric characters
    const local = phone.slice(countryCode.length).replace(/\D/g, '')
    
    // Check length (most international numbers are between 8 and 15 digits)
    if (local.length < 8) return "Phone number is too short"
    if (local.length > 15) return "Phone number is too long"
    
    return ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === "email") {
      setFieldErrors(prev => ({
        ...prev,
        email: isValidEmail(value) ? "" : "Please enter a valid email address"
      }))
    }
    
    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value, formData.phoneCountry.dial_code)
      const validationError = validatePhoneNumber(formattedPhone, formData.phoneCountry.dial_code)
      
      setFormData(prev => ({ ...prev, phone: formattedPhone }))
      setFieldErrors(prev => ({
        ...prev,
        phone: validationError
      }))
      return
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent as keyof typeof prev], [child]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    if (name === "acceptedTerms") {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name as keyof typeof prev] as string[]), value]
          : (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptedTerms) {
      setError("Please accept the terms and conditions")
      return
    }
    setIsSubmitting(true)
    setError(null)

    try {
      // Generate unique booking code
      const bookingCode = generateBookingCode()
      
      const response = await fetch("/api/submit-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingCode,
          groupId: group.id,
          route: group.route,
          departureDate: group.departureDate,
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking")
      }

      setIsSuccess(true)
      setStep(1)

      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        setFormData({
          bookingCode: "",
          fullName: "",
          email: "",
          phone: "",
          phoneCountry: phoneCountries[0],
          nationality: "",
          numberOfTrekkers: 1,
          dietaryRequirements: "",
          medicalConditions: "",
          previousExperience: "",
          fitnessLevel: "moderate",
          rentalEquipment: [],
          additionalServices: [],
          specialRequirements: "",
          acceptedTerms: false,
          sendCopyEmail: true,
        })
      }, 3000)
    } catch (err) {
      setError("An error occurred while submitting your booking. Please try again.")
      console.error("Booking submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.nationality) {
        setError("Please fill in all required fields")
        return
      }
      if (!isValidEmail(formData.email)) {
        setError("Please enter a valid email address")
        return
      }
      if (formData.phone.length < 10) {
        setError("Please enter a valid phone number")
        return
      }
    }
    setError(null)
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setError(null)
    setStep((prev) => prev - 1)
  }

  if (!isOpen) return null

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Book Your Kilimanjaro Climb</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h4 className="font-bold text-lg mb-2">{group.route}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <div>
                  <div className="text-sm">Arrival: {group.arrivalDate}</div>
                  <div className="text-sm">Departure: {group.departureDate}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>${group.price.toLocaleString()} per person</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{group.spacesLeft} of {group.totalSpaces} spaces left</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mountain className="w-4 h-4" />
                <span>Difficulty: {group.difficulty}</span>
              </div>
            </div>
            {group.description && <p className="mt-2 text-sm">{group.description}</p>}
          </div>

          <ProgressBar currentStep={step} totalSteps={3} />

          {isSuccess ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-2 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h4 className="text-lg font-bold mb-2">Booking Request Submitted!</h4>
              <p className="mb-2">
                Thank you for your booking request. We will contact you shortly to confirm your reservation and provide
                next steps.
              </p>
              <p className="text-sm font-semibold bg-white p-2 rounded inline-block">
                Your booking reference: {formData.bookingCode || generateBookingCode()}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">{error}</div>}

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          step === i ? "bg-primary" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    Step {step} of 3: {step === 1 ? "Personal Information" : step === 2 ? "Travel Details" : "Additional Information"}
                  </div>
                </div>

                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name * <Tooltip text="Enter your full name exactly as it appears on your passport" />
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="As it appears on your passport"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`w-full p-2 border rounded-md ${
                            fieldErrors.email ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {fieldErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number * <Tooltip text="Include your country code (e.g., +1 for USA)" />
                        </label>
                        <div className="flex space-x-2">
                          <CountrySelect
                            value={formData.phoneCountry.dial_code}
                            onChange={(value) => {
                              const country = phoneCountries.find(c => c.dial_code === value) || phoneCountries[0]
                              setFormData(prev => ({
                                ...prev,
                                phoneCountry: country,
                                phone: formatPhoneNumber(prev.phone, country.dial_code)
                              }))
                            }}
                            className="w-40"
                          />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className={`flex-1 p-2 border rounded-md ${
                              fieldErrors.phone ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Phone number"
                          />
                        </div>
                        {fieldErrors.phone && (
                          <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                          Nationality *
                        </label>
                        <select
                          id="nationality"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select a country</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="sendCopyEmail"
                            checked={formData.sendCopyEmail}
                            onChange={handleCheckboxChange}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700">
                            Send me a copy of the booking confirmation email
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="numberOfTrekkers" className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Trekkers *
                        </label>
                        <select
                          id="numberOfTrekkers"
                          name="numberOfTrekkers"
                          value={formData.numberOfTrekkers}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          {[...Array(Math.min(group.spacesLeft, 10))].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-700 mb-1">
                          Fitness Level *
                        </label>
                        <select
                          id="fitnessLevel"
                          name="fitnessLevel"
                          value={formData.fitnessLevel}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="moderate">Moderate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Previous Hiking/Climbing Experience <Tooltip text="List any mountains you've climbed, trekking experience, or relevant outdoor activities" />
                      </label>
                      <textarea
                        name="previousExperience"
                        value={formData.previousExperience}
                        onChange={handleChange}
                        rows={3}
                        maxLength={500}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Please describe any relevant experience"
                      />
                      <div className="text-sm text-gray-500 text-right mt-1">
                        {formData.previousExperience.length}/500 characters
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dietary Requirements <Tooltip text="Specify any dietary restrictions, allergies, or preferences" />
                      </label>
                      <textarea
                        name="dietaryRequirements"
                        value={formData.dietaryRequirements}
                        onChange={handleChange}
                        rows={2}
                        maxLength={300}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Any specific dietary requirements or restrictions"
                      />
                      <div className="text-sm text-gray-500 text-right mt-1">
                        {formData.dietaryRequirements.length}/300 characters
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medical Conditions <Tooltip text="Include any medical conditions, medications, or health concerns that our team should be aware of" />
                      </label>
                      <textarea
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleChange}
                        rows={2}
                        maxLength={300}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Any medical conditions we should be aware of"
                      />
                      <div className="text-sm text-gray-500 text-right mt-1">
                        {formData.medicalConditions.length}/300 characters
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Equipment Rental
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          "Sleeping Bag",
                          "Hiking Poles",
                          "Warm Jacket",
                          "Waterproof Pants",
                          "Hiking Boots",
                          "Gloves",
                        ].map((item) => (
                          <label key={item} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="rentalEquipment"
                              value={item}
                              checked={formData.rentalEquipment.includes(item)}
                              onChange={handleCheckboxChange}
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Services
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          "Airport Transfer",
                          "Hotel Booking",
                          "Safari Extension",
                          "Zanzibar Extension",
                          "Extra Night in Hotel",
                          "Private Toilet",
                        ].map((service) => (
                          <label key={service} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="additionalServices"
                              value={service}
                              checked={formData.additionalServices.includes(service)}
                              onChange={handleCheckboxChange}
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Requirements or Requests
                      </label>
                      <textarea
                        name="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Any other special requirements or requests"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          name="acceptedTerms"
                          checked={formData.acceptedTerms}
                          onChange={handleCheckboxChange}
                          className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">
                          I agree to the{" "}
                          <a href="/terms" target="_blank" className="text-primary hover:underline">
                            terms and conditions
                          </a>{" "}
                          and acknowledge that I have read the{" "}
                          <a href="/preparation-guide" target="_blank" className="text-primary hover:underline">
                            climb preparation guide
                          </a>
                          .
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                )}
                <div className="ml-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )

  // Use createPortal to render the modal at the root level
  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null
}

