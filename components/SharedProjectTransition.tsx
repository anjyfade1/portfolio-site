"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SourceRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TransitionData {
  slug: string;
  posterImage: string;
  title: string;
  sourceRect: SourceRect;
}

interface SharedTransitionContextType {
  activeSlug: string | null;
  startTransition: (
    data: TransitionData,
    e?: React.MouseEvent<HTMLElement>
  ) => void;
  registerTargetHero: (node: HTMLElement | null) => void;
}

const SharedTransitionContext = createContext<SharedTransitionContextType>({
  activeSlug: null,
  startTransition: () => {},
  registerTargetHero: () => {},
});

export function useSharedTransition() {
  return useContext(SharedTransitionContext);
}

export function SharedProjectTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [transitionData, setTransitionData] = useState<TransitionData | null>(
    null
  );
  const [isExpanding, setIsExpanding] = useState(false);
  const targetHeroNodeRef = useRef<HTMLElement | null>(null);
  const [targetRect, setTargetRect] = useState<SourceRect | null>(null);

  const registerTargetHero = useCallback((node: HTMLElement | null) => {
    targetHeroNodeRef.current = node;
    if (node) {
      const r = node.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        setTargetRect({
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
        });
      }
    }
  }, []);

  // When route changes to destination, measure target hero if available
  useEffect(() => {
    if (transitionData && pathname === `/work/${transitionData.slug}`) {
      const heroEl = document.getElementById(
        `case-study-hero-${transitionData.slug}`
      );
      if (heroEl) {
        const r = heroEl.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          setTargetRect({
            top: r.top,
            left: r.left,
            width: r.width,
            height: r.height,
          });
        }
      }
    }
  }, [pathname, transitionData]);

  const startTransition = useCallback(
    (data: TransitionData, e?: React.MouseEvent<HTMLElement>) => {
      // Respect prefers-reduced-motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        router.push(`/work/${data.slug}`);
        return;
      }

      // Check if View Transition API is natively supported & requested
      if (
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        typeof (document as any).startViewTransition === "function"
      ) {
        setTransitionData(data);
        (document as any).startViewTransition(() => {
          router.push(`/work/${data.slug}`);
        });
        // Clear after transition finishes
        setTimeout(() => {
          setTransitionData(null);
          setIsExpanding(false);
        }, 700);
        return;
      }

      // Fallback: Motion FLIP Expanding Overlay
      setTransitionData(data);
      setIsExpanding(true);

      // Estimate target hero box in viewport based on standard container-grid width
      const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
      const containerWidth = Math.min(1200, vw - 48);
      const targetWidth = containerWidth;
      const targetHeight = (targetWidth * 9) / 16;
      const targetLeft = (vw - targetWidth) / 2;
      const targetTop = 260; // Approximates header height on case study page

      setTargetRect({
        top: targetTop,
        left: targetLeft,
        width: targetWidth,
        height: targetHeight,
      });

      router.push(`/work/${data.slug}`);

      // Auto-clear overlay after animation completes
      setTimeout(() => {
        setIsExpanding(false);
        setTransitionData(null);
      }, 650);
    },
    [router]
  );

  return (
    <SharedTransitionContext.Provider
      value={{
        activeSlug: transitionData?.slug || null,
        startTransition,
        registerTargetHero,
      }}
    >
      {children}

      {/* Shared-Element Expanding Hero Overlay for fallback browsers */}
      <AnimatePresence>
        {isExpanding && transitionData && (
          <motion.div
            key={`expanding-hero-${transitionData.slug}`}
            className="fixed z-50 overflow-hidden pointer-events-none rounded-2xl shadow-2xl border border-[var(--hairline)] bg-[#0d0c0b]"
            initial={{
              top: transitionData.sourceRect.top,
              left: transitionData.sourceRect.left,
              width: transitionData.sourceRect.width,
              height: transitionData.sourceRect.height,
              borderRadius: 16,
              opacity: 1,
            }}
            animate={{
              top: targetRect ? targetRect.top : 260,
              left:
                targetRect && targetRect.left > 0
                  ? targetRect.left
                  : typeof window !== "undefined"
                  ? (window.innerWidth -
                      Math.min(1200, window.innerWidth - 48)) /
                    2
                  : 24,
              width:
                targetRect && targetRect.width > 0
                  ? targetRect.width
                  : typeof window !== "undefined"
                  ? Math.min(1200, window.innerWidth - 48)
                  : 1200,
              height:
                targetRect && targetRect.height > 0
                  ? targetRect.height
                  : typeof window !== "undefined"
                  ? (Math.min(1200, window.innerWidth - 48) * 9) / 16
                  : 675,
              borderRadius: 16,
              opacity: 1,
              transition: {
                duration: 0.52,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={transitionData.posterImage}
                alt={transitionData.title}
                fill
                priority
                className="object-cover object-top select-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SharedTransitionContext.Provider>
  );
}
