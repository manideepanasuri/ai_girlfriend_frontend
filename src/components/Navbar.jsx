import { NavLink, useNavigate } from "react-router";
import boy from "../assets/boy.png";
import { useDispatch, useSelector } from "react-redux";
import { setToTrue } from "../store/features/clearChat";
import { useEffect, useRef } from "react";
import { logout } from "../store/features/userdata";

export default function Navbar() {
  const clearchat=useSelector((state)=>state.clearchat)
  const dispatch=useDispatch()
  function handleClearChat(){
    dispatch(setToTrue());
  }
  const navigate=useNavigate();
  const user=useSelector((state)=>state.user);
  return (
    <div className="navbar bg-base-100 rounded-md sticky top-0 z-10 w-screen ">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          GirlFriend
        </NavLink>
      </div>
      <div className="navbar-end">
        <button data-theme="light" className="btn mx-3" onClick={handleClearChat}>
          {!clearchat.value?"Clear chat":
<span className="loading loading-spinner loading-sm"></span>}
        </button>
      </div>
      <div className="dropdown dropdown-end mx-2">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={boy} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <div className="justify-between">
              @{user.username}
            </div>
          </li>
          <li>
            <div className="justify-between">
              {user.email}
            </div>
          </li>
          <li onClick={()=>{
            dispatch(logout())
            navigate('/login')
          }}>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
