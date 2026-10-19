import { useRef, useState } from 'react';

type Place = 'Moon Garden' | 'Cloud Sea' | 'Star Forest';
type Mood = 'Cozy' | 'Curious' | 'Sleepy';
type ObjectName = 'Lantern' | 'Star' | 'Music Box';
type Dream = { location: Place; mood: Mood; object: ObjectName };
const fallback: Dream = { location: 'Moon Garden', mood: 'Cozy', object: 'Lantern' };
const choices = {
  location: [{name:'Moon Garden', icon:'✿', note:'flowers after dark'}, {name:'Cloud Sea', icon:'☁', note:'a sky full of waves'}, {name:'Star Forest', icon:'♠', note:'a twinkly little wood'}],
  mood: [{name:'Cozy', icon:'♡'}, {name:'Curious', icon:'✧'}, {name:'Sleepy', icon:'☾'}],
  object: [{name:'Lantern', icon:'☼'}, {name:'Star', icon:'✦'}, {name:'Music Box', icon:'♫'}],
} as const;
function readDream(): Dream | null {
  try { const value = JSON.parse(localStorage.getItem('dreamos-dream') || 'null'); return value && choices.location.some(x=>x.name===value.location) && choices.mood.some(x=>x.name===value.mood) && choices.object.some(x=>x.name===value.object) ? value : null; } catch { return null; }
}
const placeWords: Record<Place,string> = {
  'Moon Garden':'Silver flowers sway beneath a sleepy moon',
  'Cloud Sea':'Soft cloud waves carry little wishes across the sky',
  'Star Forest':'The trees keep a thousand tiny lights safe in their branches',
};
const moodWords: Record<Mood,string> = {
  Cozy:'Everything feels like being tucked in.', Curious:'There is a secret around every corner.', Sleepy:'Even the stars are yawning.',
};
const objectWords: Record<ObjectName,string> = {
  Lantern:'A little lantern lights the way.', Star:'A friendly star leads you along.', 'Music Box':'A music box hums just for you.',
};

export function DreamLandscape({dream, completed=false}: {dream: Dream; completed?: boolean}) {
 const {location, mood, object} = dream;
 return <div className={`landscape landscape-${location.replace(' ','-').toLowerCase()} mood-${mood.toLowerCase()} ${completed?'landscape-complete':''}`}>
  <svg viewBox="0 0 420 260" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${mood} ${location} with a ${object}`}>
   <defs><linearGradient id="dream-sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor={mood==='Cozy'?'#856aa4':mood==='Curious'?'#627eaa':'#4f5784'}/><stop offset="1" stopColor={mood==='Cozy'?'#e4b9d2':mood==='Curious'?'#c5bddd':'#a5a3ca'}/></linearGradient></defs>
   <rect width="420" height="260" fill="url(#dream-sky)"/>
   <g className="scene-twinkles" fill="#fff2bb"><circle cx="37" cy="33" r="2"/><circle cx="112" cy="50" r="2"/><circle cx="268" cy="27" r="2"/><circle cx="371" cy="67" r="2"/><path d="M75 78l3-7 3 7 7 3-7 3-3 7-3-7-7-3zM315 43l2-5 2 5 5 2-5 2-2 5-2-5-5-2z"/></g>
   <circle cx="322" cy="68" r="35" fill="#fae9bc"/><circle cx="336" cy="58" r="31" fill={mood==='Curious'?'#92a1c2':mood==='Sleepy'?'#777ca7':'#b88eae'}/>
   {location==='Moon Garden' && <g><path d="M0 190 Q90 142 192 190 T420 176 V260 H0Z" fill="#9383a8"/><path d="M0 219 Q105 171 215 218 T420 207 V260 H0Z" fill="#6e688c"/><g stroke="#d8c3d2" strokeWidth="2"><path d="M60 230v-41m50 53v-42m210 37v-43m42 56v-36"/></g><g fill="#f5d6e5"><circle cx="60" cy="188" r="8"/><circle cx="110" cy="199" r="7"/><circle cx="320" cy="193" r="8"/><circle cx="362" cy="213" r="7"/></g><g fill="#ffeaaa"><circle cx="60" cy="188" r="3"/><circle cx="110" cy="199" r="3"/><circle cx="320" cy="193" r="3"/><circle cx="362" cy="213" r="3"/></g></g>}
   {location==='Cloud Sea' && <g><path d="M0 181 Q33 152 65 182 Q98 143 137 183 Q173 155 209 185 Q250 143 288 185 Q330 150 366 181 Q395 163 420 176 V260 H0Z" fill="#d5cee4"/><path d="M0 218 Q39 190 79 220 Q121 185 164 220 Q206 192 247 222 Q288 182 329 216 Q373 190 420 215 V260 H0Z" fill="#a9b8d3"/><path d="M20 242q45-13 90 0m73-9q45-13 90 0m58 10q36-12 70 0" fill="none" stroke="#ecedf1" strokeWidth="3" strokeLinecap="round"/></g>}
   {location==='Star Forest' && <g><path d="M0 207 Q95 158 210 210 T420 195 V260 H0Z" fill="#727b94"/><path d="M0 233 Q95 191 210 226 T420 219 V260 H0Z" fill="#596e83"/>{[25,79,350,395].map((x,i)=><g key={x} transform={`translate(${x} ${i%2?126:113})`}><rect x="-4" y="52" width="8" height="48" rx="4" fill="#6e5f76"/><path d="M0 0L-28 64H28Z" fill={i%2?'#739395':'#607f83'}/><circle cx="0" cy="18" r="2.5" fill="#ffe8a9"/><circle cx="-10" cy="43" r="2" fill="#ffe8a9"/><circle cx="12" cy="48" r="2" fill="#ffe8a9"/></g>)}</g>}
   <g className="dream-object" transform="translate(210 155)"><ellipse cx="0" cy="67" rx="45" ry="9" fill="#342b51" opacity=".18"/>{object==='Lantern'?<g><path d="M-13-9q0-18 13-18T13-9" fill="none" stroke="#705d75" strokeWidth="4"/><rect x="-22" y="-9" width="44" height="56" rx="10" fill="#efd7a9" stroke="#7b697f" strokeWidth="3"/><rect x="-14" y="0" width="28" height="35" rx="6" fill="#fff2bd"/><path d="M0 5l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#e7bd78"/></g>:object==='Star'?<path d="M0-32l10 22 24 3-18 17 5 24L0 22l-21 12 5-24-18-17 24-3z" fill="#ffe4a1" stroke="#f7d195" strokeWidth="3"/>:<g><rect x="-32" y="-4" width="64" height="43" rx="7" fill="#e7b9d1" stroke="#806c82" strokeWidth="3"/><path d="M-32 10h64M-23-4v-9q23-13 46 0v9" fill="#f5d7e4" stroke="#806c82" strokeWidth="3"/><circle cy="20" r="5" fill="#fff0bd"/><path d="M38 8q14 1 10 11m0-11v-8" fill="none" stroke="#f9e3a8" strokeWidth="3"/></g>}</g>
   {completed&&<g className="scene-confetti" fill="#fff1b6"><path d="M135 112l3-7 3 7 7 3-7 3-3 7-3-7-7-3zM274 130l3-7 3 7 7 3-7 3-3 7-3-7-7-3z"/><circle cx="176" cy="90" r="3"/><circle cx="245" cy="86" r="2"/></g>}
  </svg>
 </div>;
}
export function DreamBuilder({play, onContinue}: {play:(frequency?:number,duration?:number)=>void; onContinue:()=>void}) {
 const [saved,setSaved]=useState<Dream|null>(readDream);
 const [draft,setDraft]=useState<Dream>(()=>readDream() || fallback);
 const [created,setCreated]=useState(()=>Boolean(readDream())); const [creation,setCreation]=useState(0);
 const previewRef=useRef<HTMLDivElement>(null);
 function choose<K extends keyof Dream>(key:K,value:Dream[K]) {setDraft(old=>({...old,[key]:value}));setCreated(false);play(520,.1)}
 function create(){setSaved({...draft});setCreated(true);setCreation(n=>n+1);try{localStorage.setItem('dreamos-dream',JSON.stringify(draft))}catch{}play(784,.4);if(window.innerWidth<=700)requestAnimationFrame(()=>previewRef.current?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}))}
 function reset(){setDraft(fallback);setSaved(null);setCreated(false);try{localStorage.removeItem('dreamos-dream')}catch{}}
 return <div className="dream-builder"><div className="builder-header"><div><p className="eyebrow">PIP'S DREAM BUILDER &nbsp; / &nbsp; 01</p><h2>A dream, <em>made by you.</em></h2><p>Three little ingredients. One very big imagination.</p></div><span className="builder-stamp">✦<br/>DREAM<br/>DEPT.</span></div>
 <div className="builder-layout builder-new"><div className="choices">
  <fieldset><legend><span>01</span> PICK A PLACE</legend><div className="place-options">{choices.location.map(item=><button type="button" key={item.name} className={draft.location===item.name?'chosen':''} aria-pressed={draft.location===item.name} onClick={()=>choose('location',item.name)}><span className="choice-art">{item.icon}</span><span><b>{item.name}</b><small>{item.note}</small></span><i>✓</i></button>)}</div></fieldset>
  <fieldset><legend><span>02</span> SET THE FEELING</legend><div className="dream-pills">{choices.mood.map(item=><button type="button" key={item.name} className={draft.mood===item.name?'chosen':''} aria-pressed={draft.mood===item.name} onClick={()=>choose('mood',item.name)}><span>{item.icon}</span> {item.name}</button>)}</div></fieldset>
  <fieldset><legend><span>03</span> ADD A LITTLE MAGIC</legend><div className="dream-pills">{choices.object.map(item=><button type="button" key={item.name} className={draft.object===item.name?'chosen':''} aria-pressed={draft.object===item.name} onClick={()=>choose('object',item.name)}><span>{item.icon}</span> {item.name}</button>)}</div></fieldset>
  <div className="button-row"><button className="primary create-button" onClick={create}>✦ &nbsp; {created?'Make it again':'Make my dream'} <span>→</span></button><button className="text-button" onClick={reset}>Start over ↺</button></div>
 </div><div className="dream-preview" ref={previewRef} aria-live="polite"><div className="preview-top"><span>✳ &nbsp; DREAM PREVIEW</span><span>{created?'READY TO DREAM': 'LIVE VIEW'} &nbsp; ●</span></div><DreamLandscape key={creation} dream={draft} completed={created}/><div className="dream-ticket"><span className="ticket-kicker">{created?'✦ MADE WITH STARDUST':saved?'✦ YOUR LAST DREAM IS SAVED':'✦ A LITTLE DREAM IN PROGRESS'}</span><h3>{created ? `${draft.mood} in the ${draft.location}` : 'A peek inside your dream'}</h3><p>{created?`${placeWords[draft.location]}. ${objectWords[draft.object]} ${moodWords[draft.mood]}`:'Pick your ingredients and watch this little world change. When it feels just right, make it yours.'}</p>{created&&<button className="ticket-link" onClick={onContinue}>Send a dream into the night →</button>}</div><div className="ticket-bottom"><span>MADE BY YOU & PIP</span><span>NO. {String(creation||1).padStart(3,'0')} &nbsp; ✧</span></div></div></div></div>;
}
