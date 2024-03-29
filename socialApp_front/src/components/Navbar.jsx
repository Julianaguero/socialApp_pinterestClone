import { Link, useNavigate } from "react-router-dom"
import { IoMdAdd, IoMdSearch } from "react-icons/io"
import { createOrGetUser } from "../utils/createOrGetUser";
import { useEffect, useState } from "react";
import { FcGoogle } from 'react-icons/fc'


function Navbar({ searchTerm, setSearchTerm, user }) {


  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    // Si el usuario está autenticado, actualiza el estado
    if (user) {
      setLoggedUser(true);

    }
  }, [user]);

  const handleLogin = (credentialResponse) => {
    createOrGetUser(credentialResponse)
      .then(() => navigate('/', { replace: false }))
      .then(() => { setLoggedUser(true) })
    window.location.reload()
  }


  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none  shadow-md focus-within:shadow-lg">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      {loggedUser ? (
        <div className="flex gap-3">
          <Link
            to={`user-profile/${user?._id}`}
            className="hidden md:block"
          >
            <img src={user?.image} alt="user-image" className="w-14 h-12 rounded-lg" />
          </Link>
          <Link
            to='create-pin'
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>

        </div>
      ) : (
        <button
          type='button'
          onClick={() => {
            navigate('/login', { replace: false })
          }}
          className='bg-slate-300 rounded-md text-black font-semibold py-2 w-52 hover:bg-red-400 transition-all duration-100 ease-in hover:text-white flex items-center justify-center gap-2'
        >
        Sign in with <FcGoogle />
          </button>
      )}

    </div>
  )
}

export default Navbar