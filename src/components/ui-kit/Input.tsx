import { soundStore } from "@/stores/soundStore";
import { useState, useRef } from "react";

interface InputProps {
  maxLength?: number;
  onChange?: (val?: string) => void;
}

export const Input = ({ maxLength = 5, onChange }: InputProps) => {
  const [value, setValue] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.repeat) return;

    if (e.key.length === 1 && value.length < maxLength) {
      soundStore.playRandomTypeSound();
    }

    if (e.key === "Backspace") {
      soundStore.playSound("type5");
    } else if (value.length >= maxLength) {
      soundStore.playSound("beep");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > maxLength) {
      return;
    }
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  const display = value + "_".repeat(maxLength - value.length);

  return (
    <div
      className="relative w-max font-mono text-4xl text-lime-400 select-none"
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onKeyDownCapture={handleKeyDown}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
      />

      <span className="tracking-[14px]">{display}</span>

      {hasFocus && (
        <span
          className="absolute text-lime-400 animate-blink"
          style={{
            left: `calc(${value.length}ch + ${value.length * 14}px)`,
          }}
        >
          ▮
        </span>
      )}
    </div>
  );
};
