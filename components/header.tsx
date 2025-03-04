import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header>
      <div className="bg-[#00a99d] text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span>+255 766 657 854</span>
            </div>
            <div className="flex items-center gap-2">
              <span>info@snowafricaadventure.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Mon - Fri: 9:00 - 18:30</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="https://www.facebook.com/snowafricaadventure" aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="https://twitter.com/snowafricaadventure" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link href="https://www.instagram.com/snowafricaadventure" aria-label="Instagram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Snow Africa Adventure" width={50} height={50} className="h-12 w-auto" />
          <div className="font-bold text-xl">Snow Africa Adventure</div>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="https://snowafricaadventure.com" className="hover:text-[#00a99d]">
            Home
          </Link>
          <Link href="https://snowafricaadventure.com/safaris-tours" className="hover:text-[#00a99d]">
            Safaris & Tours
          </Link>
          <Link href="https://snowafricaadventure.com/trekking" className="hover:text-[#00a99d]">
            Trekking
          </Link>
          <Link
            href="https://snowafricaadventure.com/kilimanjaro-join-group-departures"
            className="text-[#00a99d] font-bold"
          >
            Kilimanjaro Join Group
          </Link>
          <Link href="https://snowafricaadventure.com/tailor-made-safari" className="hover:text-[#00a99d]">
            Tailor-Made Safari
          </Link>
          <Link href="https://snowafricaadventure.com/destinations" className="hover:text-[#00a99d]">
            Destinations
          </Link>
          <Link href="/preparation-guide" className="hover:text-primary">
            Preparation Guide
          </Link>
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
        </nav>
        <Link href="https://snowafricaadventure.com/contact" className="btn-secondary">
          Book Now
        </Link>
      </div>
    </header>
  )
}

