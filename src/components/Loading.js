import { Loader } from 'react-feather'
import { Layout } from './Layout'

export const Loading = () => {
  return (
    <Layout>
      <Loader size={36} color="#0C4C73" className="animate-spin" />
    </Layout>
  )
}
