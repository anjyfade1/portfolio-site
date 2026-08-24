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
import { useRouter } from "next/navigation";
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
  isTransitioning: boolean;
  startTransition: (
    data: TransitionData,
    e?: React.MouseEvent<HTMLElement>
  ) => void;
  registerTargetHero: (slug: string, node: HTMLElement | null) => void;
}

const SharedTransitionContext = createContext<SharedTransitionContextType>({
  activeSlug: null,
  startTransition: () => {},
  registerTargetHero: () => {},
});

export function useSharedTransition() {
  const context = useContext(SharedTransitionContext);
  if (!context) {
    throw new Error("useSharedTransition must be used within a SharedProjectTransitionProvider");
  }
  return context;
}

export function SharedProjectTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [transitionData, setTransitionData] = useState<TransitionData | null>(
    null
  );
  const [targetRect, setTargetRect] = useState<SourceRect | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (cleanupTimerRef.current) {
      clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = null;
    }
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  const finishTransition = useCallback(() => {
    setIsAnimating(false);

    cleanupTimerRef.current = setTimeout(() => {
      setTransitionData(null);
      setTargetRect(null);
      cleanupTimerRef.current = null;
    }, 120);
  }, []);

  const registerTargetHero = useCallback(
    (slug: string, node: HTMLElement | null) => {
      if (!node || transitionData?.slug !== slug) {
        return;
      }

      requestAnimationFrame(() => {
        const r = node.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          setTargetRect({
            top: r.top,
            left: r.left,
            width: r.width,
            height: r.height,
          });
          setIsAnimating(true);
        }
      });
    },
    [transitionData?.slug],
  );

  const startTransition = useCallback(
    (data: TransitionData, e?: React.MouseEvent<HTMLElement>) => {
      // Prevent standard browser navigation jump
      if (e) {
        e.preventDefault();
      }

      // Respect prefers-reduced-motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        router.push(`/work/${data.slug}`);
        return;
      }

      clearTimers();
      setTransitionData(data);
      setTargetRect(null);
      setIsAnimating(false);

      router.push(`/work/${data.slug}`);

      fallbackTimerRef.current = setTimeout(() => {
        setTransitionData(null);
        setTargetRect(null);
        setIsAnimating(false);
        fallbackTimerRef.current = null;
      }, 2500);
    },
    [clearTimers, router]
  );

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <SharedTransitionContext.Provider
      value={{
        activeSlug: transitionData?.slug || null,
        isTransitioning: !!transitionData,
        startTransition,
        registerTargetHero,
      }}
    >
      {children}

      {/* Shared-element hero overlay */}
      <AnimatePresence>
        {transitionData && (
          <motion.div
            key={`expanding-hero-${transitionData.slug}`}
            className="fixed z-[99999] overflow-hidden pointer-events-none rounded-2xl shadow-2xl border border-[var(--hairline)] bg-[#0d0c0b]"
            initial={{
              top: transitionData.sourceRect.top,
              left: transitionData.sourceRect.left,
              width: transitionData.sourceRect.width,
              height: transitionData.sourceRect.height,
              borderRadius: 16,
              opacity: 1,
            }}
            animate={{
              top: targetRect?.top ?? transitionData.sourceRect.top,
              left: targetRect?.left ?? transitionData.sourceRect.left,
              width: targetRect?.width ?? transitionData.sourceRect.width,
              height: targetRect?.height ?? transitionData.sourceRect.height,
              borderRadius: 16,
              opacity: 1,
              transition: {
                duration: targetRect && isAnimating ? 0.72 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            onAnimationComplete={() => {
              if (targetRect && isAnimating) {
                finishTransition();
              }
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.12, ease: "easeOut" },
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
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/40 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SharedTransitionContext.Provider>
  );
}
