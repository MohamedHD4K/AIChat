import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

interface InputType {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onVisible?: MouseEventHandler<HTMLButtonElement>;
  value?: string;
  required?: boolean;
  icon?: React.ReactElement;
  profixIcon?: React.ReactElement;
  className?: string;
}

const Input: React.FC<InputType> = ({
  name,
  type = "text",
  placeholder,
  label,
  onChange,
  value,
  required,
  icon,
  profixIcon,
  onVisible,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value) {
      inputRef.current?.focus();
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-1 mt-3">
      <div
        className={`flex gap-2 relative focus items-center input duration-150 w-full rounded focus-within:outline-none ${className}`}
      >
        {label && (
          <label
            className={`absolute left-9 px-2 bg-base-100 transition-all duration-300 ${
              isFocused || value
                ? "-top-3 text-xs text-base-content"
                : "top-2 text-gray-400"
            }`}
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
          >
            {label}
          </label>
        )}
        {icon && icon}
        <input
          ref={inputRef}
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !value && setIsFocused(false)}
        />
        {profixIcon && (
          <button
            className="hover:bg-black/40 cursor-pointer active:bg-black/50 rounded-full duration-150 p-2"
            onClick={onVisible}
          >
            {profixIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
