import React from 'react'

function Header() {
    const handleLogout = async () => { 
        window.location.href = 'auth/logout';
        // await axios.get('auth/logout',{withCredentials: true});
      }
  return (
    <header className="flex justify-between items-center bg-white p-4 shadow-md">
    <h1 className="text-xl font-bold">My App</h1>
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  </header>
  )
}

export default Header