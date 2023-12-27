import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
  title: 'Register',
}

export default async function Register() {
  return <Form />
}
