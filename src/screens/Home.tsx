import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TextArea from "../components/TextArea";
import UseGetUser from "../hooks/useGetUser";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UserMsg {
  role: string;
  content: string;
}

const Home = () => {
  const { data: user, isLoading, error } = UseGetUser();
  const [messages, setMessages] = useState<UserMsg[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.error("Error fetching user:", error);
    }
  }, [error]);

  const { mutate, isPending: isSending } = useMutation({
    mutationKey: ["chat"],
    mutationFn: async (messages: UserMsg[]) => {
      const response = await axios.post(
        "http://localhost:3000/api/chat",
        { messages },
      );
      
      return response.data;
    },
    onSuccess: (aiMessage) => {
      setMessages((prev) => [...prev, aiMessage]);
      console.log(messages)
    },
    onError: (err: any) => {
      toast.error("Failed to send message.");
      console.error("Chat error:", err);
    },
  });

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: UserMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    mutate(newMessages);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="grow h-screen">
        <NavBar userData={!isLoading && user?.userData} isLoading={isLoading} />
        <div className="flex flex-col justify-center h-[90vh] items-center gap-5">
          <h1 className="text-4xl font-semibold">How can I help you?</h1>
          <TextArea
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            isLoading={isSending}
          />
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Home;
