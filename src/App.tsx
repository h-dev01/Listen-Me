import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Stable random data ─────────────────────────────────────────
const STARS = Array.from({ length: 120 }, () => ({
  top: Math.random() * 100, left: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5, dur: Math.random() * 4 + 2, delay: Math.random() * 4,
}));
const SHOOTING = Array.from({ length: 5 }, (_, i) => ({
  top: Math.random() * 35 + 5, delay: i * 5 + Math.random() * 3, dur: 1.4,
}));
const FIREFLIES = Array.from({ length: 18 }, () => ({
  top: Math.random() * 70 + 20, left: Math.random() * 90 + 5,
  dur: Math.random() * 3 + 2, delay: Math.random() * 4, size: Math.random() * 5 + 3,
}));
const CONFETTI = Array.from({ length: 130 }, () => ({
  left: Math.random() * 100, dur: Math.random() * 3 + 2, delay: Math.random() * 3,
  color: ['#740001','#d3a625','#1a472a','#0e1a40','#ae0001','#f0c75e','#eea820'][Math.floor(Math.random() * 7)],
  rotate: Math.random() * 360, w: Math.random() * 10 + 5, h: Math.random() * 6 + 4,
}));
const PATRONUS = Array.from({ length: 18 }, () => ({
  top: Math.random() * 60 + 20, dur: Math.random() * 3 + 4, delay: Math.random() * 4,
  scale: Math.random() * 0.5 + 0.8, animal: ['🦌','🐕','🐰','🐈','🦦'][Math.floor(Math.random() * 5)],
}));
const HEARTS = Array.from({ length: 40 }, () => ({
  left: Math.random() * 100, dur: Math.random() * 4 + 3, delay: Math.random() * 5,
  size: Math.random() * 14 + 14, emoji: ['❤️','💕','💖','✨','🌸'][Math.floor(Math.random() * 5)],
}));
const INCENDIO = Array.from({ length: 35 }, () => ({
  left: Math.random() * 100, dur: Math.random() * 1.0 + 0.7, delay: Math.random() * 2,
  size: Math.random() * 16 + 18,
}));
const GOLDEN_SNITCH_POS = Array.from({ length: 3 }, () => ({
  startX: Math.random() * 60 + 10, startY: Math.random() * 60 + 10, delay: Math.random() * 6, dur: 8,
}));
const HALL_CANDLES = Array.from({ length: 38 }, () => ({
  left: Math.random() * 96 + 2,
  top: Math.random() * 65 + 5,
  dur: Math.random() * 3 + 2.5,
  delay: Math.random() * 5,
  h: Math.random() * 28 + 16,
}));
const MARAUDERS_FOOTSTEPS = [
  { x:18, y:72, delay:0 }, { x:24, y:65, delay:0.35 }, { x:31, y:59, delay:0.7 },
  { x:38, y:53, delay:1.05 }, { x:46, y:48, delay:1.4 }, { x:54, y:42, delay:1.75 },
  { x:61, y:36, delay:2.1 }, { x:68, y:30, delay:2.45 }, { x:75, y:24, delay:2.8 },
];
const MAP_ROOMS = [
  { x:7,  y:10, label:'Great Hall',       icon:'🏰' },
  { x:62, y:7,  label:'Library',          icon:'📚' },
  { x:82, y:22, label:'Owlery',           icon:'🦉' },
  { x:14, y:38, label:'Potions',          icon:'⚗️' },
  { x:73, y:58, label:'Quidditch Pitch',  icon:'🧹' },
  { x:28, y:82, label:"Hagrid's Hut",     icon:'🌿' },
  { x:82, y:78, label:'Forbidden Forest', icon:'🌲' },
];
const HOUSE_QUIZ = [
  { q: '⚡ Your best friend is in danger. You...', answers: [
    { text: '🦁 Charge in to help!', house: 'G' },
    { text: '📚 Think of the best plan', house: 'R' },
    { text: '🤝 Rally everyone together', house: 'H' },
    { text: '🧠 Use a clever trick', house: 'S' },
  ]},
  { q: '🌙 Your perfect day at Hogwarts...', answers: [
    { text: '🔥 Quidditch all day!', house: 'G' },
    { text: '🔬 Master a new spell', house: 'R' },
    { text: '🍰 Help classmates study', house: 'H' },
    { text: '🌿 Explore secret passages', house: 'S' },
  ]},
  { q: '🎂 On your birthday you wish for...', answers: [
    { text: '🏆 An adventure!', house: 'G' },
    { text: '📖 A whole library', house: 'R' },
    { text: '🎊 All friends together', house: 'H' },
    { text: '⭐ To be the best', house: 'S' },
  ]},
];
const HOUSES: Record<string, { name: string; c1: string; c2: string; badge: string; animal: string; desc: string; trait: string }> = {
  G: { name:'Gryffindor', c1:'#740001', c2:'#d3a625', badge:'🦁', animal:'Lion', desc:'Brave, daring & full of heart!', trait:'Bravery & Courage' },
  R: { name:'Ravenclaw',  c1:'#0e1a40', c2:'#946b2d', badge:'🦅', animal:'Eagle', desc:'Clever, creative & always curious!', trait:'Wisdom & Wit' },
  H: { name:'Hufflepuff', c1:'#372e29', c2:'#f0c75e', badge:'🦡', animal:'Badger', desc:'Kind, loyal & the best friend!', trait:'Loyalty & Patience' },
  S: { name:'Slytherin',  c1:'#1a472a', c2:'#aaa9ad', badge:'🐍', animal:'Serpent', desc:'Ambitious & destined for greatness!', trait:'Ambition & Cunning' },
};
const CANDLE_COUNT = 11;
const LETTER_TEXT = `⚡ Dear Rashi,

The Headmistress of Hogwarts School of Witchcraft and Wizardry is delighted to inform you — today is your most magical birthday! ✨

You are 11 years old today. The very age when witches and wizards receive their very first Hogwarts letter! 🦉✉️

We have watched you from afar and we are certain: there is extraordinary magic within you. The kind that makes every room brighter, every moment more joyful, and every heart warmer.

You have the courage of Gryffindor, the wisdom of Ravenclaw, the kindness of Hufflepuff, and the determination of Slytherin — you are truly one of a kind! 🌟

This year, may you discover new adventures, make wonderful memories, find magic in every ordinary day, and know that you are loved more than all the stars in the wizarding sky. 💫

Keep being your wonderful, magical self.

Happy 11th Birthday! 🎂⚡🎉

With all the love in the wizarding world,
Dev Kumar ❤️

P.S. The Marauders' Map confirms: you are having the BEST day ever! 🗺️
P.P.S. Dobby says you are the kindest witch he has ever had the honour to know! 🧦`;

// ─── VISUAL COMPONENTS ────────────────────────────────────────

function Night() {
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      {/* gradient sky */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,#020408 0%,#06081a 40%,#0d0520 70%,#180a35 100%)' }}/>
      {/* stars */}
      {STARS.map((s,i) => (
        <motion.div key={i} style={{ position:'absolute', top:`${s.top}%`, left:`${s.left}%`, width:s.size, height:s.size, borderRadius:'50%', background:'white' }}
          animate={{ opacity:[0.05,0.95,0.05], scale:[1,1.8,1] }}
          transition={{ duration:s.dur, delay:s.delay, repeat:Infinity }} />
      ))}
      {/* shooting stars */}
      {SHOOTING.map((s,i) => (
        <motion.div key={'sh'+i}
          style={{ position:'absolute', top:`${s.top}%`, left:'-8%', width:120, height:1.5, background:'linear-gradient(90deg,transparent 0%,rgba(255,255,220,0.8) 50%,transparent 100%)', borderRadius:2 }}
          animate={{ x:['0vw','115vw'], opacity:[0,0.9,0], y:[0,30,60] }}
          transition={{ duration:s.dur, delay:s.delay, repeat:Infinity, repeatDelay:10 }} />
      ))}
      {/* fireflies */}
      {FIREFLIES.map((f,i) => (
        <motion.div key={'ff'+i} style={{ position:'absolute', top:`${f.top}%`, left:`${f.left}%`, width:f.size, height:f.size, borderRadius:'50%', background:'#f0c75e', boxShadow:`0 0 ${f.size*2}px #f0c75e` }}
          animate={{ opacity:[0,0.7,0], x:[-10,10,-5,8,0], y:[-8,5,-12,3,0] }}
          transition={{ duration:f.dur, delay:f.delay, repeat:Infinity, ease:'easeInOut' }} />
      ))}
    </div>
  );
}

// Hogwarts Castle silhouette
function Castle() {
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:1, pointerEvents:'none' }}>
      <svg viewBox="0 0 1200 320" style={{ width:'100%', display:'block' }} preserveAspectRatio="xMidYMax meet">
        {/* far mountains */}
        <polygon points="0,320 180,100 360,200 540,80 720,170 900,90 1080,160 1200,110 1200,320" fill="#06041a" opacity="0.85"/>
        {/* Hogwarts castle */}
        <g fill="#0a0620" opacity="0.97">
          {/* Main keep */}
          <rect x="500" y="160" width="200" height="160"/>
          {/* Towers */}
          <rect x="460" y="120" width="50" height="200"/>
          <rect x="690" y="100" width="55" height="220"/>
          <rect x="390" y="150" width="40" height="170"/>
          <rect x="770" y="130" width="45" height="190"/>
          {/* Tower tops / battlements */}
          <polygon points="460,120 510,120 510,100 500,95 490,100 480,95 470,100 460,100" fill="#0a0620"/>
          <polygon points="690,100 745,100 745,78 735,73 725,78 715,73 705,78 695,73 690,78" fill="#0a0620"/>
          <rect x="390" y="130" width="10" height="20"/><rect x="410" y="130" width="10" height="20"/><rect x="420" y="130" width="10" height="20"/>
          <rect x="770" y="110" width="10" height="20"/><rect x="790" y="110" width="10" height="20"/><rect x="805" y="110" width="10" height="20"/>
          {/* Pointed roofs */}
          <polygon points="460,100 485,50 510,100" fill="#0d0830"/>
          <polygon points="690,78 717,20 745,78" fill="#0d0830"/>
          <polygon points="390,130 410,85 430,130" fill="#0d0830"/>
          <polygon points="770,110 792,65 815,110" fill="#0d0830"/>
          {/* Windows (lit up) */}
          <rect x="520" y="190" width="16" height="20" rx="8" fill="#d3a625" opacity="0.6"/>
          <rect x="560" y="190" width="16" height="20" rx="8" fill="#d3a625" opacity="0.4"/>
          <rect x="600" y="190" width="16" height="20" rx="8" fill="#d3a625" opacity="0.7"/>
          <rect x="640" y="190" width="16" height="20" rx="8" fill="#d3a625" opacity="0.5"/>
          <rect x="475" y="155" width="12" height="16" rx="6" fill="#d3a625" opacity="0.5"/>
          <rect x="705" y="140" width="14" height="18" rx="7" fill="#d3a625" opacity="0.5"/>
          {/* Gates */}
          <path d="M 555 320 L 555 250 Q 600 220 645 250 L 645 320 Z" fill="#050310"/>
          {/* Ground / moat */}
          <rect x="0" y="290" width="1200" height="30" fill="#050210"/>
        </g>
        {/* Foreground trees */}
        {[0,80,150,900,1000,1080,1150].map((x,i)=>(
          <g key={i}>
            <rect x={x+10} y={260} width={8} height={60} fill="#030210"/>
            <polygon points={`${x+14},260 ${x-5},310 ${x+33},310`} fill="#04031a"/>
            <polygon points={`${x+14},240 ${x},285 ${x+28},285`} fill="#050420"/>
          </g>
        ))}
      </svg>
    </div>
  );
}

// Golden Snitch
function GoldenSnitch() {
  return (
    <>
      {GOLDEN_SNITCH_POS.map((s,i) => (
        <motion.div key={i}
          style={{ position:'absolute', top:`${s.startY}%`, left:`${s.startX}%`, zIndex:8, pointerEvents:'none' }}
          animate={{ x:[0,80,-60,120,-40,0], y:[0,-50,30,-80,20,0] }}
          transition={{ duration:s.dur, delay:s.delay, repeat:Infinity, ease:'easeInOut' }}>
          <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {/* wings */}
            <motion.div style={{ position:'absolute', left:-18, width:18, height:8, background:'rgba(212,175,55,0.3)', borderRadius:'50%', transformOrigin:'right center' }}
              animate={{ rotate:[-30,30,-30], scaleY:[1,0.4,1] }} transition={{ repeat:Infinity, duration:0.2 }}/>
            <motion.div style={{ position:'absolute', right:-18, width:18, height:8, background:'rgba(212,175,55,0.3)', borderRadius:'50%', transformOrigin:'left center' }}
              animate={{ rotate:[30,-30,30], scaleY:[1,0.4,1] }} transition={{ repeat:Infinity, duration:0.2 }}/>
            {/* ball */}
            <div style={{ width:14, height:14, borderRadius:'50%', background:'radial-gradient(circle at 35% 35%,#f5c842,#d4af37,#a07830)', boxShadow:'0 0 10px rgba(212,175,55,0.8), 0 0 20px rgba(212,175,55,0.4)' }}/>
          </div>
        </motion.div>
      ))}
    </>
  );
}

// Wax Seal
function WaxSeal({ size=60 }: { size?: number }) {
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', background:'radial-gradient(circle at 40% 40%,#c0392b,#740001)', boxShadow:'0 3px 12px rgba(116,0,1,0.8)', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid rgba(255,200,100,0.3)', flexShrink:0 }}>
      <span style={{ fontSize:size*0.35, lineHeight:1 }}>⚡</span>
    </div>
  );
}

// ── Spell effects ──────────────────────────────────────────────
function ConfettiRain() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:45 }}>
      {CONFETTI.map((c,i) => (
        <motion.div key={i} style={{ position:'absolute', left:`${c.left}%`, top:-20, width:c.w, height:c.h, background:c.color, borderRadius:c.w>8?2:'50%' }}
          animate={{ y:'115vh', rotate:c.rotate+720, opacity:[1,1,0] }}
          transition={{ duration:c.dur, delay:c.delay, repeat:Infinity, ease:'linear' }} />
      ))}
    </div>
  );
}
function PatronusEffect() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:40 }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(100,180,255,0.04)' }}/>
      {PATRONUS.map((p,i) => (
        <motion.div key={i} style={{ position:'absolute', top:`${p.top}%`, fontSize:38*p.scale, filter:'drop-shadow(0 0 8px rgba(150,200,255,0.8))' }}
          initial={{ x:'-15vw', opacity:0 }} animate={{ x:'115vw', opacity:[0,1,1,0] }}
          transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, repeatDelay:1 }}>
          {p.animal}
        </motion.div>
      ))}
    </div>
  );
}
function HeartsEffect() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:40 }}>
      {HEARTS.map((h,i) => (
        <motion.div key={i} style={{ position:'absolute', left:`${h.left}%`, bottom:-30, fontSize:h.size }}
          animate={{ y:'-110vh', x:[0,12,-12,8,-8,0], opacity:[1,1,0] }}
          transition={{ duration:h.dur, delay:h.delay, repeat:Infinity, x:{ duration:1.8, repeat:Infinity } }}>
          {h.emoji}
        </motion.div>
      ))}
    </div>
  );
}
function IncendioEffect() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:40 }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(255,60,0,0.04)' }}/>
      {INCENDIO.map((f,i) => (
        <motion.div key={i} style={{ position:'absolute', left:`${f.left}%`, bottom:0, fontSize:f.size }}
          animate={{ y:'-90vh', opacity:[1,0.9,0], scale:[1,1.4,0.3] }}
          transition={{ duration:f.dur, delay:f.delay, repeat:Infinity, repeatDelay:0.2 }}>🔥</motion.div>
      ))}
    </div>
  );
}

// ── Birthday Cake ──────────────────────────────────────────────
function Cake({ lit, onTap }: { lit: number[]; onTap:(i:number)=>void }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      {/* candles */}
      <div style={{ display:'flex', gap:5, marginBottom:4, flexWrap:'wrap', justifyContent:'center', maxWidth:300 }}>
        {Array.from({ length:CANDLE_COUNT }, (_,i) => (
          <motion.div key={i} onTap={()=>onTap(i)} onClick={()=>onTap(i)} whileTap={{ scale:0.8 }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer', WebkitTapHighlightColor:'transparent' }}>
            <div style={{ width:16, height:22, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
              {lit.includes(i)
                ? <motion.div animate={{ scaleY:[1,1.4,0.8,1.3,1], rotate:[-6,6,-4,5,0], x:[-1,1,-1,1,0] }} transition={{ repeat:Infinity, duration:0.45 }} style={{ fontSize:18, lineHeight:1 }}>🔥</motion.div>
                : <motion.div animate={{ opacity:[0.8,0,0.5,0] }} transition={{ duration:2 }} style={{ width:2, height:12, background:'rgba(180,180,180,0.5)', borderRadius:1 }}/>
              }
            </div>
            <div style={{ width:11, height:34, borderRadius:'4px 4px 2px 2px', background: lit.includes(i) ? `hsl(${i*33},75%,52%)` : 'rgba(150,150,150,0.4)', boxShadow: lit.includes(i) ? `0 0 10px hsl(${i*33},75%,52%)` : 'none', transition:'all 0.4s', border:'1px solid rgba(255,255,255,0.15)' }}/>
          </motion.div>
        ))}
      </div>
      {/* cake layers */}
      <div style={{ position:'relative' }}>
        {/* drips on top layer */}
        <div style={{ display:'flex', justifyContent:'center' }}>
          {[0,1,2,3,4].map(j => (
            <div key={j} style={{ width:9, height:12, background:'#e8a0bf', borderRadius:'0 0 8px 8px', margin:'0 6px' }}/>
          ))}
        </div>
        {/* top layer */}
        <div style={{ width:210, height:42, background:'linear-gradient(135deg,#e8a0bf,#fbc4c4)', border:'2px solid rgba(255,255,255,0.25)', borderRadius:'6px 6px 0 0', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontFamily:'Cinzel,serif', fontSize:12, color:'#4a1020', fontWeight:'bold', letterSpacing:'0.03em' }}>Happy Birthday! 🎂</span>
        </div>
        {/* middle */}
        <div style={{ width:230, height:46, marginLeft:-10, background:'linear-gradient(135deg,#a18cd1,#fbc2eb)', border:'2px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
          {'⭐🌙✨🌟💫'.split('').map((e,i) => <span key={i} style={{ fontSize:16 }}>{e}</span>)}
        </div>
        {/* bottom */}
        <div style={{ width:250, height:54, marginLeft:-20, background:'linear-gradient(135deg,#740001,#ae0001)', border:'2px solid rgba(212,175,55,0.4)', borderRadius:'0 0 10px 10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontFamily:'Cinzel,serif', fontSize:13, color:'#f0c75e', fontWeight:'bold', letterSpacing:'0.04em', textShadow:'0 0 10px rgba(240,199,94,0.6)' }}>Rashi ⚡ 11 Years Old</span>
        </div>
        {/* bottom drips */}
        {[15,55,100,150,190].map((x,j) => (
          <div key={j} style={{ position:'absolute', bottom:-10, left:x, width:10, height:12, background:'#ae0001', borderRadius:'0 0 8px 8px' }}/>
        ))}
      </div>
    </div>
  );
}

// ── Hedwig SVG ─────────────────────────────────────────────────
function HedwigSvg({ size=160 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width:size, height:size, display:'block', filter:'drop-shadow(0 0 18px rgba(255,255,255,0.45))' }}>
      <path d="M 30 50 C 30 20, 70 20, 70 50 C 70 80, 30 80, 30 50 Z" fill="#f4f4f8"/>
      <path d="M 35 55 C 35 35, 65 35, 65 55 C 65 75, 35 75, 35 55 Z" fill="#e0e0ea"/>
      <path d="M 28 30 L 36 46 L 21 43 Z" fill="#d0d0e0"/>
      <path d="M 72 30 L 64 46 L 79 43 Z" fill="#d0d0e0"/>
      <circle cx="42" cy="38" r="9" fill="#f59e0b"/>
      <circle cx="58" cy="38" r="9" fill="#f59e0b"/>
      <circle cx="42" cy="38" r="5" fill="#1a0a2e"/>
      <circle cx="58" cy="38" r="5" fill="#1a0a2e"/>
      <circle cx="44" cy="36" r="2" fill="white"/>
      <circle cx="60" cy="36" r="2" fill="white"/>
      <polygon points="48,46 52,46 50,55" fill="#d97706"/>
      <motion.path d="M 30 52 Q 0 32 12 72 Z" fill="#c8c8d8"
        animate={{ rotate:[0,-14,0] }} transition={{ repeat:Infinity, duration:0.65, ease:'easeInOut' }}
        style={{ transformOrigin:'30px 52px' }}/>
      <motion.path d="M 70 52 Q 100 32 88 72 Z" fill="#c8c8d8"
        animate={{ rotate:[0,14,0] }} transition={{ repeat:Infinity, duration:0.65, ease:'easeInOut' }}
        style={{ transformOrigin:'70px 52px' }}/>
    </svg>
  );
}

// ── Characters ─────────────────────────────────────────────────
function Harry({ glint=false }: { glint?: boolean }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
      <div style={{ position:'relative', width:60, height:84 }}>
        <div style={{ position:'absolute', top:0, left:15, width:30, height:13, background:'#111', borderTopLeftRadius:12, borderTopRightRadius:12, clipPath:'polygon(0 0,100% 0,100% 100%,80% 55%,58% 100%,36% 55%,0 100%)' }}/>
        <div style={{ position:'absolute', top:8, left:31, fontSize:10, color:'#f5c842', transform:'rotate(12deg)', zIndex:10 }}>⚡</div>
        <div style={{ position:'absolute', top:10, left:16, width:28, height:28, background:'#fcd5b5', borderRadius:'50%', zIndex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:1 }}>
          <div style={{ width:9, height:9, border:'2px solid #333', borderRadius:'50%', background:glint?'rgba(255,255,255,0.7)':'transparent', boxShadow:glint?'0 0 6px white':'none' }}/>
          <div style={{ width:9, height:9, border:'2px solid #333', borderRadius:'50%', background:glint?'rgba(255,255,255,0.7)':'transparent', boxShadow:glint?'0 0 6px white':'none' }}/>
          <div style={{ position:'absolute', top:14, width:5, height:1.5, background:'#333' }}/>
        </div>
        <div style={{ position:'absolute', bottom:0, left:10, width:40, height:46, background:'#1a0000', borderTopLeftRadius:4, borderTopRightRadius:4, zIndex:2, display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ width:8, height:11, background:'#ae0001', borderBottom:'2px solid #d3a625' }}/>
        </div>
        <div style={{ position:'absolute', bottom:0, left:10, width:40, height:46, border:'1px solid rgba(212,175,55,0.15)', borderTopLeftRadius:4, borderTopRightRadius:4, zIndex:3, pointerEvents:'none' }}/>
      </div>
      <span style={{ fontFamily:'Cinzel,serif', fontSize:10, color:'#d3a625', letterSpacing:'0.05em' }}>Harry ⚡</span>
    </div>
  );
}
function Hermione({ wand=false }: { wand?: boolean }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
      <div style={{ position:'relative', width:60, height:84 }}>
        <div style={{ position:'absolute', top:-2, left:10, width:40, height:36, background:'#5c3317', borderRadius:'50%' }}/>
        <div style={{ position:'absolute', top:10, left:16, width:28, height:28, background:'#fcd5b5', borderRadius:'50%', zIndex:2 }}/>
        <div style={{ position:'absolute', bottom:0, left:12, width:36, height:46, background:'#1a0000', borderTopLeftRadius:4, borderTopRightRadius:4, zIndex:3, display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ width:7, height:9, background:'#ae0001' }}/>
        </div>
        {wand && <>
          <motion.div style={{ position:'absolute', right:-2, top:34, width:28, height:3, background:'#4a2805', borderRadius:2, transformOrigin:'left center', zIndex:10 }}
            animate={{ rotate:[-18,18,-18] }} transition={{ repeat:Infinity, duration:0.75 }}/>
          <motion.div style={{ position:'absolute', right:-26, top:22, fontSize:18, zIndex:11 }}
            animate={{ opacity:[0,1,0], scale:[0.5,1.4,0.5] }} transition={{ repeat:Infinity, duration:0.75 }}>✨</motion.div>
        </>}
      </div>
      <span style={{ fontFamily:'Cinzel,serif', fontSize:10, color:'#d3a625', letterSpacing:'0.05em' }}>Hermione 📚</span>
    </div>
  );
}
function Ron({ blush=false }: { blush?: boolean }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
      <div style={{ position:'relative', width:60, height:84 }}>
        <div style={{ position:'absolute', top:0, left:16, width:28, height:14, background:'#c0410f', borderTopLeftRadius:12, borderTopRightRadius:12 }}/>
        <div style={{ position:'absolute', top:10, left:16, width:28, height:28, background:'#fcd5b5', borderRadius:'50%', zIndex:1 }}>
          {blush && <>
            <div style={{ position:'absolute', top:18, left:2, width:8, height:5, background:'rgba(255,100,80,0.45)', borderRadius:'50%', filter:'blur(2px)' }}/>
            <div style={{ position:'absolute', top:18, right:2, width:8, height:5, background:'rgba(255,100,80,0.45)', borderRadius:'50%', filter:'blur(2px)' }}/>
          </>}
        </div>
        <div style={{ position:'absolute', bottom:0, left:10, width:40, height:46, background:'#1a0000', borderTopLeftRadius:4, borderTopRightRadius:4, zIndex:2, display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ width:8, height:11, background:'#ae0001', borderBottom:'2px solid #d3a625' }}/>
        </div>
      </div>
      <span style={{ fontFamily:'Cinzel,serif', fontSize:10, color:'#d3a625', letterSpacing:'0.05em' }}>Ron 😄</span>
    </div>
  );
}
function Dobby() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
      <div style={{ position:'relative', width:60, height:72 }}>
        <div style={{ position:'absolute', top:7, left:-4, width:20, height:9, background:'#e6c1a8', borderRadius:'50%', transform:'rotate(-28deg)' }}/>
        <div style={{ position:'absolute', top:7, right:-4, width:20, height:9, background:'#e6c1a8', borderRadius:'50%', transform:'rotate(28deg)' }}/>
        <div style={{ position:'absolute', top:4, left:14, width:32, height:32, background:'#e6c1a8', borderRadius:'50%', zIndex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:3, paddingBottom:4 }}>
          <div style={{ width:9, height:9, background:'#5a8a40', borderRadius:'50%', border:'1.5px solid #222', display:'flex', alignItems:'center', justifyContent:'center' }}><div style={{ width:3.5, height:3.5, background:'#111', borderRadius:'50%' }}/></div>
          <div style={{ width:9, height:9, background:'#5a8a40', borderRadius:'50%', border:'1.5px solid #222', display:'flex', alignItems:'center', justifyContent:'center' }}><div style={{ width:3.5, height:3.5, background:'#111', borderRadius:'50%' }}/></div>
        </div>
        <div style={{ position:'absolute', bottom:0, left:16, width:28, height:26, background:'#c8bca8', clipPath:'polygon(12% 0,88% 0,100% 100%,0 100%)', zIndex:2 }}/>
      </div>
      <span style={{ fontFamily:'Cinzel,serif', fontSize:10, color:'#d3a625', letterSpacing:'0.05em' }}>Dobby 🧦</span>
    </div>
  );
}

function Dumbledore() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
      <div style={{ position:'relative', width:60, height:90 }}>
        <div style={{ position:'absolute', top:0, left:20, width:0, height:0, borderLeft:'15px solid transparent', borderRight:'15px solid transparent', borderBottom:'24px solid #1a1a6e' }}/>
        <div style={{ position:'absolute', top:18, left:18, width:24, height:22, background:'#fcd5b5', borderRadius:'50%', zIndex:1 }}/>
        <div style={{ position:'absolute', top:25, left:16, width:28, height:16, background:'white', borderRadius:8, zIndex:2, opacity:0.8 }}/>
        <div style={{ position:'absolute', bottom:0, left:10, width:40, height:50, background:'#1a1a6e', borderTopLeftRadius:4, borderTopRightRadius:4, zIndex:3, display:'flex', justifyContent:'center' }}>
          <div style={{ width:2, height:'100%', background:'rgba(212,175,55,0.4)' }}/>
        </div>
        <span style={{ position:'absolute', top:0, right:4, fontSize:11 }}>✨</span>
      </div>
      <span style={{ fontFamily:'Cinzel,serif', fontSize:10, color:'#d3a625', letterSpacing:'0.05em' }}>Dumbledore ✨</span>
    </div>
  );
}

function FloatChar({ children, delay=0 }: { children:React.ReactNode; delay?:number }) {
  return (
    <motion.div initial={{ opacity:0, y:20, scale:0.7 }} animate={{ opacity:1, y:[0,-9,0], scale:1 }}
      transition={{ opacity:{delay,duration:0.4}, scale:{delay,duration:0.4}, y:{delay:delay+0.4,repeat:Infinity,duration:2.8,ease:'easeInOut'} }}>
      {children}
    </motion.div>
  );
}

// ── Buttons ────────────────────────────────────────────────────
const BTN_STYLES: Record<string,React.CSSProperties> = {
  gold:   { background:'linear-gradient(135deg,#b8880a,#d3a625,#f0c75e,#d3a625)', color:'#1a0a00', boxShadow:'0 0 30px rgba(212,175,55,0.6),inset 0 1px 0 rgba(255,255,255,0.3)' },
  red:    { background:'linear-gradient(135deg,#4a0001,#740001,#ae0001)', color:'#f0c75e', boxShadow:'0 0 24px rgba(174,0,1,0.5)', border:'1px solid rgba(212,175,55,0.3)' },
  purple: { background:'linear-gradient(135deg,#2d0b54,#5b21b6,#7c3aed)', color:'white', boxShadow:'0 0 24px rgba(124,58,237,0.5)', border:'1px solid rgba(196,181,253,0.2)' },
  blue:   { background:'linear-gradient(135deg,#0e1a40,#1e3a8a,#2563eb)', color:'#e2e8f0', boxShadow:'0 0 24px rgba(37,99,235,0.4)', border:'1px solid rgba(147,197,253,0.2)' },
  green:  { background:'linear-gradient(135deg,#052e16,#065f46,#059669)', color:'white', boxShadow:'0 0 24px rgba(5,150,105,0.4)', border:'1px solid rgba(110,231,183,0.2)' },
  ghost:  { background:'transparent', color:'rgba(240,199,94,0.7)', border:'1px solid rgba(212,175,55,0.3)', boxShadow:'none' },
};
function HPBtn({ onClick, children, color='gold', disabled=false }: { onClick:()=>void; children:React.ReactNode; color?:string; disabled?:boolean }) {
  return (
    <motion.button whileTap={{ scale:disabled?1:0.94 }} onClick={disabled?undefined:onClick}
      style={{ ...(BTN_STYLES[color]||BTN_STYLES.gold), width:'92%', maxWidth:380, minHeight:68, borderRadius:4, fontFamily:'Cinzel,serif', fontWeight:'bold', fontSize:16, textTransform:'uppercase', letterSpacing:'0.1em', display:'flex', alignItems:'center', justifyContent:'center', gap:10, cursor:disabled?'default':'pointer', opacity:disabled?0.5:1, WebkitTapHighlightColor:'transparent', touchAction:'manipulation', border:(BTN_STYLES[color]||BTN_STYLES.gold).border||'none', position:'relative', overflow:'hidden' }}>
      {/* gold shimmer */}
      <motion.div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.12) 50%,transparent 100%)', pointerEvents:'none' }}
        animate={{ x:['-100%','200%'] }} transition={{ duration:2.5, repeat:Infinity, repeatDelay:3 }}/>
      {children}
    </motion.button>
  );
}
function SpellBtn({ onClick, children, color='gold' }: { onClick:()=>void; children:React.ReactNode; color?:string }) {
  return (
    <motion.button whileTap={{ scale:0.9 }} onClick={onClick}
      style={{ ...(BTN_STYLES[color]||BTN_STYLES.gold), minHeight:70, borderRadius:4, fontFamily:'Cinzel,serif', fontWeight:'bold', fontSize:12, textTransform:'uppercase', letterSpacing:'0.06em', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, padding:'10px 8px', cursor:'pointer', WebkitTapHighlightColor:'transparent', touchAction:'manipulation', border:(BTN_STYLES[color]||BTN_STYLES.gold).border||'none', lineHeight:1.3, textAlign:'center' }}>
      {children}
    </motion.button>
  );
}

// ── Steps ──────────────────────────────────────────────────────
function Steps({ cur, total }: { cur:number; total:number }) {
  return (
    <div style={{ position:'absolute', bottom:16, left:0, width:'100%', display:'flex', justifyContent:'center', gap:8, zIndex:50, pointerEvents:'none' }}>
      {Array.from({ length:total }, (_,i) => (
        <div key={i} style={{ width:i===cur?22:8, height:8, borderRadius:4, background:i<=cur?'#d3a625':'rgba(255,255,255,0.15)', boxShadow:i<=cur?'0 0 8px rgba(211,166,37,0.8)':'none', transition:'all 0.4s' }}/>
      ))}
    </div>
  );
}

// ── Parchment wrapper ──────────────────────────────────────────
function Parchment({ children, style }: { children:React.ReactNode; style?:React.CSSProperties }) {
  return (
    <div style={{ background:'linear-gradient(135deg,rgba(45,20,5,0.85),rgba(25,10,5,0.9))', border:'1px solid rgba(212,175,55,0.35)', borderRadius:4, padding:'16px 18px', position:'relative', ...style }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent)', borderRadius:'4px 4px 0 0' }}/>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)', borderRadius:'0 0 4px 4px' }}/>
      {children}
    </div>
  );
}

// ── Creative features ──────────────────────────────────────────
const BURST_EMOJIS = ['⚡','✨','🌟','💫','⭐','🔮','🪄','💥','🎯','🏆'];
const HP_FLOAT_ITEMS = ['🧹','📖','🎩','⚡','🔮','🏆','🪄','🦉','🧪','🗝️','💎','🌙','🐸','🦁','🐍','🦅','🦡','🌿','🔭','🧲'];

interface Spark { id: number; x: number; y: number }
interface FloatItem { id: number; emoji: string; left: number; top: number; size: number; dur: number }
interface PointMsg { id: number; text: string }

// Burst of sparkles at a tap position
function SparkBurst({ x, y }: { x: number; y: number }) {
  const pts = useRef(Array.from({ length: 10 }, (_, i) => ({
    angle: (i / 10) * 360 + Math.random() * 18,
    dist: Math.random() * 58 + 18,
    size: Math.random() * 14 + 10,
    emoji: BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)],
    dur: Math.random() * 0.4 + 0.45,
  }))).current;
  return (
    <div style={{ position:'absolute', left:x, top:y, width:0, height:0, pointerEvents:'none' }}>
      {pts.map((p, i) => {
        const rad = p.angle * Math.PI / 180;
        return (
          <motion.div key={i} style={{ position:'absolute', fontSize:p.size, transform:'translate(-50%,-50%)' }}
            initial={{ x:0, y:0, opacity:1, scale:0 }}
            animate={{ x:Math.cos(rad)*p.dist, y:Math.sin(rad)*p.dist, opacity:0, scale:1.2 }}
            transition={{ duration:p.dur, ease:'easeOut' }}>
            {p.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}

// Global magic touch sparkles (fires on every tap on mobile)
function TouchSparkles() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const counter = useRef(0);
  const lastT = useRef(0);
  useEffect(() => {
    function add(x: number, y: number) {
      const now = Date.now();
      if (now - lastT.current < 80) return;
      lastT.current = now;
      const id = counter.current++;
      setSparks(s => [...s.slice(-14), { id, x, y }]);
      setTimeout(() => setSparks(s => s.filter(sp => sp.id !== id)), 1100);
    }
    const onTouch = (e: TouchEvent) => { const t = e.touches[0]||e.changedTouches[0]; if(t) add(t.clientX, t.clientY); };
    window.addEventListener('touchstart', onTouch, { passive: true });
    return () => window.removeEventListener('touchstart', onTouch);
  }, []);
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:210 }}>
      {sparks.map(sp => <SparkBurst key={sp.id} x={sp.x} y={sp.y}/>)}
    </div>
  );
}

// Floating tappable HP items that drift across the screen
function FloatingHPItems({ onPop }: { onPop: ()=>void }) {
  const [items, setItems] = useState<FloatItem[]>([]);
  const counter = useRef(0);
  useEffect(() => {
    function spawn() {
      const id = counter.current++;
      const dur = Math.random() * 4 + 7;
      setItems(s => [...s.slice(-7), { id, emoji: HP_FLOAT_ITEMS[Math.floor(Math.random()*HP_FLOAT_ITEMS.length)], left: Math.random()*80+5, top: Math.random()*55+8, size: Math.random()*12+26, dur }]);
      setTimeout(() => setItems(s => s.filter(i => i.id !== id)), (dur+1)*1000);
    }
    spawn();
    const iv = setInterval(spawn, 3200);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:12 }}>
      {items.map(item => (
        <motion.div key={item.id}
          style={{ position:'absolute', left:`${item.left}%`, top:`${item.top}%`, fontSize:item.size, cursor:'pointer', pointerEvents:'auto', WebkitTapHighlightColor:'transparent', filter:'drop-shadow(0 0 6px rgba(211,166,37,0.5))' }}
          initial={{ opacity:0, scale:0, rotate:-15 }}
          animate={{ opacity:[0,0.9,0.9,0], scale:[0,1.1,1,0.8,0], y:[0,-10,-25,-45,-70], rotate:[-15,5,-5,8,0] }}
          transition={{ duration:item.dur, ease:'easeInOut' }}
          onClick={e=>{ e.stopPropagation(); setItems(s=>s.filter(i=>i.id!==item.id)); onPop(); }}
          whileTap={{ scale:2.4, rotate:20 }}>
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// SECRET: 5 rapid taps = LUMOS flash
function LumosFlash({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div key="lumos" style={{ position:'fixed', inset:0, zIndex:300, pointerEvents:'none', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12 }}
          initial={{ opacity:0 }} animate={{ opacity:[0,1,0.85,0] }} exit={{ opacity:0 }} transition={{ duration:2.2, times:[0,0.07,0.5,1] }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(255,255,240,0.88)' }}/>
          <motion.div style={{ position:'relative', textAlign:'center' }}
            initial={{ scale:0 }} animate={{ scale:[0,1.4,1] }} transition={{ duration:0.4 }}>
            <p style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(36px,10vw,64px)', color:'#d3a625', textShadow:'0 0 40px #f0c75e, 0 0 80px #d3a625', margin:0, letterSpacing:'0.1em' }}>✨ LUMOS! ✨</p>
            <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', fontSize:'clamp(14px,4vw,20px)', color:'rgba(74,32,0,0.8)', margin:'8px 0 0' }}>Secret spell unlocked! You're a true witch! 🪄</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


// House points notification toasts
function PointsToasts({ msgs }: { msgs: PointMsg[] }) {
  return (
    <div style={{ position:'fixed', bottom:70, right:12, zIndex:150, pointerEvents:'none', display:'flex', flexDirection:'column', gap:6, alignItems:'flex-end' }}>
      <AnimatePresence>
        {msgs.map(m => (
          <motion.div key={m.id} initial={{ x:120, opacity:0, scale:0.8 }} animate={{ x:0, opacity:1, scale:1 }} exit={{ x:120, opacity:0 }} transition={{ type:'spring', duration:0.4 }}
            style={{ background:'linear-gradient(135deg,#740001,#ae0001)', border:'1px solid rgba(211,166,37,0.6)', color:'#f0c75e', fontFamily:'Cinzel,serif', fontSize:12, fontWeight:'bold', padding:'7px 14px', borderRadius:4, boxShadow:'0 4px 20px rgba(0,0,0,0.6)', whiteSpace:'nowrap' }}>
            {m.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Snitch counter badge
function SnitchCounter({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <motion.div initial={{ scale:0 }} animate={{ scale:1 }} style={{ position:'fixed', top:32, right:12, zIndex:115, background:'linear-gradient(135deg,#b8880a,#d3a625,#f0c75e)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:999, padding:'5px 12px', display:'flex', alignItems:'center', gap:6, boxShadow:'0 0 16px rgba(211,166,37,0.6)' }}>
      <span style={{ fontSize:14 }}>🏆</span>
      <span style={{ fontFamily:'Cinzel,serif', fontSize:11, fontWeight:'bold', color:'#1a0800' }}>{count} pts</span>
    </motion.div>
  );
}

// Great Hall floating candles
function FloatingHallCandles() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:1 }}>
      {HALL_CANDLES.map((c,i) => (
        <motion.div key={i}
          style={{ position:'absolute', left:`${c.left}%`, top:`${c.top}%`, display:'flex', flexDirection:'column', alignItems:'center' }}
          animate={{ y:[0,-10,0] }} transition={{ repeat:Infinity, duration:c.dur, delay:c.delay, ease:'easeInOut' }}>
          <div style={{ width:3, height:8, background:'radial-gradient(ellipse at 50% 80%, #fffbe0 0%, #ffd700 55%, #ff8c00 100%)', borderRadius:'50% 50% 30% 30%', boxShadow:'0 0 6px 3px rgba(255,200,50,0.85), 0 0 14px rgba(255,140,0,0.5)' }}/>
          <div style={{ width:3, height:c.h, background:'linear-gradient(180deg,#f5f0e8,#d4c9a8,#c4b090)', borderRadius:'1px 1px 2px 2px' }}/>
          <div style={{ width:6, height:2, background:'rgba(160,120,60,0.35)', borderRadius:'50%', marginTop:1 }}/>
        </motion.div>
      ))}
    </div>
  );
}

// Chocolate Frog — randomly hops across the screen!
function ChocolateFrog({ onCatch }: { onCatch: () => void }) {
  const [visible, setVisible] = useState(false);
  const [caught, setCaught]   = useState(false);
  const [pos, setPos]         = useState({ x:20, y:40 });

  useEffect(() => {
    function spawnFrog() {
      setPos({ x: Math.random() * 65 + 8, y: Math.random() * 45 + 25 });
      setCaught(false);
      setVisible(true);
      setTimeout(() => setVisible(false), 5500);
    }
    const t  = setTimeout(spawnFrog, 9000);
    const iv = setInterval(spawnFrog, 24000);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="frog"
          initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0, opacity:0 }}
          style={{ position:'fixed', left:`${pos.x}%`, top:`${pos.y}%`, zIndex:200, cursor:'pointer', userSelect:'none', WebkitTapHighlightColor:'transparent', touchAction:'manipulation' }}
          onClick={() => { if (!caught) { setCaught(true); onCatch(); setTimeout(() => setVisible(false), 600); } }}>
          {caught ? (
            <motion.div animate={{ scale:[1,2.5,0], opacity:[1,1,0] }} transition={{ duration:0.55 }} style={{ fontSize:32 }}>✨</motion.div>
          ) : (
            <motion.div animate={{ x:[0,20,5,25,10,0], y:[0,-22,0,-16,0,-10,0] }} transition={{ duration:1.9, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'relative' }}>
              <div style={{ fontSize:40 }}>🐸</div>
              <motion.div animate={{ opacity:[0,1,0] }} transition={{ duration:1.3, repeat:Infinity }}
                style={{ position:'absolute', bottom:-20, left:'50%', transform:'translateX(-50%)', background:'rgba(20,10,0,0.8)', color:'#d3a625', fontFamily:'Cinzel,serif', fontSize:8, padding:'2px 7px', borderRadius:3, whiteSpace:'nowrap', border:'1px solid rgba(211,166,37,0.45)', letterSpacing:'0.05em' }}>
                🍫 Catch me!
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Marauder's Map step
function MaraudersMap({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'typing'|'map'>('typing');
  const [typed, setTyped] = useState('');
  const OATH = 'I solemnly swear that I am up to no good...';

  useEffect(() => {
    if (phase !== 'typing') return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(OATH.slice(0, i));
      if (i >= OATH.length) { clearInterval(iv); setTimeout(() => setPhase('map'), 700); }
    }, 46);
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'16px 20px', boxSizing:'border-box' }}>
      <Castle/>
      <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:14, maxWidth:500, width:'100%', paddingBottom:60 }}>

        <motion.h2 initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }}
          style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(20px,5.5vw,32px)', color:'#d3a625', textAlign:'center', margin:0, letterSpacing:'0.06em', textShadow:'0 0 20px rgba(211,166,37,0.6)' }}>
          🗺️ The Marauder's Map
        </motion.h2>

        {/* Parchment map */}
        <motion.div initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3 }}
          style={{ width:'100%', background:'linear-gradient(145deg,#f7ead0,#ede0b0,#f0d880)', border:'3px solid rgba(100,60,0,0.35)', borderRadius:6, padding:'14px 16px', position:'relative', minHeight:200, overflow:'hidden', boxShadow:'inset 0 0 40px rgba(100,50,0,0.12), 0 8px 32px rgba(0,0,0,0.55)' }}>

          {/* Grid texture */}
          {[20,40,60,80].map(y => <div key={`h${y}`} style={{ position:'absolute', left:0, right:0, top:`${y}%`, height:1, background:'rgba(100,60,0,0.07)' }}/>)}
          {[25,50,75].map(x => <div key={`v${x}`} style={{ position:'absolute', top:0, bottom:0, left:`${x}%`, width:1, background:'rgba(100,60,0,0.07)' }}/>)}

          {/* Typing oath */}
          <p style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(13px,3.2vw,16px)', color:'rgba(74,32,0,0.88)', fontStyle:'italic', margin:'0 0 10px', lineHeight:1.5, minHeight:22 }}>
            {typed}<span style={{ opacity: phase==='typing' ? 1 : 0, transition:'opacity 0.3s' }}>|</span>
          </p>

          {/* Room labels */}
          <AnimatePresence>
            {phase==='map' && MAP_ROOMS.map((r,i) => (
              <motion.div key={r.label} initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*0.13, type:'spring' }}
                style={{ position:'absolute', left:`${r.x}%`, top:`${r.y}%`, transform:'translate(-50%,-50%)', textAlign:'center', pointerEvents:'none' }}>
                <div style={{ fontSize:13 }}>{r.icon}</div>
                <div style={{ fontFamily:'Cinzel,serif', fontSize:6.5, color:'rgba(74,32,0,0.65)', whiteSpace:'nowrap', letterSpacing:'0.04em', marginTop:1 }}>{r.label}</div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Footstep trail */}
          <AnimatePresence>
            {phase==='map' && MARAUDERS_FOOTSTEPS.map((fp,i) => (
              <motion.div key={i} initial={{ opacity:0, scale:0 }} animate={{ opacity:0.9, scale:1 }} transition={{ delay:fp.delay+0.4 }}
                style={{ position:'absolute', left:`${fp.x}%`, top:`${fp.y}%`, fontSize:11, pointerEvents:'none', transform:'translate(-50%,-50%)' }}>
                👣
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Rashi pin at trail end */}
          <AnimatePresence>
            {phase==='map' && (
              <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:3.4 }}
                style={{ position:'absolute', left:'75%', top:'16%', transform:'translate(-50%,-100%)' }}>
                <motion.div animate={{ y:[0,-5,0] }} transition={{ repeat:Infinity, duration:1.5, ease:'easeInOut' }}
                  style={{ background:'rgba(116,0,1,0.88)', color:'#f0c75e', fontFamily:'Cinzel,serif', fontSize:8.5, padding:'3px 9px', borderRadius:3, border:'1px solid rgba(211,166,37,0.55)', whiteSpace:'nowrap', textAlign:'center', boxShadow:'0 2px 10px rgba(0,0,0,0.4)' }}>
                  ⚡ Rashi Hassani<br/><span style={{ fontSize:7, opacity:0.8 }}>Witch Extraordinaire</span>
                </motion.div>
                <div style={{ width:0, height:0, borderLeft:'5px solid transparent', borderRight:'5px solid transparent', borderTop:'6px solid rgba(116,0,1,0.88)', margin:'0 auto' }}/>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mischief Managed */}
        <AnimatePresence>
          {phase==='map' && (
            <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:3.8, type:'spring' }} style={{ width:'100%' }}>
              <Parchment style={{ textAlign:'center' }}>
                <p style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(14px,3.8vw,18px)', color:'#d3a625', margin:0, letterSpacing:'0.08em' }}>Mischief Managed! ✨</p>
                <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', color:'rgba(240,220,180,0.75)', fontSize:13, margin:'5px 0 0' }}>You know Hogwarts like a true witch! 🗝️</p>
              </Parchment>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase==='map' && (
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:4.3, type:'spring' }}>
              <HPBtn onClick={onDone} color="gold">✨ Cast Some Spells!</HPBtn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Steps cur={3} total={8}/>
    </div>
  );
}

// ── Envelope opening scene ─────────────────────────────────────
type EnvState = 'sealed'|'cracking'|'opening'|'risen';

const SEAL_SPARKS = Array.from({ length: 24 }, (_,i) => ({
  angle: (i/24)*360, dist: Math.random()*60+30,
  dur: Math.random()*0.5+0.4, size: Math.random()*8+5,
  color: ['#d3a625','#f0c75e','#740001','#ae0001','#ff6600'][Math.floor(Math.random()*5)],
}));

function EnvelopeScene({ onDone }: { onDone: ()=>void }) {
  const [env, setEnv] = useState<EnvState>('sealed');
  const [particles, setParticles] = useState(false);

  function tap() {
    if(env !== 'sealed') return;
    setEnv('cracking');
    setTimeout(()=>{ setParticles(true); setEnv('opening'); }, 500);
    setTimeout(()=>setEnv('risen'), 1400);
    setTimeout(()=>onDone(), 2800);
  }

  const W = 280, H = 176;

  return (
    <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:20 }}>
      <Night/>
      <Castle/>
      <GoldenSnitch/>

      <div style={{ position:'relative', zIndex:30, display:'flex', flexDirection:'column', alignItems:'center', gap:20, padding:'0 20px' }}>
        {/* Header */}
        <motion.div initial={{ y:-40, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.4, duration:1 }}
          style={{ textAlign:'center' }}>
          <p style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(10px,2.5vw,14px)', color:'rgba(211,166,37,0.55)', letterSpacing:'0.45em', textTransform:'uppercase', margin:'0 0 6px' }}>Hogwarts School of Witchcraft &amp; Wizardry</p>
          <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(211,166,37,0.4),transparent)', marginBottom:6 }}/>
          <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', fontSize:'clamp(15px,4vw,22px)', color:'#e8d5a0', margin:0 }}>
            A letter has arrived for<br/>
            <motion.span animate={{ color:['#f0c75e','#ffffff','#f0c75e'] }} transition={{ duration:3, repeat:Infinity }}
              style={{ fontWeight:'bold', fontSize:'clamp(18px,5vw,26px)' }}>Rashi Hassani ⚡</motion.span>
          </p>
        </motion.div>

        {/* Envelope */}
        <motion.div initial={{ y:120, opacity:0, rotate:-6 }} animate={{ y:0, opacity:1, rotate:0 }}
          transition={{ delay:0.8, duration:1.2, ease:[0.22,1,0.36,1] }}
          style={{ position:'relative', width:W, cursor: env==='sealed'?'pointer':'default' }}
          onClick={tap}>

          {/* Letter emerging from envelope */}
          <motion.div
            style={{ position:'absolute', left:24, right:24, bottom:16, borderRadius:2, overflow:'hidden', zIndex:2, originY:1 }}
            animate={env==='opening'||env==='risen' ? { height:200, y:-160 } : { height:0, y:0 }}
            transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}>
            <div style={{ background:'linear-gradient(160deg,#f9ecd0,#f0d9a8)', width:'100%', height:200, padding:'14px 16px', boxSizing:'border-box', borderRadius:2, boxShadow:'0 -8px 32px rgba(0,0,0,0.5)' }}>
              {/* Letter content */}
              <div style={{ borderBottom:'1px solid rgba(100,50,0,0.25)', paddingBottom:8, marginBottom:8, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:18 }}>⚡</span>
                <div>
                  <p style={{ fontFamily:'Cinzel,serif', fontSize:9, color:'#4a2000', margin:0, letterSpacing:'0.1em', textTransform:'uppercase' }}>Hogwarts School</p>
                  <p style={{ fontFamily:'Cinzel,serif', fontSize:7, color:'rgba(74,32,0,0.6)', margin:0, letterSpacing:'0.08em' }}>of Witchcraft &amp; Wizardry</p>
                </div>
              </div>
              <p style={{ fontFamily:'EB Garamond,serif', fontSize:11, color:'#3a1800', lineHeight:1.7, margin:0, fontStyle:'italic' }}>
                Dear <strong>Rashi Hassani</strong>,<br/>
                We are pleased to inform you<br/>
                that you have been accepted<br/>
                at Hogwarts School...<br/><br/>
                <span style={{ fontSize:10, opacity:0.7 }}>Term begins on 1 September.</span>
              </p>
              <div style={{ marginTop:10, display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ fontSize:12 }}>🦉</span>
                <p style={{ fontFamily:'Cinzel,serif', fontSize:8, color:'#4a2000', margin:0, letterSpacing:'0.08em' }}>Minerva McGonagall, Deputy Headmistress</p>
              </div>
            </div>
          </motion.div>

          {/* Envelope body */}
          <div style={{ position:'relative', width:W, height:H, zIndex:3 }}>
            {/* Body bg */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg,#2a1200,#1a0a00)', border:'2px solid rgba(211,166,37,0.5)', borderRadius:4, boxShadow:'0 0 40px rgba(211,166,37,0.15), 0 20px 60px rgba(0,0,0,0.7)' }}/>
            {/* inner diagonal lines (envelope texture) */}
            <div style={{ position:'absolute', inset:2, overflow:'hidden', borderRadius:3 }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, background:'repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(211,166,37,0.03) 20px,rgba(211,166,37,0.03) 21px)' }}/>
              {/* bottom-left crease */}
              <div style={{ position:'absolute', bottom:0, left:0, width:0, height:0, borderBottom:`${H-2}px solid rgba(0,0,0,0.2)`, borderRight:`${W/2}px solid transparent` }}/>
              {/* bottom-right crease */}
              <div style={{ position:'absolute', bottom:0, right:0, width:0, height:0, borderBottom:`${H-2}px solid rgba(0,0,0,0.15)`, borderLeft:`${W/2}px solid transparent` }}/>
            </div>
            {/* Gold trim lines */}
            <div style={{ position:'absolute', top:8, left:8, right:8, bottom:8, border:'1px solid rgba(211,166,37,0.2)', borderRadius:2, pointerEvents:'none' }}/>

            {/* Flap (triangle) - hides when opening */}
            <motion.div style={{ position:'absolute', top:-1, left:-1, right:-1, height:H*0.58, transformOrigin:'top center', zIndex:6 }}
              animate={env==='cracking'||env==='opening'||env==='risen' ? { scaleY:0, opacity:0 } : { scaleY:1, opacity:1 }}
              transition={{ duration:0.5, ease:[0.4,0,0.2,1] }}>
              <svg viewBox={`0 0 ${W+2} ${H*0.58}`} style={{ width:'100%', height:'100%', display:'block' }}>
                <defs>
                  <linearGradient id="flapGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3d1a00"/>
                    <stop offset="100%" stopColor="#1a0800"/>
                  </linearGradient>
                </defs>
                <polygon points={`0,0 ${W+2},0 ${(W+2)/2},${H*0.58}`} fill="url(#flapGrad)" stroke="rgba(211,166,37,0.5)" strokeWidth="2"/>
              </svg>
            </motion.div>

            {/* Wax seal on flap */}
            <motion.div style={{ position:'absolute', top:H*0.2, left:'50%', transform:'translateX(-50%)', zIndex:10 }}
              animate={env==='cracking' ? { scale:[1,1.3,0.3], rotate:[0,15,-20], opacity:[1,1,0] } :
                       env==='opening'||env==='risen' ? { scale:0, opacity:0 } : { scale:1, opacity:1 }}
              transition={{ duration:0.5 }}>
              <WaxSeal size={52}/>
            </motion.div>
          </div>

          {/* Tap hint */}
          <AnimatePresence>
            {env==='sealed' && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:[0.6,1,0.6] }} exit={{ opacity:0 }} transition={{ duration:1.5, repeat:Infinity }}
                style={{ position:'absolute', bottom:-28, left:'50%', transform:'translateX(-50%)', fontFamily:'EB Garamond,serif', fontStyle:'italic', fontSize:14, color:'rgba(211,166,37,0.8)', whiteSpace:'nowrap', textAlign:'center' }}>
                👆 Tap the seal to open your letter!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Seal shattering particles */}
        <AnimatePresence>
          {particles && (
            <div style={{ position:'absolute', top:'50%', left:'50%', pointerEvents:'none', zIndex:50 }}>
              {SEAL_SPARKS.map((p,i) => {
                const rad = p.angle * Math.PI / 180;
                return (
                  <motion.div key={i}
                    style={{ position:'absolute', width:p.size, height:p.size, borderRadius:p.size>7?'50%':2, background:p.color, top:0, left:0, boxShadow:`0 0 ${p.size}px ${p.color}` }}
                    initial={{ x:0, y:0, opacity:1, scale:1 }}
                    animate={{ x:Math.cos(rad)*p.dist*1.8, y:Math.sin(rad)*p.dist*1.8, opacity:0, scale:0 }}
                    exit={{}}
                    transition={{ duration:p.dur, ease:'easeOut' }}/>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* "Letter opened" prompt */}
        <AnimatePresence>
          {env==='risen' && (
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
              style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', color:'#f0c75e', fontSize:16, textAlign:'center' }}>
              ✨ Your letter from Hogwarts awaits... ✨
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── MAIN ───────────────────────────────────────────────────────
type Spell = 'patronus'|'incendio'|'hearts'|'confetti'|null;

export default function App() {
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [step, setStep]             = useState(0);
  const [owlTapped, setOwlTapped]   = useState(false);
  const [spell, setSpell]           = useState<Spell>(null);
  const [quizQ, setQuizQ]           = useState(0);
  const [votes, setVotes]           = useState<Record<string,number>>({G:0,R:0,H:0,S:0});
  const [house, setHouse]           = useState<string|null>(null);
  const [quizDone, setQuizDone]     = useState(false);
  const [litCandles, setLitCandles] = useState<number[]>([...Array(CANDLE_COUNT).keys()]);
  const [allOut, setAllOut]         = useState(false);
  const [wish, setWish]             = useState('');
  const [lumos, setLumos]           = useState(false);
  const [points, setPoints]         = useState(0);
  const [pointsMsgs, setPointsMsgs] = useState<PointMsg[]>([]);
  const spellRef  = useRef<ReturnType<typeof setTimeout>|null>(null);
  const tapTimes  = useRef<number[]>([]);
  const msgCounter = useRef(0);

  // Secret: 5 rapid taps anywhere → LUMOS!
  useEffect(() => {
    const onTouch = () => {
      const now = Date.now();
      tapTimes.current = [...tapTimes.current.filter(t => now-t < 1600), now];
      if (tapTimes.current.length >= 5) {
        tapTimes.current = [];
        setLumos(true);
        setTimeout(() => setLumos(false), 2400);
      }
    };
    window.addEventListener('touchstart', onTouch, { passive: true });
    return () => window.removeEventListener('touchstart', onTouch);
  }, []);

  function earnPoints(n=10) {
    setPoints(p => p + n);
    const msgs = [
      `✨ +${n} points!`, `🏆 +${n} house points!`, `⚡ +${n} magical points!`,
      `🪄 You caught a magic item! +${n}`, `🌟 +${n} Gryffindor points!`
    ];
    const id = msgCounter.current++;
    setPointsMsgs(s => [...s.slice(-3), { id, text: msgs[Math.floor(Math.random()*msgs.length)] }]);
    setTimeout(() => setPointsMsgs(s => s.filter(m => m.id !== id)), 2200);
  }

  function castSpell(s: Spell, ms=4500) {
    if(spellRef.current) clearTimeout(spellRef.current);
    setSpell(s);
    spellRef.current = setTimeout(()=>setSpell(null), ms);
  }

  function answerQuiz(h: string) {
    const nv = { ...votes, [h]:votes[h]+1 };
    setVotes(nv);
    if(quizQ < HOUSE_QUIZ.length-1) {
      setQuizQ(q=>q+1);
    } else {
      const top = Object.entries(nv).sort((a,b)=>b[1]-a[1])[0][0];
      setHouse(top); setQuizDone(true);
    }
  }

  function blowCandle(i: number) {
    const next = litCandles.filter(x=>x!==i);
    setLitCandles(next);
    if(next.length === 0) setTimeout(()=>setAllOut(true), 700);
  }

  const TOTAL = 8;
  const PAGE: React.CSSProperties = {
    position:'absolute', inset:0, display:'flex', flexDirection:'column',
    alignItems:'center', justifyContent:'center', overflow:'hidden',
  };

  return (
    <div style={{ position:'fixed', inset:0 }}>

      {/* ── Always-on creative layers ── */}
      <TouchSparkles/>
      <FloatingHPItems onPop={()=>earnPoints(10)}/>
      <LumosFlash active={lumos}/>
      <SnitchCounter count={points}/>
      <PointsToasts msgs={pointsMsgs}/>
      <ChocolateFrog onCatch={()=>earnPoints(50)}/>

      {/* Envelope intro — shown before everything else */}
      <AnimatePresence>
        {showEnvelope && (
          <motion.div key="envelope" style={{ position:'absolute', inset:0, zIndex:100 }}
            exit={{ opacity:0, scale:1.08 }} transition={{ duration:0.8, ease:[0.4,0,0.2,1] }}>
            <EnvelopeScene onDone={()=>setShowEnvelope(false)}/>
          </motion.div>
        )}
      </AnimatePresence>

      <Night/>
      <GoldenSnitch/>

      {spell==='confetti'  && <ConfettiRain/>}
      {spell==='patronus'  && <PatronusEffect/>}
      {spell==='incendio'  && <IncendioEffect/>}
      {spell==='hearts'    && <HeartsEffect/>}

      <AnimatePresence mode="wait">

        {/* ══ 0 — OWL POST ══ */}
        {step===0 && (
          <motion.div key="s0" style={PAGE} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0, y:-40 }} transition={{ duration:0.7 }}>
            <Castle/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:12, padding:'0 20px', paddingBottom:60 }}>
              {/* Logo */}
              <motion.div initial={{ y:-50, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.2, duration:0.9, ease:[0.22,1,0.36,1] }}
                style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(11px,3vw,16px)', color:'rgba(212,175,55,0.6)', letterSpacing:'0.4em', textTransform:'uppercase', marginBottom:4 }}>Hogwarts School of Witchcraft &amp; Wizardry</div>
                <h1 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(34px,10vw,72px)', fontWeight:700, color:'#d3a625', letterSpacing:'0.06em', textShadow:'0 0 40px rgba(211,166,37,0.9), 0 0 80px rgba(211,166,37,0.4)', margin:0, lineHeight:1 }}>Owl Post</h1>
                <div style={{ height:2, background:'linear-gradient(90deg,transparent,#d3a625,transparent)', marginTop:6 }}/>
              </motion.div>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
                style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(16px,4.5vw,24px)', color:'#e8d5a0', fontStyle:'italic', textAlign:'center', lineHeight:1.5, margin:0 }}>
                A letter has arrived for<br/><span style={{ color:'#f0c75e', fontWeight:'bold' }}>Rashi Hassani</span>
              </motion.p>

              {/* Tappable Hedwig */}
              <motion.div style={{ cursor:'pointer', WebkitTapHighlightColor:'transparent', touchAction:'manipulation', position:'relative' }}
                animate={{ y:[0,-14,0] }} transition={{ repeat:Infinity, duration:2.2, ease:'easeInOut' }}
                whileTap={{ scale:1.25, rotate:[0,12,-12,8,-8,0] }}
                onClick={()=>{ setOwlTapped(true); castSpell('patronus',2500); }}>
                <HedwigSvg size={150}/>
                {!owlTapped && (
                  <motion.div animate={{ opacity:[0.5,1,0.5], scale:[0.95,1.05,0.95] }} transition={{ repeat:Infinity, duration:1.8 }}
                    style={{ position:'absolute', bottom:-22, left:'50%', transform:'translateX(-50%)', fontFamily:'EB Garamond,serif', fontStyle:'italic', fontSize:13, color:'rgba(212,175,55,0.8)', whiteSpace:'nowrap' }}>
                    👆 Tap Hedwig!
                  </motion.div>
                )}
              </motion.div>

              {owlTapped && (
                <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ type:'spring' }}>
                  <Parchment style={{ maxWidth:340, textAlign:'center' }}>
                    <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', color:'#e8d5a0', fontSize:16, margin:0 }}>
                      Hedwig hoots with joy! 🎉 The wizarding world is ready to celebrate!
                    </p>
                  </Parchment>
                </motion.div>
              )}

              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.1 }}>
                <HPBtn onClick={()=>setStep(1)} color="gold">🪄 Open Your Letter</HPBtn>
              </motion.div>
            </div>
            <Steps cur={0} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 1 — WELCOME ══ */}
        {step===1 && (
          <motion.div key="s1" style={PAGE} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
            <Castle/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:16, padding:'16px 20px', maxWidth:500, width:'100%', paddingBottom:60 }}>
              <motion.div initial={{ scale:0, rotate:-20 }} animate={{ scale:1, rotate:0 }} transition={{ type:'spring', duration:0.8 }}>
                <WaxSeal size={64}/>
              </motion.div>
              <motion.h2 initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.2 }}
                style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(22px,6vw,38px)', color:'#d3a625', textAlign:'center', textShadow:'0 0 20px rgba(211,166,37,0.6)', margin:0, letterSpacing:'0.05em' }}>
                Happy 11th Birthday!
              </motion.h2>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
                style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(15px,3.8vw,20px)', color:'#e8d5a0', textAlign:'center', lineHeight:1.7, margin:0 }}>
                Your friends from Hogwarts have gathered from far and wide to celebrate the most magical birthday! 🏰✨
              </motion.p>

              <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                <FloatChar delay={0.3}><Dumbledore/></FloatChar>
                <FloatChar delay={0.5}><Harry/></FloatChar>
                <FloatChar delay={0.7}><Hermione wand/></FloatChar>
                <FloatChar delay={0.9}><Ron/></FloatChar>
                <FloatChar delay={1.1}><Dobby/></FloatChar>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
                {[
                  {e:'⚡',who:'Harry',msg:'You are one of the bravest people I know!'},
                  {e:'📚',who:'Hermione',msg:'Brilliance like yours is truly rare!'},
                  {e:'😄',who:'Ron',msg:'Can we have chocolate frogs at the party?!'},
                  {e:'🧦',who:'Dobby',msg:'Dobby is so very happy for you today!'},
                ].map((b,i)=>(
                  <motion.div key={i} initial={{ x:-30,opacity:0 }} animate={{ x:0,opacity:1 }} transition={{ delay:0.7+i*0.2 }}>
                    <Parchment style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ fontSize:20, flexShrink:0 }}>{b.e}</span>
                      <p style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(13px,3vw,16px)', color:'#e8d5a0', margin:0, fontStyle:'italic', lineHeight:1.4 }}>
                        <strong style={{ color:'#d3a625', fontStyle:'normal' }}>{b.who}:</strong> "{b.msg}"
                      </p>
                    </Parchment>
                  </motion.div>
                ))}
              </div>
              <HPBtn onClick={()=>setStep(2)} color="red">🎩 Try the Sorting Hat!</HPBtn>
            </div>
            <Steps cur={1} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 2 — SORTING HAT QUIZ ══ */}
        {step===2 && (
          <motion.div key="s2" style={PAGE} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
            <Castle/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:16, padding:'16px 20px', maxWidth:460, width:'100%', paddingBottom:60 }}>
              {!quizDone ? (<>
                <motion.div animate={{ rotate:[-6,6,-6] }} transition={{ repeat:Infinity, duration:2 }} style={{ fontSize:68 }}>🎩</motion.div>
                <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(18px,5vw,28px)', color:'#d3a625', textAlign:'center', margin:0 }}>The Sorting Hat Speaks...</h2>
                <Parchment style={{ width:'100%', textAlign:'center' }}>
                  <p style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(15px,4vw,20px)', color:'#f0e0b0', fontWeight:'bold', margin:0, lineHeight:1.6 }}>
                    {HOUSE_QUIZ[quizQ].q}
                  </p>
                </Parchment>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, width:'100%' }}>
                  {HOUSE_QUIZ[quizQ].answers.map((a,i)=>(
                    <motion.button key={i} whileTap={{ scale:0.9 }} onClick={()=>answerQuiz(a.house)}
                      style={{ minHeight:70, borderRadius:4, fontFamily:'Cinzel,serif', fontWeight:'bold', fontSize:13, background:'linear-gradient(135deg,rgba(40,20,5,0.9),rgba(60,30,5,0.8))', border:'1px solid rgba(212,175,55,0.35)', color:'#e8d5a0', cursor:'pointer', padding:'12px 10px', lineHeight:1.4, WebkitTapHighlightColor:'transparent', touchAction:'manipulation', position:'relative', overflow:'hidden' }}>
                      {a.text}
                    </motion.button>
                  ))}
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  {HOUSE_QUIZ.map((_,i)=>(
                    <div key={i} style={{ width:32, height:4, borderRadius:2, background:i<=quizQ?'#d3a625':'rgba(255,255,255,0.15)', transition:'all 0.3s' }}/>
                  ))}
                </div>
              </>) : house && (<>
                <motion.div initial={{ scale:0, rotate:-180 }} animate={{ scale:1, rotate:0 }} transition={{ type:'spring', duration:1 }}
                  style={{ fontSize:80 }}>{HOUSES[house].badge}</motion.div>
                <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(20px,5vw,30px)', color:'#d3a625', textAlign:'center', margin:0 }}>The Hat has decided...</h2>
                <motion.div initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:0.5, type:'spring' }}
                  style={{ width:'100%', background:`linear-gradient(135deg,${HOUSES[house].c1},${HOUSES[house].c2}22)`, border:`2px solid ${HOUSES[house].c2}`, borderRadius:4, padding:'18px 20px', textAlign:'center' }}>
                  <p style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(26px,8vw,44px)', fontWeight:700, color:HOUSES[house].c2, textShadow:`0 0 24px ${HOUSES[house].c2}`, margin:'0 0 8px' }}>{HOUSES[house].name}!</p>
                  <p style={{ fontFamily:'EB Garamond,serif', fontSize:15, color:'rgba(240,220,180,0.9)', margin:0, fontStyle:'italic' }}>House trait: {HOUSES[house].trait}</p>
                </motion.div>
                <Parchment style={{ width:'100%', textAlign:'center' }}>
                  <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', color:'#e8d5a0', fontSize:'clamp(14px,3.5vw,18px)', margin:0, lineHeight:1.6 }}>
                    {HOUSES[house].desc} {HOUSES[house].badge}
                  </p>
                </Parchment>
                <HPBtn onClick={()=>setStep(3)} color="gold">🗺️ The Marauder's Map!</HPBtn>
              </>)}
            </div>
            <Steps cur={2} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 3 — MARAUDER'S MAP ══ */}
        {step===3 && (
          <motion.div key="s3" style={PAGE} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
            <MaraudersMap onDone={()=>setStep(4)}/>
          </motion.div>
        )}

        {/* ══ 4 — SPELL BOOK ══ */}
        {step===4 && (
          <motion.div key="s4" style={PAGE} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
            <Castle/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'16px 20px', maxWidth:480, width:'100%', paddingBottom:60 }}>
              <motion.div initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} style={{ textAlign:'center' }}>
                <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(22px,6vw,34px)', color:'#d3a625', margin:'0 0 4px', letterSpacing:'0.06em' }}>🪄 Spell Book</h2>
                <p style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(14px,3.5vw,18px)', color:'rgba(240,220,180,0.7)', margin:0, fontStyle:'italic' }}>Tap a spell to cast it! ✨</p>
              </motion.div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, width:'100%', maxWidth:400 }}>
                <SpellBtn onClick={()=>castSpell('patronus',5000)} color="blue">🦌<br/>Expecto<br/>Patronum</SpellBtn>
                <SpellBtn onClick={()=>castSpell('incendio',4000)} color="red">🔥<br/>Incendio</SpellBtn>
                <SpellBtn onClick={()=>castSpell('hearts',5000)} color="purple">💖<br/>Amor<br/>Infinitum</SpellBtn>
                <SpellBtn onClick={()=>castSpell('confetti',5000)} color="gold">🎊<br/>Confetto<br/>Maxima!</SpellBtn>
                <SpellBtn onClick={()=>{castSpell('patronus',4000);}} color="green">⭐<br/>Lumos<br/>Solem</SpellBtn>
                <SpellBtn onClick={()=>castSpell('confetti',4000)} color="red">🪄<br/>Wingardium<br/>Leviosa</SpellBtn>
              </div>

              <AnimatePresence>
                {spell && (
                  <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0, opacity:0 }}>
                    <Parchment style={{ textAlign:'center' }}>
                      <p style={{ fontFamily:'Cinzel,serif', fontSize:15, color:'#f0c75e', margin:0, letterSpacing:'0.1em' }}>✨ SPELL CAST! ✨</p>
                    </Parchment>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ display:'flex', gap:16, justifyContent:'center' }}>
                <Harry glint={spell==='patronus'}/>
                <Hermione wand={spell!==null}/>
                <Ron blush={spell==='hearts'}/>
              </div>

              <HPBtn onClick={()=>setStep(5)} color="gold">📜 Read Your Birthday Letter</HPBtn>
            </div>
            <Steps cur={4} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 5 — LETTER ══ */}
        {step===5 && (
          <motion.div key="s5" style={PAGE} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
            <FloatingHallCandles/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:12, padding:'16px', maxWidth:560, width:'100%', height:'100%', overflow:'hidden' }}>
              <motion.div initial={{ y:-16, opacity:0 }} animate={{ y:0, opacity:1 }}
                style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
                <WaxSeal size={42}/>
                <div>
                  <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(18px,5vw,26px)', color:'#d3a625', margin:0, letterSpacing:'0.05em' }}>Birthday Letter</h2>
                  <p style={{ fontFamily:'EB Garamond,serif', fontSize:13, color:'rgba(240,220,180,0.6)', margin:0, fontStyle:'italic' }}>From Dev Kumar, with love</p>
                </div>
                <WaxSeal size={42}/>
              </motion.div>

              <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3 }}
                style={{ flex:1, overflowY:'auto', width:'100%', maxHeight:'calc(100dvh - 190px)', background:'linear-gradient(135deg,rgba(45,20,5,0.88),rgba(20,8,2,0.92))', border:'1px solid rgba(212,175,55,0.3)', borderRadius:4, padding:'20px 20px', WebkitOverflowScrolling:'touch', position:'relative' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.5),transparent)' }}/>
                <pre style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(14px,3.8vw,19px)', color:'#f0e0c0', lineHeight:1.95, whiteSpace:'pre-wrap', wordBreak:'break-word', margin:0 }}>{LETTER_TEXT}</pre>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent)' }}/>
              </motion.div>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }} style={{ flexShrink:0 }}>
                <HPBtn onClick={()=>setStep(6)} color="purple">🎂 Blow Out the Candles!</HPBtn>
              </motion.div>
            </div>
            <Steps cur={5} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 6 — CAKE ══ */}
        {step===6 && (
          <motion.div key="s6" style={PAGE} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
            <Castle/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'16px 20px', maxWidth:480, width:'100%', paddingBottom:60 }}>
              {!allOut ? (<>
                <motion.h2 initial={{ y:-18, opacity:0 }} animate={{ y:0, opacity:1 }}
                  style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(20px,6vw,30px)', color:'#d3a625', textAlign:'center', margin:0, letterSpacing:'0.05em' }}>
                  🎂 Blow Out the Candles!
                </motion.h2>
                <Parchment style={{ width:'100%', textAlign:'center' }}>
                  <p style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(14px,3.5vw,18px)', color:'#e8d5a0', margin:0 }}>
                    Tap each candle to blow it out! 🕯️ ({litCandles.length} remaining)
                  </p>
                </Parchment>
                <motion.div initial={{ scale:0.85, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:0.4 }}>
                  <Cake lit={litCandles} onTap={blowCandle}/>
                </motion.div>
                {litCandles.length < CANDLE_COUNT && litCandles.length > 0 && (
                  <motion.p animate={{ opacity:[0.6,1,0.6] }} transition={{ repeat:Infinity, duration:1.4 }}
                    style={{ fontFamily:'EB Garamond,serif', color:'rgba(240,199,94,0.8)', fontSize:15, textAlign:'center', fontStyle:'italic', margin:0 }}>
                    Keep going! {litCandles.length} candle{litCandles.length!==1?'s':''} left! 🌟
                  </motion.p>
                )}
              </>) : (<>
                <ConfettiRain/>
                <motion.div initial={{ scale:0 }} animate={{ scale:[0,1.4,1] }} transition={{ duration:0.8 }} style={{ fontSize:76 }}>🌟</motion.div>
                <h3 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(22px,6vw,32px)', color:'#f0c75e', textAlign:'center', margin:0 }}>Make Your Wish! ✨</h3>
                <Parchment style={{ width:'100%', textAlign:'center' }}>
                  <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', color:'#e8d5a0', fontSize:'clamp(14px,3.5vw,17px)', margin:0 }}>
                    Close your eyes, make a wish, and type it below... The stars will hear it! 🌙⭐
                  </p>
                </Parchment>
                <input type="text" placeholder="My secret wish... 🌙" value={wish} onChange={e=>setWish(e.target.value)}
                  style={{ width:'100%', maxWidth:360, padding:'16px 20px', borderRadius:4, border:'1px solid rgba(212,175,55,0.5)', background:'rgba(40,18,5,0.85)', color:'#f0e0c0', fontFamily:'EB Garamond,serif', fontSize:17, outline:'none', boxSizing:'border-box', textAlign:'center' }}/>
                <HPBtn onClick={()=>setStep(7)} color="gold">⭐ Send My Wish to the Stars!</HPBtn>
              </>)}
            </div>
            <Steps cur={6} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 7 — FINALE ══ */}
        {step===7 && (
          <motion.div key="s7" style={PAGE} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6 }}>
            <ConfettiRain/>
            <HeartsEffect/>
            <Castle/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:16, padding:'16px 20px', maxWidth:500, width:'100%', paddingBottom:60 }}>
              <motion.div initial={{ scale:0 }} animate={{ scale:[0,1.5,1] }} transition={{ duration:0.9 }} style={{ fontSize:'clamp(56px,16vw,96px)' }}>🎂</motion.div>
              <motion.h1 initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.5 }}
                style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(24px,7vw,50px)', fontWeight:700, color:'#d3a625', textAlign:'center', textShadow:'0 0 40px rgba(211,166,37,0.9)', margin:0, lineHeight:1.2, letterSpacing:'0.04em' }}>
                Happy Birthday<br/>Rashi! ⚡
              </motion.h1>
              {wish && (
                <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.7 }}>
                  <Parchment style={{ textAlign:'center', width:'100%', maxWidth:380 }}>
                    <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', color:'#f0c75e', fontSize:'clamp(14px,3.5vw,18px)', margin:0, lineHeight:1.6 }}>
                      ✨ Your wish: "{wish}" ✨
                    </p>
                    <p style={{ fontFamily:'EB Garamond,serif', color:'rgba(240,220,180,0.6)', fontSize:13, margin:'6px 0 0' }}>The stars heard every word 🌙</p>
                  </Parchment>
                </motion.div>
              )}
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
                style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(15px,4vw,22px)', color:'#e8d5a0', textAlign:'center', fontStyle:'italic', lineHeight:1.7, margin:0 }}>
                May you always find magic in every day,<br/>adventure in every corner, and know you are<br/>loved beyond all the stars in the wizarding sky. 🌟
              </motion.p>
              <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
                <FloatChar delay={0}><Dumbledore/></FloatChar>
                <FloatChar delay={0.15}><Harry glint/></FloatChar>
                <FloatChar delay={0.3}><Hermione wand/></FloatChar>
                <FloatChar delay={0.45}><Ron blush/></FloatChar>
                <FloatChar delay={0.6}><Dobby/></FloatChar>
              </div>
              <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:1.1, type:'spring' }}>
                <Parchment style={{ textAlign:'center' }}>
                  <p style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(15px,4vw,20px)', color:'#d3a625', margin:0, letterSpacing:'0.06em' }}>With all my love — Dev Kumar ❤️</p>
                </Parchment>
              </motion.div>
              <motion.button whileTap={{ scale:0.95 }}
                onClick={()=>{ setStep(0); setOwlTapped(false); setSpell(null); setQuizQ(0); setVotes({G:0,R:0,H:0,S:0}); setHouse(null); setQuizDone(false); setLitCandles([...Array(CANDLE_COUNT).keys()]); setAllOut(false); setWish(''); setShowEnvelope(true); }}
                style={{ ...BTN_STYLES.ghost, minHeight:50, borderRadius:4, fontFamily:'Cinzel,serif', fontSize:14, textTransform:'uppercase', letterSpacing:'0.08em', padding:'12px 32px', cursor:'pointer', WebkitTapHighlightColor:'transparent' }}>
                ↩ Watch Again
              </motion.button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
