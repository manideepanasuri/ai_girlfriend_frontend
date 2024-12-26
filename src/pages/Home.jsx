import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Chatbuble from "../components/Chatbuble";
import { setToFalse } from "../store/features/clearChat";
import Navbar from "../components/Navbar";

export default function Home() {
  const user = useSelector((state) => state.user);
  const clearchat = useSelector((state) => state.clearchat);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }
  }, [navigate, user]);
  const msgref = useRef(null);
  const scrollRef = useRef(null); // Ref for the last message
  const [messageHistory, setMessageHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currMsg, setCurrMsg] = useState(null);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    import.meta.env.VITE_BACKEND_HOST + `ws/chat/`,
    {
      queryParams: { token: user.access },
      shouldReconnect: true,
      reconnectAttempts:10,
      reconnectInterval:1000,
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.length > 2) {
        setMessageHistory([]);
      }
      if (lastJsonMessage.length == 0 && clearchat.value) {
        setMessageHistory([]);
        dispatch(setToFalse());
      }
      setMessageHistory((prev) => prev.concat(lastJsonMessage));
      setLoading(false);
      setCurrMsg(null);
    }
  }, [lastJsonMessage]);

  // Automatically scroll to the last message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageHistory, loading]); // Trigger when `messageHistory` updates

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if(connectionStatus!="Open"){return;}
    const msg = msgref.current.value;
    if(!msg){return;}
    setLoading(true);
    setCurrMsg({ role: "user", parts: msg });
    if (msg) {
      sendJsonMessage({ message: msg });
      msgref.current.value = ""; // Clear the input field
    }
  }

  useEffect(() => {
    if (clearchat.value) {
      sendJsonMessage({ clearchat: true, message: {} });
    }
  }, [clearchat]);
  const inputref=useRef(null);
  const [height,setHeight]=useState(0);
  useEffect(() => {
    if (inputref.current) {
      setHeight(inputref.current.offsetHeight);
    }
  
  }, [inputref])



  return (
    <div  className=" relative overflow-y-scroll overflow-x-hidden ">
      <Navbar />
      <div className="flex flex-col justify-end items-center relative   ">
        <div className=" flex flex-col justify-end w-full  items-center overflow-x-hidden no-scrollbar " style={{ paddingBottom: `${height}px`,height:`${window.innerHeight-height}px` }}>
          <div className={` md:w-[60vw] w-full  px-4 bottom-0  overflow-y-scroll`}
          
          >
            {messageHistory.map((val, index) => (
              <Chatbuble key={index} role={val.role} message={val.parts} />
            ))}
            {currMsg ? (
              <Chatbuble role={currMsg.role} message={currMsg.parts} />
            ) : (
              <></>
            )}
            <div ref={scrollRef} className="flex justify-start">
              <span
                className={
                  "loading loading-dots loading-lg " + (loading ? "" : "hidden")
                }
              ></span>
            </div>
          </div>
        </div>
        <form
          className="flex w-screen justify-center rounded-md border-0 items-center fixed bottom-0 md:w-[60vw] p-2 pb-3 bg-base-100"
          ref={inputref}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            ref={msgref}
            placeholder="Type here"
            className="input input-bordered w-full mx-2"
            data-theme="light"
            autoFocus={true}
          />
          <button data-theme="light" type="submit" className="btn mx-2">
            Send
          </button>
        </form>
      </div>
      <div className="toast toast-top toast-center z-20">
        {connectionStatus == "Connecting" ? (
          <div className="alert alert-warning">
            <span>
              Connecting please wait{" "}
              {" "}
            </span>
            <span className="loading loading-dots loading-sm"></span>
          </div>
        ) : (
          <></>
        )}
        {connectionStatus == "Closed"||connectionStatus=="Closing" ? (
          <div className="alert alert-error">
            <span>
              Disconnected{" "}
              {" "}
            </span>
            
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
