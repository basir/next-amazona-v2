export type OrderItem = {
  name: string
  slug: string
  qty: number
  image: string
  price: number
  color: string
  size: string
}

export type ShippingAddress = {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}
