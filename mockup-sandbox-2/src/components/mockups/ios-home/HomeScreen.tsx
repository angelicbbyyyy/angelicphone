import { useState, useEffect, useRef } from "react";

const STARS = [
  { x: 14, y: 62, s: 30, o: 0.42 },
  { x: 332, y: 38, s: 22, o: 0.32 },
  { x: 356, y: 168, s: 17, o: 0.28 },
  { x: 6, y: 288, s: 26, o: 0.36 },
  { x: 346, y: 336, s: 19, o: 0.38 },
  { x: 22, y: 462, s: 28, o: 0.32 },
  { x: 364, y: 514, s: 16, o: 0.36 },
  { x: 10, y: 634, s: 23, o: 0.3 },
  { x: 360, y: 718, s: 22, o: 0.38 },
  { x: 42, y: 762, s: 16, o: 0.26 },
  { x: 198, y: 16, s: 13, o: 0.22 },
  { x: 176, y: 830, s: 15, o: 0.28 },
  { x: 72, y: 180, s: 12, o: 0.2 },
  { x: 310, y: 600, s: 14, o: 0.24 },
];

function StarDeco({ x, y, s, o }: { x: number; y: number; s: number; o: number }) {
  return (
    <svg
      width={s} height={s} viewBox="0 0 20 20"
      style={{ position: "absolute", left: x, top: y, pointerEvents: "none", zIndex: 0 }}
    >
      <path
        d="M10 1 L11.8 7.5 L18.5 10 L11.8 12.5 L10 19 L8.2 12.5 L1.5 10 L8.2 7.5 Z"
        fill={`rgba(170,170,195,${o})`}
      />
    </svg>
  );
}

function EditableSpan({ defaultValue, style }: { defaultValue: string; style?: React.CSSProperties }) {
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      style={{ outline: "none", cursor: "text", ...style }}
    >
      {defaultValue}
    </span>
  );
}

function UploadWidget({
  image, onUpload, inputId, width, height, borderRadius = 18, children, style = {},
}: {
  image: string | null; onUpload: (src: string) => void; inputId: string;
  width: number | string; height: number | string; borderRadius?: number;
  children?: React.ReactNode; style?: React.CSSProperties;
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
    <label
      htmlFor={inputId}
      style={{
        display: "block", width, height, borderRadius,
        overflow: "hidden", cursor: "pointer", position: "relative",
        flexShrink: 0, backgroundColor: "#E0E0E8", ...style,
      }}
    >
      <input id={inputId} type="file" accept="image/*" onChange={handleChange}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", clip: "rect(0,0,0,0)" }}
      />
      {image
        ? <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        : children ?? (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="#AEAEC0" strokeWidth="1.5" />
              <path d="M14 9v10M9 14h10" stroke="#AEAEC0" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )
      }
    </label>
  );
}

function AppIcon({
  name, bg, children, size = 60, onClick,
}: {
  name: string; bg: string; children: React.ReactNode; size?: number; onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: onClick ? "pointer" : "default" }}
    >
      <div style={{
        width: size, height: size, borderRadius: size * 0.23,
        backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.14)", flexShrink: 0,
      }}>
        {children}
      </div>
      <span style={{ fontSize: 11, color: "#1C1C1E", textAlign: "center", letterSpacing: -0.2, lineHeight: 1.2, textShadow: "0 1px 3px rgba(255,255,255,0.9)" }}>
        {name}
      </span>
    </div>
  );
}

function MessagesIcon({ size }: { size: number }) {
  const r = size * 0.244;
  return (
    <div style={{
      width: size, height: size, borderRadius: r, position: "relative", overflow: "hidden", flexShrink: 0,
      background: "linear-gradient(180deg, rgba(217,217,217,0.25) 0%, rgba(10,10,10,0.2) 100%)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
    }}>
      {/* Mask 3 – outer white glow */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: r,
        background: "rgba(255,255,255,0.01)",
        boxShadow: `inset 0 0 ${size * 0.43}px ${size * 0.26}px #FFFFFF`,
        opacity: 0.5,
        zIndex: 1,
      }} />
      {/* BG blur 70 */}
      <div style={{
        position: "absolute",
        inset: -size * 0.16,
        borderRadius: r,
        background: "rgba(255,255,255,0.002)",
        backdropFilter: "blur(35px)",
        WebkitBackdropFilter: "blur(35px)",
        zIndex: 2,
      }} />
      {/* Mask 2 – mid glow */}
      <div style={{
        position: "absolute", inset: size * 0.024, borderRadius: r - 1,
        background: "rgba(255,255,255,0.01)",
        boxShadow: `inset 0 0 ${size * 0.26}px ${size * 0.14}px #FFFFFF`,
        filter: "blur(1.5px)",
        zIndex: 3,
      }} />
      {/* BG blur 80 */}
      <div style={{
        position: "absolute",
        inset: -size * 0.16,
        borderRadius: r,
        background: "rgba(255,255,255,0.002)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        zIndex: 4,
      }} />
      {/* Mask 1 – inner subtle glow */}
      <div style={{
        position: "absolute", inset: size * 0.024, borderRadius: r - 1,
        background: "rgba(255,255,255,0.01)",
        boxShadow: `inset 0 0 ${size * 0.086}px ${size * 0.034}px #FFFFFF`,
        filter: "blur(1px)",
        zIndex: 5,
      }} />
      {/* Chat bubble SVG */}
      <div style={{
        position: "absolute", zIndex: 6,
        left: "10%", top: "11%", right: "10%", bottom: "10%",
      }}>
        <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none">
          <defs>
            <linearGradient id="msg-g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="14.65%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="85.35%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
            <linearGradient id="msg-g2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="14.65%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="49.48%" stopColor="rgba(255,255,255,0)" />
              <stop offset="85.15%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
            <linearGradient id="msg-g3" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="6.51%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="51.64%" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="93.47%" stopColor="rgba(255,255,255,0.55)" />
            </linearGradient>
          </defs>
          {/* Bubble body */}
          <rect x="4" y="4" width="72" height="54" rx="15" fill="url(#msg-g1)" />
          <rect x="4" y="4" width="72" height="54" rx="15" fill="url(#msg-g2)" />
          {/* Tail – vertical stem */}
          <rect x="36" y="36" width="7" height="24" rx="2" fill="url(#msg-g3)" />
          <rect x="34" y="20" width="6" height="30" rx="2" fill="url(#msg-g3)" opacity="0.8" />
          {/* Dots */}
          <circle cx="22" cy="31" r="5" fill="rgba(255,255,255,0.55)" />
          <circle cx="40" cy="31" r="5" fill="rgba(255,255,255,0.55)" />
          <circle cx="58" cy="31" r="5" fill="rgba(255,255,255,0.55)" />
        </svg>
      </div>
    </div>
  );
}

function CalendarIcon({ size, day, dayName }: { size: number; day: number; dayName: string }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.23, overflow: "hidden", backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.14)", display: "flex", flexDirection: "column" }}>
      <div style={{ backgroundColor: "#FF3B30", height: size * 0.3, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "white", fontSize: size * 0.17, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{dayName}</span>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size * 0.44, fontWeight: 200, color: "#1C1C1E" }}>{day}</span>
      </div>
    </div>
  );
}

function GearIcon({ size, color = "white" }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="5" stroke={color} strokeWidth="2.2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <rect key={i} x="14" y="1" width="2" height="5" rx="1" fill={color}
          transform={`rotate(${deg} 15 15)`} />
      ))}
    </svg>
  );
}

export function HomeScreen({ onOpenSettings }: { onOpenSettings: () => void }) {
  const [time, setTime] = useState(new Date());
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [widget1, setWidget1] = useState<string | null>(null);
  const [widget2, setWidget2] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeFullStr = time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = `${String(time.getDate()).padStart(2, "0")}/${String(time.getMonth() + 1).padStart(2, "0")}`;
  const today = time.getDate();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = dayNames[time.getDay()];

  const ICON_SIZE = 58;

  return (
    <div style={{
      width: 390, height: 844,
      background: "linear-gradient(160deg, #F6F6FA 0%, #EBEBF2 100%)",
      fontFamily: '-apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
      position: "relative", overflow: "hidden", userSelect: "none",
    }}>
      {STARS.map((s, i) => <StarDeco key={i} {...s} />)}

      {/* Status bar spacer */}
      <div style={{ height: 44 }} />

      {/* Profile widget card */}
      <div style={{ margin: "6px 16px 0", backgroundColor: "rgba(255,255,255,0.78)", backdropFilter: "blur(12px)", borderRadius: 22, padding: "14px 16px 12px", position: "relative", zIndex: 2, boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <path d="M10 13a1.5 1.5 0 100 2 1.5 1.5 0 000-2z" fill="#8E8E93" />
            <path d="M5 9c1.4-1.4 3-2.2 5-2.2s3.6.8 5 2.2" stroke="#8E8E93" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M1 5c2.4-2.4 5.4-3.8 9-3.8s6.6 1.4 9 3.8" stroke="#8E8E93" strokeWidth="1.3" strokeLinecap="round" />
          </svg>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Avatar */}
            <UploadWidget
              image={profileImg} onUpload={setProfileImg} inputId="home-profile"
              width={56} height={56} borderRadius={28}
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}
            >
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#D1D1D6" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="12" r="7" fill="#8E8E93" />
                  <ellipse cx="16" cy="30" rx="12" ry="8" fill="#8E8E93" />
                </svg>
              </div>
            </UploadWidget>
            {/* Name pill */}
            <div style={{ backgroundColor: "rgba(220,220,228,0.9)", borderRadius: 20, padding: "4px 14px" }}>
              <EditableSpan defaultValue="baby" style={{ fontSize: 14, fontWeight: 500, color: "#3A3A3C" }} />
            </div>
          </div>

          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="#8E8E93" strokeWidth="1.3" />
            <path d="M10 5v5l3 3" stroke="#8E8E93" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Name */}
        <div style={{ textAlign: "center", marginBottom: 3 }}>
          <EditableSpan defaultValue="あかさん" style={{ fontSize: 22, fontWeight: 700, color: "#1C1C1E", letterSpacing: -0.3 }} />
        </div>
        {/* Handle */}
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <EditableSpan defaultValue="@angelica" style={{ fontSize: 13, color: "#8E8E93" }} />
        </div>
        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "0.5px solid rgba(0,0,0,0.08)", paddingTop: 10 }}>
          <span style={{ fontSize: 12, color: "#8E8E93", fontVariantNumeric: "tabular-nums" }}>{timeFullStr}</span>
          <EditableSpan defaultValue="i love you to the moon" style={{ fontSize: 12, color: "#3A3A3C", textAlign: "center" }} />
          <span style={{ fontSize: 12, color: "#8E8E93" }}>{dateStr}</span>
        </div>
      </div>

      {/* Grid Row 1: large widget + 2x2 icons */}
      <div style={{ display: "flex", gap: 12, padding: "16px 16px 0", position: "relative", zIndex: 2 }}>
        {/* Large photo widget */}
        <UploadWidget
            image={widget1} onUpload={setWidget1} inputId="widget1"
            width={160} height={158} borderRadius={20}
            style={{ boxShadow: "0 3px 12px rgba(0,0,0,0.1)" }}
          />

        {/* 2×2 icon grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 10, flex: 1 }}>
          <AppIcon name="Messages" bg="transparent" size={ICON_SIZE}>
            <MessagesIcon size={ICON_SIZE} />
          </AppIcon>
          <AppIcon name="Contacts" bg="#F2F2F7" size={ICON_SIZE}>
            <svg width={ICON_SIZE * 0.56} height={ICON_SIZE * 0.56} viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="11" r="7" fill="#636366" />
              <ellipse cx="16" cy="28" rx="13" ry="7" fill="#636366" />
              <rect x="27" y="6" width="3" height="12" rx="1.5" fill="#FF3B30" />
              <rect x="27" y="6" width="3" height="12" rx="1.5" fill="#FF9500" opacity="0.6" />
            </svg>
          </AppIcon>
          <AppIcon name="Diary" bg="#FF6B8A" size={ICON_SIZE}>
            <svg width={ICON_SIZE * 0.54} height={ICON_SIZE * 0.54} viewBox="0 0 32 32" fill="none">
              <rect x="4" y="2" width="22" height="28" rx="4" fill="white" opacity="0.9" />
              <path d="M9 10h14M9 15h14M9 20h9" stroke="#FF6B8A" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 6a4 4 0 014-4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            </svg>
          </AppIcon>
          <CalendarIcon size={ICON_SIZE} day={today} dayName={dayName} />
        </div>
      </div>

      {/* Grid Row 2: 2 icons + polaroid widget */}
      <div style={{ display: "flex", gap: 14, padding: "14px 16px 0", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
        <AppIcon name="Moments" bg="#BF5AF2" size={ICON_SIZE}>
          <svg width={ICON_SIZE * 0.54} height={ICON_SIZE * 0.54} viewBox="0 0 32 32" fill="none">
            <rect x="2" y="8" width="28" height="20" rx="5" stroke="white" strokeWidth="2" />
            <circle cx="16" cy="18" r="5" stroke="white" strokeWidth="2" />
            <rect x="11" y="4" width="10" height="5" rx="2.5" fill="white" />
            <circle cx="24" cy="13" r="2" fill="white" />
          </svg>
        </AppIcon>
        <AppIcon name="Shop" bg="#FF9F0A" size={ICON_SIZE}>
          <svg width={ICON_SIZE * 0.54} height={ICON_SIZE * 0.54} viewBox="0 0 32 32" fill="none">
            <path d="M4 8l3 18h18l3-18H4z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            <path d="M11 8a5 5 0 0110 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 8v4M23 8v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </AppIcon>

        {/* Polaroid widget */}
        <UploadWidget
          image={widget2} onUpload={setWidget2} inputId="widget2"
          width="100%" height={94} borderRadius={4}
          style={{
            flex: 1,
            backgroundColor: "white",
            boxShadow: "0 4px 18px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
            border: "8px solid white",
            borderBottom: "24px solid white",
            borderRadius: 4,
          }}
        />
      </div>

      {/* Dock */}
      <div style={{ position: "absolute", bottom: 20, left: 16, right: 16, zIndex: 2 }}>
        <div style={{ backgroundColor: "rgba(255,255,255,0.72)", backdropFilter: "blur(16px)", borderRadius: 28, padding: "14px 0", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          {/* Phone */}
          <AppIcon name="" bg="#34C759" size={58}>
            <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
              <path d="M6 4a2 2 0 012-2h4l2 7-3 2c1.5 3 4 5.5 7 7l2-3 7 2v4a2 2 0 01-2 2C10 27 5 10 6 4z" fill="white" />
            </svg>
          </AppIcon>
          {/* Music */}
          <AppIcon name="" bg="#FF2D55" size={58}>
            <svg width={30} height={32} viewBox="0 0 30 32" fill="none">
              <path d="M10 26a4 4 0 100-8 4 4 0 000 8z" fill="white" />
              <path d="M14 18V8l12-3v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="22" cy="18" r="4" fill="white" />
            </svg>
          </AppIcon>
          {/* Settings */}
          <AppIcon name="" bg="#8E8E93" size={58} onClick={onOpenSettings}>
            <GearIcon size={32} color="white" />
          </AppIcon>
        </div>
      </div>
    </div>
  );
}
