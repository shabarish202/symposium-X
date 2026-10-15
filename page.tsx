"use client";

import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Check, CheckCircle2, ChevronRight,
  CircleAlert, CreditCard, Download, Fingerprint, Mail, QrCode, ScanLine,
  ShieldCheck, Sparkles, Ticket, Utensils, Users, Wallet, Zap
} from "lucide-react";

type Screen = "register" | "payment" | "ticket" | "scanner" | "admin";
type Participant = { name: string; college: string; email: string; department: string; year: string };

const initialParticipant: Participant = {
  name: "Arun Kumar",
  college: "Dr. M.G.R. Educational and Research Institute",
  email: "arun@example.com",
  department: "Artificial Intelligence",
  year: "2nd Year",
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("register");
  const [participant, setParticipant] = useState<Participant>(initialParticipant);
  const [paid, setPaid] = useState(false);
  const [collected, setCollected] = useState(false);
  const [scanResult, setScanResult] = useState(false);
  const [notice, setNotice] = useState("");

  const registrationId = "SX-DEMO-00142";
  const qrPayload = useMemo(() => JSON.stringify({
    event: "SYMPOSIUM-X",
    registrationId,
    demo: true,
  }), []);

  function update(field: keyof Participant, value: string) {
    setParticipant((current) => ({ ...current, [field]: value }));
  }

  function simulatePayment(success: boolean) {
    setPaid(success);
    setCollected(false);
    setScanResult(false);
    setNotice(success ? "Demo payment simulated successfully. No money was charged." : "Demo payment failed. No money was charged.");
    setScreen(success ? "ticket" : "register");
  }

  function downloadPass() {
    const svg = document.querySelector("#food-pass-qr") as SVGSVGElement | null;
    if (!svg) return;
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "symposium-x-demo-pass.svg";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const navItems: { id: Screen; label: string; icon: typeof Ticket }[] = [
    { id: "register", label: "Register", icon: Users },
    { id: "ticket", label: "My Pass", icon: QrCode },
    { id: "scanner", label: "Staff Scan", icon: ScanLine },
    { id: "admin", label: "Admin", icon: Wallet },
  ];

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setScreen("register"); }}>
          <span className="brand-mark"><Zap size={21} fill="currentColor" /></span>
          <span className="brand-name">SYMPOSIUM<span>-X</span><small>ENGINEER THE IMPOSSIBLE</small></span>
        </a>
        <div className="topbar-right">
          <span className="demo-pill"><span /> DEMO MODE</span>
          <a className="github-link" href="https://github.com" target="_blank" rel="noreferrer">GitHub <ArrowRight size={14} /></a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> COLLEGE SYMPOSIUM · 2026</div>
          <h1>Ideas become<br /><span>impact.</span></h1>
          <p>One pass. One experience. Register for SYMPOSIUM-X and make your food access seamless with a digital QR pass.</p>
          <div className="hero-meta">
            <span><ShieldCheck size={16} /> Verified entry flow</span>
            <span><Ticket size={16} /> Digital food pass</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract crimson futuristic event artwork">
          <div className="art-orbit orbit-a" />
          <div className="art-orbit orbit-b" />
          <div className="art-core"><Zap size={52} fill="currentColor" /></div>
          <div className="art-label label-top">SYSTEM ONLINE <span /></div>
          <div className="art-label label-bottom">SX / 2026 <b>01</b></div>
          <div className="art-grid" />
        </div>
      </section>

      <nav className="demo-nav" aria-label="Prototype pages">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} className={`nav-item ${screen === id ? "active" : ""}`} onClick={() => { setScreen(id); setNotice(""); }}>
            <Icon size={17} /><span>{label}</span>
          </button>
        ))}
      </nav>

      {notice && <div className="notice"><CheckCircle2 size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss">×</button></div>}

      {screen === "register" && (
        <section className="content-grid">
          <div className="panel form-panel">
            <div className="section-heading">
              <div><div className="eyebrow">01 / PARTICIPANT DETAILS</div><h2>Secure your spot.</h2></div>
              <span className="step-number">01 — 03</span>
            </div>
            <p className="muted">Enter your details to create your event registration.</p>
            <form onSubmit={(e) => { e.preventDefault(); setScreen("payment"); setNotice(""); }}>
              <div className="field"><label htmlFor="name">Full name</label><input id="name" required value={participant.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" /></div>
              <div className="field"><label htmlFor="college">College / institution</label><input id="college" required value={participant.college} onChange={(e) => update("college", e.target.value)} placeholder="College name" /></div>
              <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" required value={participant.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" /></div>
              <div className="field-row">
                <div className="field"><label htmlFor="department">Department</label><select id="department" value={participant.department} onChange={(e) => update("department", e.target.value)}><option>Artificial Intelligence</option><option>Computer Science</option><option>Information Technology</option><option>Electronics and Communication</option><option>Mechanical Engineering</option><option>Other</option></select></div>
                <div className="field"><label htmlFor="year">Year of study</label><select id="year" value={participant.year} onChange={(e) => update("year", e.target.value)}><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>Other</option></select></div>
              </div>
              <button className="primary-button full-button" type="submit">Continue to payment <ArrowRight size={17} /></button>
            </form>
            <div className="secure-note"><ShieldCheck size={15} /> Your information is used for event registration only.</div>
          </div>

          <aside className="panel fee-panel">
            <div className="fee-top"><span className="fee-icon"><Ticket size={20} /></span><span className="live-label"><i /> REGISTRATION OPEN</span></div>
            <div className="fee-title">SYMPOSIUM-X<br /><span>ENTRY PASS</span></div>
            <div className="fee-amount"><span>₹</span>500<small> / participant</small></div>
            <div className="fee-divider" />
            <ul className="benefit-list">
              <li><Check size={16} /> Symposium registration</li>
              <li><Check size={16} /> Unique digital QR food pass</li>
              <li><Check size={16} /> Email confirmation (live version)</li>
              <li><Check size={16} /> One-time food collection</li>
            </ul>
            <div className="fee-footer"><Fingerprint size={18} /><span><b>One pass. One redemption.</b><small>Designed to prevent duplicate food collection.</small></span></div>
          </aside>
        </section>
      )}

      {screen === "payment" && (
        <section className="narrow-panel panel">
          <button className="back-button" onClick={() => setScreen("register")}><ArrowLeft size={15} /> Back to registration</button>
          <div className="eyebrow">02 / PAYMENT REVIEW</div>
          <h2>Confirm your registration.</h2>
          <p className="muted">Review your details before continuing.</p>
          <div className="summary-card">
            <div className="summary-head"><span className="brand-mark small"><Zap size={15} fill="currentColor" /></span><div><b>SYMPOSIUM-X</b><small>Participant entry pass</small></div><span className="summary-id">SX / 2026</span></div>
            <div className="summary-person"><div className="avatar">{participant.name.trim().slice(0, 1).toUpperCase() || "S"}</div><div><b>{participant.name}</b><small>{participant.college}</small><small>{participant.department} · {participant.year}</small></div></div>
            <div className="summary-total"><span>Registration fee</span><b>₹500.00</b></div>
            <div className="summary-total total"><span>Total payable</span><b>₹500.00</b></div>
          </div>
          <div className="demo-warning"><CircleAlert size={18} /><div><b>Demo payment only</b><p>This prototype does not connect to Razorpay and will not charge your card or UPI.</p></div></div>
          <button className="primary-button full-button" onClick={() => simulatePayment(true)}><CreditCard size={17} /> Simulate successful payment</button>
          <button className="secondary-button full-button" onClick={() => simulatePayment(false)}>Simulate failed payment</button>
        </section>
      )}

      {screen === "ticket" && (
        <section className="ticket-layout">
          <div className="ticket-intro">
            <div className={`status-icon ${paid ? "success" : "pending"}`}>{paid ? <CheckCircle2 size={27} /> : <CircleAlert size={27} />}</div>
            <div className="eyebrow">03 / DIGITAL FOOD PASS</div>
            <h2>{paid ? "You're on the list." : "Your pass preview."}</h2>
            <p className="muted">{paid ? "Demo payment succeeded. Your sample QR pass is ready to preview." : "Simulate payment to preview the post-payment pass."}</p>
            {!paid && <button className="primary-button" onClick={() => setScreen("payment")}>Go to demo payment <ChevronRight size={16} /></button>}
          </div>
          <div className="pass-card">
            <div className="pass-card-top"><div className="pass-brand"><span className="brand-mark small"><Zap size={15} fill="currentColor" /></span><b>SYMPOSIUM-X</b></div><span className="pass-type">FOOD PASS</span></div>
            <div className="pass-rule" />
            <div className="pass-main">
              <div className="pass-details"><span className="label-muted">PARTICIPANT</span><h3>{participant.name || "Participant name"}</h3><p>{participant.college || "College name"}</p><div className="pass-id"><span>REGISTRATION ID</span><b>{registrationId}</b></div></div>
              <div className="qr-frame"><QRCodeSVG id="food-pass-qr" value={qrPayload} size={142} level="M" includeMargin /><span>DEMO QR · NOT VALID FOR ENTRY</span></div>
            </div>
            <div className="pass-rule" />
            <div className="pass-bottom"><div><span className="label-muted">PAYMENT STATUS</span><b className={paid ? "green-text" : "red-text"}>{paid ? "PAID · SIMULATED" : "PENDING"}</b></div><div><span className="label-muted">FOOD ENTITLEMENT</span><b>{collected ? "COLLECTED" : "ONE COLLECTION"}</b></div></div>
            <div className="pass-stripe" />
          </div>
          <div className="ticket-actions">
            <button className="secondary-button" onClick={downloadPass}><Download size={16} /> Download sample QR</button>
            <button className="primary-button" onClick={() => { setScreen("scanner"); setScanResult(false); }}>Test staff scan <ScanLine size={16} /></button>
          </div>
          <p className="disclaimer">The QR contains demo data only. Live payment verification, email delivery and redemption are not connected in this prototype.</p>
        </section>
      )}

      {screen === "scanner" && (
        <section className="narrow-panel panel scanner-panel">
          <div className="staff-header"><div className="staff-icon"><ScanLine size={23} /></div><div><div className="eyebrow">STAFF PORTAL / DEMO</div><h2>Food verification</h2></div><span className="staff-badge">STAFF</span></div>
          <p className="muted">Scan a participant's QR pass to verify their payment and food entitlement.</p>
          <div className="scanner-visual"><div className="scanner-corner c1" /><div className="scanner-corner c2" /><div className="scanner-corner c3" /><div className="scanner-corner c4" /><QrCode size={82} strokeWidth={1.1} /><div className="scanner-line" /><span>CAMERA SCANNER · DEMO</span></div>
          <button className="primary-button full-button" onClick={() => setScanResult(true)}><ScanLine size={17} /> Simulate QR scan</button>
          {scanResult && (
            <div className={`scan-result ${!paid ? "invalid" : collected ? "used" : "valid"}`}>
              <div className="scan-result-head">{!paid ? <CircleAlert size={22} /> : collected ? <CircleAlert size={22} /> : <BadgeCheck size={22} />}<div><b>{!paid ? "PAYMENT NOT VERIFIED" : collected ? "ALREADY COLLECTED" : "VALID · PAID"}</b><small>{!paid ? "Do not issue food." : collected ? "Duplicate collection blocked in demo state." : "Payment is simulated for this prototype."}</small></div></div>
              <div className="scan-detail"><span>Participant</span><b>{participant.name}</b></div>
              <div className="scan-detail"><span>College</span><b>{participant.college}</b></div>
              <div className="scan-detail"><span>Registration ID</span><b>{registrationId}</b></div>
              <div className="scan-detail"><span>Payment</span><b>{paid ? "₹500 · Simulated" : "Pending"}</b></div>
              <div className="scan-detail"><span>Food status</span><b>{collected ? "Collected" : "Not collected"}</b></div>
              {paid && !collected && <button className="primary-button full-button" onClick={() => { setCollected(true); setNotice("Demo food collection recorded in this browser session."); }}>Confirm & mark food collected <Check size={16} /></button>}
              {collected && <div className="already-used"><CheckCircle2 size={16} /> This demo pass has already been marked collected.</div>}
            </div>
          )}
          <p className="disclaimer">Camera access and real server-side validation are not enabled. This scanner uses local demo state only.</p>
        </section>
      )}

      {screen === "admin" && (
        <section className="admin-panel">
          <div className="section-heading"><div><div className="eyebrow">CONTROL CENTER / DEMO DATA</div><h2>Event overview.</h2></div><span className="demo-pill"><span /> SAMPLE METRICS</span></div>
          <div className="stats-grid">
            <div className="stat-card"><span className="stat-icon"><Users size={18} /></span><small>Total registrations</small><strong>142</strong><em>Sample data</em></div>
            <div className="stat-card"><span className="stat-icon"><Wallet size={18} /></span><small>Captured revenue</small><strong>₹71,000</strong><em>Illustrative only</em></div>
            <div className="stat-card"><span className="stat-icon"><Utensils size={18} /></span><small>Food collected</small><strong>{collected ? "87" : "86"}</strong><em>Sample data</em></div>
            <div className="stat-card"><span className="stat-icon"><Ticket size={18} /></span><small>Unused passes</small><strong>{collected ? "55" : "56"}</strong><em>Sample data</em></div>
          </div>
          <div className="panel registrations-table">
            <div className="table-heading"><div><h3>Recent registrations</h3><p className="muted">Example rows for prototype review</p></div><span className="table-count">3 RECORDS</span></div>
            <div className="table-wrap"><table><thead><tr><th>Participant</th><th>College</th><th>Payment</th><th>Food</th></tr></thead><tbody>
              <tr><td><b>{participant.name}</b><small>{registrationId}</small></td><td>{participant.college}</td><td><span className={`table-status ${paid ? "ok" : "wait"}`}>{paid ? "Paid (demo)" : "Pending"}</span></td><td><span className={`table-status ${collected ? "used" : "ok"}`}>{collected ? "Collected" : "Unused"}</span></td></tr>
              <tr><td><b>Meera S</b><small>SX-DEMO-00141</small></td><td>Sample Engineering College</td><td><span className="table-status ok">Paid (sample)</span></td><td><span className="table-status used">Collected</span></td></tr>
              <tr><td><b>Vikram R</b><small>SX-DEMO-00140</small></td><td>Sample Institute of Technology</td><td><span className="table-status wait">Pending</span></td><td><span className="table-status wait">Unavailable</span></td></tr>
            </tbody></table></div>
            <div className="table-foot"><Mail size={15} /> Live database and exports will be connected in the next phase.</div>
          </div>
        </section>
      )}

      <footer className="footer"><div className="footer-brand"><span className="brand-mark tiny"><Zap size={12} fill="currentColor" /></span> SYMPOSIUM-X</div><span>DESIGNED FOR THE NEXT GENERATION.</span><span className="footer-demo">FRONTEND DEMO ONLY</span></footer>
    </main>
  );
}
