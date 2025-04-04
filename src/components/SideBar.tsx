import { BiMenu, BiSearch } from "react-icons/bi";

const SideBar = () => {
  const chats = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet",
      messages: [
        {
          id: 1,
          text: "Hello!",
          sender: "user",
        },
        {
          id: 2,
          text: "Hi! How can I help you?",
          sender: "bot",
        },
      ],
    },
    {
      id: 2,
      title: "Dolor sit amet consectetur",
      messages: [
        {
          id: 3,
          text: "What is your name?",
          sender: "user",
        },
        {
          id: 4,
          text: "I am a chatbot.",
          sender: "bot",
        },
      ],
    },
  ];

  return (
    <ul className="flex flex-col p-2 bg-base-300 h-screen w-[16rem]">
      <ul className="flex justify-between mb-2">
        <li className="p-2 rounded-lg btn-ghost hover:bg-base-100 duration-150 cursor-pointer btn">
          <BiMenu size={22} />
        </li>
        <li className="p-2 rounded-lg btn-ghost hover:bg-base-100 duration-150 cursor-pointer btn">
          <BiSearch size={22} />
        </li>
      </ul>
      {chats.map((chat, index) => (
        <li
          key={index}
          className="p-2 justify-start rounded-lg btn-ghost hover:bg-base-100 duration-150 cursor-pointer btn"
        >
          {chat.title}
        </li>
      ))}
    </ul>
  );
};

export default SideBar;
