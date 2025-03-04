export type RouteType =
  | "8 Day Lemosho route"
  | "7 Day Machame route"
  | "6 Day Machame route (Full Moon climb)"
  | "7 Day Machame route (Full Moon climb)"
  | "6 Day Rongai route (Full Moon climb)"

export interface ClimbGroup {
  id: string
  route: RouteType
  arrivalDate: string
  departureDate: string
  price: number
  totalSpaces: number
  spacesLeft: number
  description?: string
  difficulty: "Easy" | "Moderate" | "Challenging"
  duration: number
}

