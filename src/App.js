import { useState, useEffect, useRef } from "react";
import { PoseFigure } from "./PoseFigures";

const LANG_UI = {
  en: {
    eyebrow: "DAILY MORNING ROUTINE",
    title: "Rise & Release",
    subtitle: "Spine decompression · Hip release · Thoracic opening",
    startBtn: "Begin Morning Routine",
    nextBtn: "Next Pose →",
    prevBtn: "← Back",
    doneBtn: "✓ Complete Routine",
    restLabel: "Rest / Breathe",
    holdLabel: "Hold",
    seconds: "sec",
    eachSide: "Each side",
    tip: "Tip",
    whyItHelps: "Why this helps you",
    todayDone: "Morning routine complete!",
    todayDoneMsg: "Great work. Your spine is ready for the day.",
    resetBtn: "Reset",
    langBtn: "中文",
    progress: "Step",
    of: "of",
    breathe: "Breathe slowly and deeply throughout",
    flareNote: "🔥 Flare day? This routine is safe. Go slower and reduce hold times.",
  },
  zh: {
    eyebrow: "每日晨间例程",
    title: "晨醒释放",
    subtitle: "脊椎减压 · 髋部放松 · 胸椎开展",
    startBtn: "开始晨间例程",
    nextBtn: "下一个姿势 →",
    prevBtn: "← 返回",
    doneBtn: "✓ 完成例程",
    restLabel: "休息 / 呼吸",
    holdLabel: "保持",
    seconds: "秒",
    eachSide: "每侧",
    tip: "提示",
    whyItHelps: "为何对你有帮助",
    todayDone: "晨间例程完成！",
    todayDoneMsg: "很好。你的脊椎已为新的一天做好准备。",
    resetBtn: "重置",
    langBtn: "English",
    progress: "步骤",
    of: "/",
    breathe: "全程保持缓慢深呼吸",
    flareNote: "🔥 疼痛加重的日子？此例程仍然安全。放慢速度，减少保持时间。",
  },
};

const POSES = [
  {
    id: "p1",
    name: { en: "Cat-Cow", zh: "猫牛式" },
    duration: { en: "10 slow reps · 2 sets", zh: "缓慢10次 · 2组" },
    holdSec: null,
    reps: true,
    sides: false,
    instruction: {
      en: "Start on hands and knees. Inhale — gently drop your belly, lift your chest and tailbone (Cow). Exhale — round your spine toward the ceiling, tuck your chin and tailbone (Cat). Move slowly with every breath. Let the movement get bigger as you warm up.",
      zh: "四点跪姿开始。吸气 — 轻柔塌腹，抬起胸口和尾骨（牛式）。呼气 — 拱起脊椎向上，收下巴和尾骨（猫式）。配合每次呼吸缓慢移动。随着热身，动作幅度可逐渐增大。",
    },
    tip: {
      en: "Go as slowly as possible. This is not a stretch — it's a spine warm-up. The slower you move, the more fluid pumps back into your disc.",
      zh: "尽可能放慢速度。这不是拉伸，而是脊椎热身。动作越慢，椎间盘的水分补充越充分。",
    },
    why: {
      en: "Pumps fluid back into your disc after sleep. Reduces morning stiffness. Calms your nervous system before anything else.",
      zh: "睡眠后为椎间盘补充液体。减少晨间僵硬感。在其他动作之前平静神经系统。",
    },
    color: "#e07b4f",
    emoji: "🐄",
  },
  {
    id: "p2",
    name: { en: "Child's Pose", zh: "婴儿式" },
    duration: { en: "60–90 sec", zh: "60–90 秒" },
    holdSec: 75,
    reps: false,
    sides: false,
    instruction: {
      en: "From hands and knees, sit your hips back toward your heels. Arms extended forward, forehead on the mat. Let your lower back completely relax and lengthen. Breathe deeply into your back — feel your back expand with each inhale.",
      zh: "从四点跪姿开始，将臀部向后坐向脚跟。双臂向前伸展，额头贴地垫。让下背完全放松延伸。深呼吸至背部 — 每次吸气时感受背部扩张。",
    },
    tip: {
      en: "If your hips don't reach your heels, place a folded blanket between your thighs and calves. Never force the position.",
      zh: "若臀部无法碰到脚跟，可在大腿和小腿之间放一条折叠毯子。绝不要强迫姿势。",
    },
    why: {
      en: "Gently decompresses your lumbar spine with zero load. The flexion position gives your herniated disc space to settle. Stretches your iliopsoas passively.",
      zh: "在零负荷状态下轻柔减压腰椎。屈曲姿势为突出的椎间盘提供回缩空间。被动拉伸髂腰肌。",
    },
    color: "#5b9e8f",
    emoji: "🙇",
  },
  {
    id: "p3",
    name: { en: "Cow Face Pose (Upper Body)", zh: "牛面式（上半身）" },
    duration: { en: "45–60 sec · each side", zh: "每侧 45–60 秒" },
    holdSec: 50,
    reps: false,
    sides: true,
    instruction: {
      en: "Sit in a simple cross-legged position. Sit tall — if your lower back rounds, sit on a folded blanket. Reach one arm up overhead, then bend the elbow so your hand drops between your shoulder blades. Bring your other arm behind your back, bend that elbow, and reach up to clasp your fingers. Hold and breathe. Release slowly and switch arms.",
      zh: "以简单盘坐姿势坐下。坐直 — 若下背拱起，可坐在折叠毯上。一只手臂向上举过头顶，然后弯曲肘部，让手掌落至两侧肩胛骨之间。另一只手臂绕到背后，弯曲肘部，向上伸手扣住手指。保持并呼吸。缓慢松开，换侧进行。",
    },
    tip: {
      en: "Don't force the clasp — if your hands don't meet, hold a strap, towel, or edge of a t-shirt between them. Keep your chest lifted and shoulders down away from your ears. Breathe into the stretch rather than gripping.",
      zh: "不要强行合掌 — 若两手无法相触，可用伸展带、毛巾或T恤下摆连接两手。保持胸口上提，双肩下沉远离耳朵。将呼吸带入拉伸，不要紧绷。",
    },
    why: {
      en: "Opens the thoracic spine, shoulders, and chest — directly counteracting the forward-rounded posture that tightens your upper back. Complements the prone pectoral stretch and thoracic block release later in the routine.",
      zh: "打开胸椎、肩膀和胸部 — 直接对抗导致上背紧绷的前倾圆肩姿势。与例程后段的俯卧胸肌伸展和瑜伽砖胸椎放松相辅相成。",
    },
    color: "#5b9e8f",
    emoji: "🧘",
  },
  {
    id: "p4",
    name: { en: "Cobra Pose", zh: "眼镜蛇式" },
    duration: { en: "30–45 sec · 2 sets", zh: "30–45 秒 · 2组" },
    holdSec: 40,
    reps: false,
    sides: false,
    instruction: {
      en: "Lie face down, hands under your shoulders, elbows close to your body. Inhale — gently press through your hands and lift your chest off the floor. Keep your hips and pubic bone on the floor. Only go as high as is comfortable — even a small lift is enough. Hold and breathe. Lower slowly on exhale.",
      zh: "俯卧，双手置于肩膀下方，肘部靠近身体。吸气 — 轻柔地用双手撑地，将胸口抬离地面。保持髋部和耻骨贴地。只上升到舒适的高度 — 即使小幅抬起也足够。保持并呼吸。呼气时缓慢放下。",
    },
    tip: {
      en: "Do NOT push up with force. This is a gentle lift, not a push-up. Your elbows can stay bent. If you feel any nerve pain down the leg, lower immediately.",
      zh: "不要用力撑起。这是轻柔的上抬，不是俯卧撑。肘部可以保持弯曲。若感到腿部神经痛，立即放低。",
    },
    why: {
      en: "This is a McKenzie extension — the most evidence-based movement for posterior disc herniation. It pushes your disc material AWAY from the nerve. This is likely what gave you the most relief in yoga.",
      zh: "这是麦肯基伸展 — 针对后向椎间盘突出最有循证依据的动作。它将椎间盘物质推离神经。这可能是瑜伽中给你带来最大缓解的动作。",
    },
    color: "#c97b4f",
    emoji: "🐍",
  },
  {
    id: "p5",
    name: { en: "Anjaneyasana — Crescent Lunge", zh: "新月式弓步" },
    duration: { en: "45–60 sec · each side", zh: "每侧 45–60 秒" },
    holdSec: 50,
    reps: false,
    sides: true,
    instruction: {
      en: "Step your RIGHT foot forward, left knee on the floor (use a folded mat under the knee for comfort). Square your hips forward. Tuck your pelvis under — squeeze glutes gently. Raise both arms overhead, palms facing each other. Lift your chest and gently reach upward. Hold and breathe. Switch sides — LEFT foot forward is the more important side for you.",
      zh: "右脚向前迈出，左膝跪地（可在膝下垫折叠垫子）。髋部朝前摆正。骨盆向下收 — 轻柔夹紧臀部。双臂举过头顶，掌心相对。抬起胸口，轻柔向上延伸。保持并呼吸。换侧 — 左脚在前对你更重要。",
    },
    tip: {
      en: "The PELVIC TUCK is the most important cue. Before raising arms, squeeze glutes and tuck tailbone down. Without this, your lower back arches instead of the hip flexor stretching. LEFT side (left foot back, right foot forward) targets your tighter left iliopsoas.",
      zh: "骨盆内收是最重要的提示。举臂前，夹紧臀部并向下收尾骨。若不做此动作，下背会拱起而非髋屈肌拉伸。左侧（左脚在后，右脚在前）针对你更紧张的左侧髂腰肌。",
    },
    why: {
      en: "This single pose targets ALL your problems at once — stretches left iliopsoas, decompresses lumbar spine through upward traction, opens tight thoracic spine, squares your rotated pelvis, and activates deep core stabilisers. Your most important morning pose.",
      zh: "这个姿势同时针对你所有的问题 — 拉伸左侧髂腰肌、通过向上牵引减压腰椎、开展紧绷的胸椎、矫正旋转的骨盆，并激活深层核心稳定肌群。这是你最重要的晨间姿势。",
    },
    color: "#6b7fd4",
    emoji: "🌙",
  },
  {
    id: "p6",
    name: { en: "Kneeling Chest Stretch", zh: "跪姿胸部伸展" },
    duration: { en: "45–60 sec · each side", zh: "每侧 45–60 秒" },
    holdSec: 50,
    reps: false,
    sides: true,
    instruction: {
      en: "Start on hands and knees with knees hip-width apart and hips stacked over your knees. Slide one arm straight forward along the floor, palm down, and lower that shoulder and the side of your chest toward the mat — rest your forehead or temple lightly down. Keep the other arm bent, hand pressing into the floor beside your chest to support your weight. Hips stay over your knees. Breathe into the stretch through the extended arm's chest, shoulder, and lat. Switch sides.",
      zh: "从手膝跪姿开始，双膝与髋同宽，髋部正对膝盖上方。一只手臂沿地面向前伸直，掌心朝下，让该侧肩膀和胸侧向垫子下沉 — 额头或太阳穴轻轻贴地。另一只手臂保持弯曲，手掌按在胸部旁的地面上以支撑身体重量。髋部保持在膝盖正上方。呼吸，将拉伸感带入伸展手臂一侧的胸部、肩膀和背阔肌。换侧进行。",
    },
    tip: {
      en: "Hips must stay over the knees — if they drift back to your heels, the stretch leaves your chest. The bent support arm carries real weight; press the palm down actively so the extended-side shoulder can melt toward the floor instead of bracing.",
      zh: "髋部必须保持在膝盖正上方 — 若向后漂移至脚跟，拉伸会离开胸部。弯曲的支撑手臂承担真实的重量；主动将掌心下压，让伸展侧的肩膀能向地面融化，而不是紧绷支撑。",
    },
    why: {
      en: "The asymmetric position isolates one side of the chest, front shoulder, and lat at a time, allowing a deeper opening than a symmetric stretch. Directly counteracts the rounded upper-back posture that tightens your chest and restricts your thoracic spine.",
      zh: "不对称的姿势每次只针对一侧的胸部、肩前侧和背阔肌，比对称拉伸能带来更深的打开。直接对抗导致胸部紧绷和胸椎受限的上背圆肩姿势。",
    },
    color: "#9b6fd4",
    emoji: "🙏",
  },
  {
    id: "p7",
    name: { en: "Thoracic Block Release", zh: "瑜伽砖胸椎放松" },
    duration: { en: "3–5 min", zh: "3–5 分钟" },
    holdSec: 240,
    reps: false,
    sides: false,
    instruction: {
      en: "Place one yoga block (or firm pillow/rolled blanket) under your head. Place a second block (or rolled towel) horizontally under your thoracic spine — between your shoulder blades, NOT under your lower back. Lower yourself slowly. Let gravity gently open your thoracic spine over time. Arms can rest by your sides or on your belly. Breathe slowly and deeply. Stay for 3–5 minutes.",
      zh: "将一块瑜伽砖（或硬枕头/卷起的毯子）放在头下。将第二块砖横向放在胸椎下方 — 在两侧肩胛骨之间，不要放在下背。缓慢躺下。让重力随着时间轻柔地打开胸椎。双臂可置于身体两侧或腹部。缓慢深呼吸。保持3–5分钟。",
    },
    tip: {
      en: "No yoga blocks? Use a firm rolled towel or blanket instead. The key is it must be firm enough to create a gentle extension of your thoracic spine — too soft won't work. This is a passive hold — do absolutely nothing except breathe.",
      zh: "没有瑜伽砖？可用卷实的毛巾或毯子代替。关键是必须足够硬实，才能轻柔地伸展胸椎 — 太软则无效。这是被动保持 — 除了呼吸什么都不做。",
    },
    why: {
      en: "The hidden gem of your yoga class. Passively mobilises your restricted thoracic spine over time — the longer you stay, the more it opens. Since your upper right back is restricted, this slowly releases it without any effort. The gradual relief you felt in yoga was largely this.",
      zh: "你瑜伽课中的隐藏宝藏。随时间被动活动受限的胸椎 — 停留越久，开展越多。由于你的右侧上背受限，这个姿势无需用力便能缓慢释放它。你在瑜伽中感受到的逐渐缓解主要来自于此。",
    },
    color: "#4f9ec9",
    emoji: "🧱",
  },
];

export default function App() {
  const [lang, setLang] = useState("en");
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [expanded, setExpanded] = useState({});
  const timerRef = useRef(null);
  const ui = LANG_UI[lang];

  const pose = POSES[currentStep];

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timerActive && timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [timerActive, timeLeft]);

  const startTimer = () => {
    if (pose.holdSec) {
      setTimeLeft(pose.holdSec);
      setTimerActive(true);
    }
  };

  const goNext = () => {
    clearTimeout(timerRef.current);
    setTimerActive(false);
    setTimeLeft(null);
    if (currentStep < POSES.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setDone(true);
    }
  };

  const goPrev = () => {
    clearTimeout(timerRef.current);
    setTimerActive(false);
    setTimeLeft(null);
    setCurrentStep(s => Math.max(0, s - 1));
  };

  const reset = () => {
    setStarted(false);
    setDone(false);
    setCurrentStep(0);
    setTimeLeft(null);
    setTimerActive(false);
  };

  const pct = Math.round(((currentStep) / POSES.length) * 100);

  if (!started) {
    return (
      <div style={S.root}>
        <div style={S.bg} />
        <div style={S.introWrap}>
          <button onClick={() => setLang(l => l === "en" ? "zh" : "en")} style={S.langBtnTop}>{ui.langBtn}</button>
          <div style={S.sunIcon}>☀️</div>
          <div style={S.eyebrow}>{ui.eyebrow}</div>
          <h1 style={S.bigTitle}>{ui.title}</h1>
          <p style={S.introSub}>{ui.subtitle}</p>
          <div style={S.poseList}>
            {POSES.map((p, i) => (
              <div key={p.id} style={S.poseChip}>
                <span style={S.chipEmoji}>{p.emoji}</span>
                <span>{p.name[lang]}</span>
              </div>
            ))}
          </div>
          <div style={S.totalTime}>⏱ ~20–25 min total</div>
          <div style={S.flareNote}>{ui.flareNote}</div>
          <button onClick={() => setStarted(true)} style={S.startBtn}>{ui.startBtn}</button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div style={S.root}>
        <div style={S.bg} />
        <div style={S.doneWrap}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🌅</div>
          <div style={S.eyebrow}>{ui.eyebrow}</div>
          <h2 style={S.doneTitle}>{ui.todayDone}</h2>
          <p style={S.doneMsg}>{ui.todayDoneMsg}</p>
          <button onClick={reset} style={S.resetBtn}>{ui.resetBtn}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.root}>
      <div style={S.bg} />

      {/* Header */}
      <div style={S.header}>
        <div style={S.headerRow}>
          <div style={S.eyebrowSmall}>{ui.eyebrow}</div>
          <button onClick={() => setLang(l => l === "en" ? "zh" : "en")} style={S.langBtnSmall}>{ui.langBtn}</button>
        </div>
        {/* Progress bar */}
        <div style={S.progressBarWrap}>
          <div style={{ ...S.progressBarFill, width: `${pct}%`, background: pose.color }} />
        </div>
        <div style={S.stepLabel}>{ui.progress} {currentStep + 1} {ui.of} {POSES.length}</div>
      </div>

      {/* Pose card */}
      <div style={S.poseCard}>
        <div style={{ ...S.poseColorBar, background: pose.color }} />
        <div style={S.poseCardInner}>
          <div style={S.poseFigure}>
            <PoseFigure id={pose.id} color={pose.color} size={96} />
          </div>
          <div style={{ ...S.poseName, color: pose.color }}>{pose.name[lang]}</div>
          <div style={S.poseDuration}>{pose.duration[lang]}{pose.sides ? ` · ${ui.eachSide}` : ""}</div>

          {/* Timer */}
          {pose.holdSec && (
            <div style={S.timerBox}>
              {!timerActive && timeLeft === null && (
                <button onClick={startTimer} style={{ ...S.timerBtn, borderColor: pose.color, color: pose.color }}>
                  ▶ Start Timer
                </button>
              )}
              {(timerActive || timeLeft !== null) && (
                <div style={S.timerDisplay}>
                  <div style={{ ...S.timerCount, color: timeLeft === 0 ? "#5b9e8f" : pose.color }}>
                    {timeLeft === 0 ? "✓" : timeLeft}
                  </div>
                  <div style={S.timerSec}>{timeLeft === 0 ? "Done!" : ui.seconds}</div>
                </div>
              )}
            </div>
          )}

          {/* Instruction */}
          <div style={S.sectionLabel}>📋 {lang === "en" ? "How to do it" : "如何进行"}</div>
          <p style={S.instructionText}>{pose.instruction[lang]}</p>

          {/* Tip */}
          <div
            style={S.expandRow}
            onClick={() => setExpanded(e => ({ ...e, tip: !e.tip }))}
          >
            <span style={{ color: "#d4a84b" }}>💡 {ui.tip}</span>
            <span style={S.chevron}>{expanded.tip ? "▲" : "▼"}</span>
          </div>
          {expanded.tip && <p style={S.expandText}>{pose.tip[lang]}</p>}

          {/* Why */}
          <div
            style={S.expandRow}
            onClick={() => setExpanded(e => ({ ...e, why: !e.why }))}
          >
            <span style={{ color: pose.color }}>🔬 {ui.whyItHelps}</span>
            <span style={S.chevron}>{expanded.why ? "▲" : "▼"}</span>
          </div>
          {expanded.why && <p style={S.expandText}>{pose.why[lang]}</p>}
        </div>
      </div>

      {/* Breathe reminder */}
      <div style={S.breatheBar}>🌬 {ui.breathe}</div>

      {/* Navigation */}
      <div style={S.navRow}>
        {currentStep > 0 ? (
          <button onClick={goPrev} style={S.prevBtn}>{ui.prevBtn}</button>
        ) : <div />}
        <button
          onClick={goNext}
          style={{ ...S.nextBtn, background: pose.color }}
        >
          {currentStep === POSES.length - 1 ? ui.doneBtn : ui.nextBtn}
        </button>
      </div>

      {/* Dot nav */}
      <div style={S.dotRow}>
        {POSES.map((p, i) => (
          <div key={p.id} style={{
            ...S.dot,
            background: i === currentStep ? p.color : i < currentStep ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)",
            width: i === currentStep ? 20 : 8,
          }} />
        ))}
      </div>
    </div>
  );
}

const S = {
  root: { minHeight: "100vh", background: "#0a0d14", color: "#f0ede6", fontFamily: "'Georgia', 'Times New Roman', serif", position: "relative", overflowX: "hidden" },
  bg: { position: "fixed", inset: 0, background: "radial-gradient(ellipse at 30% 20%, rgba(224,123,79,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(91,158,143,0.07) 0%, transparent 60%)", pointerEvents: "none" },

  // Intro
  introWrap: { display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px 60px", minHeight: "100vh", position: "relative", zIndex: 1 },
  langBtnTop: { alignSelf: "flex-end", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", borderRadius: 8, padding: "5px 14px", fontSize: 12, cursor: "pointer", marginBottom: 24, fontFamily: "monospace" },
  sunIcon: { fontSize: 48, marginBottom: 16 },
  eyebrow: { fontSize: 9, letterSpacing: 4, color: "#e07b4f", fontWeight: 400, marginBottom: 10, fontFamily: "monospace", textTransform: "uppercase" },
  bigTitle: { fontSize: 42, fontWeight: 400, margin: "0 0 8px", letterSpacing: -1, textAlign: "center", fontStyle: "italic" },
  introSub: { fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: 0.5, textAlign: "center", marginBottom: 32, fontFamily: "monospace" },
  poseList: { display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 320, marginBottom: 20 },
  poseChip: { display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px", fontSize: 13 },
  chipEmoji: { fontSize: 18 },
  totalTime: { fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", marginBottom: 12 },
  flareNote: { fontSize: 11, color: "#d4a84b", background: "rgba(212,168,75,0.08)", border: "1px solid rgba(212,168,75,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 28, maxWidth: 320, lineHeight: 1.6, fontFamily: "monospace", textAlign: "center" },
  startBtn: { background: "#e07b4f", border: "none", color: "white", borderRadius: 14, padding: "16px 40px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "monospace", letterSpacing: 0.5 },

  // Header
  header: { padding: "16px 16px 8px", position: "sticky", top: 0, background: "rgba(10,13,20,0.95)", backdropFilter: "blur(10px)", zIndex: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  eyebrowSmall: { fontSize: 8, letterSpacing: 3, color: "#e07b4f", fontFamily: "monospace", textTransform: "uppercase" },
  langBtnSmall: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontFamily: "monospace" },
  progressBarWrap: { height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 6, overflow: "hidden" },
  progressBarFill: { height: "100%", borderRadius: 2, transition: "width 0.5s ease, background 0.5s ease" },
  stepLabel: { fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "monospace", textAlign: "right" },

  // Pose card
  poseCard: { margin: "16px", borderRadius: 16, overflow: "hidden", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 1 },
  poseColorBar: { height: 3 },
  poseCardInner: { padding: "20px 18px" },
  poseEmoji: { fontSize: 36, marginBottom: 8 },
  poseFigure: { marginBottom: 8, marginTop: -4, display: "flex", alignItems: "center" },
  poseName: { fontSize: 22, fontWeight: 400, fontStyle: "italic", marginBottom: 4, letterSpacing: -0.5 },
  poseDuration: { fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", marginBottom: 16, letterSpacing: 0.5 },

  // Timer
  timerBox: { marginBottom: 20 },
  timerBtn: { background: "transparent", border: "1.5px solid", borderRadius: 10, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "monospace" },
  timerDisplay: { display: "flex", alignItems: "baseline", gap: 6 },
  timerCount: { fontSize: 48, fontWeight: 300, fontFamily: "monospace", lineHeight: 1, transition: "color 0.3s" },
  timerSec: { fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" },

  // Content
  sectionLabel: { fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", textTransform: "uppercase", marginBottom: 8 },
  instructionText: { fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", margin: "0 0 16px", fontFamily: "sans-serif" },
  expandRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", fontSize: 12, fontFamily: "monospace" },
  chevron: { fontSize: 9, color: "rgba(255,255,255,0.3)" },
  expandText: { fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", margin: "4px 0 10px", fontFamily: "sans-serif" },

  // Bottom
  breatheBar: { margin: "0 16px", padding: "10px 14px", background: "rgba(91,158,143,0.08)", border: "1px solid rgba(91,158,143,0.15)", borderRadius: 10, fontSize: 11, color: "#5b9e8f", fontFamily: "monospace", textAlign: "center", position: "relative", zIndex: 1 },
  navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 16px 8px", position: "relative", zIndex: 1 },
  prevBtn: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", borderRadius: 10, padding: "12px 18px", fontSize: 12, cursor: "pointer", fontFamily: "monospace" },
  nextBtn: { border: "none", color: "white", borderRadius: 10, padding: "12px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "monospace", letterSpacing: 0.3, transition: "background 0.3s ease" },
  dotRow: { display: "flex", justifyContent: "center", gap: 6, padding: "8px 0 24px", position: "relative", zIndex: 1 },
  dot: { height: 8, borderRadius: 4, transition: "all 0.3s ease" },

  // Done
  doneWrap: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 24, textAlign: "center", position: "relative", zIndex: 1 },
  doneTitle: { fontSize: 28, fontWeight: 400, fontStyle: "italic", margin: "12px 0 8px", letterSpacing: -0.5 },
  doneMsg: { fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "monospace", marginBottom: 32 },
  resetBtn: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", borderRadius: 10, padding: "12px 28px", fontSize: 13, cursor: "pointer", fontFamily: "monospace" },
};
