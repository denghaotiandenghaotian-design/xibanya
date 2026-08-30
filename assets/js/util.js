/* 工具函数：DOM / 日期 / 艾宾浩斯 / 法语 TTS / 渲染 */
window.U = (function(){
  const $  = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));

  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  let toastTimer;
  function toast(msg){
    const t=$("#toast"); if(!t) return;
    t.textContent=msg; t.classList.remove("hidden");
    clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.add("hidden"),2200);
  }

  /* 日期 */
  function todayISO(){ const d=new Date(); return d.toISOString().slice(0,10); }
  function addDaysISO(iso,n){ const d=new Date(iso+"T00:00:00"); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); }
  function fmtDate(iso){ if(!iso) return "—"; const [y,m,d]=iso.split("-"); return `${y}/${m}/${d}`; }
  function daysBetween(a,b){ return Math.round((new Date(b+"T00:00:00")-new Date(a+"T00:00:00"))/86400000); }

  /* 艾宾浩斯间隔（附录D） */
  const EB = [1,2,4,7,15,30];

  /* CECRL 等级 */
  const LV = ["A0","A1","A2","B1","B2"];
  function lvClass(lv){ return (lv||"A1").toLowerCase(); }
  function lvOptions(sel){ return LV.map(l=>`<option value="${l}" ${l===sel?'selected':''}>${l}</option>`).join(""); }

  /* 分类颜色 */
  function catClass(cat){ return cat||"语法"; }

  /* 法语 TTS（Web Speech API） */
  let voices=[];
  function loadVoices(){ try{ voices = speechSynthesis.getVoices()||[]; }catch(e){ voices=[]; } }
  if('speechSynthesis' in window){ try{ loadVoices(); speechSynthesis.onvoiceschanged=loadVoices; }catch(e){} }
  function pickFrVoice(){
    const fr = voices.filter(v=>/fr/i.test(v.lang));
    if(fr.length) return fr[0];
    return null;
  }
  function speak(text, opts={}){
    if(!('speechSynthesis' in window)){ toast("当前浏览器不支持语音朗读"); return; }
    const rate = opts.rate || (opts.level==='A1'?0.8:opts.level==='A2'?0.9:1.0);
    const u=new SpeechSynthesisUtterance(text);
    u.lang='fr-FR'; u.rate=rate; u.pitch=1;
    const v=pickFrVoice(); if(v) u.voice=v;
    // 先取消进行中的朗读再放新的；用极短延时规避 Chrome 下 cancel 吞掉首句的已知缺陷
    speechSynthesis.cancel();
    setTimeout(()=>{ try{ speechSynthesis.speak(u); }catch(e){} }, 10);
  }
  function ttsSupported(){ return 'speechSynthesis' in window; }

  /* 朗读按钮 HTML（用 data-spk 承载文本，避免内联 onclick 的引号转义问题；由全局委托监听触发） */
  function speakBtn(text, opts={}){
    const label = opts.label||"🔊 朗读";
    const lv = opts.level||"";
    const rate = (opts.rate!=null && opts.rate!=='') ? opts.rate : "";
    return `<button class="audio-btn" data-spk="${esc(text)}" data-lv="${esc(lv)}" data-rate="${esc(rate)}">${label}</button>`;
  }
  // 全局委托：点击任意 .audio-btn 即朗读其 data-spk 文本（不依赖内联 handler，规避引号转义陷阱）
  if(typeof document!=='undefined'){
    document.addEventListener('click', function(e){
      const b = e.target && e.target.closest ? e.target.closest('.audio-btn[data-spk]') : null;
      if(b){ const r=b.dataset.rate; window.U.speak(b.dataset.spk,{level:b.dataset.lv, rate: r?parseFloat(r):undefined}); }
    });
  }

  /* 简易 DOM 构建 */
  function h(html){ const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstChild; }

  /* 导出 JSON 文件 */
  function download(filename, obj){
    const blob=new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=filename; a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),2000);
  }

  return {$, $$, esc, toast, todayISO, addDaysISO, fmtDate, daysBetween, EB, LV, lvClass, lvOptions, catClass,
          speak, ttsSupported, speakBtn, h, download, pickFrVoice};
})();
