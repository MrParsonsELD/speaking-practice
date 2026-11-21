/* Key-word pronunciation practice: animated mouth, normal/slow audio, say-it check. Original drawing. */
(function(){
const esc = t => String(t).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// mouth shapes: o=open, w=width, r=round, tt/bt=top/bottom teeth, tg=tongue (1 out, 2 up), lb=lip under teeth (f/v)
const SH={
 X:{o:0,w:1,r:0,tt:0,bt:0,tg:0,lb:0}, M:{o:0,w:.94,r:0,tt:0,bt:0,tg:0,lb:0},
 F:{o:.08,w:1,r:0,tt:1,bt:0,tg:0,lb:1}, T:{o:.16,w:1,r:0,tt:1,bt:1,tg:1,lb:0},
 S:{o:.1,w:1.06,r:0,tt:1,bt:1,tg:0,lb:0}, L:{o:.3,w:1,r:0,tt:1,bt:.3,tg:2,lb:0},
 C:{o:.2,w:.74,r:.6,tt:1,bt:1,tg:0,lb:0}, K:{o:.3,w:1,r:0,tt:.6,bt:.3,tg:0,lb:0},
 R:{o:.16,w:.74,r:.7,tt:.3,bt:0,tg:0,lb:0}, W:{o:.12,w:.58,r:1,tt:0,bt:0,tg:0,lb:0},
 O:{o:.45,w:.72,r:.8,tt:.2,bt:0,tg:0,lb:0}, A:{o:.8,w:1.04,r:0,tt:.7,bt:.3,tg:0,lb:0},
 E:{o:.45,w:1.08,r:0,tt:.6,bt:.3,tg:0,lb:0}, I:{o:.2,w:1.2,r:0,tt:1,bt:.7,tg:0,lb:0},
 U:{o:.28,w:.8,r:.5,tt:.3,bt:0,tg:0,lb:0}
};
const KEYS=Object.keys(SH.X);
const lerp=(a,b,t)=>{const o={};for(const k of KEYS)o[k]=a[k]+(b[k]-a[k])*t;return o;};
function mouthSvg(){
 return `<svg class="mouth" viewBox="0 0 320 230" role="img" aria-label="Animated mouth">
 <defs><clipPath id="mclip"><path id="m-in-c"/></clipPath><linearGradient id="mbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef4fe"/><stop offset="1" stop-color="#e3edfc"/></linearGradient></defs>
 <rect width="320" height="230" fill="url(#mbg)"/>
 <path d="M0 150Q40 150 70 178Q110 222 160 224Q210 222 250 178Q280 150 320 150V230H0Z" fill="#d3e2fa"/>
 <path d="M0 150Q40 150 70 178Q110 222 160 224Q210 222 250 178Q280 150 320 150" stroke="#3d7be0" stroke-width="2" fill="none"/>
 <path d="M146 16Q160 34 174 16" stroke="#3d7be0" stroke-width="3" fill="none" stroke-linecap="round"/>
 <path d="M148 186Q160 180 172 186" stroke="#a9c4ef" stroke-width="2.5" fill="none" stroke-linecap="round"/>
 <path id="m-out" fill="#ffffff" stroke="#3d7be0" stroke-width="2" stroke-linejoin="round"/>
 <path id="m-in" fill="#c9daf6" stroke="#1f2a44" stroke-width="2"/>
 <g clip-path="url(#mclip)"><rect id="m-tt" x="90" width="140" rx="5" fill="#ffffff" stroke="#9db9e8" stroke-width="1.5"/><rect id="m-bt" x="100" width="120" rx="5" fill="#ffffff" stroke="#9db9e8" stroke-width="1.5"/><ellipse id="m-tg" fill="#a9c4ef"/></g>
 <rect id="m-lb" x="118" width="84" height="12" rx="5" fill="#ffffff" stroke="#9db9e8" stroke-width="1.5"/>
 <ellipse id="m-tgo" cx="160" rx="20" ry="7" fill="#a9c4ef" stroke="#3d7be0" stroke-width="1.5"/>
 <path id="m-line" stroke="#1f2a44" stroke-width="3" fill="none" stroke-linecap="round"/>
 </svg>`;
}
function drawMouth(root,p){
 const cx=160, cy=118, hw=64*p.w*(1-.18*p.r), oh=4+60*p.o, $=id=>root.querySelector('#'+id);
 const L=cx-hw, R=cx+hw, up=oh*(.62+.15*p.r), dn=oh*(.85+.1*p.r);
 const inner=`M${L} ${cy}C${L+hw*.25} ${cy-up} ${R-hw*.25} ${cy-up} ${R} ${cy}C${R-hw*.2} ${cy+dn} ${L+hw*.2} ${cy+dn} ${L} ${cy}Z`;
 const lt=9+4*p.r, lbt=12+5*p.r, ow=hw+8+5*p.r;
 const OL=cx-ow, OR=cx+ow;
 const outer=`M${OL} ${cy}C${OL+ow*.3} ${cy-up-lt-6} ${cx-16} ${cy-up-lt-4} ${cx} ${cy-up-lt+3}C${cx+16} ${cy-up-lt-4} ${OR-ow*.3} ${cy-up-lt-6} ${OR} ${cy}C${OR-ow*.25} ${cy+dn+lbt+4} ${OL+ow*.25} ${cy+dn+lbt+4} ${OL} ${cy}Z`;
 $('m-out').setAttribute('d',outer); $('m-in').setAttribute('d',inner); $('m-in-c').setAttribute('d',inner);
 $('m-in').style.opacity=p.o<.03?0:1;
 $('m-line').setAttribute('d',`M${L+2} ${cy}Q${cx} ${cy+2} ${R-2} ${cy}`); $('m-line').style.opacity=p.o<.05?1:0;
 const tt=$('m-tt'); tt.setAttribute('y',cy-up*1.05); tt.setAttribute('height',6+14*p.tt); tt.style.opacity=p.tt>.05?1:0;
 const bt=$('m-bt'); bt.setAttribute('y',cy+dn-4-10*p.bt); bt.setAttribute('height',6+10*p.bt); bt.style.opacity=p.bt>.05?1:0;
 const tg=$('m-tg'); const up2=p.tg>1.5; tg.setAttribute('cx',cx); tg.setAttribute('cy',up2?cy-up*0.35:cy+dn*.75); tg.setAttribute('rx',hw*.55); tg.setAttribute('ry',up2?oh*.35:oh*.35+2);
 const lb=$('m-lb'); lb.setAttribute('y',cy-4); lb.style.opacity=p.lb>.5?1:0;
 const tgo=$('m-tgo'); tgo.setAttribute('cy',cy+3); tgo.style.opacity=(p.tg>.5&&p.tg<1.5)?1:0;
}
function poseAt(tl,t){
 if(!tl||!tl.length) return SH.X;
 if(t<tl[0][0]) return SH.X;
 let i=0; while(i+1<tl.length&&tl[i+1][0]<=t) i++;
 const cur=SH[tl[i][1]]||SH.X, prev=i>0?(SH[tl[i-1][1]]||SH.X):SH.X;
 const k=Math.min(1,(t-tl[i][0])/0.07);
 return lerp(prev,cur,k*k*(3-2*k));
}

/* sprite audio: decode once with Web Audio, play exact slices (falls back to <audio> seeking) */
let aud=null, raf=0, src=null, actx=null; const bufs={};
function ctx(){ if(!actx) actx=new (window.AudioContext||window.webkitAudioContext)(); return actx; }
function stop(){ cancelAnimationFrame(raf); if(aud) aud.pause(); if(src){ try{src.onended=null;src.stop();}catch(e){} src=null; } }
function getBuf(file){ if(!bufs[file]) bufs[file]=fetch(file).then(r=>{ if(!r.ok) throw new Error('http'); return r.arrayBuffer(); }).then(b=>ctx().decodeAudioData(b)); bufs[file].catch(()=>{ delete bufs[file]; }); return bufs[file]; }
async function playClip(file,seg,tl,root){
 stop();
 let buf=null; try{ buf=await getBuf(file); }catch(e){}
 if(buf){
  const c=ctx(); if(c.state==='suspended') await c.resume();
  return new Promise(res=>{
   const s=c.createBufferSource(); s.buffer=buf; s.connect(c.destination); src=s;
   const dur=seg[1]-seg[0], t0=c.currentTime+0.03; let fin=false;
   const done=()=>{ if(fin) return; fin=true; cancelAnimationFrame(raf); if(src===s) src=null; drawMouth(root,SH.X); res(); };
   s.onended=done; s.start(t0,seg[0],dur);
   const loop=()=>{ if(src!==s){ done(); return; } drawMouth(root,poseAt(tl,c.currentTime-t0)); raf=requestAnimationFrame(loop); };
   raf=requestAnimationFrame(loop);
  });
 }
 return new Promise(res=>{
  const a=new Audio(file); aud=a; let fin=false;
  const done=()=>{ if(fin) return; fin=true; cancelAnimationFrame(raf); drawMouth(root,SH.X); res(); };
  a.onerror=done; a.onended=done;
  const loop=()=>{ if(aud!==a) return; drawMouth(root,poseAt(tl,a.currentTime-seg[0])); if(a.currentTime>=seg[1]){ a.pause(); done(); return; } raf=requestAnimationFrame(loop); };
  const go=()=>{ try{a.currentTime=seg[0];}catch(e){} a.play().then(()=>{raf=requestAnimationFrame(loop);}).catch(done); };
  if(a.readyState>=1) go(); else a.addEventListener('loadedmetadata',go,{once:true});
 });
}
function preload(){ getBuf('audio/words.mp3').catch(()=>{}); }

function respellHtml(r){ return r.split(' ').map(w=>w.split('·').map(s=>/[A-Z]/.test(s)?`<b>${esc(s.toLowerCase())}</b>`:esc(s)).join('<span class="dot">·</span>')).join('&nbsp;&nbsp;'); }

/* list items for a task's terms */
function itemsFor(terms){
 const out=[]; for(const term of terms){ const parts=term.includes(',')?term.split(',').map(s=>s.trim()).filter(Boolean):[term]; for(const p of parts) if(!out.some(x=>x.toLowerCase()===p.toLowerCase())) out.push(p); }
 return out.filter(p=>window.BANK.pron[p.toLowerCase()]);
}

/* the practice card. hooks: {say(seconds,onLevel) -> Promise<{url,text,peak}>, match(word,text)->bool, onClose()} */
function open(list,start,hooks){
 let i=Math.max(0,start||0); preload();
 const host=document.createElement('div'); host.className='pmodal'; document.body.appendChild(host);
 const close=()=>{ stop(); host.remove(); document.removeEventListener('keydown',key); hooks&&hooks.onClose&&hooks.onClose(); };
 const key=e=>{ if(e.key==='Escape') close(); };
 document.addEventListener('keydown',key);
 host.onclick=e=>{ if(e.target===host) close(); };
 let mine=null;
 const draw=()=>{
  stop(); if(mine){mine.pause();mine=null;}
  const w=list[i], P=window.BANK.pron[w.toLowerCase()];
  host.innerHTML=`<div class="pcard" role="dialog" aria-label="Practice key words"><div class="phead"><b>Practice key words</b><span class="note">${i+1} of ${list.length}</span><button class="ghost pclose" aria-label="Close">✕</button></div>
  <div class="pbody"><div class="pword">${esc(w)}</div><div class="pres" title="Say the bold part louder">${respellHtml(P.r)}</div>
  <div class="pmouth">${mouthSvg()}</div>
  <div class="pbtns"><button class="primary" id="pn">🔊 Listen</button><button class="ghost" id="ps">🐢 Slow</button>${hooks&&hooks.say?'<button class="recbtn" id="py">Say it</button>':''}</div>
  <div id="pout"></div>
  <p class="note">The <b>bold</b> part is the stressed syllable. Say it a little louder and longer.</p></div>
  <div class="pnav"><button class="ghost" id="pp" ${i===0?'disabled':''}>← Back</button><button class="primary" id="pnx">${i===list.length-1?'Done':'Next word →'}</button></div></div>`;
  const root=host.querySelector('.mouth'); drawMouth(root,SH.X);
  const q=s=>host.querySelector(s);
  q('.pclose').onclick=close;
  q('#pn').onclick=()=>playClip('audio/words.mp3',P.n,P.vn,root);
  q('#ps').onclick=()=>playClip('audio/words_slow.mp3',P.s,P.vs,root);
  q('#pp').onclick=()=>{ i--; draw(); };
  q('#pnx').onclick=()=>{ if(i===list.length-1) close(); else { i++; draw(); } };
  if(q('#py')) q('#py').onclick=async()=>{
   stop(); const out=q('#pout'), btn=q('#py'); btn.disabled=true; btn.textContent='Listening…';
   out.innerHTML='<div class="meter wide"><b id="plv"></b></div>';
   try{
    const r=await hooks.say(3.5,v=>{const b=host.querySelector('#plv'); if(b) b.style.width=(v*100)+'%';});
    btn.disabled=false; btn.textContent='Say it again';
    if(!r){ out.innerHTML='<div class="msg">The recording did not work. Try again.</div>'; return; }
    let verdict='';
    if(r.peak<0.01) verdict='<div class="msg">We could not hear you. Speak closer to the microphone.</div>';
    else if(r.text===null||r.text===undefined) verdict='<p class="note">Listen to yourself and the model. Do they sound the same?</p>';
    else if(hooks.match(w,r.text)) verdict=`<div class="msg good">✓ The computer understood <b>${esc(w)}</b>. Great!</div>`;
    else verdict=`<div class="msg">The computer heard: <b>${r.text?esc(r.text):'no words'}</b>. Listen to the slow version and try again.</div>`;
    out.innerHTML=`<div class="pbtns"><button class="ghost" id="pme">▶ Hear me</button><button class="ghost" id="pmod">🔊 Hear the model</button></div>${verdict}`;
    q('#pme').onclick=()=>{ stop(); if(mine) mine.pause(); mine=new Audio(r.url); mine.play().catch(()=>{}); };
    q('#pmod').onclick=()=>{ if(mine) mine.pause(); playClip('audio/words.mp3',P.n,P.vn,root); };
   }catch(e){ btn.disabled=false; btn.textContent='Say it'; out.innerHTML='<div class="msg">The microphone is not working. Check the microphone, then try again.</div>'; }
  };
  setTimeout(()=>q('#pn').focus(),30);
 };
 draw();
}
window.Pron={open,itemsFor,mouthSvg,drawMouth,playClip,SH,stop,preload};
})();
