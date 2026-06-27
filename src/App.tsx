import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Config Arrays (stable – created once) ─────────────────────
const STARS = Array.from({ length: 100 }, () => ({
  top: Math.random() * 100, left: Math.random() * 100,
  size: Math.random() * 3 + 1, dur: Math.random() * 3 + 2, delay: Math.random() * 3,
}));
const SHOOTING = Array.from({ length: 6 }, (_, i) => ({
  top: Math.random() * 40 + 5, delay: i * 4 + Math.random() * 2, dur: 1.2,
}));
const CONFETTI = Array.from({ length: 120 }, () => ({
  left: Math.random() * 100, dur: Math.random() * 3 + 2, delay: Math.random() * 2,
  color: ['#ae0001','#f0c75e','#222f5b','#1a472a','#ff69b4','#9b59b6','#3498db'][Math.floor(Math.random() * 7)],
  rotate: Math.random() * 360, w: Math.random() * 10 + 6, h: Math.random() * 6 + 4,
}));
const PATRONUS = Array.from({ length: 20 }, () => ({
  top: Math.random() * 70 + 15, dur: Math.random() * 3 + 4, delay: Math.random() * 3,
  scale: Math.random() * 0.6 + 0.7,
  animal: ['🦌','🐕','🐰','🐈','🦦','🦋','🌟'][Math.floor(Math.random() * 7)],
}));
const INCENDIO = Array.from({ length: 40 }, () => ({
  left: Math.random() * 100, dur: Math.random() * 1.2 + 0.8, delay: Math.random() * 2.5,
  size: Math.random() * 18 + 16,
}));
const HEARTS = Array.from({ length: 50 }, () => ({
  left: Math.random() * 100, dur: Math.random() * 4 + 3, delay: Math.random() * 4,
  size: Math.random() * 16 + 14,
  emoji: ['❤️','💕','💖','💗','💝','🌸','✨'][Math.floor(Math.random() * 7)],
}));
const SPARKLES_BG = Array.from({ length: 30 }, () => ({
  top: Math.random() * 100, left: Math.random() * 100,
  dur: Math.random() * 2 + 1, delay: Math.random() * 3, size: Math.random() * 14 + 10,
}));
const HOUSE_QUIZ = [
  { q: '⚡ Your friend needs help. What do you do?', answers: [
    { text: '🦁 Jump in bravely!', house: 'G' },
    { text: '📚 Research first', house: 'R' },
    { text: '👯 Ask everyone to help', house: 'H' },
    { text: '🧠 Make a clever plan', house: 'S' },
  ]},
  { q: '🎂 What\'s your favourite birthday gift?', answers: [
    { text: '🪄 A magic wand!', house: 'G' },
    { text: '📖 A huge book', house: 'R' },
    { text: '🎀 Surprise party!', house: 'H' },
    { text: '🏆 Something special', house: 'S' },
  ]},
  { q: '🌙 What would you do at Hogwarts?', answers: [
    { text: '🔥 Quidditch captain!', house: 'G' },
    { text: '🔬 Every spell in class', house: 'R' },
    { text: '🍰 Bake for everyone', house: 'H' },
    { text: '🌿 Explore secret rooms', house: 'S' },
  ]},
];
const HOUSES: Record<string, { name: string; color: string; badge: string; desc: string }> = {
  G: { name: 'Gryffindor', color: '#ae0001', badge: '🦁', desc: 'Brave, daring & full of heart — just like you!' },
  R: { name: 'Ravenclaw',  color: '#222f5b', badge: '🦅', desc: 'Clever, creative & always curious!' },
  H: { name: 'Hufflepuff', color: '#f0c75e', badge: '🦡', desc: 'Kind, loyal & the best friend anyone could have!' },
  S: { name: 'Slytherin',  color: '#1a472a', badge: '🐍', desc: 'Ambitious, resourceful & destined for greatness!' },
};
const CANDLE_COUNT = 11;
const LETTER = `⚡ Dear Rashi,

The Headmistress of Hogwarts is DELIGHTED to inform you that today is your most magical birthday ever!

You are 11 years old today — the very age when witches and wizards receive their Hogwarts letter! 🦉✉️

You have always had the most wonderful magic inside you. The kind that makes everyone around you smile, laugh, and feel loved.

You are kind, funny, creative, and absolutely brilliant. The wizarding world is so lucky to have you! 🌟

May this year bring you:
✨ New adventures
🎯 New skills to learn  
🤝 Amazing friendships
🏆 All your dreams coming true
🎂 The most delicious cake ever!

Happy 11th Birthday, little witch! 🎉🪄

With all the love in the wizarding world,
Dev Kumar ❤️

P.S. The Marauders' Map shows you having the BEST day ever! 🗺️
P.P.S. Dobby thinks you are the kindest person he has ever met! 🧦`;

// ── Background ─────────────────────────────────────────────────
function StarsBg() {
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      {STARS.map((s,i) => (
        <motion.div key={i} style={{ position:'absolute', top:`${s.top}%`, left:`${s.left}%`, width:s.size, height:s.size, borderRadius:'50%', background:'#fff' }}
          animate={{ opacity:[0.1,0.9,0.1], scale:[1,1.6,1] }}
          transition={{ duration:s.dur, delay:s.delay, repeat:Infinity }} />
      ))}
      {SHOOTING.map((s,i) => (
        <motion.div key={'sh'+i} style={{ position:'absolute', top:`${s.top}%`, left:'-5%', width:80, height:2, background:'linear-gradient(90deg,transparent,white,transparent)', borderRadius:2 }}
          animate={{ x:['0vw','110vw'], opacity:[0,1,0] }}
          transition={{ duration:s.dur, delay:s.delay, repeat:Infinity, repeatDelay:8 }} />
      ))}
    </div>
  );
}

function Mountains() {
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:1, pointerEvents:'none' }}>
      <svg viewBox="0 0 1200 200" style={{ width:'100%', display:'block' }} preserveAspectRatio="none">
        <polygon points="0,200 200,60 400,130 600,30 800,110 1000,50 1200,120 1200,200" fill="#1a0a2e" opacity="0.95"/>
        <polygon points="0,200 100,90 300,160 550,55 750,130 950,75 1150,140 1200,200" fill="#0f0620" opacity="0.8"/>
        <polygon points="0,200 0,170 150,140 300,165 500,135 700,155 900,130 1100,150 1200,140 1200,200" fill="#0a0a1a" opacity="0.6"/>
      </svg>
    </div>
  );
}

// ── Spell Overlays ─────────────────────────────────────────────
function ConfettiRain() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:40 }}>
      {CONFETTI.map((c,i) => (
        <motion.div key={i} style={{ position:'absolute', left:`${c.left}%`, top:-20, width:c.w, height:c.h, background:c.color, borderRadius:c.w > 8 ? 2 : '50%' }}
          animate={{ y:'110vh', rotate:c.rotate+720, opacity:[1,1,0] }}
          transition={{ duration:c.dur, delay:c.delay, repeat:Infinity, ease:'linear' }} />
      ))}
    </div>
  );
}
function PatronusEffect() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:35 }}>
      {PATRONUS.map((p,i) => (
        <motion.div key={i} style={{ position:'absolute', top:`${p.top}%`, fontSize:36*p.scale }}
          initial={{ x:'-15vw', opacity:0 }} animate={{ x:'115vw', opacity:[0,1,1,0] }}
          transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, repeatDelay:0.5 }}>
          {p.animal}
        </motion.div>
      ))}
    </div>
  );
}
function IncendioEffect() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:35 }}>
      {INCENDIO.map((f,i) => (
        <motion.div key={i} style={{ position:'absolute', left:`${f.left}%`, bottom:0, fontSize:f.size }}
          initial={{ y:0, opacity:1 }} animate={{ y:'-90vh', opacity:[1,1,0], scale:[1,1.3,0.5] }}
          transition={{ duration:f.dur, delay:f.delay, repeat:Infinity, repeatDelay:0.3 }}>🔥</motion.div>
      ))}
    </div>
  );
}
function HeartsEffect() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:35 }}>
      {HEARTS.map((h,i) => (
        <motion.div key={i} style={{ position:'absolute', left:`${h.left}%`, bottom:0, fontSize:h.size }}
          initial={{ y:0, opacity:1 }} animate={{ y:'-110vh', opacity:[1,1,0], x:[0,10,-10,0] }}
          transition={{ duration:h.dur, delay:h.delay, repeat:Infinity, repeatDelay:1, x:{ duration:1.5, repeat:Infinity } }}>
          {h.emoji}
        </motion.div>
      ))}
    </div>
  );
}
function SparklesBg() {
  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:5 }}>
      {SPARKLES_BG.map((s,i) => (
        <motion.div key={i} style={{ position:'absolute', top:`${s.top}%`, left:`${s.left}%`, fontSize:s.size }}
          animate={{ opacity:[0,1,0], scale:[0.5,1.2,0.5], rotate:[0,180,360] }}
          transition={{ duration:s.dur, delay:s.delay, repeat:Infinity }}>✨</motion.div>
      ))}
    </div>
  );
}

// ── Hedwig SVG ─────────────────────────────────────────────────
function HedwigSvg({ size=160 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width:size, height:size, display:'block', filter:'drop-shadow(0 0 16px rgba(255,255,255,0.5))' }}>
      <path d="M 30 50 C 30 20, 70 20, 70 50 C 70 80, 30 80, 30 50 Z" fill="#f8f8fc"/>
      <path d="M 35 55 C 35 35, 65 35, 65 55 C 65 75, 35 75, 35 55 Z" fill="#e8e8f0"/>
      <path d="M 28 30 L 35 45 L 22 42 Z" fill="#d8d8e8"/>
      <path d="M 72 30 L 65 45 L 78 42 Z" fill="#d8d8e8"/>
      <circle cx="42" cy="38" r="9" fill="#f59e0b"/>
      <circle cx="58" cy="38" r="9" fill="#f59e0b"/>
      <circle cx="42" cy="38" r="5" fill="#1a0a2e"/>
      <circle cx="58" cy="38" r="5" fill="#1a0a2e"/>
      <circle cx="44" cy="36" r="2" fill="white"/>
      <circle cx="60" cy="36" r="2" fill="white"/>
      <polygon points="48,46 52,46 50,54" fill="#d97706"/>
      <motion.path d="M 30 52 Q 0 32 12 72 Z" fill="#d4d4e0"
        animate={{ rotate:[0,-12,0] }} transition={{ repeat:Infinity, duration:0.7, ease:'easeInOut' }}
        style={{ transformOrigin:'30px 52px' }}/>
      <motion.path d="M 70 52 Q 100 32 88 72 Z" fill="#d4d4e0"
        animate={{ rotate:[0,12,0] }} transition={{ repeat:Infinity, duration:0.7, ease:'easeInOut' }}
        style={{ transformOrigin:'70px 52px' }}/>
    </svg>
  );
}

// ── Mini Characters ────────────────────────────────────────────
function Harry({ glint=false }: { glint?: boolean }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
      <div style={{ position:'relative', width:56, height:80 }}>
        <div style={{ position:'absolute', top:0, left:13, width:30, height:14, background:'#111', borderTopLeftRadius:14, borderTopRightRadius:14, clipPath:'polygon(0 0,100% 0,100% 100%,78% 55%,55% 100%,35% 55%,0 100%)' }}/>
        <div style={{ position:'absolute', top:8, left:30, fontSize:9, color:'#f5c842', fontWeight:'bold', transform:'rotate(10deg)' }}>⚡</div>
        <div style={{ position:'absolute', top:10, left:14, width:28, height:28, background:'#fcd5b5', borderRadius:'50%', zIndex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:1 }}>
          <div style={{ width:9, height:9, border:'2px solid #333', borderRadius:'50%', background:glint?'rgba(255,255,255,0.7)':'transparent' }}/>
          <div style={{ width:9, height:9, border:'2px solid #333', borderRadius:'50%', background:glint?'rgba(255,255,255,0.7)':'transparent' }}/>
          <div style={{ position:'absolute', top:13, width:4, height:1.5, background:'#333' }}/>
        </div>
        <div style={{ position:'absolute', bottom:0, left:8, width:40, height:44, background:'#1a1a1a', borderTopLeftRadius:4, borderTopRightRadius:4, zIndex:2, display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ width:9, height:11, background:'#ae0001', borderBottom:'2px solid #f0c75e' }}/>
        </div>
      </div>
      <span style={{ fontFamily:'Cinzel,serif', fontSize:10, color:'#d4af37' }}>Harry ⚡</span>
    </div>
  );
}

function Hermione({ wand=false }: { wand?: boolean }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
      <div style={{ position:'relative', width:56, height:80 }}>
        <div style={{ position:'absolute', top:0, left:10, width:36, height:34, background:'#5c3317', borderRadius:'50%' }}/>
        <div style={{ position:'absolute', top:10, left:15, width:26, height:26, background:'#fcd5b5', borderRadius:'50%', zIndex:1 }}/>
        <div style={{ position:'absolute', bottom:0, left:10, width:36, height:45, background:'#1a1a1a', borderTopLeftRadius:4, borderTopRightRadius:4, zIndex:2, display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ width:7, height:9, background:'#ae0001' }}/>
        </div>
        {wand && <motion.div
          style={{ position:'absolute', right:-8, top:28, width:32, height:3, background:'#654321', borderRadius:2, transformOrigin:'left', zIndex:10 }}
          animate={{ rotate:[-20,20,-20] }} transition={{ repeat:Infinity, duration:0.8 }}/>}
        {wand && <motion.div
          style={{ position:'absolute', right:-40, top:16, fontSize:16, zIndex:11 }}
          animate={{ opacity:[0,1,0], scale:[0.5,1.5,0.5] }} transition={{ repeat:Infinity, duration:0.8 }}>✨</motion.div>}
      </div>
      <span style={{ fontFamily:'Cinzel,serif', fontSize:10, color:'#d4af37' }}>Hermione 📚</span>
    </div>
  );
}

function Ron({ blush=false }: { blush?: boolean }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
      <div style={{ position:'relative', width:56, height:80 }}>
        <div style={{ position:'absolute', top:0, left:14, width:28, height:15, background:'#d95e16', borderTopLeftRadius:12, borderTopRightRadius:12 }}/>
        <div style={{ position:'absolute', top:10, left:14, width:28, height:28, background:'#fcd5b5', borderRadius:'50%', zIndex:1 }}>
          {blush && <>
            <div style={{ position:'absolute', top:17, left:2, width:7, height:5, background:'rgba(255,100,100,0.5)', borderRadius:'50%', filter:'blur(2px)' }}/>
            <div style={{ position:'absolute', top:17, right:2, width:7, height:5, background:'rgba(255,100,100,0.5)', borderRadius:'50%', filter:'blur(2px)' }}/>
          </>}
        </div>
        <div style={{ position:'absolute', bottom:0, left:8, width:40, height:44, background:'#1a1a1a', borderTopLeftRadius:4, borderTopRightRadius:4, zIndex:2, display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ width:9, height:11, background:'#ae0001', borderBottom:'2px solid #f0c75e' }}/>
        </div>
      </div>
      <span style={{ fontFamily:'Cinzel,serif', fontSize:10, color:'#d4af37' }}>Ron 😄</span>
    </div>
  );
}

function Dobby() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
      <div style={{ position:'relative', width:56, height:70 }}>
        <div style={{ position:'absolute', top:8, left:-6, width:22, height:10, background:'#e6c1a8', borderRadius:'50%', transform:'rotate(-25deg)' }}/>
        <div style={{ position:'absolute', top:8, right:-6, width:22, height:10, background:'#e6c1a8', borderRadius:'50%', transform:'rotate(25deg)' }}/>
        <div style={{ position:'absolute', top:4, left:14, width:28, height:30, background:'#e6c1a8', borderRadius:'50%', zIndex:1, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:9, gap:2 }}>
          <div style={{ width:8, height:8, background:'#759e5e', borderRadius:'50%', border:'1px solid #333', display:'flex', alignItems:'center', justifyContent:'center' }}><div style={{ width:3, height:3, background:'#111', borderRadius:'50%' }}/></div>
          <div style={{ width:8, height:8, background:'#759e5e', borderRadius:'50%', border:'1px solid #333', display:'flex', alignItems:'center', justifyContent:'center' }}><div style={{ width:3, height:3, background:'#111', borderRadius:'50%' }}/></div>
        </div>
        <div style={{ position:'absolute', bottom:0, left:13, width:30, height:28, background:'#d5cbb8', clipPath:'polygon(10% 0,90% 0,100% 100%,0 100%)', zIndex:2 }}/>
      </div>
      <span style={{ fontFamily:'Cinzel,serif', fontSize:10, color:'#d4af37' }}>Dobby 🧦</span>
    </div>
  );
}

// ── Birthday Cake ──────────────────────────────────────────────
function BirthdayCake({ litCandles, onTap }: { litCandles: number[]; onTap:(i:number)=>void }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:0, userSelect:'none' }}>
      {/* Candles row */}
      <div style={{ display:'flex', gap:6, marginBottom:2, flexWrap:'wrap', justifyContent:'center', maxWidth:280 }}>
        {Array.from({ length: CANDLE_COUNT }, (_, i) => (
          <motion.div key={i} onTap={() => onTap(i)} onClick={() => onTap(i)}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer', WebkitTapHighlightColor:'transparent' }}
            whileTap={{ scale:0.85 }}>
            {/* flame or smoke */}
            <div style={{ height:20, width:14, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
              {litCandles.includes(i) ? (
                <motion.div animate={{ scaleY:[1,1.3,0.9,1.2,1], rotate:[-5,5,-3,4,0] }} transition={{ repeat:Infinity, duration:0.5 }}
                  style={{ fontSize:16, lineHeight:1 }}>🔥</motion.div>
              ) : (
                <motion.div initial={{ opacity:1 }} animate={{ opacity:[1,0] }} transition={{ duration:1.5 }}
                  style={{ width:2, height:10, background:'rgba(150,150,150,0.6)', borderRadius:1, marginBottom:2 }}/>
              )}
            </div>
            {/* candle stick */}
            <div style={{ width:10, height:32, background: litCandles.includes(i) ? `hsl(${i*30},80%,55%)` : '#aaa', borderRadius:'4px 4px 2px 2px', boxShadow: litCandles.includes(i) ? `0 0 8px hsl(${i*30},80%,55%)` : 'none', transition:'all 0.3s' }}/>
          </motion.div>
        ))}
      </div>
      {/* Cake */}
      <div style={{ position:'relative' }}>
        {/* top layer */}
        <div style={{ width:200, height:40, background:'linear-gradient(135deg,#ff9a9e,#fad0c4)', borderRadius:'8px 8px 0 0', border:'2px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:13, fontFamily:'Cinzel,serif', color:'#5a1a1a', fontWeight:'bold' }}>Happy Birthday! 🎂</span>
        </div>
        {/* middle layer */}
        <div style={{ width:220, height:44, marginLeft:-10, background:'linear-gradient(135deg,#a18cd1,#fbc2eb)', border:'2px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:22 }}>⭐🌙⭐🌙⭐</span>
        </div>
        {/* bottom layer */}
        <div style={{ width:240, height:50, marginLeft:-20, background:'linear-gradient(135deg,#f093fb,#f5576c)', borderRadius:'0 0 8px 8px', border:'2px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:14, fontFamily:'Cinzel,serif', color:'white', fontWeight:'bold', textShadow:'0 1px 3px rgba(0,0,0,0.4)' }}>Rashi ⚡ 11 Years</span>
        </div>
        {/* drips */}
        {[20,55,90,130,165].map((x,i) => (
          <div key={i} style={{ position:'absolute', top:38, left:x, width:8, height:14, background:'#ff9a9e', borderRadius:'0 0 6px 6px' }}/>
        ))}
      </div>
    </div>
  );
}

// ── Floating Tap Hint ──────────────────────────────────────────
function TapHint({ text }: { text: string }) {
  return (
    <motion.div animate={{ y:[0,-6,0], opacity:[0.7,1,0.7] }} transition={{ repeat:Infinity, duration:2 }}
      style={{ fontSize:14, color:'rgba(245,230,200,0.8)', fontFamily:'EB Garamond,serif', fontStyle:'italic', textAlign:'center' }}>
      👆 {text}
    </motion.div>
  );
}

// ── Big Mobile Button ──────────────────────────────────────────
function MagicBtn({ onClick, children, color='gold', disabled=false }: { onClick:()=>void; children:React.ReactNode; color?:string; disabled?:boolean }) {
  const styles: Record<string, React.CSSProperties> = {
    gold:   { background:'linear-gradient(135deg,#d4af37,#f5c842,#d4af37)', color:'#1a0a2e', boxShadow:'0 0 24px rgba(245,200,66,0.7)' },
    purple: { background:'linear-gradient(135deg,#6b21a8,#9333ea)', color:'white', boxShadow:'0 0 24px rgba(147,51,234,0.6)' },
    pink:   { background:'linear-gradient(135deg,#db2777,#f472b6)', color:'white', boxShadow:'0 0 24px rgba(244,114,182,0.6)' },
    teal:   { background:'linear-gradient(135deg,#065f46,#10b981)', color:'white', boxShadow:'0 0 24px rgba(16,185,129,0.6)' },
    red:    { background:'linear-gradient(135deg,#7b1c30,#ef4444)', color:'white', boxShadow:'0 0 24px rgba(239,68,68,0.5)' },
  };
  const s = styles[color] || styles.gold;
  return (
    <motion.button whileTap={{ scale: disabled ? 1 : 0.94 }} onClick={disabled ? undefined : onClick}
      style={{ ...s, width:'92%', maxWidth:380, minHeight:68, borderRadius:999, fontFamily:'Cinzel,serif', fontWeight:'bold', fontSize:17, textTransform:'uppercase', letterSpacing:'0.08em', display:'flex', alignItems:'center', justifyContent:'center', gap:10, border:'none', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1, WebkitTapHighlightColor:'transparent', touchAction:'manipulation' }}>
      {children}
    </motion.button>
  );
}

function SpellBtn({ onClick, children, color='gold' }: { onClick:()=>void; children:React.ReactNode; color?:string }) {
  const styles: Record<string, React.CSSProperties> = {
    gold:   { background:'linear-gradient(135deg,#d4af37,#f5c842)', color:'#1a0a2e' },
    purple: { background:'linear-gradient(135deg,#4c1d95,#7c3aed)', color:'white' },
    teal:   { background:'linear-gradient(135deg,#065f46,#059669)', color:'white' },
    amber:  { background:'linear-gradient(135deg,#92400e,#d97706)', color:'white' },
    red:    { background:'linear-gradient(135deg,#7b1c30,#dc2626)', color:'white' },
    pink:   { background:'linear-gradient(135deg,#9d174d,#ec4899)', color:'white' },
    blue:   { background:'linear-gradient(135deg,#1e3a8a,#3b82f6)', color:'white' },
  };
  return (
    <motion.button whileTap={{ scale:0.9 }} onClick={onClick}
      style={{ ...(styles[color]||styles.gold), minHeight:64, borderRadius:18, fontFamily:'Cinzel,serif', fontWeight:'bold', fontSize:13, textTransform:'uppercase', letterSpacing:'0.05em', display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'8px 10px', border:'1px solid rgba(255,255,255,0.15)', cursor:'pointer', WebkitTapHighlightColor:'transparent', touchAction:'manipulation', textAlign:'center', lineHeight:1.3 }}>
      {children}
    </motion.button>
  );
}

// ── Step dots ──────────────────────────────────────────────────
function Steps({ cur, total }: { cur:number; total:number }) {
  return (
    <div style={{ position:'absolute', bottom:20, left:0, width:'100%', display:'flex', justifyContent:'center', gap:10, zIndex:50, pointerEvents:'none' }}>
      {Array.from({ length:total }, (_,i) => (
        <div key={i} style={{ width: i===cur ? 20 : 10, height:10, borderRadius:5, background: i<=cur ? '#f5c842' : 'rgba(255,255,255,0.2)', boxShadow: i<=cur ? '0 0 8px #f5c842' : 'none', transition:'all 0.4s' }}/>
      ))}
    </div>
  );
}

// ── FloatChar ──────────────────────────────────────────────────
function FloatChar({ children, delay=0 }: { children:React.ReactNode; delay?:number }) {
  return (
    <motion.div initial={{ opacity:0, scale:0.5, y:20 }} animate={{ opacity:1, scale:1, y:[0,-8,0] }}
      transition={{ opacity:{ delay, duration:0.4 }, scale:{ delay, duration:0.4 }, y:{ delay:delay+0.4, repeat:Infinity, duration:2.5, ease:'easeInOut' } }}>
      {children}
    </motion.div>
  );
}

// ── MAIN ───────────────────────────────────────────────────────
type Spell = 'patronus'|'incendio'|'hearts'|'confetti'|null;

export default function App() {
  const [step, setStep] = useState(0);
  const [owlTapped, setOwlTapped]   = useState(false);
  const [spell, setSpell]           = useState<Spell>(null);
  const [quizQ, setQuizQ]           = useState(0);
  const [votes, setVotes]           = useState<Record<string,number>>({ G:0,R:0,H:0,S:0 });
  const [quizDone, setQuizDone]     = useState(false);
  const [house, setHouse]           = useState<string|null>(null);
  const [litCandles, setLitCandles] = useState<number[]>([...Array(CANDLE_COUNT).keys()]);
  const [wishedFor, setWishedFor]   = useState(false);
  const [wishText, setWishText]     = useState('');
  const spellRef = useRef<ReturnType<typeof setTimeout>|null>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  function castSpell(s: Spell, ms=4000) {
    if(spellRef.current) clearTimeout(spellRef.current);
    setSpell(s);
    spellRef.current = setTimeout(()=>setSpell(null), ms);
  }

  // Determine house from votes
  function finishQuiz() {
    const top = Object.entries(votes).sort((a,b)=>b[1]-a[1])[0][0];
    setHouse(top);
    setQuizDone(true);
  }

  function answerQuiz(h: string) {
    const nv = { ...votes, [h]: votes[h]+1 };
    setVotes(nv);
    if(quizQ < HOUSE_QUIZ.length-1) { setQuizQ(q=>q+1); }
    else {
      const top = Object.entries(nv).sort((a,b)=>b[1]-a[1])[0][0];
      setHouse(top);
      setQuizDone(true);
    }
  }

  function blowCandle(i: number) {
    setLitCandles(c => c.filter(x => x !== i));
    if(litCandles.length === 1) { setTimeout(()=>setWishedFor(true), 600); }
  }

  const BG: React.CSSProperties = { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'linear-gradient(180deg,#05050f 0%,#0a0620 50%,#150a30 100%)', overflow:'hidden' };
  const TOTAL = 7;

  return (
    <div style={{ position:'fixed', inset:0, fontFamily:'Cinzel,serif' }}>
      <StarsBg/>

      {/* Spell overlays */}
      {spell==='confetti' && <ConfettiRain/>}
      {spell==='patronus' && <PatronusEffect/>}
      {spell==='incendio' && <IncendioEffect/>}
      {spell==='hearts'   && <HeartsEffect/>}

      <AnimatePresence mode="wait">

        {/* ══ 0: OWL POST INTRO ══ */}
        {step===0 && (
          <motion.div key="s0" style={BG} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0, scale:0.95 }} transition={{ duration:0.6 }}>
            <Mountains/>
            <SparklesBg/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'0 20px' }}>
              <motion.div initial={{ y:-40, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.3, duration:0.8 }} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'clamp(36px,10vw,64px)', marginBottom:4 }}>🦉</div>
                <h1 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(32px,9vw,60px)', fontWeight:700, color:'#d4af37', letterSpacing:'0.06em', textShadow:'0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.4)', margin:0 }}>Owl Post</h1>
              </motion.div>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
                style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(16px,4.5vw,24px)', color:'#f5e6c8', fontStyle:'italic', textAlign:'center', lineHeight:1.5 }}>
                You've received a special letter,<br/>dear <span style={{ color:'#f5c842', fontWeight:'bold' }}>Rashi Hassani</span> ✨
              </motion.p>

              {/* Tappable Hedwig */}
              <motion.div
                animate={{ y:[0,-14,0] }} transition={{ repeat:Infinity, duration:2.2, ease:'easeInOut' }}
                style={{ cursor:'pointer', WebkitTapHighlightColor:'transparent', touchAction:'manipulation' }}
                whileTap={{ scale:1.2, rotate:[0,10,-10,0] }}
                onClick={() => { setOwlTapped(true); castSpell('patronus', 2000); }}
              >
                <HedwigSvg size={160}/>
              </motion.div>

              {owlTapped && (
                <motion.div initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }}
                  style={{ background:'rgba(212,175,55,0.15)', border:'1px solid rgba(212,175,55,0.4)', borderRadius:20, padding:'10px 20px', textAlign:'center' }}>
                  <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', color:'#f5c842', fontSize:16 }}>Hedwig is so happy to see you! 🎉</p>
                </motion.div>
              )}
              {!owlTapped && <TapHint text="Tap Hedwig to say hello!" />}

              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.3 }}>
                <MagicBtn onClick={()=>setStep(1)} color="gold">
                  🪄 Open Your Letter!
                </MagicBtn>
              </motion.div>
            </div>
            <Steps cur={0} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 1: CHARACTERS WELCOME ══ */}
        {step===1 && (
          <motion.div key="s1" style={BG} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
            <Mountains/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:18, padding:'16px 20px', maxWidth:480, width:'100%' }}>
              <motion.div initial={{ scale:0 }} animate={{ scale:[0,1.3,1] }} transition={{ duration:0.7 }}
                style={{ fontSize:'clamp(32px,10vw,56px)' }}>🎉</motion.div>

              <motion.h2 initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.2 }}
                style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(20px,6vw,34px)', color:'#f5c842', textAlign:'center', textShadow:'0 0 20px rgba(245,200,66,0.6)', margin:0 }}>
                Happy 11th Birthday! 🎂
              </motion.h2>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
                style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(15px,3.5vw,20px)', color:'#f5e6c8', textAlign:'center', lineHeight:1.6, margin:0 }}>
                All your Hogwarts friends came to celebrate! 🏰
              </motion.p>

              {/* Characters */}
              <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginTop:4 }}>
                <FloatChar delay={0.3}><Harry/></FloatChar>
                <FloatChar delay={0.5}><Hermione wand/></FloatChar>
                <FloatChar delay={0.7}><Ron/></FloatChar>
                <FloatChar delay={0.9}><Dobby/></FloatChar>
              </div>

              {/* Speech bubbles */}
              <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
                {[
                  { emoji:'⚡', name:'Harry', msg:'Wishing you all the magic in the world!', delay:0.8 },
                  { emoji:'📚', name:'Hermione', msg:'You\'re brilliant — just like a top Hogwarts student!', delay:1.0 },
                  { emoji:'😄', name:'Ron', msg:'This calls for a HUGE birthday feast!', delay:1.2 },
                  { emoji:'🧦', name:'Dobby', msg:'Dobby is SO happy for his birthday friend!', delay:1.4 },
                ].map((b,i) => (
                  <motion.div key={i} initial={{ x:-30, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ delay:b.delay }}
                    style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(212,175,55,0.25)', borderRadius:14, padding:'9px 14px', display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:20 }}>{b.emoji}</span>
                    <p style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(13px,3vw,16px)', color:'#f5e6c8', margin:0, fontStyle:'italic' }}>
                      <strong style={{ color:'#d4af37', fontStyle:'normal' }}>{b.name}:</strong> "{b.msg}"
                    </p>
                  </motion.div>
                ))}
              </div>

              <MagicBtn onClick={()=>setStep(2)} color="purple">🎩 Try the Sorting Hat!</MagicBtn>
            </div>
            <Steps cur={1} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 2: HOUSE QUIZ ══ */}
        {step===2 && (
          <motion.div key="s2" style={BG} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
            <Mountains/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:18, padding:'16px 20px', maxWidth:460, width:'100%' }}>

              {!quizDone ? (<>
                <motion.div animate={{ rotate:[-5,5,-5] }} transition={{ repeat:Infinity, duration:1.8 }} style={{ fontSize:64 }}>🎩</motion.div>
                <motion.h2 initial={{ opacity:0 }} animate={{ opacity:1 }}
                  style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(18px,5vw,26px)', color:'#f5c842', textAlign:'center', margin:0 }}>
                  Which House Are You? ✨
                </motion.h2>
                <div style={{ background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:16, padding:'14px 18px', width:'100%' }}>
                  <p style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(15px,3.8vw,20px)', color:'#f5e6c8', textAlign:'center', fontWeight:'bold', margin:0, lineHeight:1.5 }}>
                    {HOUSE_QUIZ[quizQ].q}
                  </p>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, width:'100%' }}>
                  {HOUSE_QUIZ[quizQ].answers.map((a,i) => (
                    <motion.button key={i} whileTap={{ scale:0.92 }} onClick={()=>answerQuiz(a.house)}
                      style={{ minHeight:68, borderRadius:16, fontFamily:'Cinzel,serif', fontWeight:'bold', fontSize:14, background:'rgba(255,255,255,0.07)', border:'2px solid rgba(212,175,55,0.3)', color:'#f5e6c8', cursor:'pointer', padding:'10px 8px', lineHeight:1.4, WebkitTapHighlightColor:'transparent', touchAction:'manipulation' }}>
                      {a.text}
                    </motion.button>
                  ))}
                </div>
                <p style={{ fontFamily:'EB Garamond,serif', color:'rgba(245,230,200,0.5)', fontSize:14, margin:0 }}>Question {quizQ+1} of {HOUSE_QUIZ.length}</p>
              </>) : house && (<>
                <motion.div initial={{ scale:0, rotate:-180 }} animate={{ scale:1, rotate:0 }} transition={{ type:'spring', duration:0.8 }}
                  style={{ fontSize:80 }}>{HOUSES[house].badge}</motion.div>
                <motion.h2 initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
                  style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(22px,7vw,38px)', fontWeight:700, color:'#f5c842', textAlign:'center', margin:0 }}>
                  You are in...
                </motion.h2>
                <motion.div initial={{ scale:0.5, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:0.6, type:'spring' }}
                  style={{ background:`linear-gradient(135deg,${HOUSES[house].color}cc,${HOUSES[house].color}66)`, border:`3px solid ${HOUSES[house].color}`, borderRadius:20, padding:'16px 24px', textAlign:'center', width:'100%' }}>
                  <p style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(24px,8vw,42px)', fontWeight:700, color:'white', textShadow:`0 0 20px ${HOUSES[house].color}`, margin:0 }}>{HOUSES[house].name}!</p>
                </motion.div>
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
                  style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(15px,4vw,20px)', color:'#f5e6c8', textAlign:'center', fontStyle:'italic', lineHeight:1.6, margin:0 }}>
                  {HOUSES[house].desc}
                </motion.p>
                <MagicBtn onClick={()=>setStep(3)} color="gold">✨ Cast Some Spells!</MagicBtn>
              </>)}
            </div>
            <Steps cur={2} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 3: SPELL BOOK ══ */}
        {step===3 && (
          <motion.div key="s3" style={BG} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
            <Mountains/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:16, padding:'16px 20px', maxWidth:480, width:'100%' }}>
              <motion.div initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }}>
                <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(20px,6vw,32px)', color:'#f5c842', textAlign:'center', margin:0 }}>🪄 Spell Book</h2>
                <p style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(14px,3.5vw,18px)', color:'rgba(245,230,200,0.8)', textAlign:'center', margin:'6px 0 0', fontStyle:'italic' }}>Tap a spell to cast it!</p>
              </motion.div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, width:'100%', maxWidth:400 }}>
                <SpellBtn onClick={()=>castSpell('patronus',5000)} color="blue">🦌 Expecto<br/>Patronum</SpellBtn>
                <SpellBtn onClick={()=>castSpell('incendio',4000)} color="amber">🔥 Incendio</SpellBtn>
                <SpellBtn onClick={()=>castSpell('hearts',5000)} color="pink">💖 Amor<br/>Infinitum</SpellBtn>
                <SpellBtn onClick={()=>castSpell('confetti',5000)} color="purple">🎊 Confetto<br/>Maxima</SpellBtn>
                <SpellBtn onClick={()=>{castSpell('patronus',3000); castSpell('confetti',3000);}} color="teal">⚡ Wingardium<br/>Leviosa</SpellBtn>
                <SpellBtn onClick={()=>{castSpell('hearts',4000); castSpell('incendio',4000);}} color="red">🌟 Alohomora<br/>Felicis</SpellBtn>
              </div>

              {/* Spell effect banner */}
              <AnimatePresence>
                {spell && (
                  <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0, opacity:0 }}
                    style={{ background:'rgba(245,200,66,0.15)', border:'2px solid #f5c842', borderRadius:16, padding:'10px 20px', textAlign:'center' }}>
                    <p style={{ fontFamily:'Cinzel,serif', fontSize:16, color:'#f5c842', margin:0 }}>✨ Spell cast! ✨</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reacting characters */}
              <div style={{ display:'flex', gap:20, justifyContent:'center' }}>
                <Harry glint={spell==='patronus'}/>
                <Hermione wand={spell !== null}/>
                <Ron blush={spell==='hearts'}/>
              </div>

              <MagicBtn onClick={()=>setStep(4)} color="gold">📜 Read Your Letter</MagicBtn>
            </div>
            <Steps cur={3} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 4: LETTER ══ */}
        {step===4 && (
          <motion.div key="s4" style={BG} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'16px', maxWidth:540, width:'100%', height:'100%', overflow:'hidden' }}>
              <motion.div initial={{ y:-16, opacity:0 }} animate={{ y:0, opacity:1 }}
                style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
                <span style={{ fontSize:28 }}>📜</span>
                <h2 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(18px,5vw,26px)', color:'#d4af37', margin:0 }}>Your Birthday Letter</h2>
                <span style={{ fontSize:28 }}>📜</span>
              </motion.div>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }} ref={letterRef}
                style={{ flex:1, overflowY:'auto', width:'100%', maxHeight:'calc(100dvh - 200px)', background:'rgba(253,246,227,0.05)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:20, padding:'20px', WebkitOverflowScrolling:'touch' }}>
                <pre style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(14px,3.5vw,18px)', color:'#f5e6c8', lineHeight:1.9, whiteSpace:'pre-wrap', wordBreak:'break-word', margin:0 }}>{LETTER}</pre>
              </motion.div>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }} style={{ flexShrink:0 }}>
                <MagicBtn onClick={()=>setStep(5)} color="pink">🎂 Make a Wish!</MagicBtn>
              </motion.div>
            </div>
            <Steps cur={4} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 5: BIRTHDAY CAKE ══ */}
        {step===5 && (
          <motion.div key="s5" style={BG} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
            <Mountains/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:16, padding:'16px 20px', maxWidth:480, width:'100%' }}>
              <motion.h2 initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }}
                style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(20px,6vw,30px)', color:'#f5c842', textAlign:'center', margin:0 }}>
                🎂 Blow Out the Candles!
              </motion.h2>

              {!wishedFor ? (<>
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
                  style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(14px,3.5vw,18px)', color:'#f5e6c8', textAlign:'center', margin:0 }}>
                  Tap each candle to blow it out! 🕯️
                </motion.p>

                <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:0.4 }}>
                  <BirthdayCake litCandles={litCandles} onTap={blowCandle}/>
                </motion.div>

                <div style={{ background:'rgba(255,255,255,0.07)', borderRadius:16, padding:'10px 20px' }}>
                  <p style={{ fontFamily:'Cinzel,serif', fontSize:16, color:'#f5c842', textAlign:'center', margin:0 }}>
                    {litCandles.length > 0 ? `${litCandles.length} candle${litCandles.length!==1?'s':''} left! 🕯️` : '✨ All out! Make a wish!'}
                  </p>
                </div>

                {litCandles.length > 0 && litCandles.length < CANDLE_COUNT && (
                  <motion.p animate={{ opacity:[0.6,1,0.6] }} transition={{ repeat:Infinity, duration:1.5 }}
                    style={{ fontFamily:'EB Garamond,serif', color:'rgba(245,200,66,0.8)', fontSize:15, textAlign:'center', fontStyle:'italic', margin:0 }}>
                    Keep going! Tap them all! 🌟
                  </motion.p>
                )}
              </>) : (<>
                <ConfettiRain/>
                <motion.div initial={{ scale:0 }} animate={{ scale:[0,1.3,1] }} transition={{ duration:0.7 }} style={{ fontSize:72 }}>🌟</motion.div>
                <motion.h3 initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
                  style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(20px,6vw,30px)', color:'#f5c842', textAlign:'center', margin:0 }}>
                  Make Your Wish! ✨
                </motion.h3>
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }} style={{ width:'100%', maxWidth:360 }}>
                  <input
                    type="text"
                    placeholder="Type your secret wish... 🌙"
                    value={wishText}
                    onChange={e=>setWishText(e.target.value)}
                    style={{ width:'100%', padding:'14px 18px', borderRadius:16, border:'2px solid rgba(212,175,55,0.5)', background:'rgba(255,255,255,0.07)', color:'#f5e6c8', fontFamily:'EB Garamond,serif', fontSize:16, outline:'none', boxSizing:'border-box', textAlign:'center' }}
                  />
                </motion.div>
                <MagicBtn onClick={()=>setStep(6)} color="gold">⭐ Send My Wish!</MagicBtn>
              </>)}
            </div>
            <Steps cur={5} total={TOTAL}/>
          </motion.div>
        )}

        {/* ══ 6: GRAND FINALE ══ */}
        {step===6 && (
          <motion.div key="s6" style={BG} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}>
            <ConfettiRain/>
            <HeartsEffect/>
            <Mountains/>
            <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:18, padding:'16px 20px', maxWidth:480, width:'100%' }}>
              <motion.div initial={{ scale:0 }} animate={{ scale:[0,1.4,1] }} transition={{ duration:0.8 }} style={{ textAlign:'center', fontSize:'clamp(50px,15vw,90px)' }}>🎂</motion.div>

              <motion.h1 initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.5 }}
                style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(24px,7vw,48px)', fontWeight:700, color:'#f5c842', textAlign:'center', textShadow:'0 0 30px rgba(245,200,66,0.9)', margin:0, lineHeight:1.2 }}>
                Happy Birthday<br/>Rashi! ⚡🎉
              </motion.h1>

              {wishText && (
                <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.7 }}
                  style={{ background:'rgba(212,175,55,0.12)', border:'2px solid rgba(212,175,55,0.4)', borderRadius:20, padding:'14px 20px', width:'100%', textAlign:'center' }}>
                  <p style={{ fontFamily:'EB Garamond,serif', fontStyle:'italic', color:'#f5c842', fontSize:'clamp(14px,3.5vw,18px)', margin:0 }}>
                    ✨ Your wish: "{wishText}" ✨
                  </p>
                  <p style={{ fontFamily:'EB Garamond,serif', color:'rgba(245,230,200,0.7)', fontSize:14, margin:'6px 0 0' }}>
                    The stars heard it! 🌟
                  </p>
                </motion.div>
              )}

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
                style={{ fontFamily:'EB Garamond,serif', fontSize:'clamp(15px,4vw,22px)', color:'#f5e6c8', textAlign:'center', fontStyle:'italic', lineHeight:1.7, margin:0 }}>
                May your year be full of magic,<br/>adventures, and endless joy! 🪄🌈✨
              </motion.p>

              {/* All chars */}
              <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
                <FloatChar delay={0}><Harry glint/></FloatChar>
                <FloatChar delay={0.2}><Hermione wand/></FloatChar>
                <FloatChar delay={0.4}><Ron blush/></FloatChar>
                <FloatChar delay={0.6}><Dobby/></FloatChar>
              </div>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
                style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(16px,4vw,22px)', color:'#d4af37', textAlign:'center', letterSpacing:'0.05em', margin:0 }}>
                With love, Dev Kumar ❤️
              </motion.p>

              <motion.button onClick={()=>{ setStep(0); setOwlTapped(false); setSpell(null); setQuizQ(0); setVotes({G:0,R:0,H:0,S:0}); setQuizDone(false); setHouse(null); setLitCandles([...Array(CANDLE_COUNT).keys()]); setWishedFor(false); setWishText(''); }}
                whileTap={{ scale:0.95 }}
                style={{ background:'transparent', border:'1px solid rgba(212,175,55,0.35)', borderRadius:999, color:'rgba(245,230,200,0.65)', fontFamily:'Cinzel,serif', fontSize:14, padding:'12px 28px', cursor:'pointer', WebkitTapHighlightColor:'transparent', letterSpacing:'0.05em' }}>
                ↩ Watch Again
              </motion.button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
