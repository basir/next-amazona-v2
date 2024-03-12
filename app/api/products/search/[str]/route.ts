import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'

export const GET = auth(async (...args:any) => {
  const [request, { params }]  = args
  console.log("API route called with params:", params);
    
  await dbConnect()
  const products = await ProductModel.find()
  const res =  products.filter(product =>product.name.includes(params.str))
  
  return Response.json(res)
}
) as any