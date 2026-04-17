import { useState } from "react";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      style={{
        width: 51,
        height: 31,
        borderRadius: 9999,
        backgroundColor: checked ? "#34C759" : "#E5E5EA",
        border: "none",
        padding: 2,
        cursor: "pointer",
        transition: "background-color 0.25s ease",
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        outline: "none",
        WebkitAppearance: "none",
      }}
    >
      <span
        style={{
          display: "block",
          width: 27,
          height: 27,
          borderRadius: 9999,
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.35)",
          transform: checked ? "translateX(20px)" : "translateX(0px)",
          transition: "transform 0.25s ease",
          pointerEvents: "none",
        }}
      />
    </button>
  );
}

function SettingIcon({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 29,
        height: 29,
        borderRadius: 7,
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
}

function Chevron() {
  return (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 1l6 5.5L1 12" stroke="#C7C7CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Separator() {
  return (
    <div style={{ height: 0.5, backgroundColor: "#C6C6C8", marginLeft: 57 }} />
  );
}

function Row({
  icon,
  label,
  right,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  right: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 16px",
        backgroundColor: "white",
        minHeight: 44,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {icon}
      <span
        style={{
          flex: 1,
          fontSize: 17,
          color: "#000",
          letterSpacing: -0.4,
          lineHeight: "44px",
        }}
      >
        {label}
      </span>
      {right}
    </div>
  );
}

function PhoneMockup({
  wallpaper,
  inputId,
  onUpload,
  type,
}: {
  wallpaper: string | null;
  inputId: string;
  onUpload: (src: string) => void;
  type: "lock" | "home";
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onUpload(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 130,
          height: 220,
          borderRadius: 18,
          overflow: "hidden",
          backgroundColor: type === "lock" ? "#D1D1D6" : "#1C1C1E",
          position: "relative",
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        }}
      >
        {wallpaper && (
          <img
            src={wallpaper}
            alt="wallpaper"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
        {type === "lock" && !wallpaper && (
          <div style={{ position: "absolute", top: 36, left: 0, right: 0, textAlign: "center", color: "#48484A", fontSize: 28, fontWeight: 300 }}>
            09:41
          </div>
        )}
        {type === "home" && !wallpaper && (
          <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, padding: "16px 12px" }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} style={{ backgroundColor: "#3A3A3C", borderRadius: 8 }} />
            ))}
          </div>
        )}
        <label
          htmlFor={inputId}
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0,0,0,0.55)",
            color: "white",
            fontSize: 13,
            fontWeight: 500,
            padding: "5px 14px",
            borderRadius: 20,
            cursor: "pointer",
            whiteSpace: "nowrap",
            backdropFilter: "blur(4px)",
          }}
        >
          Customise
          <input
            id={inputId}
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", clip: "rect(0,0,0,0)" }}
          />
        </label>
      </div>
    </div>
  );
}

function WallpaperScreen({
  onBack,
}: {
  onBack: () => void;
}) {
  const [lockWallpaper, setLockWallpaper] = useState<string | null>(null);
  const [homeWallpaper, setHomeWallpaper] = useState<string | null>(null);

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        backgroundColor: "#F2F2F7",
        fontFamily: '-apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
        overflowY: "auto",
        userSelect: "none",
      }}
    >
      {/* Status bar spacer */}
      <div style={{ height: 44 }} />

      {/* Nav bar */}
      <div style={{ display: "flex", alignItems: "center", padding: "8px 16px 12px", position: "relative" }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#007AFF",
            fontSize: 17,
            padding: 0,
          }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1 8.5 9 16" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 17, fontWeight: 600 }}>
          Wallpaper
        </span>
        <button
          type="button"
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#007AFF",
            fontSize: 17,
            padding: 0,
          }}
        >
          Edit
        </button>
      </div>

      {/* Current wallpaper card */}
      <div style={{ margin: "8px 16px 16px", backgroundColor: "white", borderRadius: 16, padding: "16px 20px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ textAlign: "center", fontSize: 12, fontWeight: 500, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 16 }}>
          CURRENT
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <PhoneMockup
            wallpaper={lockWallpaper}
            inputId="lock-wallpaper"
            onUpload={setLockWallpaper}
            type="lock"
          />
          <PhoneMockup
            wallpaper={homeWallpaper}
            inputId="home-wallpaper"
            onUpload={setHomeWallpaper}
            type="home"
          />
        </div>

        {/* Pagination dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === 7 ? 7 : 6,
                height: i === 7 ? 7 : 6,
                borderRadius: 9999,
                backgroundColor: i === 7 ? "#007AFF" : "#C7C7CC",
              }}
            />
          ))}
        </div>

        {/* Remove wallpaper */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <button
            type="button"
            onClick={() => { setLockWallpaper(null); setHomeWallpaper(null); }}
            style={{
              backgroundColor: "#FF3B30",
              color: "white",
              fontSize: 15,
              fontWeight: 500,
              border: "none",
              borderRadius: 9999,
              padding: "10px 28px",
              cursor: "pointer",
            }}
          >
            Remove Wallpaper
          </button>
        </div>
      </div>

      {/* Info card */}
      <div style={{ margin: "0 16px", backgroundColor: "white", borderRadius: 16, padding: "16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Change your Wallpaper from the Lock Screen</div>
          <div style={{ fontSize: 13, color: "#6D6D72", lineHeight: 1.4 }}>
            From your Lock Screen, touch and hold to add, edit or switch between different wallpapers and widgets.
          </div>
        </div>
        <div style={{ flexShrink: 0, width: 52, height: 80, borderRadius: 8, backgroundColor: "#D1D1D6", display: "flex", overflow: "hidden", position: "relative" }}>
          <div style={{ flex: 1, backgroundColor: "#B0B0B8" }} />
          <div style={{ width: 2, backgroundColor: "white" }} />
          <div style={{ flex: 1, backgroundColor: "#C8C8D0" }} />
          <div style={{ position: "absolute", bottom: "50%", left: "50%", transform: "translate(-50%, 50%)", width: 10, height: 10, borderRadius: 9999, backgroundColor: "white", border: "1.5px solid #8E8E93" }} />
        </div>
      </div>
    </div>
  );
}

export function Settings() {
  const [view, setView] = useState<"settings" | "wallpaper">("settings");
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);

  if (view === "wallpaper") {
    return <WallpaperScreen onBack={() => setView("settings")} />;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfileImg(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        backgroundColor: "#F2F2F7",
        fontFamily: '-apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
        overflowY: "auto",
        userSelect: "none",
      }}
    >
      {/* Status bar spacer */}
      <div style={{ height: 44 }} />

      {/* Title */}
      <div style={{ padding: "8px 16px 12px", fontSize: 34, fontWeight: 700, letterSpacing: 0.3 }}>
        Settings
      </div>

      {/* Profile card */}
      <div style={{ margin: "0 16px 20px", backgroundColor: "white", borderRadius: 12, overflow: "hidden" }}>
        {/* Profile row — label wraps the whole avatar area for reliable file picker trigger */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px" }}>
          {/* Avatar wrapped in label — clicking anywhere on it opens file picker */}
          <label
            htmlFor="profile-upload"
            style={{ position: "relative", flexShrink: 0, cursor: "pointer", display: "block" }}
          >
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                opacity: 0,
                overflow: "hidden",
                clip: "rect(0,0,0,0)",
                whiteSpace: "nowrap",
              }}
            />
            {/* Circle avatar */}
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 9999,
                overflow: "hidden",
                backgroundColor: "#8E8E93",
                position: "relative",
              }}
            >
              {profileImg ? (
                <img
                  src={profileImg}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <svg viewBox="0 0 58 58" width="58" height="58" fill="none">
                  <rect width="58" height="58" fill="#8E8E93" />
                  <ellipse cx="29" cy="38" rx="11" ry="13" fill="#D62828" />
                  <ellipse cx="29" cy="38" rx="7" ry="9" fill="#A01010" opacity="0.5" />
                  <rect x="27" y="14" width="4" height="22" rx="2" fill="#C49A3C" />
                  <rect x="25" y="10" width="8" height="7" rx="2" fill="#C49A3C" />
                  <line x1="29" y1="38" x2="29" y2="14" stroke="#FFD700" strokeWidth="0.8" />
                  <line x1="27.5" y1="38" x2="27.5" y2="14" stroke="#FFD700" strokeWidth="0.6" />
                  <line x1="30.5" y1="38" x2="30.5" y2="14" stroke="#FFD700" strokeWidth="0.6" />
                  <circle cx="29" cy="38" r="3.5" fill="#6B0000" />
                </svg>
              )}
            </div>
            {/* Camera badge */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 18,
                height: 18,
                borderRadius: 9999,
                backgroundColor: "#E5E5EA",
                border: "1.5px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
                <path d="M9 7.5H1a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h1L2.5 1h5l.5 1.5H9a.5.5 0 01.5.5v4a.5.5 0 01-.5.5z" stroke="#636366" strokeWidth="0.8" />
                <circle cx="5" cy="4.75" r="1.5" stroke="#636366" strokeWidth="0.8" />
              </svg>
            </div>
          </label>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.3 }}>Maria M</div>
            <div style={{ fontSize: 13, color: "#6D6D72", marginTop: 2 }}>Apple Account, iCloud and more</div>
          </div>
          <Chevron />
        </div>

      </div>

      {/* Network settings group */}
      <div style={{ margin: "0 16px 20px", backgroundColor: "white", borderRadius: 12, overflow: "hidden" }}>
        {/* Airplane Mode */}
        <Row
          icon={
            <SettingIcon bg="#FF9500">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M8.5 1.5C8.5 1.5 5 5 5 9.5H2L1 11l4 1 1 4 1.5-1V12h2v2.5L11 16l1-4 4-1-1-1.5h-3c0-4.5-3.5-8-3.5-8z" fill="white" />
              </svg>
            </SettingIcon>
          }
          label="Airplane Mode"
          right={
            <Toggle checked={airplaneMode} onChange={() => setAirplaneMode((v) => !v)} />
          }
        />
        <Separator />

        {/* Wi-Fi */}
        <Row
          icon={
            <SettingIcon bg="#007AFF">
              <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
                <path d="M8.5 10.5a2 2 0 100 2 2 2 0 000-2z" fill="white" />
                <path d="M4.5 7C5.9 5.6 7.1 5 8.5 5s2.6.6 4 2" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M1.5 4C3.4 2.1 5.8 1 8.5 1s5.1 1.1 7 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </SettingIcon>
          }
          label="Theme"
          right={<Chevron />}
        />
        <Separator />

        {/* Bluetooth */}
        <Row
          icon={
            <SettingIcon bg="#007AFF">
              <svg width="12" height="17" viewBox="0 0 12 17" fill="none">
                <path d="M6 1v15M6 1l5 4.5L6 10M6 16l5-4.5L6 6.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SettingIcon>
          }
          label="Wallpaper"
          onClick={() => setView("wallpaper")}
          right={
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 17, color: "#8E8E93" }}>On</span>
              <Chevron />
            </div>
          }
        />
        <Separator />

        {/* Mobile Service */}
        <Row
          icon={
            <SettingIcon bg="#34C759">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <circle cx="8.5" cy="8.5" r="6" stroke="white" strokeWidth="1.5" />
                <path d="M8.5 5.5v3l2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 8.5C5 6.8 6.6 5.5 8.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 8.5C12 10.2 10.4 11.5 8.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </SettingIcon>
          }
          label="Icons"
          right={<Chevron />}
        />
      </div>

      {/* Second settings group */}
      <div style={{ margin: "0 16px 20px", backgroundColor: "white", borderRadius: 12, overflow: "hidden" }}>
        {/* General API */}
        <Row
          icon={
            <SettingIcon bg="#34C759">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M8.5 12A3.5 3.5 0 105 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8.5 15A6.5 6.5 0 102 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8.5" cy="8.5" r="2" fill="white" />
                <path d="M8.5 15v-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </SettingIcon>
          }
          label="General API"
          right={<Chevron />}
        />
        <Separator />

        {/* Battery */}
        <Row
          icon={
            <SettingIcon bg="#34C759">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <rect x="0.5" y="0.5" width="14" height="11" rx="2.5" stroke="white" strokeWidth="1.2" />
                <rect x="2" y="2" width="9" height="8" rx="1" fill="white" />
                <path d="M15 4v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </SettingIcon>
          }
          label="Voice API"
          right={<Chevron />}
        />
        <Separator />

        {/* VPN */}
        <Row
          icon={
            <SettingIcon bg="#007AFF">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <circle cx="8.5" cy="8.5" r="7" stroke="white" strokeWidth="1.3" />
                <path d="M8.5 1.5C6.5 3 5 5.6 5 8.5s1.5 5.5 3.5 7" stroke="white" strokeWidth="1.3" />
                <path d="M8.5 1.5C10.5 3 12 5.6 12 8.5s-1.5 5.5-3.5 7" stroke="white" strokeWidth="1.3" />
                <path d="M1.5 8.5h14" stroke="white" strokeWidth="1.3" />
                <path d="M2 5.5h13M2 11.5h13" stroke="white" strokeWidth="1.3" />
              </svg>
            </SettingIcon>
          }
          label="VPN"
          right={
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 17, color: "#8E8E93" }}>Not Connected</span>
              <Chevron />
            </div>
          }
        />
        <Separator />

        {/* Notifications */}
        <Row
          icon={
            <SettingIcon bg="#FF3B30">
              <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
                <path d="M7.5 1.5C7.5 1.5 7.5 1 7.5 1a1 1 0 00-1 1v.6C4.1 3.1 2.5 5.1 2.5 7.5v4L1 13h13l-1.5-1.5v-4C12.5 5.1 10.9 3.1 8.5 2.6V2a1 1 0 00-1-.5z" fill="white" />
                <path d="M6 14a1.5 1.5 0 003 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </SettingIcon>
          }
          label="Notifications"
          right={<Chevron />}
        />
      </div>

      {/* Search bar */}
      <div style={{ padding: "0 16px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "white", borderRadius: 10, padding: "8px 12px" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="#8E8E93" strokeWidth="1.5" />
            <path d="M11 11l3.5 3.5" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ flex: 1, fontSize: 17, color: "#8E8E93" }}>Search</span>
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
            <path d="M8 1a4 4 0 014 4v5a4 4 0 01-8 0V5a4 4 0 014-4z" stroke="#8E8E93" strokeWidth="1.5" />
            <path d="M1 11a7 7 0 0014 0" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 18v3" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
