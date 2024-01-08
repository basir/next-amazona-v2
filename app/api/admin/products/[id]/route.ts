import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'

export const DELETE = auth(async (...args: any) => {
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
    const product = await ProductModel.findById(params.id)
    if (product) {
      await product.deleteOne()
      return Response.json({ message: 'Product deleted successfully' })
    } else {
      return Response.json(
        { message: 'Product not found' },
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
