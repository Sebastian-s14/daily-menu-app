import { Outlet } from 'react-router-dom'
// import { Header } from '../components'

export const MainLayout = () => {
  return (
    <div className="h-screen overflow-y-auto bg-gray-300 p-4">
      {/* <Header /> */}
      <main className="flex flex-col justify-center">
        <Outlet />
      </main>
      {/* <div className="relative"> */}
      {/* <button className="absolute bottom-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button> */}
      {/* </div> */}
    </div>
  )
}
