'use client'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ValidationRule, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { User } from '@/lib/models/UserModel'
import { formatId } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function UserEditForm({ userId }: { userId: string }) {
  const { data: user, error } = useSWR(`/api/admin/users/${userId}`)
  const router = useRouter()
  const { trigger: updateUser, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/users/${userId}`,
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

      toast.success('User updated successfully')
      router.push('/admin/users')
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>()

  useEffect(() => {
    if (!user) return
    setValue('name', user.name)
    setValue('email', user.email)
    setValue('isAdmin', user.isAdmin)
  }, [user, setValue])

  const formSubmit = async (formData: any) => {
    await updateUser(formData)
  }

  if (error) return error.message
  if (!user) return 'Loading...'

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof User
    name: string
    required?: boolean
    pattern?: ValidationRule<RegExp>
  }) => (
    <div className="md:flex my-3">
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
      <h1 className="text-2xl py-4">Edit User {formatId(userId)}</h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name="Name" id="name" required />
          <FormInput name="Email" id="email" required />

          <div className="md:flex my-3">
            <label className="label md:w-1/5" htmlFor="isAdmin">
              Admin
            </label>
            <div className="md:w-4/5">
              <input
                id="isAdmin"
                type="checkbox"
                className="toggle"
                {...register('isAdmin')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="btn btn-primary"
          >
            {isUpdating && <span className="loading loading-spinner"></span>}
            Update
          </button>
          <Link className="btn ml-4" href="/admin/users">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  )
}
