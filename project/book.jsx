const { useState, useEffect, useRef, useCallback } = React;

const A = "assets/";

// ---------- small helpers ----------
function Photo({ src, label, pos = "center", style }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}>
      <img src={src} alt={label || ""} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, display: "block" }} />
    </div>
  );
}

function Caption({ children, dark }) {
  return (
    <span style={{
      fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
      color: dark ? "oklch(0.82 0.01 60)" : "var(--ink-soft)",
    }}>{children}</span>
  );
}

// page chrome: running header + folio
function PageFrame({ children, folio, header, pad = 56, bg = "var(--paper)" }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: bg, padding: pad, display: "flex", flexDirection: "column" }}>
      {header !== undefined && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <Caption>{header}</Caption>
          <span style={{ width: 28, height: 1, background: "var(--rule)" }} />
        </div>
      )}
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
      {folio !== undefined && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 24 }}>
          <Caption>Martial Arts, Inc.</Caption>
          <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-soft)" }}>{folio}</span>
        </div>
      )}
    </div>
  );
}

const serif = { fontFamily: "var(--serif)" };

// ---------- division data ----------
const DIV = [
  ["01", "不動産事業", "Real Estate", "売買・仲介から賃貸管理、分譲開発まで一貫対応。"],
  ["02", "建築事業", "Architecture", "企画・設計・施工・維持管理を自社一貫体制で。"],
  ["03", "リフォーム事業", "Renovation", "今ある住まいを、暮らしに合わせて生まれ変わらせる。"],
  ["04", "太陽光事業", "Solar Energy", "発電システムの導入から運用まで包括的に提供。"],
  ["05", "保険代理事業", "Insurance", "暮らしの思わぬアクシデントに備える安心の保険。"],
  ["06", "マリッジ事業", "Marriage", "人生の節目に寄り添う、人生設計型マリッジプラン。"],
  ["07", "その他事業", "Other Ventures", "培った顧客基盤を活かし、新分野へ事業を展開。"],
];

// =========================================================
// SPREADS — each {left, right}. Rendered into 720px-wide pages.
// =========================================================
function buildSpreads() {
  return [
    // 00 — COVER (wrap)
    {
      cover: true,
      left: (
        <div style={{ position: "absolute", inset: 0, background: "#1b1b1d" }}>
          <Photo src={A + "house-sunset.jpg"} label="施工事例" pos="center 40%" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(20,20,22,0) 55%, rgba(20,20,22,0.85) 100%)" }} />
        </div>
      ),
      right: (
        <div style={{ position: "absolute", inset: 0, background: "#1b1b1d", color: "var(--paper)", padding: 56, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Caption dark>Company Profile</Caption>
            <Caption dark>2026</Caption>
          </div>
          <div>
            <div style={{ width: 44, height: 3, background: "var(--accent)", marginBottom: 28 }} />
            <div style={{ ...serif, fontSize: 26, fontWeight: 400, letterSpacing: "0.04em", color: "oklch(0.82 0.01 60)" }}>株式会社マーシャルアーツ</div>
            <h1 style={{ ...serif, fontSize: 72, fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.01em", marginTop: 14 }}>
              会社案内
            </h1>
            <div style={{ marginTop: 18, fontSize: 15, lineHeight: 1.8, color: "oklch(0.78 0.01 60)", maxWidth: 380 }}>
              自社で施工し、自社で販売する。<br />住まいの、その先まで。
            </div>
          </div>
          <Caption dark>Tokyo · Nagoya — Est. 2008</Caption>
        </div>
      ),
    },

    // 01 — ご挨拶
    {
      left: (
        <PageFrame folio="02" header="Greeting / ご挨拶">
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
            <Caption>Message — 001</Caption>
            <h2 style={{ ...serif, fontSize: 46, fontWeight: 400, lineHeight: 1.3, letterSpacing: "-0.01em", margin: "20px 0 28px" }}>
              家は、買って<br />終わりではない。<br /><span style={{ color: "var(--accent)" }}>住まいの伴走者として。</span>
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 2, color: "var(--ink-soft)", maxWidth: 520 }}>
              私たちは2008年の創業以来、不動産の売買・仲介にとどまらず、建築・リフォーム・エネルギー・保険、そして人生の節目に寄り添うマリッジ事業まで、暮らしに関わる事業を一貫して手がけてまいりました。
            </p>
            <p style={{ fontSize: 14.5, lineHeight: 2, color: "var(--ink-soft)", maxWidth: 520, marginTop: 18 }}>
              企画から設計、施工、販売、そして引き渡したあとの暮らしまで——自社で責任を持つこと。それが私たちの考える「誠実」のかたちです。
            </p>
            <div style={{ marginTop: 32, display: "flex", alignItems: "baseline", gap: 14 }}>
              <Caption>代表取締役</Caption>
              <span style={{ ...serif, fontSize: 20 }}>長谷川 光</span>
            </div>
          </div>
        </PageFrame>
      ),
      right: (
        <div style={{ position: "absolute", inset: 0 }}>
          <Photo src={A + "house-corner.jpg"} label="外観" pos="center" />
          <div style={{ position: "absolute", left: 0, bottom: 0, padding: "20px 24px", background: "linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0))", right: 0 }}>
            <Caption dark>Fig. 01 — 自社施工による戸建住宅</Caption>
          </div>
        </div>
      ),
    },

    // 02 — 企業理念
    {
      left: (
        <PageFrame folio="03" header="Philosophy / 企業理念" bg="var(--panel)">
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
            <Caption>Our Principles</Caption>
            <h2 style={{ ...serif, fontSize: 52, fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.01em", margin: "18px 0 0" }}>
              一貫した<br />誠実。
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.95, color: "var(--ink-soft)", marginTop: 24, maxWidth: 500 }}>
              事業領域は広くとも、貫くものはひとつ。お客さまの資産と生活に、最後まで責任を持つこと。
            </p>
          </div>
        </PageFrame>
      ),
      right: (
        <PageFrame folio="" bg="var(--panel)">
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", gap: 26 }}>
            {[
              ["誠実", "Integrity", "お客さまの資産と生活に、最後まで責任を持つ。"],
              ["一貫", "Consistency", "企画・設計・施工・販売・運用までを自社で。"],
              ["継続", "Continuity", "売って終わりではない、住まいの伴走者として。"],
            ].map(([k, en, v]) => (
              <div key={k} style={{ borderTop: "1px solid var(--ink)", paddingTop: 16 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                  <span style={{ ...serif, fontSize: 30, fontWeight: 500 }}>{k}</span>
                  <Caption>{en}</Caption>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--ink-soft)", marginTop: 8 }}>{v}</p>
              </div>
            ))}
          </div>
        </PageFrame>
      ),
    },

    // 03 — 事業紹介 ①
    {
      left: (
        <PageFrame folio="04" header="Business / 事業案内">
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Caption>Seven Divisions</Caption>
            <h2 style={{ ...serif, fontSize: 44, fontWeight: 400, lineHeight: 1.1, margin: "16px 0 24px" }}>七つの事業</h2>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {DIV.slice(0, 4).map(([n, jp, en, d]) => (
                <div key={n} style={{ borderTop: "1px solid var(--rule)", padding: "16px 0", display: "grid", gridTemplateColumns: "44px 1fr", gap: 14, flex: 1 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-soft)" }}>{n}</span>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{ ...serif, fontSize: 21, fontWeight: 500 }}>{jp}</span>
                      <Caption>{en}</Caption>
                    </div>
                    <p style={{ fontSize: 12.5, lineHeight: 1.65, color: "var(--ink-soft)", marginTop: 5 }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageFrame>
      ),
      right: (
        <PageFrame folio="05" header="Business / 事業案内">
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {DIV.slice(4).map(([n, jp, en, d]) => (
                <div key={n} style={{ borderTop: "1px solid var(--rule)", padding: "16px 0", display: "grid", gridTemplateColumns: "44px 1fr", gap: 14, flex: 1 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-soft)" }}>{n}</span>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{ ...serif, fontSize: 21, fontWeight: 500 }}>{jp}</span>
                      <Caption>{en}</Caption>
                    </div>
                    <p style={{ fontSize: 12.5, lineHeight: 1.65, color: "var(--ink-soft)", marginTop: 5 }}>{d}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 18, marginTop: 4 }}>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--ink-soft)" }}>
                  住宅関連で培った顧客基盤とノウハウを軸に、領域を越えて事業を広げています。
                </p>
              </div>
            </div>
          </div>
        </PageFrame>
      ),
    },

    // 04 — 家づくりの工程 (construction process)
    {
      left: (
        <div style={{ position: "absolute", inset: 0 }}>
          <Photo src={A + "proc-framing.jpg"} label="建方" pos="center 30%" />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, padding: "24px 28px", background: "linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0))" }}>
            <Caption dark>In-house Construction / 自社施工</Caption>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "22px 28px", background: "linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0))" }}>
            <Caption dark>Fig. 02 — 木造軸組の建方・上棟</Caption>
          </div>
        </div>
      ),
      right: (
        <PageFrame folio="07" header="Process / 家づくりの工程">
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Caption>Step by Step</Caption>
            <h2 style={{ ...serif, fontSize: 38, fontWeight: 400, lineHeight: 1.2, margin: "14px 0 6px" }}>
              基礎から、<br />引き渡しまで。
            </h2>
            <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "var(--ink-soft)", margin: "0 0 18px" }}>
              一つの工程も外部に丸投げしない。自社の目で、確かな住まいを積み上げます。
            </p>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {[
                ["01", "基礎配筋", "Foundation", A + "proc-foundation.jpg", "地盤に応じた強固な鉄筋基礎を組み、検査を経て打設。"],
                ["02", "建方・上棟", "Framing", A + "proc-framing.jpg", "構造材を組み上げ、建物の骨格をかたちづくる。"],
                ["03", "内装工事", "Interior", A + "proc-interior.jpg", "断熱・下地から仕上げまで、住空間を整えていく。"],
                ["04", "竣工・引き渡し", "Completion", A + "house-front.jpg", "自社検査の上、住まいをお引き渡し。"],
              ].map(([n, jp, en, img, d]) => (
                <div key={n} style={{ borderTop: "1px solid var(--rule)", padding: "12px 0", display: "grid", gridTemplateColumns: "86px 1fr", gap: 16, alignItems: "center", flex: 1 }}>
                  <div style={{ position: "relative", width: 86, height: 60, overflow: "hidden", background: "var(--panel)" }}>
                    <img src={img} alt={jp} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)" }}>{n}</span>
                      <span style={{ ...serif, fontSize: 18, fontWeight: 500 }}>{jp}</span>
                      <Caption>{en}</Caption>
                    </div>
                    <p style={{ fontSize: 11.5, lineHeight: 1.55, color: "var(--ink-soft)", marginTop: 3 }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageFrame>
      ),
    },

    // 05 — 施工事例 表紙 (外観)
    {
      left: (
        <div style={{ position: "absolute", inset: 0 }}>
          <Photo src={A + "house-front.jpg"} label="外観正面" pos="center" />
        </div>
      ),
      right: (
        <PageFrame folio="08" header="Selected Work / 施工事例">
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            <div>
              <Caption>Case 142 — 2025 · Fig. 03</Caption>
              <h2 style={{ ...serif, fontSize: 40, fontWeight: 400, lineHeight: 1.2, margin: "16px 0 18px" }}>
                ミニマルな<br />ブラックの家
              </h2>
              <p style={{ fontSize: 13.5, lineHeight: 1.9, color: "var(--ink-soft)", maxWidth: 460 }}>
                深いチャコールの外壁とシャープな矩形のボリューム。周囲の街並みに静かに馴染みながら、確かな存在感を放つ自社施工の戸建住宅です。
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, borderTop: "1px solid var(--rule)", paddingTop: 18 }}>
              {[["構造", "木造 2階建"], ["延床", "108.5 m²"], ["竣工", "2025.11"], ["所在", "静岡県"]].map(([k, v]) => (
                <div key={k}>
                  <Caption>{k}</Caption>
                  <div style={{ ...serif, fontSize: 18, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </PageFrame>
      ),
    },

    // 05 — 施工事例 LDK
    {
      left: (
        <PageFrame folio="09" header="Interior / LDK" pad={0}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Photo src={A + "int-ldk.jpg"} label="LDK" pos="center" />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "18px 22px", background: "linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0))" }}>
              <Caption dark>Fig. 02 — 約16帖のLDK・対面キッチン</Caption>
            </div>
          </div>
        </PageFrame>
      ),
      right: (
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateRows: "1.4fr 1fr" }}>
          <div style={{ position: "relative" }}>
            <Photo src={A + "int-kitchen1.jpg"} label="キッチン" pos="center" />
          </div>
          <PageFrame folio="" header="">
            <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
              <h3 style={{ ...serif, fontSize: 26, fontWeight: 500, lineHeight: 1.3 }}>暮らしの中心に、<br />ひらかれた台所。</h3>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--ink-soft)", marginTop: 14 }}>
                家族の気配を感じながら料理ができる対面型キッチン。木目調の面材と白い天板が、明るく清潔感のある空間をつくります。
              </p>
            </div>
          </PageFrame>
        </div>
      ),
    },

    // 06 — 施工事例 居室・動線
    {
      left: (
        <PageFrame folio="10" header="Interior / 居室">
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
            <Caption>Rooms & Flow</Caption>
            <h3 style={{ ...serif, fontSize: 34, fontWeight: 400, lineHeight: 1.3, margin: "16px 0 18px" }}>
              光と風の<br />通りみち。
            </h3>
            <p style={{ fontSize: 13.5, lineHeight: 1.95, color: "var(--ink-soft)", maxWidth: 440 }}>
              大きな掃き出し窓から光がたっぷりと注ぐ居室。無垢調のフローリングと白い塗り壁が、シンプルで飽きのこない住空間を生み出します。動線にも配慮した、暮らしやすい間取りです。
            </p>
            <div style={{ marginTop: 26, display: "flex", gap: 28, borderTop: "1px solid var(--rule)", paddingTop: 18 }}>
              {[["居室", "4室"], ["収納", "各室完備"], ["採光", "南面"]].map(([k, v]) => (
                <div key={k}><Caption>{k}</Caption><div style={{ ...serif, fontSize: 18, marginTop: 4 }}>{v}</div></div>
              ))}
            </div>
          </div>
        </PageFrame>
      ),
      right: (
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <Photo src={A + "int-bedroom.jpg"} label="居室" pos="center" style={{ position: "relative" }} />
          <Photo src={A + "int-hall.jpg"} label="廊下" pos="center" style={{ position: "relative" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "16px 20px", background: "linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0))" }}>
            <Caption dark>Fig. 03 — 居室／廊下</Caption>
          </div>
        </div>
      ),
    },

    // 07 — 数字 + 会社概要
    {
      left: (
        <PageFrame folio="11" header="By the Numbers / 数字で見る" bg="var(--panel)">
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", gap: 30 }}>
            {[["07", "事業領域", "Divisions"], ["1,200+", "年間取扱件数", "Transactions / yr"], ["18", "創業からの年数", "Years since 2008"], ["04", "拠点", "Offices"]].map(([n, jp, en]) => (
              <div key={en} style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "baseline", borderBottom: "1px solid var(--rule)", paddingBottom: 14 }}>
                <div>
                  <div style={{ ...serif, fontSize: 16 }}>{jp}</div>
                  <Caption>{en}</Caption>
                </div>
                <div style={{ ...serif, fontSize: 52, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1 }}>{n}</div>
              </div>
            ))}
          </div>
        </PageFrame>
      ),
      right: (
        <PageFrame folio="12" header="Company / 会社概要">
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
            <h2 style={{ ...serif, fontSize: 30, fontWeight: 400, marginBottom: 22 }}>会社概要</h2>
            {[
              ["商号", "株式会社マーシャルアーツ"],
              ["設立", "2008年"],
              ["代表者", "代表取締役　長谷川 光"],
              ["事業内容", "不動産・建築・リフォーム・太陽光・保険・マリッジ 他"],
              ["本店", "東京都中央区日本橋人形町1-5-8"],
              ["拠点", "中野 / 練馬 / 愛知"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 16, padding: "13px 0", borderBottom: "1px solid var(--rule)" }}>
                <Caption>{k}</Caption>
                <span style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink)" }}>{v}</span>
              </div>
            ))}
          </div>
        </PageFrame>
      ),
    },

    // 08 — 拠点 + 裏表紙
    {
      left: (
        <PageFrame folio="13" header="Offices / 拠点">
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", gap: 20 }}>
            {[
              ["本店", "東京都中央区日本橋人形町1-5-8\nアトリウム日本橋人形町一丁目ビル4階", "03-6231-1113"],
              ["中野事務所", "東京都中野区江原町3-34-1 HBビル2F", "03-6908-2680"],
              ["練馬事務所", "東京都練馬区豊玉上2-27-16 第二新建ビル1F", "03-6914-6792"],
              ["愛知事務所", "愛知県名古屋市中区平和1-22-5 パルティール金山アネックス101", "052-253-8020"],
            ].map(([n, a, t]) => (
              <div key={n} style={{ borderTop: "1px solid var(--rule)", paddingTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ ...serif, fontSize: 18, fontWeight: 500 }}>{n}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-soft)" }}>{t}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", whiteSpace: "pre-line", lineHeight: 1.65, marginTop: 5 }}>{a}</div>
              </div>
            ))}
          </div>
        </PageFrame>
      ),
      right: (
        <div style={{ position: "absolute", inset: 0, background: "#1b1b1d", color: "var(--paper)", padding: 56, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Caption dark>Thank you</Caption>
          <div>
            <div style={{ width: 44, height: 3, background: "var(--accent)", marginBottom: 24 }} />
            <h2 style={{ ...serif, fontSize: 40, fontWeight: 400, lineHeight: 1.3 }}>
              住まいの、<br />その先まで。
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: "oklch(0.78 0.01 60)", marginTop: 18, maxWidth: 380 }}>
              ご相談・資料請求はお気軽に。私たちが、暮らしの伴走者になります。
            </p>
          </div>
          <div>
            <div style={{ ...serif, fontSize: 22, color: "oklch(0.85 0.01 60)" }}>株式会社マーシャルアーツ</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "oklch(0.62 0.01 60)", letterSpacing: "0.08em", marginTop: 8 }}>
              MARTIALARTS.CO.JP · TEL 03-6231-1113
            </div>
          </div>
        </div>
      ),
    },
  ];
}

// =========================================================
// BOOK — flip engine
// =========================================================
const PW = 720, PH = 940; // page dimensions
const BW = PW * 2, BH = PH;

function Book() {
  const SPREADS = useRef(buildSpreads()).current;
  const last = SPREADS.length - 1;

  const [spread, setSpread] = useState(() => {
    const s = parseInt(localStorage.getItem("ma-book-spread") || "0", 10);
    return Number.isFinite(s) && s >= 0 && s <= last ? s : 0;
  });
  const [flip, setFlip] = useState(null); // {dir, phase}
  const [scale, setScale] = useState(1);
  const [toc, setToc] = useState(false);
  const stageRef = useRef(null);

  useEffect(() => { localStorage.setItem("ma-book-spread", String(spread)); }, [spread]);

  // scaling
  useEffect(() => {
    const fit = () => {
      const el = stageRef.current; if (!el) return;
      const pad = 120;
      const s = Math.min((el.clientWidth - pad) / BW, (el.clientHeight - pad) / BH);
      setScale(Math.max(0.2, Math.min(s, 1.1)));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const go = useCallback((dir) => {
    if (dir > 0 && spread >= last) return;
    if (dir < 0 && spread <= 0) return;
    setFlip((f) => f ? f : { dir, phase: "start" });
  }, [spread, last]);

  // deterministic flip driver: start -> turn (next frame) -> commit (after transition)
  useEffect(() => {
    if (!flip) return;
    if (flip.phase === "start") {
      const t = setTimeout(() => {
        setFlip((f) => (f && f.phase === "start") ? { ...f, phase: "turn" } : f);
      }, 30);
      return () => clearTimeout(t);
    }
    if (flip.phase === "turn") {
      const t = setTimeout(() => {
        setSpread((s) => Math.max(0, Math.min(last, s + flip.dir)));
        setFlip(null);
      }, 840);
      return () => clearTimeout(t);
    }
  }, [flip, last]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "Escape") setToc(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const cur = SPREADS[spread];
  const fwd = flip && flip.dir > 0;
  const bwd = flip && flip.dir < 0;

  const baseLeft = bwd ? SPREADS[spread - 1].left : cur.left;
  const baseRight = fwd ? SPREADS[spread + 1].right : cur.right;

  const leafFront = fwd ? cur.right : (bwd ? cur.left : null);
  const leafBack = fwd ? SPREADS[spread + 1].left : (bwd ? SPREADS[spread - 1].right : null);

  const turning = flip && flip.phase === "turn";
  const leafDeg = fwd ? (turning ? -180 : 0) : (turning ? 180 : 0);

  const pageBox = { position: "absolute", top: 0, width: PW, height: PH, overflow: "hidden", background: "var(--paper)" };

  const TOC = [
    ["表紙", 0], ["ご挨拶", 1], ["企業理念", 2], ["事業案内", 3],
    ["家づくりの工程", 4], ["施工事例 — 外観", 5], ["施工事例 — LDK", 6], ["施工事例 — 居室", 7],
    ["数字・会社概要", 8], ["拠点・お問い合わせ", 9],
  ];

  return (
    <div ref={stageRef} style={{
      position: "fixed", inset: 0, background: "var(--stage)",
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      {/* ambient */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 0%, oklch(0.32 0.01 60) 0%, var(--stage) 60%)", pointerEvents: "none" }} />

      {/* BOOK */}
      <div style={{ width: BW, height: BH, transform: `scale(${scale})`, transformOrigin: "center center", position: "relative" }}>
        {/* drop shadow / base */}
        <div style={{ position: "absolute", inset: 0, boxShadow: "0 50px 100px -30px rgba(0,0,0,0.7)", background: "var(--paper)" }} />

        <div style={{ position: "absolute", inset: 0, perspective: 2600 }}>
          {/* base pages */}
          <div style={{ ...pageBox, left: 0 }}>{baseLeft}</div>
          <div style={{ ...pageBox, left: PW }}>{baseRight}</div>

          {/* center gutter shadow */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: PW - 30, width: 60, background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.14) 48%, rgba(0,0,0,0.14) 52%, rgba(0,0,0,0) 100%)", pointerEvents: "none", zIndex: 5 }} />

          {/* turning leaf */}
          {flip && (
            <div
              style={{
                position: "absolute", top: 0, width: PW, height: PH,
                left: fwd ? PW : 0,
                transformOrigin: fwd ? "left center" : "right center",
                transformStyle: "preserve-3d",
                transform: `rotateY(${leafDeg}deg)`,
                transition: "transform 0.8s cubic-bezier(.4,.05,.2,1)",
                zIndex: 10,
              }}
            >
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", backfaceVisibility: "hidden", background: "var(--paper)", boxShadow: "0 0 40px rgba(0,0,0,0.25)" }}>
                {leafFront}
                <div style={{ position: "absolute", inset: 0, background: fwd ? "linear-gradient(90deg, rgba(0,0,0,0.18), rgba(0,0,0,0) 40%)" : "linear-gradient(270deg, rgba(0,0,0,0.18), rgba(0,0,0,0) 40%)", opacity: turning ? 1 : 0, transition: "opacity .8s", pointerEvents: "none" }} />
              </div>
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", backfaceVisibility: "hidden", background: "var(--paper)", transform: "rotateY(180deg)" }}>
                {leafBack}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* click zones */}
      <button aria-label="前へ" onClick={() => go(-1)} disabled={spread <= 0 && !flip}
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "22%", border: "none", background: "transparent", cursor: spread > 0 ? "w-resize" : "default", zIndex: 20 }} />
      <button aria-label="次へ" onClick={() => go(1)} disabled={spread >= last && !flip}
        style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "22%", border: "none", background: "transparent", cursor: spread < last ? "e-resize" : "default", zIndex: 20 }} />

      {/* bottom control bar */}
      <div style={{
        position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)",
        display: "flex", alignItems: "center", gap: 18, zIndex: 30,
        padding: "10px 16px", background: "rgba(20,20,22,0.7)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2,
      }}>
        <CtrlBtn onClick={() => go(-1)} disabled={spread <= 0}>←</CtrlBtn>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "oklch(0.85 0.01 60)", letterSpacing: "0.1em", minWidth: 92, textAlign: "center" }}>
          {String(spread + 1).padStart(2, "0")} <span style={{ opacity: 0.5 }}>/ {String(SPREADS.length).padStart(2, "0")}</span>
        </div>
        <CtrlBtn onClick={() => go(1)} disabled={spread >= last}>→</CtrlBtn>
        <span style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)" }} />
        <CtrlBtn onClick={() => setToc(true)} wide>目次</CtrlBtn>
      </div>

      {/* progress */}
      <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: "var(--accent)", width: `${((spread) / last) * 100}%`, transition: "width .5s", zIndex: 30 }} />

      {/* hint */}
      <div style={{ position: "absolute", top: 22, right: 26, fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em", color: "oklch(0.6 0.01 60)", textTransform: "uppercase", zIndex: 30 }}>
        ← → / Click edges to turn
      </div>

      {/* TOC overlay */}
      {toc && (
        <div onClick={() => setToc(false)} style={{ position: "absolute", inset: 0, background: "rgba(15,15,17,0.86)", backdropFilter: "blur(8px)", zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(560px, 86vw)", color: "var(--paper)" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.62 0.01 60)", marginBottom: 18 }}>Contents / 目次</div>
            {TOC.map(([label, idx]) => (
              <button key={idx} onClick={() => { setSpread(idx); setFlip(null); setToc(false); }}
                style={{
                  display: "flex", width: "100%", justifyContent: "space-between", alignItems: "baseline",
                  background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)",
                  padding: "15px 2px", cursor: "pointer", color: idx === spread ? "var(--accent)" : "var(--paper)",
                  fontFamily: "var(--serif)", fontSize: 19, textAlign: "left",
                }}>
                <span>{label}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, opacity: 0.6 }}>{String(idx + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CtrlBtn({ children, onClick, disabled, wide }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: "none", border: "none", cursor: disabled ? "default" : "pointer",
      color: disabled ? "oklch(0.45 0.01 60)" : "oklch(0.92 0.01 60)",
      fontFamily: wide ? "var(--sans)" : "var(--mono)", fontSize: wide ? 13 : 16,
      padding: wide ? "2px 6px" : "2px 4px", letterSpacing: wide ? "0.06em" : 0,
      transition: "color .2s",
    }}>{children}</button>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Book />);
