import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'

export const PUT = auth(async (...args: any) => {
  const [req, { params }] = args
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  try {
    await dbConnect()

    const order = await OrderModel.findById(params.id)
    if (order) {
      if (!order.isPaid)
        return Response.json(
          { message: 'Order is not paid' },
          {
            status: 400,
          }
        )
      order.isDelivered = true
      order.deliveredAt = Date.now()
      const updatedOrder = await order.save()
      return Response.json(updatedOrder)
    } else {
      return Response.json(
        { message: 'Order not found' },
        {
          status: 404,
        }
      )
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}) as any
