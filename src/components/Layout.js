import { Navbar } from './Navbar'

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="px-10 md:px-20 lg:px-28 xl:px-40 py-6 bg-background flex flex-grow justify-center items-center">
        {children}
      </main>
    </div>
  )
}
