import { soundStore } from "@/stores/soundStore";
import Link from "next/link";

interface ButtonProps {
  children: string;
  onClick?: () => void;
  href?: string;
  innerHref?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  href,
  innerHref = false,
  className,
}: ButtonProps) => {
  const commonClassName = `relative px-4 py-4 border-shadow uppercase  cursor-pointer transition-colors duration-100 hover:bg-lime-900/15 ${className} `;
  const commonListeners = {
    onClick: () => {
      soundStore.playSound("beep");
      onClick?.();
    },

    onMouseEnter: () => {
      soundStore.playSound("click");
    },
  };

  if (innerHref && href) {
    return (
      <Link href={href} className={commonClassName} {...commonListeners}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={commonClassName} {...commonListeners}>
        {children}
      </a>
    );
  }

  return (
    <button className={commonClassName} {...commonListeners}>
      {children}
    </button>
  );
};
