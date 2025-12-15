import React from 'react'
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";
import type { NavigateFunction } from "react-router-dom";
import { ListCollapse } from 'lucide-react';

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  onClick,
  vertical = false,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
  onClick: NavigateFunction;
  vertical?: boolean;
}) => {
  return (
    <>
      <FloatingDockDesktop onClick={onClick} items={items} className={desktopClassName} vertical={vertical} />
    </>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  onClick,
  vertical = false,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
  onClick: NavigateFunction;
  vertical?: boolean;
}) => {
  let mousePos = useMotionValue(Infinity);
  
  return (
    <div
      className={cn(
        "flex items-start gap-2",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer 
          onClick={onClick} 
          mousePos={mousePos} 
          key={item.title} 
          vertical={vertical}
          {...item} 
        />
      ))}
    </div>
  );
};

function IconContainer({
  mousePos,
  title,
  icon,
  href,
  onClick,
  vertical = false,
}: {
  mousePos: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick: NavigateFunction;
  vertical?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} onClick={(e) => { e.preventDefault(); onClick(href) }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group flex w-10 h-10 border border-foreground/10 aspect-square items-center justify-center rounded-xl bg-foreground/5 hover:bg-foreground/10 hover:border-primary/30 transition-all duration-200 hover:scale-105"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-fit rounded-lg border border-foreground/10 px-2.5 py-1 text-xs whitespace-pre bg-background/95 backdrop-blur-sm shadow-lg z-50"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-center w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors">
          {icon}
        </div>
      </div>
    </a>
  );
}
