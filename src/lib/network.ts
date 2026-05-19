/**
 * Network-condition + device-capability detection.
 *
 * Used by media-heavy components to make load-or-skip decisions.
 *
 *   - effectiveType: "4g" | "3g" | "2g" | "slow-2g" | undefined
 *   - saveData    : user requested Data-Saver
 *   - downlinkMbps: rough downlink estimate
 *   - lowEnd      : heuristic for memory/CPU-constrained mobile
 *
 * No React. Importable from anywhere. The hook variant subscribes to
 * connection-change events so the UI can react if the user roams from
 * 4G into 3G mid-session.
 */
import { useEffect, useState } from "react";

type EffectiveType = "slow-2g" | "2g" | "3g" | "4g" | undefined;

type ConnectionLike = {
  effectiveType?: EffectiveType;
  saveData?: boolean;
  downlink?: number;
  addEventListener?: (event: "change", cb: () => void) => void;
  removeEventListener?: (event: "change", cb: () => void) => void;
};

function getConnection(): ConnectionLike | undefined {
  if (typeof navigator === "undefined") return undefined;
  // The Network Information API is on navigator.connection (+ webkit/mozilla
  // prefixes in older builds).
  const nav = navigator as Navigator & {
    connection?: ConnectionLike;
    mozConnection?: ConnectionLike;
    webkitConnection?: ConnectionLike;
  };
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
}

function getDeviceMemoryGb(): number {
  if (typeof navigator === "undefined") return 8;
  return (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
}

function getHardwareConcurrency(): number {
  if (typeof navigator === "undefined") return 8;
  return navigator.hardwareConcurrency ?? 8;
}

export type NetworkProfile = {
  effectiveType: EffectiveType;
  saveData: boolean;
  downlinkMbps: number;
  /** lowEnd ⇔ ≤4 GB RAM or ≤4 logical CPUs — likely a budget Android. */
  lowEnd: boolean;
  /** slow ⇔ saveData OR effectiveType ∈ {slow-2g, 2g, 3g}. */
  slow: boolean;
  /** "good" enough to autoplay heavy video and prefetch chunks. */
  good: boolean;
};

export function getNetworkProfile(): NetworkProfile {
  const conn = getConnection();
  const effectiveType = conn?.effectiveType;
  const saveData = !!conn?.saveData;
  const downlinkMbps = conn?.downlink ?? 10;
  const lowEnd = getDeviceMemoryGb() <= 4 || getHardwareConcurrency() <= 4;
  const slow =
    saveData ||
    effectiveType === "slow-2g" ||
    effectiveType === "2g" ||
    effectiveType === "3g";
  const good = !slow && effectiveType !== undefined
    ? effectiveType === "4g" && downlinkMbps >= 2
    : !slow; // unknown API → optimistic on desktop, slow flag still respected
  return { effectiveType, saveData, downlinkMbps, lowEnd, slow, good };
}

/**
 * React hook variant. Re-renders if the user roams between cells.
 * SSR-safe (returns a sensible default during the first render).
 */
export function useNetworkProfile(): NetworkProfile {
  const [profile, setProfile] = useState<NetworkProfile>(() => getNetworkProfile());
  useEffect(() => {
    setProfile(getNetworkProfile());
    const conn = getConnection();
    if (!conn?.addEventListener) return;
    const handler = () => setProfile(getNetworkProfile());
    conn.addEventListener("change", handler);
    return () => conn.removeEventListener?.("change", handler);
  }, []);
  return profile;
}

/**
 * Idle scheduler. Falls back to setTimeout(50) where requestIdleCallback
 * isn't implemented (Safari).
 */
export function whenIdle(cb: () => void, timeout = 2000): () => void {
  if (typeof window === "undefined") {
    cb();
    return () => {};
  }
  const ric = (window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  }).requestIdleCallback;
  if (typeof ric === "function") {
    const id = ric(cb, { timeout });
    return () =>
      (
        window as Window & { cancelIdleCallback?: (id: number) => void }
      ).cancelIdleCallback?.(id);
  }
  const t = window.setTimeout(cb, 50);
  return () => window.clearTimeout(t);
}
