import { useState, useEffect } from "react"
import { AiOutlineLogout } from "react-icons/ai"
import { useParams, useNavigate } from "react-router-dom"
import { googleLogout } from '@react-oauth/google'

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from "../utils/data"
import { client } from "../client"
import MasonryLayout from "./MasonryLayout"
import Spinner from "./Spinner"
import { removeUser } from "../utils/fetchUser"

const randomImage = 'http://source.unsplash.com/160 0x900/?nature,photography,technology'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 text-blank font-bold p-2 rounded-full w-20 outline-none'

function UserProfile() {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate = useNavigate()
  const { userId } = useParams()

  
  useEffect(() => {
    const query = userQuery(userId)

    client.fetch(query)
      .then((data) => {
        setUser(data[0])
      })
  }, [userId])

  useEffect(() => {
    if (text == 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId)

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data)
        })
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId)

      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data)
        })
    }
    
  }, [text, userId])

  const handleLogout = async() => {
    
    await googleLogout();
    removeUser();
    setUser(null);
    navigate("/", { replace: true });
    window.location.reload()
  };

  if (!user) {
    return <Spinner message="Loading profile..." />
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5 mb-7 justify-center items-center">
        <img
          src={randomImage}
          className="w-full h-275 xl:h-300 shadow-lg object-cover"
          alt="banner-pic" />
        <img
          className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
          src={user.image}
          alt="user-pic" />
        <h1 className="font-bold text-2xl text-center mt-3">
          {user.userName}
        </h1>
        <div className="absolute top-0 z-1  right-0 p-2">
          {userId === user._id && (
            <button
              type="button"
              onClick={handleLogout}
              className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md flex gap-3 items-center hover:bg-slate-100 hover:text-white transition-all duration-75 ease-in"
            >
              <AiOutlineLogout color="red" fontSize={28} />
            </button>
          )}
        </div>
      </div>
      <div className="text-center mb-7">
        <button
          type="button"
          onClick={(e) => {
            setText(e.target.textContent)
            setActiveBtn('created')
          }}
          className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles} `}
        >
          Created
        </button>
        <button
          type="button"
          onClick={(e) => {
            setText(e.target.textContent)
            setActiveBtn('saved')
          }}
          className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles} `}
        >
          Saved
        </button>
      </div>
      {pins?.length ? (
        <div className="px-2 pb-16">
          <MasonryLayout pins={pins} />
        </div>
      ) : (
        <div className="flex justify-center font-bold items-center w-full text-xl mt-2">No Pins Found!</div>
      )}
    </div>
  )
}

export default UserProfile