import AdminLayout from '@/components/admin/AdminLayout'
import Products from './Products'

export const metadata = {
  title: 'Admin Products',
}
const AdminProductsPage = () => {
  return (
    <AdminLayout activeItem="products">
      <Products />
    </AdminLayout>
  )
}

export default AdminProductsPage
