import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STARS = Array.from({ length: 80 }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2 + 1,
  dur: Math.random() * 3 + 2,
  delay: Math.random() * 2,
}));

const LIGHTNING = Array.from({ length: 8 }, () => ({
  top: Math.random() * 80 + 5,
  left: Math.random() * 85 + 5,
  dur: Math.random() * 2 + 1.5,
  delay: Math.random() * 6,
}));

const CONFETTI = Array.from({ length: 100 }, () => ({
  left: Math.random() * 100,
  dur: Math.random() * 3 + 2,
  delay: Math.random() * 2,
  color: ['#ae0001','#f0c75e','#222f5b','#1a472a'][Math.floor(Math.random() * 4)],
  rotate: Math.random() * 360,
  scale: Math.random() * 0.8 + 0.4,
}));

const PATRONUS = Array.from({ length: 25 }, () => ({
  top: Math.random() * 80 + 10,
  dur: Math.random() * 4 + 3,
  delay: Math.random() * 2,
  scale: Math.random() * 0.8 + 0.5,
  animal: ['🦌','🐕','🐰','🐈','🦦'][Math.floor(Math.random() * 5)],
}));

const INCENDIO = Array.from({ length: 50 }, () => ({
  left: Math.random() * 100,
  dur: Math.random() * 1.2 + 0.8,
  delay: Math.random() * 2.5,
  scale: Math.random() * 0.9 + 0.4,
  color: ['#ff4500','#ff6500','#ff9500','#ffd700','#ff2200'][Math.floor(Math.random() * 5)],
}));

const ACCIO = Array.from({ length: 18 }, () => ({
  item: ['🎁','🎀','🎂','⭐','🌟','🎊','🎉','🏆','💫','🪄'][Math.floor(Math.random() * 10)],
  fromLeft: Math.random() < 0.5,
  y: Math.random() * 80 + 10,
  dur: Math.random() * 1.2 + 0.8,
  delay: Math.random() * 2,
  size: Math.random() * 16 + 28,
}));

const RIDDIKULUS = Array.from({ length: 24 }, () => ({
  emoji: ['🐍','🎈','🤡','🕷️','🎂','🦄','🌈','😂','🎭','🪄','🎪','🐸'][Math.floor(Math.random() * 12)],
  top: Math.random() * 75 + 5,
  left: Math.random() * 80 + 10,
  scale: Math.random() * 0.8 + 0.6,
  dur: Math.random() * 1.5 + 0.8,
  delay: Math.random() * 1.2,
}));

const HEARTS = Array.from({ length: 40 }, () => ({
  left: Math.random() * 100,
  dur: Math.random() * 5 + 4,
  delay: Math.random() * 3,
  scale: Math.random() * 0.6 + 0.8,
}));

const CANDLES = Array.from({ length: 15 }, () => ({
  left: Math.random() * 90 + 5,
  dur: Math.random() * 6 + 4,
  delay: Math.random() * 5,
  scale: Math.random() * 0.4 + 0.6,
}));

const HAT_LINES = [
  'Hmm... I sense great kindness... wonderful courage... a brilliant mind... and a heart full of love...',
  'There is no doubt — you belong in... EVERY HOUSE! 🏰',
  'Because you are simply EXTRAORDINARY! ⚡',
];

const LETTER = `⚡ Dear Rashi Hassani,

The Headmistress is pleased to inform you that today is your MOST magical day.

You have always possessed a rare and wonderful magic — the kind that lights up every room you enter and makes everyone around you feel special.

Thank you for your kindness, your laughter, your love, and all the beautiful memories we share.

May this birthday bring you happiness, adventure, new friendships, and endless magical surprises.

You deserve every wonderful thing the wizarding world has to offer.

Happy Birthday! 🎂✨

Yours most sincerely,
Dev Kumar ❤️

P.S. Mischief has been most thoroughly managed. 🗺️`;

// ── Background Stars ──────────────────────────────────────────
function BackgroundStars() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
      {STARS.map((s, i) => (
        <motion.div key={i}
          style={{ position:'absolute', top:`${s.top}%`, left:`${s.left}%`, width:s.size, height:s.size, borderRadius:'50%', background:'#f5c842' }}
          animate={{ opacity:[0.2,0.9,0.2], scale:[1,1.5,1] }}
          transition={{ duration:s.dur, delay:s.delay, repeat:Infinity }}
        />
      ))}
      {LIGHTNING.map((l, i) => (
        <motion.div key={'lt'+i}
          style={{ position:'absolute', top:`${l.top}%`, left:`${l.left}%`, fontSize:11, userSelect:'none' }}
          animate={{ opacity:[0,0.7,0], scale:[0.8,1.3,0.8] }}
          transition={{ duration:l.dur, delay:l.delay, repeat:Infinity, repeatDelay:4 }}
        >⚡</motion.div>
      ))}
    </div>
  );
}

// ── Mountains ─────────────────────────────────────────────────
function Mountains() {
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:1, pointerEvents:'none' }}>
      <svg viewBox="0 0 1200 200" style={{ width:'100%', display:'block' }} preserveAspectRatio="none">
        <polygon points="0,200 200,60 400,130 600,30 800,110 1000,50 1200,120 1200,200" fill="#1a0a2e" opacity="0.9"/>
        <polygon points="0,200 150,80 350,150 550,50 750,130 950,70 1150,140 1200,200" fill="#0f0620" opacity="0.7"/>
      </svg>
    </div>
  );
}

// ── Hedwig SVG ────────────────────────────────────────────────
function HedwigSvg({ size = 140 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" style={{ display:'block', width:size, height:size }}>
      <path d="M 30 50 C 30 20, 70 20, 70 50 C 70 80, 30 80, 30 50 Z" fill="#f4f4f5"/>
      <path d="M 35 55 C 35 35, 65 35, 65 55 C 65 75, 35 75, 35 55 Z" fill="#e4e4e7"/>
      <circle cx="42" cy="40" r="8" fill="#f59e0b"/>
      <circle cx="58" cy="40" r="8" fill="#f59e0b"/>
      <circle cx="42" cy="40" r="4" fill="#0a0a1a"/>
      <circle cx="58" cy="40" r="4" fill="#0a0a1a"/>
      <polygon points="48 48, 52 48, 50 56" fill="#3a2015"/>
      <motion.path d="M 30 50 Q 0 30 15 70 Z" fill="#d4d4d8"
        animate={{ rotate:[0,-10,0] }} transition={{ repeat:Infinity, duration:0.8 }}
        style={{ transformOrigin:'30px 50px' }}/>
      <motion.path d="M 70 50 Q 100 30 85 70 Z" fill="#d4d4d8"
        animate={{ rotate:[0,10,0] }} transition={{ repeat:Infinity, duration:0.8 }}
        style={{ transformOrigin:'70px 50px' }}/>
    </svg>
  );
}

// ── CSS Characters ────────────────────────────────────────────
function Dumbledore() {
  return (
    <div style={{ width:50, height:80, position:'relative', display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{ width:0, height:0, borderLeft:'15px solid transparent', borderRight:'15px solid transparent', borderBottom:'25px solid #222f5b', marginBottom:-2, zIndex:10 }}/>
      <div style={{ width:20, height:20, background:'#fcd5b5', borderRadius:'50%', zIndex:0 }}/>
      <div style={{ width:25, height:40, background:'white', borderBottomLeftRadius:'50%', borderBottomRightRadius:'50%', position:'absolute', top:35, zIndex:20, boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
      <div style={{ width:40, height:45, background:'#222f5b', borderTopLeftRadius:4, borderTopRightRadius:4, borderBottomLeftRadius:2, borderBottomRightRadius:2, position:'absolute', bottom:0, zIndex:10, display:'flex', justifyContent:'center' }}>
        <div style={{ width:2, height:'100%', background:'rgba(212,175,55,0.5)' }}/>
      </div>
      <div style={{ position:'absolute', right:-5, top:30, width:25, height:2, background:'#654321', transform:'rotate(-30deg)', zIndex:0 }}/>
      <span style={{ position:'absolute', top:0, right:-10, fontSize:10 }}>✨</span>
    </div>
  );
}

function Harry({ glassesGlint = false }: { glassesGlint?: boolean }) {
  return (
    <div style={{ width:50, height:70, position:'relative', display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{ width:30, height:15, background:'black', borderTopLeftRadius:'50%', borderTopRightRadius:'50%', position:'absolute', top:0, zIndex:20, clipPath:'polygon(0 0, 100% 0, 100% 100%, 80% 60%, 60% 100%, 40% 60%, 20% 100%, 0 60%)' }}/>
      <div style={{ position:'absolute', top:12, left:26, color:'#d4af37', fontSize:8, zIndex:30, fontWeight:'bold', transform:'rotate(12deg)' }}>⚡</div>
      <div style={{ width:24, height:24, background:'#fcd5b5', borderRadius:'50%', position:'absolute', top:10, zIndex:10, display:'flex', justifyContent:'center', alignItems:'center', gap:1 }}>
        <div style={{ width:8, height:8, border:'1.5px solid black', borderRadius:'50%', background: glassesGlint ? 'rgba(255,255,255,0.6)' : 'transparent', boxShadow: glassesGlint ? '0 0 5px white' : 'none' }}/>
        <div style={{ width:8, height:8, border:'1.5px solid black', borderRadius:'50%', background: glassesGlint ? 'rgba(255,255,255,0.6)' : 'transparent', boxShadow: glassesGlint ? '0 0 5px white' : 'none' }}/>
        <div style={{ width:3, height:1.5, background:'black', position:'absolute', top:11 }}/>
      </div>
      <div style={{ width:35, height:40, background:'#1a1a1a', borderTopLeftRadius:4, borderTopRightRadius:4, position:'absolute', bottom:0, zIndex:10, display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:8, height:10, background:'#ae0001', borderBottom:'2px solid #f0c75e' }}/>
        <div style={{ width:2, height:'100%', background:'rgba(0,0,0,0.2)' }}/>
      </div>
    </div>
  );
}

function Hermione({ wandActive = false }: { wandActive?: boolean }) {
  return (
    <div style={{ width:50, height:70, position:'relative', display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{ width:36, height:36, background:'#4a2e15', borderRadius:'50%', position:'absolute', top:-2, zIndex:0 }}/>
      <div style={{ width:44, height:20, background:'#4a2e15', borderRadius:'50%', position:'absolute', top:15, zIndex:0 }}/>
      <div style={{ width:22, height:22, background:'#fcd5b5', borderRadius:'50%', position:'absolute', top:10, zIndex:10 }}/>
      <div style={{ width:32, height:40, background:'#1a1a1a', borderTopLeftRadius:4, borderTopRightRadius:4, position:'absolute', bottom:0, zIndex:10, display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:6, height:8, background:'#ae0001' }}/>
      </div>
      {wandActive && <>
        <div style={{ position:'absolute', left:5, bottom:10, width:25, height:2, background:'#654321', transform:'rotate(-10deg)', zIndex:20 }}/>
        <div style={{ position:'absolute', left:-15, bottom:20, width:40, height:2, background:'#f5c842', transform:'rotate(-45deg)', zIndex:10, boxShadow:'0 0 10px #f5c842' }}/>
      </>}
    </div>
  );
}

function Ron({ embarrassed = false }: { embarrassed?: boolean }) {
  return (
    <div style={{ width:50, height:75, position:'relative', display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{ width:28, height:16, background:'#d95e16', borderTopLeftRadius:14, borderTopRightRadius:14, position:'absolute', top:0, zIndex:20 }}/>
      <div style={{ width:24, height:26, background:'#fcd5b5', borderRadius:'50%', position:'absolute', top:10, zIndex:10 }}>
        {embarrassed && <>
          <div style={{ position:'absolute', top:16, left:2, width:6, height:4, background:'rgba(248,113,113,0.5)', borderRadius:'50%', filter:'blur(1px)' }}/>
          <div style={{ position:'absolute', top:16, right:2, width:6, height:4, background:'rgba(248,113,113,0.5)', borderRadius:'50%', filter:'blur(1px)' }}/>
        </>}
      </div>
      <div style={{ width:36, height:42, background:'#1a1a1a', borderTopLeftRadius:4, borderTopRightRadius:4, position:'absolute', bottom:0, zIndex:10, display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:8, height:10, background:'#ae0001', borderBottom:'2px solid #f0c75e' }}/>
      </div>
    </div>
  );
}

function Dobby() {
  return (
    <div style={{ width:50, height:60, position:'relative', display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{ position:'absolute', top:10, left:-5, width:25, height:12, background:'#e6c1a8', borderRadius:'50%', transform:'rotate(-20deg)', transformOrigin:'right', zIndex:0 }}/>
      <div style={{ position:'absolute', top:10, right:-5, width:25, height:12, background:'#e6c1a8', borderRadius:'50%', transform:'rotate(20deg)', transformOrigin:'left', zIndex:0 }}/>
      <div style={{ width:26, height:28, background:'#e6c1a8', borderRadius:'50%', position:'absolute', top:5, zIndex:10, display:'flex', justifyContent:'center', paddingTop:8, gap:1 }}>
        <div style={{ width:8, height:8, background:'#759e5e', borderRadius:'50%', border:'1px solid black', display:'flex', justifyContent:'center', alignItems:'center' }}>
          <div style={{ width:3, height:3, background:'black', borderRadius:'50%' }}/>
        </div>
        <div style={{ width:8, height:8, background:'#759e5e', borderRadius:'50%', border:'1px solid black', display:'flex', justifyContent:'center', alignItems:'center' }}>
          <div style={{ width:3, height:3, background:'black', borderRadius:'50%' }}/>
        </div>
      </div>
      <div style={{ width:28, height:30, background:'#d5cbb8', borderRadius:2, position:'absolute', bottom:0, zIndex:10, clipPath:'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)' }}/>
    </div>
  );
}

// ── CharacterWrapper ───────────────────────────────────────────
function CharWrapper({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.8 }}
      animate={{ opacity:1, scale:1, y:[0,-5,0] }}
      transition={{ opacity:{ delay, duration:0.3 }, scale:{ delay, duration:0.3 }, y:{ repeat:Infinity, duration:2.5, ease:'easeInOut', delay } }}
      style={{ position:'relative', display:'flex', flexDirection:'column', alignItems:'center', pointerEvents:'none' }}
    >
      {children}
    </motion.div>
  );
}

// ── Spell overlay effects ──────────────────────────────────────
function PatronusEffect() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:30, overflow:'hidden' }}>
      {PATRONUS.map((p, i) => (
        <motion.div key={i}
          style={{ position:'absolute', top:`${p.top}%`, fontSize: 28 * p.scale, userSelect:'none' }}
          initial={{ x: '-10vw', opacity:0 }}
          animate={{ x:'110vw', opacity:[0,1,1,0] }}
          transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, repeatDelay:1 }}
        >{p.animal}</motion.div>
      ))}
    </div>
  );
}

function IncendioEffect() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:30, overflow:'hidden' }}>
      {INCENDIO.map((f, i) => (
        <motion.div key={i}
          style={{ position:'absolute', left:`${f.left}%`, bottom:0, fontSize: 20 * f.scale, userSelect:'none', color:f.color }}
          initial={{ y:0, opacity:1 }}
          animate={{ y: '-80vh', opacity:[1,1,0] }}
          transition={{ duration:f.dur, delay:f.delay, repeat:Infinity, repeatDelay:0.5 }}
        >🔥</motion.div>
      ))}
    </div>
  );
}

function AccioEffect() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:30, overflow:'hidden' }}>
      {ACCIO.map((a, i) => (
        <motion.div key={i}
          style={{ position:'absolute', top:`${a.y}%`, fontSize:a.size, userSelect:'none' }}
          initial={{ x: a.fromLeft ? '-15vw' : '115vw' }}
          animate={{ x: '50vw' }}
          transition={{ duration:a.dur, delay:a.delay, repeat:Infinity, repeatDelay:1.5 }}
        >{a.item}</motion.div>
      ))}
    </div>
  );
}

function RiddikulusEffect() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:30, overflow:'hidden' }}>
      {RIDDIKULUS.map((r, i) => (
        <motion.div key={i}
          style={{ position:'absolute', top:`${r.top}%`, left:`${r.left}%`, fontSize: 28 * r.scale, userSelect:'none' }}
          initial={{ scale:0, rotate:0, opacity:0 }}
          animate={{ scale:[0,r.scale*1.3,r.scale], rotate:[0,180,360], opacity:[0,1,1] }}
          transition={{ duration:r.dur, delay:r.delay, repeat:Infinity, repeatDelay:2 }}
        >{r.emoji}</motion.div>
      ))}
    </div>
  );
}

function ConfettiEffect() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:30, overflow:'hidden' }}>
      {CONFETTI.map((c, i) => (
        <motion.div key={i}
          style={{ position:'absolute', left:`${c.left}%`, top:-20, width:8, height:8, background:c.color, borderRadius:2, rotate:c.rotate }}
          animate={{ y:'110vh', rotate: c.rotate + 360 }}
          transition={{ duration:c.dur, delay:c.delay, repeat:Infinity, ease:'linear' }}
        />
      ))}
    </div>
  );
}

function HeartsEffect() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:30, overflow:'hidden' }}>
      {HEARTS.map((h, i) => (
        <motion.div key={i}
          style={{ position:'absolute', left:`${h.left}%`, bottom:0, fontSize: 18 * h.scale, userSelect:'none' }}
          initial={{ y:0, opacity:1 }}
          animate={{ y:'-110vh', opacity:[1,1,0] }}
          transition={{ duration:h.dur, delay:h.delay, repeat:Infinity, repeatDelay:0.5 }}
        >❤️</motion.div>
      ))}
    </div>
  );
}

function LumosEffect() {
  return (
    <motion.div
      style={{ position:'absolute', inset:0, background:'rgba(255,255,220,0.15)', zIndex:25, pointerEvents:'none' }}
      initial={{ opacity:0 }}
      animate={{ opacity:[0,1,0.7,1,0] }}
      transition={{ duration:2, times:[0,0.1,0.5,0.9,1] }}
    >
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, rgba(255,255,200,0.4) 0%, transparent 70%)' }}/>
    </motion.div>
  );
}

function CandleEffect() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:28, overflow:'hidden' }}>
      {CANDLES.map((c, i) => (
        <motion.div key={i}
          style={{ position:'absolute', left:`${c.left}%`, bottom:0, fontSize: 20 * c.scale, userSelect:'none' }}
          animate={{ y:[0, '-5px', 0], scale:[1,c.scale*1.1,1] }}
          transition={{ duration:c.dur, delay:c.delay, repeat:Infinity }}
        >🕯️</motion.div>
      ))}
    </div>
  );
}

// ── Step indicator ─────────────────────────────────────────────
function StepDots({ step }: { step: number }) {
  if (step > 5) return null;
  return (
    <div style={{ position:'absolute', bottom:24, left:0, width:'100%', display:'flex', justifyContent:'center', gap:12, zIndex:50, pointerEvents:'none' }}>
      {[0,1,2,3,4,5].map(i => (
        <div key={i} style={{ width:10, height:10, borderRadius:'50%', background: step >= i ? '#f5c842' : 'rgba(255,255,255,0.2)', boxShadow: step >= i ? '0 0 8px #f5c842' : 'none', transform: step >= i ? 'scale(1.25)' : 'scale(1)', transition:'all 0.4s' }}/>
      ))}
    </div>
  );
}

// ── House badges ───────────────────────────────────────────────
function HouseBadge({ letter, c1, c2, delay }: { letter:string; c1:string; c2:string; delay:number }) {
  return (
    <motion.div
      initial={{ opacity:0, scale:0, rotate:-180 }}
      animate={{ opacity:1, scale:1, rotate:0 }}
      transition={{ type:'spring', delay, duration:1 }}
      style={{ width:56, height:64, position:'relative', overflow:'hidden', border:'2px solid #d4af37', borderRadius:'0 0 50% 50%', boxShadow:'0 0 15px rgba(212,175,55,0.4)', display:'flex', alignItems:'center', justifyContent:'center', background:`linear-gradient(135deg, ${c1} 50%, ${c2} 50%)`, margin:4 }}
    >
      <div style={{ position:'absolute', inset:0, margin:'auto', width:24, height:24, background:'rgba(255,255,255,0.9)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span style={{ fontSize:10, fontWeight:'bold', color:'#1a0a2e' }}>{letter}</span>
      </div>
    </motion.div>
  );
}

// ── Spell Button ───────────────────────────────────────────────
const SPELL_COLORS: Record<string, string> = {
  gold: 'linear-gradient(135deg,#d4af37,#f5c842)',
  teal: 'linear-gradient(135deg,#1a472a,#2a6b40)',
  purple: 'linear-gradient(135deg,#4c1d95,#7c3aed)',
  amber: 'linear-gradient(135deg,#92400e,#d97706)',
  red: 'linear-gradient(135deg,#7b1c30,#ae0001)',
  silver: 'linear-gradient(135deg,#a0aab2,#e2e8f0)',
};
const SPELL_TEXT: Record<string, string> = {
  gold: '#0a0a1a', teal:'#f5e6c8', purple:'#f5e6c8', amber:'white', red:'#f5e6c8', silver:'#1a0a2e',
};

function SpellBtn({ onClick, children, color = 'gold' }: { onClick:()=>void; children:React.ReactNode; color?:string }) {
  return (
    <motion.button whileTap={{ scale:0.92 }} onClick={onClick}
      style={{ width:'100%', minHeight:56, borderRadius:16, fontFamily:'Cinzel,serif', fontWeight:'bold', fontSize:12, textTransform:'uppercase', letterSpacing:'0.05em', display:'flex', alignItems:'center', justifyContent:'center', gap:4, padding:'0 8px', border:'none', cursor:'pointer', background:SPELL_COLORS[color], color:SPELL_TEXT[color], boxShadow:`0 0 14px ${color==='gold'?'rgba(245,200,66,0.55)':color==='teal'?'rgba(42,107,64,0.55)':color==='purple'?'rgba(124,58,237,0.55)':color==='amber'?'rgba(217,119,6,0.55)':'rgba(174,0,1,0.55)'}` }}
    >
      {children}
    </motion.button>
  );
}

function BigBtn({ onClick, children, color = 'gold' }: { onClick:()=>void; children:React.ReactNode; color?:string }) {
  return (
    <motion.button whileTap={{ scale:0.95 }} onClick={onClick}
      style={{ width:'90%', maxWidth:360, minHeight:64, borderRadius:999, fontFamily:'Cinzel,serif', fontWeight:'bold', fontSize:16, textTransform:'uppercase', letterSpacing:'0.1em', display:'flex', alignItems:'center', justifyContent:'center', gap:12, border:'none', cursor:'pointer', background:SPELL_COLORS[color] ?? SPELL_COLORS.gold, color:SPELL_TEXT[color] ?? '#0a0a1a', boxShadow:`0 0 20px rgba(245,200,66,0.6)` }}
    >
      {children}
    </motion.button>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────
type Spell = 'patronus' | 'incendio' | 'accio' | 'riddikulus' | 'lumos' | 'confetti' | 'hearts' | null;

export default function App() {
  const [step, setStep] = useState(0);
  const [spell, setSpell] = useState<Spell>(null);
  const [hatLine, setHatLine] = useState(0);
  const [hatDone, setHatDone] = useState(false);
  const [lumosOn, setLumosOn] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const spellTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function castSpell(s: Spell, dur = 3500) {
    if (spellTimer.current) clearTimeout(spellTimer.current);
    setSpell(s);
    spellTimer.current = setTimeout(() => setSpell(null), dur);
  }

  // Hat typing effect
  useEffect(() => {
    if (step !== 2) { setHatLine(0); setHatDone(false); return; }
    let i = 0;
    const tick = () => {
      if (i < HAT_LINES.length - 1) { i++; setHatLine(i); setTimeout(tick, 2000); }
      else setHatDone(true);
    };
    const t = setTimeout(tick, 2000);
    return () => clearTimeout(t);
  }, [step]);

  // Auto-cast lumos flash
  function handleLumos() {
    setLumosOn(true);
    setTimeout(() => setLumosOn(false), 2000);
    castSpell('lumos', 2000);
  }

  const pageStyle: React.CSSProperties = {
    position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
    background:'linear-gradient(180deg,#0a0a1a 0%,#0f0620 60%,#1a0a2e 100%)',
    overflow:'hidden', userSelect:'none',
  };

  return (
    <div style={{ position:'fixed', inset:0 }}>
      <BackgroundStars/>

      {/* Spell overlays */}
      {spell === 'patronus' && <PatronusEffect/>}
      {spell === 'incendio' && <IncendioEffect/>}
      {spell === 'accio' && <AccioEffect/>}
      {spell === 'riddikulus' && <RiddikulusEffect/>}
      {spell === 'confetti' && <ConfettiEffect/>}
      {spell === 'hearts' && <HeartsEffect/>}
      {lumosOn && <LumosEffect/>}

      <AnimatePresence mode="wait">

        {/* ══ STEP 0: Owl Post intro ══ */}
        {step === 0 && (
          <motion.div key="s0" style={pageStyle}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0, scale:0.95 }}
            transition={{ duration:0.6 }}
          >
            <Mountains/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
              <motion.div
                initial={{ y:-30, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.3, duration:0.8 }}
                style={{ display:'flex', alignItems:'center', gap:12 }}
              >
                <span style={{ fontSize:36 }}>🦉</span>
                <h1 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(28px,6vw,52px)', fontWeight:700, color:'#d4af37', letterSpacing:'0.08em', textShadow:'0 0 30px rgba(212,175,55,0.5)' }}>Owl Post</h1>
              </motion.div>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
                style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(14px,3.5vw,22px)', color:'#f5e6c8', fontStyle:'italic', textAlign:'center' }}
              >You've received a letter, dear Rashi Hassani</motion.p>

              <motion.div
                animate={{ y:[0,-12,0] }}
                transition={{ repeat:Infinity, duration:2, ease:'easeInOut' }}
                style={{ marginTop:16 }}
              >
                <HedwigSvg size={140}/>
              </motion.div>

              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2 }}
                style={{ marginTop:8 }}
              >
                <BigBtn onClick={() => setStep(1)} color="gold">
                  <span>🪄</span> Open Your Letter
                </BigBtn>
              </motion.div>
            </div>
            <StepDots step={0}/>
          </motion.div>
        )}

        {/* ══ STEP 1: Characters welcome ══ */}
        {step === 1 && (
          <motion.div key="s1" style={pageStyle}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.5 }}
          >
            <Mountains/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:20, padding:'0 16px', maxWidth:480, width:'100%' }}>
              <motion.h2 initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.2 }}
                style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(18px,5vw,30px)', color:'#f5c842', textAlign:'center', textShadow:'0 0 20px rgba(245,200,66,0.5)' }}
              >🎂 Happy Birthday! 🎂</motion.h2>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
                style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(13px,3vw,18px)', color:'#f5e6c8', textAlign:'center', lineHeight:1.6 }}
              >Your friends from Hogwarts have gathered to celebrate your special day!</motion.p>

              <div style={{ display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap', marginTop:8 }}>
                <CharWrapper delay={0.3}><Dumbledore/><span style={{ fontSize:9, color:'#d4af37', marginTop:6, fontFamily:'Cinzel,serif' }}>Dumbledore</span></CharWrapper>
                <CharWrapper delay={0.5}><Harry/><span style={{ fontSize:9, color:'#d4af37', marginTop:6, fontFamily:'Cinzel,serif' }}>Harry</span></CharWrapper>
                <CharWrapper delay={0.7}><Hermione/><span style={{ fontSize:9, color:'#d4af37', marginTop:6, fontFamily:'Cinzel,serif' }}>Hermione</span></CharWrapper>
                <CharWrapper delay={0.9}><Ron/><span style={{ fontSize:9, color:'#d4af37', marginTop:6, fontFamily:'Cinzel,serif' }}>Ron</span></CharWrapper>
                <CharWrapper delay={1.1}><Dobby/><span style={{ fontSize:9, color:'#d4af37', marginTop:6, fontFamily:'Cinzel,serif' }}>Dobby</span></CharWrapper>
              </div>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
                style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:12, padding:'12px 16px', textAlign:'center' }}
              >
                <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', color:'#f5e6c8', fontSize:'clamp(13px,2.5vw,16px)' }}>
                  "Dobby is so happy to celebrate with you! You have always been so kind! 🧦"
                </p>
              </motion.div>

              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.7 }}>
                <BigBtn onClick={() => setStep(2)} color="gold">
                  <span>🎩</span> The Sorting Hat Awaits
                </BigBtn>
              </motion.div>
            </div>
            <StepDots step={1}/>
          </motion.div>
        )}

        {/* ══ STEP 2: Sorting Hat ══ */}
        {step === 2 && (
          <motion.div key="s2" style={pageStyle}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.5 }}
          >
            <Mountains/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:20, padding:'0 20px', maxWidth:500, width:'100%' }}>
              <motion.div animate={{ rotate:[-3,3,-3] }} transition={{ repeat:Infinity, duration:2 }} style={{ fontSize:80 }}>🎩</motion.div>
              <motion.h2 initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
                style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(20px,5vw,32px)', color:'#f5c842', textAlign:'center' }}
              >The Sorting Hat Speaks...</motion.h2>

              <div style={{ minHeight:120, display:'flex', flexDirection:'column', gap:12, alignItems:'center' }}>
                {HAT_LINES.slice(0, hatLine + 1).map((line, i) => (
                  <motion.div key={i}
                    initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
                    style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:12, padding:'10px 16px', textAlign:'center', maxWidth:400 }}
                  >
                    <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', color:'#f5e6c8', fontSize:'clamp(13px,2.5vw,17px)', lineHeight:1.6 }}>{line}</p>
                  </motion.div>
                ))}
              </div>

              {hatDone && (
                <>
                  <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap' }}>
                    <HouseBadge letter="G" c1="#ae0001" c2="#f0c75e" delay={0}/>
                    <HouseBadge letter="H" c1="#222f5b" c2="#c0c0c0" delay={0.2}/>
                    <HouseBadge letter="R" c1="#1a472a" c2="#c0c0c0" delay={0.4}/>
                    <HouseBadge letter="S" c1="#1a1a1a" c2="#1a6b40" delay={0.6}/>
                  </div>
                  <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}>
                    <BigBtn onClick={() => setStep(3)} color="gold">
                      <span>✨</span> Cast Some Spells!
                    </BigBtn>
                  </motion.div>
                </>
              )}
            </div>
            <StepDots step={2}/>
          </motion.div>
        )}

        {/* ══ STEP 3: Spell Book ══ */}
        {step === 3 && (
          <motion.div key="s3" style={pageStyle}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.5 }}
          >
            <Mountains/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:16, padding:'0 16px', maxWidth:500, width:'100%' }}>
              <motion.h2 initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }}
                style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(18px,5vw,28px)', color:'#f5c842', textAlign:'center' }}
              >🪄 Spell Book</motion.h2>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
                style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(12px,2.5vw,16px)', color:'#f5e6c8', textAlign:'center' }}
              >Cast spells to celebrate! Tap each one to see the magic.</motion.p>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, width:'100%', maxWidth:400 }}>
                <SpellBtn onClick={() => castSpell('patronus', 5000)} color="silver">
                  <span>🦌</span> Expecto Patronum
                </SpellBtn>
                <SpellBtn onClick={() => castSpell('incendio', 4000)} color="amber">
                  <span>🔥</span> Incendio
                </SpellBtn>
                <SpellBtn onClick={() => castSpell('accio', 4000)} color="teal">
                  <span>🎁</span> Accio Gifts
                </SpellBtn>
                <SpellBtn onClick={() => castSpell('riddikulus', 4000)} color="purple">
                  <span>🤡</span> Riddikulus
                </SpellBtn>
                <SpellBtn onClick={handleLumos} color="gold">
                  <span>💡</span> Lumos
                </SpellBtn>
                <SpellBtn onClick={() => castSpell('confetti', 4000)} color="red">
                  <span>🎊</span> Wingardium Confetti
                </SpellBtn>
              </div>

              {/* Character row that reacts */}
              <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginTop:4 }}>
                <CharWrapper delay={0}><Harry glassesGlint={spell==='lumos'}/></CharWrapper>
                <CharWrapper delay={0.2}><Hermione wandActive={spell !== null}/></CharWrapper>
                <CharWrapper delay={0.4}><Ron embarrassed={spell==='riddikulus'}/></CharWrapper>
              </div>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}>
                <BigBtn onClick={() => setStep(4)} color="gold">
                  <span>📜</span> Read Your Letter
                </BigBtn>
              </motion.div>
            </div>
            <StepDots step={3}/>
          </motion.div>
        )}

        {/* ══ STEP 4: Birthday Letter ══ */}
        {step === 4 && (
          <motion.div key="s4" style={pageStyle}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.5 }}
          >
            <CandleEffect/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:16, padding:'16px', maxWidth:540, width:'100%', height:'100%', overflow:'hidden' }}>
              <motion.div initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }}
                style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}
              >
                <span style={{ fontSize:24 }}>📜</span>
                <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(16px,4vw,24px)', color:'#d4af37', letterSpacing:'0.05em' }}>Your Birthday Letter</h2>
                <span style={{ fontSize:24 }}>📜</span>
              </motion.div>

              <motion.div
                initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3 }}
                ref={letterRef}
                style={{ flex:1, overflow:'auto', width:'100%', maxHeight:'calc(100vh - 180px)', background:'rgba(253,246,227,0.06)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:16, padding:'20px 20px', backdropFilter:'blur(4px)' }}
              >
                <pre style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(13px,2.5vw,17px)', color:'#f5e6c8', lineHeight:1.8, whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{LETTER}</pre>
              </motion.div>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }} style={{ flexShrink:0 }}>
                <BigBtn onClick={() => setStep(5)} color="gold">
                  <span>🎉</span> Celebrate!
                </BigBtn>
              </motion.div>
            </div>
            <StepDots step={4}/>
          </motion.div>
        )}

        {/* ══ STEP 5: Grand Finale ══ */}
        {step === 5 && (
          <motion.div key="s5" style={pageStyle}
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:0.5 }}
          >
            <ConfettiEffect/>
            <HeartsEffect/>
            <Mountains/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:20, padding:'0 20px', maxWidth:500, width:'100%' }}>
              <motion.div
                initial={{ scale:0 }} animate={{ scale:[0,1.2,1] }}
                transition={{ duration:0.8, times:[0,0.6,1] }}
                style={{ fontSize:'clamp(50px,15vw,100px)', textAlign:'center' }}
              >🎂</motion.div>

              <motion.h1 initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.5 }}
                style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(22px,6vw,44px)', fontWeight:700, color:'#f5c842', textAlign:'center', textShadow:'0 0 30px rgba(245,200,66,0.8)', lineHeight:1.2 }}
              >Happy Birthday<br/>Rashi! ⚡</motion.h1>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
                style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(14px,3.5vw,22px)', color:'#f5e6c8', textAlign:'center', fontStyle:'italic', lineHeight:1.6 }}
              >May your day be as magical as you are! 🪄✨🌟</motion.p>

              <div style={{ display:'flex', gap:20, justifyContent:'center', flexWrap:'wrap', marginTop:8 }}>
                <CharWrapper delay={0}><Dumbledore/></CharWrapper>
                <CharWrapper delay={0.2}><Harry glassesGlint/></CharWrapper>
                <CharWrapper delay={0.4}><Hermione wandActive/></CharWrapper>
                <CharWrapper delay={0.6}><Ron embarrassed/></CharWrapper>
                <CharWrapper delay={0.8}><Dobby/></CharWrapper>
              </div>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
                style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}
              >
                <BigBtn onClick={() => castSpell('hearts', 5000)} color="red">
                  <span>❤️</span> Send Love
                </BigBtn>
              </motion.div>

              <motion.button
                onClick={() => setStep(0)}
                whileTap={{ scale:0.95 }}
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
                style={{ background:'transparent', border:'1px solid rgba(212,175,55,0.4)', borderRadius:999, color:'rgba(245,230,200,0.7)', fontFamily:'Cinzel,serif', fontSize:13, padding:'10px 28px', cursor:'pointer', letterSpacing:'0.05em' }}
              >↩ Start Over</motion.button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
