import { Navbar } from './Navbar'

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="px-10 md:px-40 py-6 bg-background min-h-full">{children}</main>
    </>
  )
}