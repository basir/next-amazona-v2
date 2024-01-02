import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { paypal } from '@/lib/paypal'

export const POST = auth(async (...request: any) => {
  const [req, { params }] = request
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  await dbConnect()
  const order = await OrderModel.findById(params.id)
  if (order) {
    try {
      const { orderID } = await req.json()
      const captureData = await paypal.capturePayment(orderID)
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
      }
      const updatedOrder = await order.save()
      return Response.json(updatedOrder)
    } catch (err: any) {
      return Response.json(
        { message: err.message },
        {
          status: 500,
        }
      )
    }
  } else {
    return Response.json(
      { message: 'Order not found' },
      {
        status: 404,
      }
    )
  }
}) as any
