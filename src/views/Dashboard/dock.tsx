import React from 'react'
import { FloatingDock } from "@/components/ui/floating-dock";
import { links } from "@/config/static";
import { useNavigate } from "react-router-dom";

export function Dock() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-start justify-center h-full w-14 px-2 pt-4">
      <FloatingDock
        onClick={navigate}
        items={links}
        vertical
      />
    </div>
  );
}
