import { useState, useEffect, useRef } from "react";

const PrematurBelt = () => {
  const [waveOffset, setWaveOffset] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const animate = () => {
      frame += 0.03;
      setWaveOffset(frame);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const sensors = [
    { id: 1, x: 22, y: 52, label: "EHG Sensor L1", color: "#4fffb0" },
    { id: 2, x: 38, y: 45, label: "EHG Sensor L2", color: "#4fffb0" },
    { id: 3, x: 55, y: 43, label: "EHG Sensor C", color: "#00d4ff" },
    { id: 4, x: 72, y: 45, label: "EHG Sensor R2", color: "#4fffb0" },
    { id: 5, x: 78, y: 52, label: "EHG Sensor R1", color: "#4fffb0" },
    { id: 6, x: 50, y: 58, label: "IMU + Suhu", color: "#ff6b6b" },
    { id: 7, x: 35, y: 65, label: "Referensi GND", color: "#ffd700" },
    { id: 8, x: 65, y: 65, label: "Referensi GND", color: "#ffd700" },
  ];

  const specs = [
    { label: "Elektroda EHG", value: "8 channel", icon: "⚡" },
    { label: "Sampling Rate", value: "1000 Hz", icon: "📡" },
    { label: "Konektivitas", value: "Bluetooth 5.0 LE", icon: "🔵" },
    { label: "Baterai", value: "72 jam continuous", icon: "🔋" },
    { label: "Material Belt", value: "Medical-grade silicone", icon: "🧬" },
    { label: "Waterproof", value: "IP67", icon: "💧" },
    { label: "Berat", value: "185 gram", icon: "⚖️" },
    { label: "Ukuran", value: "S / M / L adjustable", icon: "📏" },
  ];

  const layers = [
    { name: "Lapisan Luar", desc: "Kain elastis breathable, hypoallergenic, bisa dicuci" },
    { name: "Modul Elektronik", desc: "PCB fleksibel, chip AI DSP, BLE SoC, baterai LiPo 480mAh" },
    { name: "Array Elektroda", desc: "8 elektroda Ag/AgCl konduktif, self-adhesive gel" },
    { name: "Lapisan Dalam", desc: "Foam medis lembut langsung ke kulit abdomen ibu" },
  ];

  const generateWave = (offset, amplitude, frequency, yBase) => {
    const points = [];
    for (let x = 0; x <= 300; x += 2) {
      const y =
        yBase +
        Math.sin((x * frequency + offset) * 0.1) * amplitude +
        Math.sin((x * frequency * 0.7 + offset * 1.3) * 0.1) * (amplitude * 0.4);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  // Gauge: pct 0% = left/green (safe), 100% = right/red (danger)
  // Arc: -180deg (left) to 0deg (right)
  const riskPct = 12;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const needleAngle = -180 + (riskPct / 100) * 180;
  const cx = 120, cy = 110, len = 82;
  const nx = cx + len * Math.cos(toRad(needleAngle));
  const ny = cy + len * Math.sin(toRad(needleAngle));

  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        background: "#030d1a",
        color: "#e8f4f8",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .hero-title { font-family: 'Playfair Display', serif; }
        .mono { font-family: 'DM Mono', monospace; }
        .body-text { font-family: 'Lato', sans-serif; }
        .float-anim { animation: float 4s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .spec-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(79,255,176,0.15);
          border-radius: 12px; padding: 16px; transition: all 0.3s;
        }
        .spec-card:hover {
          background: rgba(79,255,176,0.07);
          border-color: rgba(79,255,176,0.4);
          transform: translateY(-2px);
        }
        .layer-card {
          border-left: 3px solid #4fffb0;
          padding: 14px 18px; margin-bottom: 10px;
          background: rgba(255,255,255,0.03);
          border-radius: 0 10px 10px 0; transition: all 0.3s;
        }
        .layer-card:hover { background: rgba(79,255,176,0.07); transform: translateX(4px); }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 100px; font-size: 11px; font-family: 'DM Mono', monospace; letter-spacing: 1px; }
        .badge-green { background: rgba(79,255,176,0.15); color: #4fffb0; border: 1px solid rgba(79,255,176,0.3); }
        .badge-blue  { background: rgba(0,212,255,0.15);  color: #00d4ff; border: 1px solid rgba(0,212,255,0.3); }
        .badge-red   { background: rgba(255,107,107,0.15); color: #ff6b6b; border: 1px solid rgba(255,107,107,0.3); }
        .pb-signal-card {
          background: #101c28;
          border: 1px solid rgba(79,255,176,0.15);
          border-radius: 16px; padding: 20px; margin-bottom: 12px;
        }
        .pb-signal-card-success {
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 16px; padding: 20px; margin-bottom: 12px;
        }
      `}</style>

      {/* ── HERO ── */}
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(79,255,176,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(79,255,176,0.04) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle,rgba(79,255,176,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "40px 24px", maxWidth: 900 }}>
          <div className="mono badge badge-green" style={{ marginBottom: 24, fontSize: 12 }}>◉ WEARABLE MEDICAL DEVICE — PROTOTYPE GEN 2</div>
          <h1 className="hero-title" style={{ fontSize: "clamp(52px,8vw,96px)", fontWeight: 900, lineHeight: 1, marginBottom: 16, letterSpacing: "-2px" }}>
            Prematur<br />
            <span style={{ color: "#4fffb0", WebkitTextStroke: "1px #4fffb0", WebkitTextFillColor: "transparent" }}>Belt</span>
          </h1>
          <p className="body-text" style={{ color: "#7ab0c0", fontSize: 18, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 40px", fontWeight: 300 }}>
            Sabuk medis pintar untuk ibu hamil dengan teknologi{" "}
            <strong style={{ color: "#00d4ff" }}>Electrohysterography (EHG)</strong> 8-channel dan analisis AI real-time untuk deteksi dini risiko persalinan prematur.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <span className="badge badge-green">✓ FDA Class IIb Ready</span>
            <span className="badge badge-blue">✓ Bluetooth 5.0 LE</span>
            <span className="badge badge-red">✓ AI-Powered EHG Analysis</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>

        {/* 01 — DESAIN FISIK */}
        <div style={{ marginBottom: 80 }}>
          <div className="mono" style={{ color: "#4fffb0", fontSize: 12, letterSpacing: 2, marginBottom: 8 }}>01 — DESAIN FISIK</div>
          <h2 className="hero-title" style={{ fontSize: 40, marginBottom: 48 }}>Anatomi Sabuk</h2>
          <div className="float-anim" style={{ display: "flex", justifyContent: "center", marginBottom: 60 }}>
            <div style={{ position: "relative", background: "rgba(79,255,176,0.04)", border: "1px solid rgba(79,255,176,0.2)", borderRadius: 20, padding: 40, maxWidth: 680, width: "100%" }}>
              <div className="mono" style={{ fontSize: 11, color: "#5a8a9a", marginBottom: 16, letterSpacing: 1 }}>TAMPAK DEPAN — POSISI DI ABDOMEN IBU</div>
              <svg viewBox="0 0 400 200" style={{ width: "100%", maxHeight: 260 }}>
                <defs>
                  <linearGradient id="beltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a4a5e" />
                    <stop offset="100%" stopColor="#0a2535" />
                  </linearGradient>
                  <linearGradient id="moduleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2a5a6e" />
                    <stop offset="100%" stopColor="#1a3a4e" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <rect x="20" y="75" width="360" height="60" rx="12" fill="url(#beltGrad)" stroke="rgba(79,255,176,0.3)" strokeWidth="1" />
                {[0,8,16,24,32,40,48].map(i => <line key={i} x1="20" y1={80+i} x2="380" y2={80+i} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />)}
                <rect x="155" y="68" width="90" height="74" rx="10" fill="url(#moduleGrad)" stroke="#4fffb0" strokeWidth="1.5" />
                <rect x="165" y="78" width="70" height="54" rx="6" fill="rgba(0,0,0,0.4)" stroke="rgba(79,255,176,0.2)" strokeWidth="1" />
                <circle cx="185" cy="95" r="4" fill="#4fffb0" filter="url(#glow)" opacity="0.9" />
                <circle cx="200" cy="95" r="4" fill="#00d4ff" filter="url(#glow)" opacity="0.7" />
                <circle cx="215" cy="95" r="4" fill="#ffd700" filter="url(#glow)" opacity="0.5" />
                <text x="200" y="118" textAnchor="middle" fill="#4fffb0" fontSize="6" fontFamily="monospace">PREMATUR BELT</text>
                <text x="200" y="127" textAnchor="middle" fill="#5a8a9a" fontSize="5" fontFamily="monospace">v2.1 ACTIVE</text>
                {sensors.map((s) => {
                  const scx = (s.x / 100) * 360 + 20;
                  const scy = (s.y / 100) * 200;
                  return (
                    <g key={s.id}>
                      <circle cx={scx} cy={scy} r="7" fill={s.color} opacity="0.15" />
                      <circle cx={scx} cy={scy} r="4.5" fill={s.color} opacity="0.9" filter="url(#glow)" />
                      <circle cx={scx} cy={scy} r="2" fill="white" opacity="0.8" />
                      <line x1={scx} y1={scy} x2="200" y2="105" stroke={s.color} strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
                    </g>
                  );
                })}
                <rect x="0" y="88" width="22" height="34" rx="5" fill="#1a3a4e" stroke="rgba(79,255,176,0.4)" strokeWidth="1" />
                <rect x="378" y="88" width="22" height="34" rx="5" fill="#1a3a4e" stroke="rgba(79,255,176,0.4)" strokeWidth="1" />
                <text x="11" y="107" textAnchor="middle" fill="#4fffb0" fontSize="7" fontFamily="monospace">⊣</text>
                <text x="389" y="107" textAnchor="middle" fill="#4fffb0" fontSize="7" fontFamily="monospace">⊢</text>
              </svg>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20 }}>
                {[
                  { color: "#4fffb0", label: "EHG Electrode (6x)" },
                  { color: "#ff6b6b", label: "IMU + Temperature" },
                  { color: "#ffd700", label: "Reference Ground (2x)" },
                  { color: "#00d4ff", label: "Central Sensor" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                    <span className="mono" style={{ fontSize: 11, color: "#7ab0c0" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 02 — MATERIAL */}
        <div style={{ marginBottom: 80 }}>
          <div className="mono" style={{ color: "#4fffb0", fontSize: 12, letterSpacing: 2, marginBottom: 8 }}>02 — MATERIAL & LAPISAN</div>
          <h2 className="hero-title" style={{ fontSize: 36, marginBottom: 32 }}>Konstruksi 4 Lapisan</h2>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 300px" }}>
              {layers.map((layer, i) => (
                <div key={i} className="layer-card" style={{ borderLeftColor: `rgba(79,255,176,${1 - i * 0.2})` }}>
                  <div className="mono" style={{ fontSize: 11, color: "#4fffb0", letterSpacing: 1, marginBottom: 4 }}>LAPISAN {i + 1}</div>
                  <div className="body-text" style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{layer.name}</div>
                  <div className="body-text" style={{ fontSize: 13, color: "#7ab0c0", lineHeight: 1.5 }}>{layer.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ flex: "1 1 280px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 200 280" style={{ width: "100%", maxWidth: 220 }}>
                <defs>
                  <linearGradient id="l1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#2a4a5e" /><stop offset="100%" stopColor="#3a6a7e" /></linearGradient>
                  <linearGradient id="l2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#1a3a5e" /><stop offset="100%" stopColor="#2a5a7e" /></linearGradient>
                  <linearGradient id="l3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#0d2a5e" /><stop offset="100%" stopColor="#1a4a7e" /></linearGradient>
                  <linearGradient id="l4" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#051a3e" /><stop offset="100%" stopColor="#0d3a6e" /></linearGradient>
                </defs>
                <text x="100" y="20" textAnchor="middle" fill="#5a8a9a" fontSize="9" fontFamily="monospace">CROSS-SECTION VIEW</text>
                {[
                  { fill: "url(#l1)", label: "Outer Fabric",    color: "#4fffb0", ht: 45 },
                  { fill: "url(#l2)", label: "Electronics PCB", color: "#00d4ff", ht: 55 },
                  { fill: "url(#l3)", label: "EHG Electrodes",  color: "#ffd700", ht: 40 },
                  { fill: "url(#l4)", label: "Inner Foam",      color: "#ff6b6b", ht: 45 },
                ].map((l, i) => {
                  const y = 35 + [0, 45, 100, 140][i];
                  return (
                    <g key={i}>
                      <rect x="30" y={y} width="140" height={l.ht - 4} rx="4" fill={l.fill} stroke={l.color} strokeWidth="1" opacity="0.9" />
                      <text x="100" y={y + l.ht / 2 - 2} textAnchor="middle" fill={l.color} fontSize="8" fontFamily="monospace">{l.label}</text>
                    </g>
                  );
                })}
                <text x="100" y="262" textAnchor="middle" fill="#5a8a9a" fontSize="8" fontFamily="monospace">— KULIT ABDOMEN IBU —</text>
              </svg>
            </div>
          </div>
        </div>

        {/* 03 — OUTPUT SINYAL (FIXED) */}
        <div style={{ marginBottom: 80 }}>
          <div className="mono" style={{ color: "#4fffb0", fontSize: 12, letterSpacing: 2, marginBottom: 8 }}>03 — OUTPUT SINYAL</div>
          <h2 className="hero-title" style={{ fontSize: 36, marginBottom: 32 }}>Live EHG Signal Preview</h2>

          {/* Card: Uterine Activity */}
          <div className="pb-signal-card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span className="body-text" style={{ fontSize: 14, fontWeight: 700, color: "#e8f4f8" }}>Uterine Activity (EHG)</span>
              <span style={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid #334", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#7ab0c0" }}>i</span>
            </div>
            <svg viewBox="0 0 300 80" style={{ width: "100%" }}>
              <defs>
                <linearGradient id="ehgFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={generateWave(waveOffset, 18, 1.4, 40)} stroke="#22c55e" strokeWidth="1.8" fill="none" />
              <path d={`${generateWave(waveOffset, 18, 1.4, 40)} L 300,80 L 0,80 Z`} fill="url(#ehgFill)" />
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#4a6a7a", marginTop: 4, fontFamily: "monospace" }}>
              <span>13:00</span><span>14:00</span><span>15:00</span><span>16:00</span><span>17:00</span>
            </div>
          </div>

          {/* Card: Contraction Rate */}
          <div className="pb-signal-card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span className="body-text" style={{ fontSize: 14, fontWeight: 700, color: "#e8f4f8" }}>Contraction Rate</span>
              <span style={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid #334", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#7ab0c0" }}>i</span>
            </div>
            <svg viewBox="0 0 300 60" style={{ width: "100%" }}>
              <defs>
                <linearGradient id="ctrFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={generateWave(waveOffset * 0.5, 8, 0.6, 30)} stroke="#22c55e" strokeWidth="1.5" fill="none" />
              <path d={`${generateWave(waveOffset * 0.5, 8, 0.6, 30)} L 300,60 L 0,60 Z`} fill="url(#ctrFill)" />
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#4a6a7a", marginTop: 4, fontFamily: "monospace" }}>
              <span>13:00</span><span>15:00</span><span>17:00</span>
            </div>
          </div>

          {/* Card: Stable Signal */}
          <div className="pb-signal-card-success">
            <div className="body-text" style={{ fontSize: 14, fontWeight: 700, color: "#e8f4f8", marginBottom: 10 }}>Signal Status</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.35)", padding: "7px 14px", borderRadius: 10 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="#22c55e" />
                <path d="M3 7L5.5 9.5L11 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="body-text" style={{ fontSize: 13, color: "#22c55e", fontWeight: 600 }}>Stable Signal</span>
            </div>
          </div>

          {/* Card: Risk Gauge — FIXED (green left, red right, %) */}
          <div className="pb-signal-card">
            <div className="body-text" style={{ fontSize: 13, color: "#7ab0c0", marginBottom: 8 }}>
              Premature Labor Risk:{" "}
              <span style={{ color: "#22c55e", fontWeight: 700 }}>LOW</span>{" "}
              <span style={{ color: "#22c55e", fontWeight: 700 }}>{riskPct}%</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <svg viewBox="0 0 240 130" style={{ width: "100%", maxWidth: 320, overflow: "visible" }}>
                <defs>
                  {/* GREEN left (0% safe) → YELLOW mid → RED right (100% danger) */}
                  <linearGradient id="gaugeArcFixed" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
                {/* Background track */}
                <path d="M 20 110 A 100 100 0 0 1 220 110" stroke="rgba(255,255,255,0.08)" strokeWidth="18" fill="none" strokeLinecap="round" />
                {/* Colored arc */}
                <path d="M 20 110 A 100 100 0 0 1 220 110" stroke="url(#gaugeArcFixed)" strokeWidth="18" fill="none" strokeLinecap="round" />
                {/* % labels */}
                <text x="16"  y="126" fontSize="10" fill="#5a8a9a" fontFamily="monospace" textAnchor="middle">0%</text>
                <text x="120" y="22"  fontSize="10" fill="#5a8a9a" fontFamily="monospace" textAnchor="middle">50%</text>
                <text x="224" y="126" fontSize="10" fill="#5a8a9a" fontFamily="monospace" textAnchor="middle">100%</text>
                {/* Needle */}
                <line x1={cx} y1={cy} x2={nx.toFixed(1)} y2={ny.toFixed(1)} stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx={cx} cy={cy} r="7"   fill="#ffffff" />
                <circle cx={cx} cy={cy} r="3.5" fill="#101c28" />
              </svg>
              <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: "#22c55e", letterSpacing: 2, marginTop: 4 }}>LOW</div>
            </div>
          </div>
        </div>

        {/* 04 — SPECS */}
        <div style={{ marginBottom: 80 }}>
          <div className="mono" style={{ color: "#4fffb0", fontSize: 12, letterSpacing: 2, marginBottom: 8 }}>04 — SPESIFIKASI TEKNIS</div>
          <h2 className="hero-title" style={{ fontSize: 36, marginBottom: 32 }}>Hardware Specs</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
            {specs.map((s, i) => (
              <div key={i} className="spec-card">
                <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                <div className="mono" style={{ fontSize: 10, color: "#5a8a9a", letterSpacing: 1, marginBottom: 4 }}>{s.label}</div>
                <div className="body-text" style={{ fontSize: 15, fontWeight: 700, color: "#4fffb0" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 05 — EKOSISTEM */}
        <div style={{ marginBottom: 80 }}>
          <div className="mono" style={{ color: "#4fffb0", fontSize: 12, letterSpacing: 2, marginBottom: 8 }}>05 — EKOSISTEM</div>
          <h2 className="hero-title" style={{ fontSize: 36, marginBottom: 32 }}>Alur Kerja Sistem</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { icon: "👶", label: "Sensor EHG",  sub: "8-channel di sabuk",    color: "#4fffb0" },
              { arrow: true },
              { icon: "📡", label: "BLE 5.0",     sub: "Wireless transfer",     color: "#00d4ff" },
              { arrow: true },
              { icon: "📱", label: "Aplikasi",    sub: "Android & iOS",         color: "#ffd700" },
              { arrow: true },
              { icon: "🤖", label: "AI Engine",   sub: "Analisis pola EHG",     color: "#ff6b6b" },
              { arrow: true },
              { icon: "🏥", label: "Dokter",      sub: "Dashboard telemedicine",color: "#4fffb0" },
            ].map((item, i) =>
              item.arrow ? (
                <div key={i} style={{ fontSize: 24, color: "#2a4a5a", padding: "0 4px" }}>→</div>
              ) : (
                <div key={i} style={{ textAlign: "center", padding: "20px 16px", background: "rgba(255,255,255,0.03)", border: `1px solid ${item.color}30`, borderRadius: 12, minWidth: 100 }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                  <div className="mono" style={{ fontSize: 11, color: item.color, letterSpacing: 1 }}>{item.label}</div>
                  <div className="body-text" style={{ fontSize: 11, color: "#5a8a9a", marginTop: 4 }}>{item.sub}</div>
                </div>
              )
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", padding: "40px 0", borderTop: "1px solid rgba(79,255,176,0.1)" }}>
          <div className="hero-title" style={{ fontSize: 28, marginBottom: 8 }}>Prematur Belt</div>
          <div className="mono" style={{ color: "#4fffb0", fontSize: 11, letterSpacing: 2 }}>WEARABLE MEDICAL DEVICE · EHG + AI · MADE IN INDONESIA</div>
          <div className="body-text" style={{ color: "#3a5a6a", fontSize: 12, marginTop: 16 }}>Melindungi setiap kelahiran — dari rumah, dengan teknologi.</div>
        </div>

      </div>
    </div>
  );
};

export default PrematurBelt;
