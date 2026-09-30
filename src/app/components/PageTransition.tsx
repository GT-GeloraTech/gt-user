"use client";

import { useEffect, useState } from "react";
import { usePageLoader } from "./PageLoader";

const ENTER_DURATION = 420;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const { isLoading } = usePageLoader();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [isLoading]);

  return (
    <>
      <style>{`
        .gt-page-wrapper {
          opacity: 0;
          transform: translateY(16px);
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

