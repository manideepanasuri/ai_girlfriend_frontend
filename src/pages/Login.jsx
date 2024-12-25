import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/features/userdata";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.username) {
      navigate("/");
    }
  }, [navigate, user]);
  const usernameref = useRef(null);
  const passwordref = useRef(null);
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const username = usernameref.current.value;
    const password = passwordref.current.value;
    if (username && password) {
      dispatch(loginUser({ username, password }));
    }
  }
  return (
    <>
      <div className="navbar bg-primary text-primary-content fixed rounded-md top-0">
        <button className="btn btn-ghost text-xl">AI Girlfried</button>
      </div>
      <div className="w-screen h-screen flex justify-center items-center">
        <form className="form-control  p-4 px-6 md:w-[60vw] rounded-md bg-primary-content shadow-lg w-full m-10">
          <h1 className="text-4xl text-white text-center my-3 mb-5">Log in</h1>
          <input
            data-theme="light"
            type="text"
            placeholder="username"
            ref={usernameref}
            className="input input-bordered  w-full  my-2"
          />
          <input
            data-theme="light"
            type="text"
            placeholder="password"
            ref={passwordref}
            className="input input-bordered w-full my-2"
          />
          {user.error ? (
            <p className="text-warning">Invalid credintials</p>
          ) : (
            <></>
          )}
          <p className=" my-1">
            New here?{" "}
            <Link to="/signup" className="text-secondary">
              Sign up
            </Link>
          </p>
          {user.isLoading ? (
            <button className="btn">
              <span className="loading loading-spinner"></span>
              loading
            </button>
          ) : (
            <button
              data-theme="light"
              value="submit"
              className="btn my-2 "
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}
