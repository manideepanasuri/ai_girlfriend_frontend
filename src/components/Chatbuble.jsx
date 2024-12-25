import boy from '../assets/boy.png'
import girl from '../assets/girl.png'


export default function Chatbuble(props) {
  return (
    <div
      className={"chat " + (props.role == "user" ? "chat-end" : "chat-start")}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={props.role=="user"?boy:girl}
          />
        </div>
      </div>
      <div
        className={
          "chat-bubble " +
          (props.role == "user"
            ? "chat-bubble-primary"
            : "chat-bubble-secondary")
        }
      >
        {props.message}
      </div>
    </div>
  );
}
