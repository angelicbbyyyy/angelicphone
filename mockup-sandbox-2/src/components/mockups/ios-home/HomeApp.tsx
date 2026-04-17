import { useState } from "react";
import { Settings } from "../ios-settings/Settings";
import { HomeScreen } from "./HomeScreen";

export function HomeApp() {
  const [view, setView] = useState<"home" | "settings">("home");

  if (view === "settings") {
    return (
      <div style={{ position: "relative" }}>
        <Settings />
        <button
          type="button"
          onClick={() => setView("home")}
          style={{
            position: "absolute",
            top: 56,
            left: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#007AFF",
            fontSize: 17,
            padding: 0,
            zIndex: 10,
          }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1 8.5 9 16" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    );
  }

  return <HomeScreen onOpenSettings={() => setView("settings")} />;
}
