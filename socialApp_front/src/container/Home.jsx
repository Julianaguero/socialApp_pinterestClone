import { useState, useEffect, useRef } from "react"
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from "react-router-dom";
import UserProfile from '../components/UserProfile';
import Sidebar from '../components/Sidebar';


import Pins from "./Pins";
import logo from "../assets/logo.png";
import { client } from "../client";
import { userQuery } from "../utils/data"
import { fetchUser } from "../utils/fetchUser";



function Home() {

  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null)
  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub)

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row ">
        <div className="flex flex-row p-2 px-3 w-full justify-between items-center shadow-md">

          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          {user ? (<Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-12 rounded-md" />
          </Link>) : (
            <div></div>
          )}
          {toggleSidebar && (
            <div className="fixed top-0 left-0  w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute w-full flex justify-end items-center p-2">
                <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar} />
            </div>
          )}
        </div>
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>

  )
}

export default Home