import { auth } from '@/lib/auth'
import cloudinary from 'cloudinary'

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET!
  )

  return Response.json({ signature, timestamp })
}) as any
