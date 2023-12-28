import OrderDetails from './OrderDetails'

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Order ${params.id}`,
  }
}

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <OrderDetails
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      orderId={params.id}
    />
  )
}
