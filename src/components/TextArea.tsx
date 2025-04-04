import { ChangeEvent } from "react";
import { IoMdArrowUp } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import { MdLightbulbOutline } from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";

const TextArea = () => {
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "3rem";
    textarea.style.height = `${textarea.scrollHeight}px`; // Auto-expand
  };

  return (
    <div className="bg-[#303030] gap-1 rounded-4xl p-3 pl-4 pt-6 flex flex-col">
      <textarea
        placeholder="Ask anything..."
        className="outline-none resize-none max-h-60 min-h-10 w-3xl overflow-hidden text-white"
        onInput={handleInput}
      />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <label
            htmlFor="chat"
            className="btn btn-circle hover:bg-transparent btn-ghost border-[#414141]"
          >
            <span>
              <IoAddSharp size={20} />
            </span>
            <input id="chat" className="hidden" name="chat" type="file" />
          </label>

          <button className="btn rounded-full hover:bg-transparent btn-ghost border-[#414141]">
            <TbWorld size={20} />
            <span>Search</span>
          </button>

          <button className="btn rounded-full hover:bg-transparent btn-ghost border-[#414141]">
            <MdLightbulbOutline size={20} />
            <span>Use of deep logical thinking</span>
          </button>

          <button className="btn btn-circle hover:bg-transparent btn-ghost border-[#414141]">
            <PiDotsThreeBold size={20} />
          </button>
        </div>

        <button className="btn btn-circle hover:bg-white/80 bg-white text-black btn-ghost border-none">
          <IoMdArrowUp size={20} />
        </button>
      </div>
    </div>
  );
};

export default TextArea;
