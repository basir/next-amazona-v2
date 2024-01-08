import AdminLayout from '@/components/admin/AdminLayout'
import Form from './Form'

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Edit Product ${params.id}`,
  }
}

export default function ProductEditPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <AdminLayout activeItem="products">
      <Form productId={params.id} />
    </AdminLayout>
  )
}
