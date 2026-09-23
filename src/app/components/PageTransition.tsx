"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ENTER_DURATION = 560;
const EXIT_DURATION  = 260;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname   = usePathname();
  const prevPath   = useRef(pathname);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);

    const id = setTimeout(() => setVisible(true), 20);
    prevPath.current = pathname;
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <>
      <style>{`
        .gt-page-wrapper {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity   ${ENTER_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1),
            transform ${ENTER_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .gt-page-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className={"gt-page-wrapper" + (visible ? " visible" : "")}>
        {children}
      </div>
    </>
  );
}
