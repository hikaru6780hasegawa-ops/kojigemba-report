const { useState, useEffect, useRef, useMemo } = React;

// ---------- Tweak defaults ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "ink",
  "density": "normal",
  "displayFont": "serif",
  "showLatinSubtitles": true,
  "numberedSections": true,
  "accentedDivisions": false
}/*EDITMODE-END*/;

// ---------- Data ----------
const DIVISIONS = [
  {
    id: "01",
    jp: "不動産事業",
    en: "Real Estate",
    lede: "売買・仲介から賃貸管理、分譲開発まで。地域の特性とお客さまのニーズに合わせたトータルサポートを提供します。",
    metric: { label: "取扱件数 / 年", value: "1,200+" },
    tint: "sand",
  },
  {
    id: "02",
    jp: "建築事業",
    en: "Architecture",
    lede: "企画・設計・施工・維持管理までを一貫体制で。技術開発を継続し、多様化するニーズに応えます。",
    metric: { label: "平均工期", value: "7.4ヶ月" },
    tint: "stone",
  },
  {
    id: "03",
    jp: "リフォーム事業",
    en: "Renovation",
    lede: "今あるものを活かし、暮らしに合わせて生まれ変わらせる。長く住み続けられる家のためのリフォームプラン。",
    metric: { label: "顧客満足度", value: "96%" },
    tint: "clay",
  },
  {
    id: "04",
    jp: "太陽光事業",
    en: "Solar Energy",
    lede: "持続可能な社会の実現に向け、太陽光発電システムの導入から運用まで包括的に提供。",
    metric: { label: "設置容量", value: "18.4 MW" },
    tint: "moss",
  },
  {
    id: "05",
    jp: "保険代理事業",
    en: "Insurance",
    lede: "水漏れ、空き巣、火災、ペット——暮らしの中の思わぬアクシデントに備える安心の保険を。",
    metric: { label: "契約件数", value: "5,800+" },
    tint: "sand",
  },
  {
    id: "06",
    jp: "マリッジ事業",
    en: "Marriage",
    lede: "結婚という節目に寄り添い、将来にわたる安心と希望を描く人生設計型マリッジプラン。",
    metric: { label: "在籍カウンセラー", value: "12名" },
    tint: "clay",
  },
  {
    id: "07",
    jp: "その他事業展開",
    en: "Other Ventures",
    lede: "住宅関連事業で培った顧客基盤とノウハウを活かし、新たな分野への事業展開を推進。",
    metric: { label: "新規事業", value: "3分野" },
    tint: "stone",
  },
];

const NEWS = [
  { date: "2026.04.15", cat: "Insight", title: "知って得する、不動産をAIで賢く攻略する方法（後編）" },
  { date: "2026.03.31", cat: "Insight", title: "知って得する、不動産をAIで賢く攻略する方法（前編）" },
  { date: "2026.03.15", cat: "Column",  title: "2026年版・インフレ時代のお金の置き場所" },
  { date: "2026.02.28", cat: "Column",  title: "2026年版・住宅ローンは固定か変動か" },
  { date: "2026.02.13", cat: "News",    title: "結婚相談所「Life True by KANAU」公式サイトを公開いたしました" },
  { date: "2026.01.08", cat: "News",    title: "金融経済教育推進機構（J-FLEC）公式サイトへのご案内リンク設置について" },
];

const WORKS = [
  { id: "W-142", type: "Architecture", title: "日本橋オフィスビル改修", year: "2025", loc: "東京都中央区", tint: "stone" },
  { id: "W-139", type: "Renovation",   title: "中野・戸建フルリノベーション", year: "2025", loc: "東京都中野区", tint: "sand" },
  { id: "W-135", type: "Real Estate",  title: "練馬ガーデンレジデンス分譲", year: "2025", loc: "東京都練馬区", tint: "clay" },
  { id: "W-131", type: "Solar",        title: "愛知倉庫屋根上発電", year: "2024", loc: "愛知県名古屋市", tint: "moss" },
];

const OFFICES = [
  { name: "本店", addr: "東京都中央区日本橋人形町1-5-8\nアトリウム日本橋人形町一丁目ビル4階", tel: "03-6231-1113" },
  { name: "中野事務所", addr: "東京都中野区江原町3-34-1\nHBビル2F", tel: "03-6908-2680" },
  { name: "練馬事務所", addr: "東京都練馬区豊玉上2-27-16\n第二新建ビル1F", tel: "03-6914-6792" },
  { name: "愛知事務所", addr: "愛知県名古屋市中区平和1-22-5\nパルティール金山アネックス101", tel: "052-253-8020" },
];

// ---------- Placeholder Image ----------
function Placeholder({ label, tint = "sand", ratio = "16/10", subtle }) {
  const palettes = {
    sand:  { a: "oklch(0.88 0.02 75)",  b: "oklch(0.82 0.03 70)" },
    stone: { a: "oklch(0.84 0.008 60)", b: "oklch(0.76 0.012 60)" },
    clay:  { a: "oklch(0.82 0.04 35)",  b: "oklch(0.74 0.06 30)" },
    moss:  { a: "oklch(0.82 0.035 140)",b: "oklch(0.74 0.05 150)" },
  };
  const p = palettes[tint] || palettes.sand;
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: ratio, overflow: "hidden", background: p.a }}>
      <svg width="100%" height="100%" viewBox="0 0 400 250" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id={`stripe-${tint}-${label}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
            <rect width="14" height="14" fill={p.a} />
            <rect width="7" height="14" fill={p.b} />
          </pattern>
        </defs>
        <rect width="400" height="250" fill={`url(#stripe-${tint}-${label})`} opacity="0.55" />
      </svg>
      {!subtle && label && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-start",
          padding: "14px 16px", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.02em",
          color: "oklch(0.25 0.01 60)", textTransform: "uppercase"
        }}>
          <span style={{ padding: "3px 8px", background: "var(--bg)", border: "1px solid var(--rule)" }}>{label}</span>
        </div>
      )}
    </div>
  );
}

// ---------- Nav ----------
function Nav({ displayFont }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: `${scrolled ? 14 : 22}px clamp(20px, 4vw, 56px)`,
    transition: "all .32s cubic-bezier(.2,.7,.2,1)",
    background: scrolled ? "color-mix(in oklch, var(--bg) 86%, transparent)" : "transparent",
    backdropFilter: scrolled ? "blur(14px)" : "none",
    borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
  };

  const items = [
    ["事業", "services"], ["取扱不動産", "estate"], ["施工事例", "works"],
    ["企業理念", "philosophy"], ["会社概要", "company"], ["お役立ち", "info"],
  ];

  return (
    <>
      <nav style={navStyle}>
        <a href="#top" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0,behavior:"smooth"});}}
          style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{
            fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)",
            fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em",
          }}>Martial Arts</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-soft)", letterSpacing: "0.08em" }}>
            HOLDINGS / EST. 2008
          </span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <ul style={{ display: "flex", gap: 22, listStyle: "none" }} className="nav-links">
            {items.map(([jp, id]) => (
              <li key={id}>
                <a href={`#${id}`} style={{
                  fontSize: 13, fontWeight: 500, color: "var(--ink)",
                  position: "relative", padding: "4px 0",
                }}>{jp}</a>
              </li>
            ))}
          </ul>

          <a href="#contact" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 18px", border: "1px solid var(--ink)",
            fontSize: 12, fontWeight: 500, letterSpacing: "0.04em",
            background: "var(--ink)", color: "var(--bg)",
          }}>
            お問い合わせ
            <span style={{ fontFamily: "var(--mono)", opacity: 0.6, fontSize: 11 }}>→</span>
          </a>
        </div>
      </nav>

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </>
  );
}

// ---------- Hero ----------
function Hero({ displayFont, showLatin }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const loop = () => { setT(performance.now() / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const displayStyle = {
    fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)",
    fontSize: "clamp(56px, 9vw, 148px)",
    fontWeight: displayFont === "serif" ? 400 : 300,
    lineHeight: 0.95,
    letterSpacing: "-0.02em",
    textWrap: "balance",
  };

  return (
    <header id="top" style={{ position: "relative", minHeight: "100vh", padding: "120px clamp(20px, 4vw, 56px) 60px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      {/* Top bar — kicker */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        <div>
          <div>A diversified holdings firm</div>
          <div style={{ color: "var(--ink-faint)", marginTop: 2 }}>Tokyo · Nagoya · 2008—</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div>Seven divisions</div>
          <div style={{ color: "var(--ink-faint)", marginTop: 2 }}>{new Date().getFullYear()} 事業年度</div>
        </div>
      </div>

      {/* Main display */}
      <div style={{ padding: "clamp(40px, 8vh, 120px) 0 0" }}>
        {showLatin && (
          <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.14em", color: "var(--ink-soft)", marginBottom: 28, textTransform: "uppercase" }}>
            <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--ink-soft)", verticalAlign: "middle", marginRight: 14 }} />
            Est. 2008 — Issue 017
          </div>
        )}
        <h1 style={displayStyle}>
          自社で施工し、<br />
          自社で販売する。<br />
          <span style={{ color: "var(--accent)", fontStyle: displayFont === "serif" ? "italic" : "normal" }}>
            一貫した誠実。
          </span>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)", gap: "clamp(24px, 4vw, 80px)", marginTop: "clamp(32px, 5vh, 64px)", maxWidth: 1400 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.06em", textTransform: "uppercase", paddingTop: 6 }}>
            Statement &nbsp;—&nbsp; 001
          </div>
          <p style={{ fontSize: "clamp(15px, 1.3vw, 18px)", lineHeight: 1.7, color: "var(--ink)", maxWidth: 640 }}>
            東京都を中心とする首都圏から東海まで幅広く事業を展開し、不動産から建築、エネルギー、保険、そして人生の節目に寄り添うマリッジ事業まで——<span style={{ color: "var(--ink-soft)" }}>自社施工から自社販売までを一貫して行うことで、お客さまのさまざまなニーズに応えてまいります。</span>
          </p>
        </div>
      </div>

      {/* Bottom meta — ticker-like */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40, flexWrap: "wrap", marginTop: 60 }}>
        <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
          {[
            ["07", "Divisions"],
            ["04", "Offices"],
            ["18", "Years"],
          ].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)", fontSize: 40, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-soft)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.08em", textAlign: "right" }}>
          <div style={{ color: "var(--ink)" }}>↓ scroll</div>
          <div style={{ marginTop: 4 }}>
            {((t * 12) % 360).toFixed(0).padStart(3, "0")}° · {(Math.sin(t * 0.4) * 0.5 + 0.5).toFixed(3)}
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------- Section Title ----------
function SectionTitle({ num, kicker, jp, en, displayFont, showNum = true }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)", gap: "clamp(24px, 4vw, 80px)", alignItems: "end", padding: "0 clamp(20px, 4vw, 56px)", marginBottom: "clamp(40px, 6vh, 80px)" }}>
      <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 14 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
          {showNum && <span style={{ color: "var(--ink)" }}>— {num}</span>} {showNum && " · "} {kicker}
        </div>
      </div>
      <div>
        <h2 style={{
          fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)",
          fontSize: "clamp(36px, 5vw, 72px)", fontWeight: displayFont === "serif" ? 400 : 300,
          lineHeight: 1, letterSpacing: "-0.015em",
        }}>
          {jp}
          {en && (
            <span style={{ fontFamily: "var(--mono)", fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 400, letterSpacing: "0.12em", color: "var(--ink-faint)", textTransform: "uppercase", marginLeft: 18, verticalAlign: "middle" }}>
              {en}
            </span>
          )}
        </h2>
      </div>
    </div>
  );
}

// ---------- Divisions index ----------
function Divisions({ displayFont, accented, numbered }) {
  const [hoverId, setHoverId] = useState(null);
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="services" style={{ padding: "clamp(80px, 12vh, 160px) 0", position: "relative" }}>
      <SectionTitle num={numbered ? "02" : ""} kicker="Business Index / 事業一覧" jp="七つの事業" en="Seven Divisions" displayFont={displayFont} showNum={numbered} />

      <div style={{ padding: "0 clamp(20px, 4vw, 56px)" }}>
        <ul style={{ listStyle: "none", borderTop: "1px solid var(--rule)" }}>
          {DIVISIONS.map((d) => {
            const isExp = expanded === d.id;
            const isHover = hoverId === d.id;
            return (
              <li
                key={d.id}
                onMouseEnter={() => setHoverId(d.id)}
                onMouseLeave={() => setHoverId(null)}
                onClick={() => setExpanded(isExp ? null : d.id)}
                style={{
                  borderBottom: "1px solid var(--rule)",
                  cursor: "pointer",
                  transition: "background .3s ease",
                  background: isHover && !isExp ? "var(--panel)" : "transparent",
                }}
              >
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "60px minmax(0, 1.2fr) minmax(0, 1.4fr) minmax(0, 1fr) 44px",
                  gap: 24, alignItems: "center",
                  padding: "clamp(22px, 3vh, 36px) 4px",
                }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.06em" }}>
                    — {d.id}
                  </div>

                  <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                    <span style={{
                      fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)",
                      fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: displayFont === "serif" ? 500 : 400,
                      letterSpacing: "-0.01em", lineHeight: 1.05,
                      color: accented && isHover ? "var(--accent)" : "var(--ink)",
                      transition: "color .2s",
                    }}>{d.jp}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {d.en}
                    </span>
                  </div>

                  <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 520 }} className="div-lede">
                    {d.lede}
                  </div>

                  <div style={{ textAlign: "right", fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.04em" }}>
                    <div style={{ color: "var(--ink)", fontSize: 16, fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)", fontWeight: 500 }}>{d.metric.value}</div>
                    <div style={{ marginTop: 2, textTransform: "uppercase", fontSize: 10 }}>{d.metric.label}</div>
                  </div>

                  <div style={{
                    width: 32, height: 32, border: "1px solid var(--ink)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--mono)", fontSize: 14,
                    transition: "all .3s",
                    background: isExp ? "var(--ink)" : "transparent",
                    color: isExp ? "var(--bg)" : "var(--ink)",
                    transform: isExp ? "rotate(45deg)" : "none",
                  }}>+</div>
                </div>

                {/* expansion */}
                <div style={{
                  overflow: "hidden",
                  maxHeight: isExp ? 420 : 0,
                  transition: "max-height .5s cubic-bezier(.2,.7,.2,1)",
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "60px minmax(0, 1fr) minmax(0, 1fr)", gap: 24, padding: "8px 4px 36px" }}>
                    <div />
                    <Placeholder label={`${d.en} / figure`} tint={d.tint} ratio="16/9" />
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "space-between" }}>
                      <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--ink-soft)" }}>
                        {d.lede} 詳細な実績と導入事例は個別ページをご参照ください。企画から運用までを一貫してご提案します。
                      </p>
                      <a href="#" onClick={(e)=>e.preventDefault()} style={{
                        alignSelf: "flex-start", padding: "12px 20px",
                        border: "1px solid var(--ink)", fontSize: 12, letterSpacing: "0.04em",
                      }}>
                        {d.jp}の詳細 →
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #services ul > li > div:first-child {
            grid-template-columns: 40px minmax(0, 1fr) 40px !important;
          }
          #services .div-lede { display: none !important; }
          #services ul > li > div:first-child > *:nth-child(4) { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// ---------- Manifesto / Philosophy strip ----------
function Philosophy({ displayFont, numbered }) {
  return (
    <section id="philosophy" style={{ padding: "clamp(80px, 12vh, 160px) clamp(20px, 4vw, 56px)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", background: "var(--panel)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)", gap: "clamp(24px, 6vw, 100px)", alignItems: "start", maxWidth: 1600, margin: "0 auto" }}>
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
            {numbered && "— 03 · "}Philosophy
          </div>
          <div style={{ marginTop: 40, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.8 }}>
            理念 / 事業姿勢<br/>
            Est. 2008<br/>
            代表・長谷川光
          </div>
        </div>
        <div>
          <p style={{
            fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)",
            fontSize: "clamp(28px, 3.4vw, 52px)",
            fontWeight: displayFont === "serif" ? 400 : 300,
            lineHeight: 1.3, letterSpacing: "-0.015em", textWrap: "pretty",
          }}>
            家は買って終わりではない。<br/>
            暮らしが続く限り、<br/>
            <span style={{ color: "var(--accent)", fontStyle: displayFont === "serif" ? "italic" : "normal" }}>
              私たちの仕事も続く。
            </span>
          </p>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {[
              { k: "誠実", v: "お客さまの資産と生活に、最後まで責任を持つ。" },
              { k: "一貫", v: "企画・設計・施工・販売・運用までを自社で。" },
              { k: "継続", v: "売って終わりではない、住まいの伴走者として。" },
            ].map((p, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--ink)", paddingTop: 14 }}>
                <div style={{ fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>{p.k}</div>
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7, color: "var(--ink-soft)" }}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Works ----------
function Works({ displayFont, numbered }) {
  const [idx, setIdx] = useState(0);
  return (
    <section id="works" style={{ padding: "clamp(80px, 12vh, 160px) 0" }}>
      <SectionTitle num={numbered ? "04" : ""} kicker="Selected Works / 施工実績" jp="実績抜粋" en="Selected Works" displayFont={displayFont} showNum={numbered} />

      <div style={{ padding: "0 clamp(20px, 4vw, 56px)", display: "grid", gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)", gap: "clamp(24px, 4vw, 56px)" }} className="works-grid">
        <div style={{ position: "relative" }}>
          <Placeholder label={`${WORKS[idx].id} / ${WORKS[idx].title}`} tint={WORKS[idx].tint} ratio="4/3" />
          <div style={{ position: "absolute", top: 16, left: 16, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink)", background: "var(--bg)", padding: "4px 10px", border: "1px solid var(--rule)" }}>
            {WORKS[idx].id}
          </div>
        </div>

        <div>
          <ul style={{ listStyle: "none" }}>
            {WORKS.map((w, i) => {
              const active = i === idx;
              return (
                <li key={w.id} onMouseEnter={() => setIdx(i)} style={{
                  borderTop: i === 0 ? "1px solid var(--rule)" : "none",
                  borderBottom: "1px solid var(--rule)",
                  padding: "22px 0", cursor: "pointer",
                  display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 12,
                  opacity: active ? 1 : 0.55, transition: "opacity .3s",
                }}>
                  <div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 6 }}>
                      {w.type} · {w.year}
                    </div>
                    <div style={{
                      fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)",
                      fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em",
                    }}>{w.title}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 6 }}>{w.loc}</div>
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 22, color: active ? "var(--accent)" : "var(--ink-faint)", transition: "color .3s" }}>
                    {active ? "●" : "○"}
                  </div>
                </li>
              );
            })}
          </ul>
          <a href="#" onClick={(e)=>e.preventDefault()} style={{ display: "inline-block", marginTop: 24, fontSize: 13, borderBottom: "1px solid var(--ink)", paddingBottom: 2 }}>
            全ての施工事例を見る →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .works-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ---------- News / Blog ----------
function NewsSection({ displayFont, numbered }) {
  const [tab, setTab] = useState("all");
  const tabs = [
    { id: "all",     label: "全て" },
    { id: "News",    label: "お知らせ" },
    { id: "Insight", label: "Insight" },
    { id: "Column",  label: "コラム" },
  ];
  const filtered = tab === "all" ? NEWS : NEWS.filter(n => n.cat === tab);

  return (
    <section id="info" style={{ padding: "clamp(80px, 12vh, 160px) 0", borderTop: "1px solid var(--rule)" }}>
      <SectionTitle num={numbered ? "05" : ""} kicker="News & Writing / お知らせ・コラム" jp="最新情報" en="News & Writing" displayFont={displayFont} showNum={numbered} />

      <div style={{ padding: "0 clamp(20px, 4vw, 56px)" }}>
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--rule)", marginBottom: 32, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "14px 18px", fontSize: 13, fontWeight: 500,
              fontFamily: "inherit", color: tab === t.id ? "var(--ink)" : "var(--ink-soft)",
              borderBottom: tab === t.id ? "1px solid var(--ink)" : "1px solid transparent",
              marginBottom: -1, letterSpacing: "0.02em",
            }}>
              {t.label}
            </button>
          ))}
        </div>

        <ul style={{ listStyle: "none" }}>
          {filtered.map((n, i) => (
            <li key={i} style={{
              borderBottom: "1px solid var(--rule)",
              padding: "20px 0",
              display: "grid", gridTemplateColumns: "120px 100px minmax(0, 1fr) 40px",
              gap: 20, alignItems: "center", cursor: "pointer",
            }} className="news-row">
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-soft)", letterSpacing: "0.04em" }}>{n.date}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>{n.cat}</div>
              <div style={{
                fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)",
                fontSize: 17, fontWeight: 500, letterSpacing: "-0.005em",
              }}>{n.title}</div>
              <div style={{ textAlign: "right", fontFamily: "var(--mono)", color: "var(--ink-faint)" }}>→</div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .news-row:hover { background: var(--panel); }
        @media (max-width: 720px) {
          .news-row { grid-template-columns: 90px minmax(0, 1fr) 24px !important; }
          .news-row > *:nth-child(2) { display: none; }
        }
      `}</style>
    </section>
  );
}

// ---------- Estate strip (small promo) ----------
function EstateStrip({ displayFont }) {
  return (
    <section id="estate" style={{ padding: "clamp(60px, 9vh, 120px) clamp(20px, 4vw, 56px)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="estate-strip">
      {[
        { title: "取扱不動産", en: "Current Listings", tint: "sand", num: "24" },
        { title: "売却相談",   en: "Sell with us",     tint: "stone", num: "無料" },
        { title: "相続相談",   en: "Inheritance help", tint: "clay", num: "60分" },
      ].map((c, i) => (
        <a key={i} href="#" onClick={(e)=>e.preventDefault()} style={{
          position: "relative", aspectRatio: "4/5", display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: 24, border: "1px solid var(--rule)",
          overflow: "hidden", color: "var(--ink)",
        }} className="estate-card">
          <Placeholder label="" tint={c.tint} subtle />
          <div style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {c.en}
            </div>
            <div>
              <div style={{
                fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)",
                fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1,
              }}>{c.title}</div>
              <div style={{ marginTop: 12, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-soft)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span>{c.num}</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </a>
      ))}
      <style>{`
        .estate-card { transition: transform .4s cubic-bezier(.2,.7,.2,1), background .3s; }
        .estate-card:hover { transform: translateY(-4px); }
        @media (max-width: 820px) { .estate-strip { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ---------- Contact / Footer ----------
function Contact({ displayFont, numbered }) {
  const [form, setForm] = useState({ name: "", email: "", topic: "不動産", msg: "" });
  const [sent, setSent] = useState(false);

  const topics = ["不動産", "建築・リフォーム", "太陽光", "保険", "マリッジ", "採用", "その他"];

  return (
    <section id="contact" style={{ background: "var(--ink)", color: "var(--bg)", padding: "clamp(80px, 12vh, 140px) 0" }}>
      <div style={{ padding: "0 clamp(20px, 4vw, 56px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)", gap: "clamp(32px, 6vw, 96px)", alignItems: "start" }} className="contact-grid">
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.7 0.01 60)" }}>
            {numbered && "— 06 · "}Contact
          </div>
          <h2 style={{
            marginTop: 20,
            fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)",
            fontSize: "clamp(40px, 5vw, 72px)", fontWeight: displayFont === "serif" ? 400 : 300,
            lineHeight: 1, letterSpacing: "-0.015em",
          }}>
            お気軽に、<br/>
            <span style={{ color: "var(--accent)", fontStyle: displayFont === "serif" ? "italic" : "normal" }}>ご相談ください。</span>
          </h2>
          <div style={{ marginTop: 40, display: "grid", gap: 20 }}>
            {OFFICES.map((o, i) => (
              <div key={i} style={{ borderTop: "1px solid oklch(0.35 0.01 60)", paddingTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: displayFont === "serif" ? "var(--serif)" : "var(--sans)", fontSize: 18, fontWeight: 500 }}>{o.name}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "oklch(0.7 0.01 60)" }}>{o.tel}</span>
                </div>
                <div style={{ marginTop: 6, fontSize: 12, color: "oklch(0.75 0.01 60)", whiteSpace: "pre-line", lineHeight: 1.7 }}>{o.addr}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(()=>setSent(false), 3000); }}
          style={{ display: "grid", gap: 22, border: "1px solid oklch(0.35 0.01 60)", padding: "clamp(24px, 4vw, 48px)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.7 0.01 60)" }}>
            Inquiry form · 01 / 04
          </div>

          <Field label="お名前" required>
            <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
          </Field>
          <Field label="メール" required>
            <input type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
          </Field>

          <div>
            <label style={labelStyle}>ご相談内容</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
              {topics.map(t => (
                <button type="button" key={t} onClick={() => setForm({...form, topic: t})} style={{
                  padding: "8px 14px", fontSize: 12,
                  background: form.topic === t ? "var(--accent)" : "transparent",
                  color: form.topic === t ? "var(--bg)" : "oklch(0.85 0.01 60)",
                  border: `1px solid ${form.topic === t ? "var(--accent)" : "oklch(0.45 0.01 60)"}`,
                  cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em",
                  transition: "all .2s",
                }}>{t}</button>
              ))}
            </div>
          </div>

          <Field label="メッセージ">
            <textarea rows={4} value={form.msg} onChange={(e)=>setForm({...form, msg:e.target.value})} />
          </Field>

          <button type="submit" style={{
            padding: "18px 24px", background: "var(--bg)", color: "var(--ink)", border: "none",
            fontFamily: "inherit", fontSize: 14, fontWeight: 500, letterSpacing: "0.04em",
            cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
            transition: "background .2s",
          }}>
            <span>{sent ? "受付しました" : "送信する"}</span>
            <span style={{ fontFamily: "var(--mono)" }}>{sent ? "✓" : "→"}</span>
          </button>
        </form>
      </div>

      <style>{`
        #contact input, #contact textarea {
          width: 100%; padding: 12px 0; background: transparent;
          border: none; border-bottom: 1px solid oklch(0.45 0.01 60);
          color: var(--bg); font-family: inherit; font-size: 14px; resize: none;
          outline: none; transition: border-color .2s;
        }
        #contact input:focus, #contact textarea:focus { border-bottom-color: var(--accent); }
        @media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

const labelStyle = {
  display: "block",
  fontFamily: "var(--mono)", fontSize: 10,
  letterSpacing: "0.12em", textTransform: "uppercase",
  color: "oklch(0.7 0.01 60)",
};

function Field({ label, required, children }) {
  return (
    <div>
      <label style={labelStyle}>{label} {required && <span style={{ color: "var(--accent)" }}>*</span>}</label>
      <div style={{ marginTop: 4 }}>{children}</div>
    </div>
  );
}

function Footer({ displayFont }) {
  return (
    <footer style={{ padding: "40px clamp(20px, 4vw, 56px)", background: "var(--bg)", color: "var(--ink-soft)", borderTop: "1px solid var(--rule)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.06em" }}>
        <div>© 2026 Martial Arts, Inc. · All rights reserved</div>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#" onClick={(e)=>e.preventDefault()}>個人情報保護方針</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>SDGs</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Security</a>
        </div>
      </div>
    </footer>
  );
}

// ---------- Tweaks Panel ----------
function AppTweaks() {
  const [tweaks, setTweaks] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.body.dataset.theme = tweaks.theme;
    document.body.dataset.density = tweaks.density;
  }, [tweaks.theme, tweaks.density]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Visual">
        <TweakRadio label="Accent" value={tweaks.theme} onChange={(v) => setTweaks({ theme: v })}
          options={[
            { value: "ink",    label: "Vermilion" },
            { value: "indigo", label: "Indigo" },
            { value: "forest", label: "Forest" },
            { value: "mono",   label: "Monochrome" },
          ]} />
        <TweakRadio label="Display font" value={tweaks.displayFont} onChange={(v) => setTweaks({ displayFont: v })}
          options={[
            { value: "serif", label: "Serif (Noto Serif JP)" },
            { value: "sans",  label: "Sans (Inter)" },
          ]} />
        <TweakRadio label="Density" value={tweaks.density} onChange={(v) => setTweaks({ density: v })}
          options={[
            { value: "tight",   label: "Tight" },
            { value: "normal",  label: "Normal" },
            { value: "relaxed", label: "Relaxed" },
          ]} />
      </TweakSection>
      <TweakSection title="Structure">
        <TweakToggle label="Latin subtitles" value={tweaks.showLatinSubtitles} onChange={(v) => setTweaks({ showLatinSubtitles: v })} />
        <TweakToggle label="Numbered sections" value={tweaks.numberedSections} onChange={(v) => setTweaks({ numberedSections: v })} />
        <TweakToggle label="Accent division hover" value={tweaks.accentedDivisions} onChange={(v) => setTweaks({ accentedDivisions: v })} />
      </TweakSection>
    </TweaksPanel>
  );
}

// ---------- App ----------
function App() {
  const [tweaks] = useTweaks(TWEAK_DEFAULTS);
  const displayFont = tweaks.displayFont;

  return (
    <div data-screen-label="01 Home" data-om-validate>
      <Nav displayFont={displayFont} />
      <Hero displayFont={displayFont} showLatin={tweaks.showLatinSubtitles} />

      {/* Section delimiter: a slim "02 · SERVICES" fine rule above the block — handled inside SectionTitle */}
      <Divisions displayFont={displayFont} accented={tweaks.accentedDivisions} numbered={tweaks.numberedSections} />
      <Philosophy displayFont={displayFont} numbered={tweaks.numberedSections} />
      <Works displayFont={displayFont} numbered={tweaks.numberedSections} />
      <EstateStrip displayFont={displayFont} />
      <NewsSection displayFont={displayFont} numbered={tweaks.numberedSections} />
      <Contact displayFont={displayFont} numbered={tweaks.numberedSections} />
      <Footer displayFont={displayFont} />

      <AppTweaks />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
