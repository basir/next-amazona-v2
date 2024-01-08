'use client'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ValidationRule, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Product } from '@/lib/models/ProductModel'
import { formatId } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function ProductEditForm({ productId }: { productId: string }) {
  const { data: product, error } = useSWR(`/api/admin/products/${productId}`)
  const router = useRouter()
  const { trigger: updateProduct, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/products/${productId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message)

      toast.success('Product updated successfully')
      router.push('/admin/products')
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>()

  useEffect(() => {
    if (!product) return
    setValue('name', product.name)
    setValue('slug', product.slug)
    setValue('price', product.price)
    setValue('image', product.image)
    setValue('category', product.category)
    setValue('brand', product.brand)
    setValue('countInStock', product.countInStock)
    setValue('description', product.description)
  }, [product, setValue])

  const formSubmit = async (formData: any) => {
    await updateProduct(formData)
  }

  if (error) return error.message
  if (!product) return 'Loading...'

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Product
    name: string
    required?: boolean
    pattern?: ValidationRule<RegExp>
  }) => (
    <div className="md:flex mb-6">
      <label className="label md:w-1/5" htmlFor={id}>
        {name}
      </label>
      <div className="md:w-4/5">
        <input
          type="text"
          id={id}
          {...register(id, {
            required: required && `${name} is required`,
            pattern,
          })}
          className="input input-bordered w-full max-w-md"
        />
        {errors[id]?.message && (
          <div className="text-error">{errors[id]?.message}</div>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl py-4">Edit Product {formatId(productId)}</h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name="Name" id="name" required />
          <FormInput name="Slug" id="slug" required />
          <FormInput name="Image" id="image" required />
          <FormInput name="Price" id="price" required />
          <FormInput name="Category" id="category" required />
          <FormInput name="Brand" id="brand" required />
          <FormInput name="Description" id="description" required />
          <FormInput name="Count In Stock" id="countInStock" required />

          <button
            type="submit"
            disabled={isUpdating}
            className="btn btn-primary"
          >
            {isUpdating && <span className="loading loading-spinner"></span>}
            Update
          </button>
          <Link className="btn ml-4 " href="/admin/products">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  )
}
