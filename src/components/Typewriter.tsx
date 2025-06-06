"use client";
import React, { ReactElement, useEffect, useState } from "react";

export interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  startDelay?: number;
  completeDelay?: number;
  alwaysShowCursor?: boolean;
  cursor?: boolean;
  cursorStyle?: string;
  isActive?: boolean;
  charAmountRangePerType?: number;
  onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 20,
  className = "",
  startDelay = 0,
  completeDelay = 700,
  cursor = true,
  alwaysShowCursor = false,
  cursorStyle = "▮",
  isActive = false,
  charAmountRangePerType = 3,
  onComplete,
}) => {
  const [visibleText, setVisibleText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => {
      setIsTyping(true);
      setVisibleText(text.charAt(0));
    }, startDelay);

    return () => clearTimeout(timer);
  }, [isActive, startDelay, text]);

  useEffect(() => {
    if (!isTyping || visibleText.length >= text.length) {
      if (visibleText.length === text.length && isTyping) {
        setTimeout(() => {
          setIsTyping(false);
          onComplete?.();
        }, completeDelay);
      }
      return;
    }

    const nextCharCount =
      Math.floor(Math.random() * charAmountRangePerType) + 1;

    const timer = setTimeout(() => {
      setVisibleText(text.slice(0, visibleText.length + nextCharCount));
    }, speed);

    return () => clearTimeout(timer);
  }, [
    isTyping,
    visibleText,
    text,
    speed,
    onComplete,
    completeDelay,
    charAmountRangePerType,
  ]);

  return (
    <span className={`relative ${className}`}>
      <div className="absolute">
        {visibleText}
        {((cursor && isTyping) || alwaysShowCursor) && (
          <span className="animate-blink">{cursorStyle}</span>
        )}
      </div>
      <div className={`invisible ${className}`} aria-hidden="true">
        {text}
      </div>
    </span>
  );
};

export const TypewriterSequence = ({
  children,
}: {
  children: ReactElement<TypewriterProps>[];
}) => {
  const [current, setCurrent] = useState(0);

  return (
    <>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          key: index,
          isActive: index === current,
          onComplete: () => setCurrent((prev) => prev + 1),
        })
      )}
    </>
  );
};
