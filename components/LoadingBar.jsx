"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setVisible(true);
    setProgress(0);
    const t1 = setTimeout(() => setProgress(30), 50);
    const t2 = setTimeout(() => setProgress(65), 250);
    const t3 = setTimeout(() => setProgress(85), 500);
    const t4 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setVisible(false), 400);
    }, 700);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 9999,
      height: 3, width: `${progress}%`,
      background: "var(--accent-red)",
      transition: progress === 0 ? "none" : "width 0.4s ease",
      boxShadow: "0 0 10px rgba(192,57,43,0.6)",
    }} />
  );
}
