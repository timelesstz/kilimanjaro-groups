import Image from "next/image"

interface RouteMapProps {
  routeName: string
  className?: string
}

export function RouteMap({ routeName, className }: RouteMapProps) {
  // In a real app, you would have actual map images for each route
  const mapUrl = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(routeName + " Map")}`

  return (
    <div className={`relative h-[400px] ${className}`}>
      <Image src={mapUrl || "/placeholder.svg"} alt={`${routeName} map`} fill className="object-cover rounded-lg" />
    </div>
  )
}

