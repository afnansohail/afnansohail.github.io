import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, prefersFinePointer } from "@/lib/gsap";

const INTERACTIVE_SELECTOR =
  'a, button, [data-magnetic], [role="button"], input, textarea, select';

const SPIN_DURATION = 2;
const HOVER_DURATION = 0.2;
const BORDER_WIDTH = 3;
const CORNER_SIZE = 8;
const CURSOR_COLOR = "#ffffff";
const CURSOR_COLOR_ON_TARGET = "#f2f207";

const IDLE_OFFSETS = [
  { x: -CORNER_SIZE * 1.5, y: -CORNER_SIZE * 1.5 }, // top-left
  { x: CORNER_SIZE * 0.5, y: -CORNER_SIZE * 1.5 }, // top-right
  { x: CORNER_SIZE * 0.5, y: CORNER_SIZE * 0.5 }, // bottom-right
  { x: -CORNER_SIZE * 1.5, y: CORNER_SIZE * 0.5 }, // bottom-left
];

function getContainingBlock(element: HTMLElement | null): HTMLElement | null {
  let node = element?.parentElement ?? null;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (
      style.transform !== "none" ||
      style.perspective !== "none" ||
      style.filter !== "none" ||
      style.willChange.includes("transform") ||
      style.willChange.includes("perspective") ||
      style.willChange.includes("filter") ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

function getContainingBlockOffset(block: HTMLElement | null) {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
}

const CORNER_BASE = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  width: CORNER_SIZE,
  height: CORNER_SIZE,
  borderWidth: BORDER_WIDTH,
  borderStyle: "solid" as const,
  borderColor: CURSOR_COLOR,
};

const CORNER_STYLES = [
  {
    ...CORNER_BASE,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    transform: "translate(-150%, -150%)",
  },
  {
    ...CORNER_BASE,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    transform: "translate(50%, -150%)",
  },
  {
    ...CORNER_BASE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    transform: "translate(50%, 50%)",
  },
  {
    ...CORNER_BASE,
    borderRightWidth: 0,
    borderTopWidth: 0,
    transform: "translate(-150%, 50%)",
  },
];

export default function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<HTMLDivElement[]>([]);
  const [enabled] = useState(
    () => prefersFinePointer() && !prefersReducedMotion(),
  );

  useEffect(() => {
    if (!enabled) return;
    const wrapper = wrapperRef.current;
    const dot = dotRef.current;
    const corners = cornerRefs.current;
    if (!wrapper || !dot || corners.length < 4) return;

    document.documentElement.dataset.cursor = "custom";

    let containingBlock = getContainingBlock(wrapper);
    const getOffset = () => getContainingBlockOffset(containingBlock);

    const initialOffset = getOffset();
    gsap.set(wrapper, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2 - initialOffset.x,
      y: window.innerHeight / 2 - initialOffset.y,
    });

    let spinTl: ReturnType<typeof gsap.timeline> | null = null;
    const createSpinTimeline = () => {
      spinTl?.kill();
      spinTl = gsap.timeline({ repeat: -1 }).to(wrapper, {
        rotation: "+=360",
        duration: SPIN_DURATION,
        ease: "none",
      });
    };
    createSpinTimeline();

    let activeTarget: HTMLElement | null = null;
    let targetCornerPositions: { x: number; y: number }[] | null = null;
    let leaveTimer: number | null = null;
    let resumeTimer: number | null = null;
    let tickerAdded = false;
    const activeStrength = { current: 0 };

    const addTicker = () => {
      if (tickerAdded) return;
      gsap.ticker.add(tick);
      tickerAdded = true;
    };
    const removeTicker = () => {
      if (!tickerAdded) return;
      gsap.ticker.remove(tick);
      tickerAdded = false;
    };

    function tick() {
      if (!targetCornerPositions || activeStrength.current === 0) return;
      const strength = activeStrength.current;
      const cursorX = Number(gsap.getProperty(wrapper, "x"));
      const cursorY = Number(gsap.getProperty(wrapper, "y"));

      corners.forEach((corner, i) => {
        const currentX = Number(gsap.getProperty(corner, "x"));
        const currentY = Number(gsap.getProperty(corner, "y"));
        const targetX = targetCornerPositions![i].x - cursorX;
        const targetY = targetCornerPositions![i].y - cursorY;
        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;
        const duration = strength >= 0.99 ? 0.2 : 0.05;
        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration,
          ease: "power1.out",
          overwrite: "auto",
        });
      });
    }

    const xTo = gsap.quickTo(wrapper, "x", {
      duration: 0.1,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(wrapper, "y", {
      duration: 0.1,
      ease: "power3.out",
    });
    const moveHandler = (e: PointerEvent) => {
      const { x: offsetX, y: offsetY } = getOffset();
      xTo(e.clientX - offsetX);
      yTo(e.clientY - offsetY);
    };
    window.addEventListener("pointermove", moveHandler);

    const scrollHandler = () => {
      if (!activeTarget) return;
      const { x: offsetX, y: offsetY } = getOffset();
      const mouseX = Number(gsap.getProperty(wrapper, "x")) + offsetX;
      const mouseY = Number(gsap.getProperty(wrapper, "y")) + offsetY;
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const stillOverTarget =
        elementUnderMouse === activeTarget ||
        (elementUnderMouse !== null &&
          activeTarget.contains(elementUnderMouse));
      if (!stillOverTarget) handleLeave();
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.3 });
      gsap.to(wrapper, { scale: 0.9, duration: 0.2 });
    };
    const mouseUpHandler = () => {
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(wrapper, { scale: 1, duration: 0.2 });
    };
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    const cancelPendingLeave = () => {
      if (leaveTimer !== null) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }
    };

    function handleLeave() {
      cancelPendingLeave();
      leaveTimer = window.setTimeout(() => {
        leaveTimer = null;
        removeTicker();
        targetCornerPositions = null;
        activeStrength.current = 0;
        activeTarget = null;

        gsap.to(corners, {
          borderColor: CURSOR_COLOR,
          duration: 0.15,
          ease: "power2.out",
        });
        gsap.to(dot, {
          backgroundColor: CURSOR_COLOR,
          duration: 0.15,
          ease: "power2.out",
        });

        gsap.killTweensOf(corners, "x,y");
        corners.forEach((corner, i) =>
          gsap.to(corner, {
            ...IDLE_OFFSETS[i],
            duration: 0.3,
            ease: "power3.out",
          }),
        );

        resumeTimer = window.setTimeout(() => {
          resumeTimer = null;
          const currentRotation =
            Number(gsap.getProperty(wrapper, "rotation")) || 0;
          const normalizedRotation = currentRotation % 360;
          spinTl?.kill();
          gsap.to(wrapper, {
            rotation: normalizedRotation + 360,
            duration: SPIN_DURATION * (1 - normalizedRotation / 360),
            ease: "none",
            onComplete: createSpinTimeline,
          });
        }, 50);
      }, 0);
    }

    function handleEnter(target: HTMLElement) {
      cancelPendingLeave();
      if (resumeTimer !== null) {
        clearTimeout(resumeTimer);
        resumeTimer = null;
      }
      if (activeTarget === target) return;
      activeTarget = target;

      gsap.killTweensOf(corners, "x,y");
      gsap.killTweensOf(wrapper, "rotation");
      spinTl?.pause();
      gsap.set(wrapper, { rotation: 0 });

      gsap.to(corners, {
        borderColor: CURSOR_COLOR_ON_TARGET,
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(dot, {
        backgroundColor: CURSOR_COLOR_ON_TARGET,
        duration: 0.15,
        ease: "power2.out",
      });

      const rect = target.getBoundingClientRect();
      const { x: offsetX, y: offsetY } = getOffset();
      const cursorX = Number(gsap.getProperty(wrapper, "x"));
      const cursorY = Number(gsap.getProperty(wrapper, "y"));

      targetCornerPositions = [
        {
          x: rect.left - BORDER_WIDTH - offsetX,
          y: rect.top - BORDER_WIDTH - offsetY,
        },
        {
          x: rect.right + BORDER_WIDTH - CORNER_SIZE - offsetX,
          y: rect.top - BORDER_WIDTH - offsetY,
        },
        {
          x: rect.right + BORDER_WIDTH - CORNER_SIZE - offsetX,
          y: rect.bottom + BORDER_WIDTH - CORNER_SIZE - offsetY,
        },
        {
          x: rect.left - BORDER_WIDTH - offsetX,
          y: rect.bottom + BORDER_WIDTH - CORNER_SIZE - offsetY,
        },
      ];

      gsap.to(activeStrength, {
        current: 1,
        duration: HOVER_DURATION,
        ease: "power2.out",
      });

      corners.forEach((corner, i) =>
        gsap.to(corner, {
          x: targetCornerPositions![i].x - cursorX,
          y: targetCornerPositions![i].y - cursorY,
          duration: 0.2,
          ease: "power2.out",
        }),
      );

      addTicker();
    }

    const interactive = Array.from(
      document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR),
    ).map((el) => ({ el, onEnter: () => handleEnter(el) }));
    interactive.forEach(({ el, onEnter }) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    const resizeHandler = () => {
      containingBlock = getContainingBlock(wrapper);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      delete document.documentElement.dataset.cursor;
      cancelPendingLeave();
      if (resumeTimer !== null) clearTimeout(resumeTimer);
      removeTicker();
      spinTl?.kill();
      window.removeEventListener("pointermove", moveHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("resize", resizeHandler);
      interactive.forEach(({ el, onEnter }) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-100 mix-blend-difference"
      style={{ width: 0, height: 0 }}
    >
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 rounded-full will-change-transform"
        style={{
          width: 4,
          height: 4,
          backgroundColor: CURSOR_COLOR,
          transform: "translate(-50%, -50%)",
        }}
      />
      {CORNER_STYLES.map((style, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) cornerRefs.current[i] = el;
          }}
          className="will-change-transform"
          style={style}
        />
      ))}
    </div>
  );
}
