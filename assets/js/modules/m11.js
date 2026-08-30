/* 模块十一 每日一练（每天 8-10 生词 + 3 句子，基于已学进度去重、按等级循序渐进，连续打卡，支持补卡/换一批）
 * 状态：Store.getDaily() -> {date, wordIdx, sentIdx, today:{words[],sentences[],marked,done}, history[]}
 */
window.Modules = window.Modules || {};
Modules.m11 = (function(){
  const {$, esc, toast} = U;
  let preset = null;

  // 按等级循序渐进：A0<A1<A2<B1<B2
  function lvlRank(lv){ return ({"A0":0,"A1":1,"A2":2,"B1":3,"B2":4}[(lv||"A1")] ?? 1); }
  function sortedByLevel(list){ return list.slice().sort((a,b)=> lvlRank(a.lv)-lvlRank(b.lv)); }

  function pickBatch(){
    const d = Store.getDaily();
    const today = U.todayISO();
    if(d.date !== today || !d.today || d._regen){
      const allW = sortedByLevel(FRV.allWords());
      const allS = sortedByLevel(FRV.allSent());
      const learned = Store.getLearnedWords();
      // 去重：优先未掌握单词；不足则补已掌握
      let pool = allW.filter(w=>!learned[w.fr]);
      if(pool.length < 12) pool = pool.concat(allW.filter(w=>learned[w.fr]));
      // 若预设情景，把该情景词前置，强化当天主题
      if(preset && FRV.data[preset]){
        const scWords = FRV.data[preset].words.map(w=>Object.assign({scenario:preset,scName:FRV.scenarioById(preset).name},w));
        pool = scWords.concat(pool.filter(w=>w.scenario!==preset));
      }
      const n = 8 + Math.floor(Math.random()*3); // 8..10
      const words = pool.slice(0, n);
      const sentences = allS.slice(0, 3);
      d.today = { words, sentences, marked:{}, done:false };
      d.date = today; d._regen=false;
      Store.saveDaily(d);
    }
    return d;
  }

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块十一 · 每日一练</h3>
          <div class="row">
            <button class="btn sm" data-t="t1">今日一练</button>
            <button class="btn sm" data-t="t2">打卡历史</button>
          </div>
        </div>
        <div class="note bleu">系统每天自动推送 <b>8–10 个生词 + 3 个句子</b>，基于已学进度去重、按等级循序渐进。坚持打卡形成连续天数，支持<b>补卡</b>与<b>换一批</b>。</div>
        <div id="m11body"></div>
      </div>`;
    view.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ view.querySelectorAll('[data-t]').forEach(x=>x.classList.remove('primary')); b.classList.add('primary'); show(view, b.dataset.t); });
    view.querySelector('[data-t="t1"]').classList.add('primary');
    show(view,'t1');
  }
  function show(view,t){
    const body=view.querySelector('#m11body');
    if(t==='t1') body.innerHTML=t1();
    if(t==='t2') body.innerHTML=t2();
    bind(view,t,body);
  }

  function t1(){
    const d = pickBatch();
    const t = d.today;
    const doneToday = !!t.done;
    const words = t.words.map(w=>`
      <div class="w-card ${t.marked[w.fr]?'learned':''}" data-fr="${esc(w.fr)}">
        <div class="w-top">
          <div class="w-fr">${esc(w.fr)} <span class="muted" style="font-size:12px">${esc(w.scName||'')}</span></div>
          ${U.speakBtn(w.fr,{level:w.lv,label:"🔊"})}
        </div>
        <div class="ipa">${esc(w.ipa)}</div>
        <div class="w-zh">${esc(w.zh)}</div>
        <div class="w-foot">
          <span class="muted">${esc(w.src||'')}</span>
          <button class="learn-btn ${t.marked[w.fr]?'on':''}" data-fr="${esc(w.fr)}">${t.marked[w.fr]?'✓ 已掌握':'标记掌握'}</button>
        </div>
      </div>`).join('');
    const sents = t.sentences.map(x=>`
      <div class="sent-card">
        <div class="sent-fr">${esc(x.fr)} ${U.speakBtn(x.fr,{level:x.lv,label:"🔊"})}</div>
        <div class="ipa">${esc(x.ipa)}</div>
        <div class="sent-zh">${esc(x.zh)}</div>
        <div class="muted" style="font-size:12px">出处：${esc(x.src||'')} · 情景：${esc(x.scName||'')}</div>
      </div>`).join('');
    return `
      <div class="row" style="margin-bottom:10px">
        <span class="tag ${U.lvClass('A1')}">${U.fmtDate(d.date)}</span>
        <span class="muted">今日 ${t.words.length} 生词 · ${t.sentences.length} 句子</span>
        ${doneToday?'<span class="tag gold">今日已完成 ✓</span>':''}
        <button class="btn sm ghost" id="d_regen" style="margin-left:auto">↻ 换一批</button>
        <button class="btn sm ghost" id="d_makeup">📅 补卡</button>
      </div>
      <h4>📘 今日生词（${t.words.length}）</h4>
      <div class="word-grid">${words}</div>
      <h4 style="margin-top:16px">📝 今日句子（${t.sentences.length}）</h4>
      <div id="d_sentlist">${sents}</div>
      <div class="row" style="margin-top:14px">
        <button class="btn primary" id="d_done" ${doneToday?'disabled':''}>${doneToday?'今日已打卡':'✓ 完成今日一练并打卡'}</button>
        <button class="btn ghost" id="d_reveal">显示/隐藏全部释义</button>
      </div>`;
  }

  function bind(view,t,body){
    if(t!=='t1') return;
    body.querySelectorAll('.learn-btn').forEach(b=>b.onclick=()=>{
      const fr=b.dataset.fr; const d=Store.getDaily();
      const on = !d.today.marked[fr];
      d.today.marked[fr]=on;
      Store.setLearnedWord(fr, on);
      Store.saveDaily(d);
      const card=b.closest('.w-card'); card.classList.toggle('learned', on);
      b.classList.toggle('on', on); b.textContent=on?'✓ 已掌握':'标记掌握';
    });
    body.querySelector('#d_reveal').onclick=()=>{ body.querySelectorAll('.w-zh, .sent-zh').forEach(e=>e.classList.toggle('hidden')); };
    const doneBtn=body.querySelector('#d_done');
    if(doneBtn && !doneBtn.disabled){
      doneBtn.onclick=()=>{
        const d=Store.getDaily();
        const learned = Object.keys(d.today.marked).filter(fr=>d.today.marked[fr]).length;
        d.today.done=true; d.history=d.history||[];
        if(!d.history.find(h=>h.date===d.date)) d.history.unshift({date:d.date, words:d.today.words.length, sentences:d.today.sentences.length, learned, done:true});
        Store.saveDaily(d);
        toast('打卡成功！今日已掌握 '+learned+' 个生词');
        show(view,'t1');
      };
    }
    body.querySelector('#d_regen').onclick=()=>{ const d=Store.getDaily(); d._regen=true; Store.saveDaily(d); show(view,'t1'); toast('已换一批新内容'); };
    body.querySelector('#d_makeup').onclick=()=>{
      const d=Store.getDaily(); d.history=d.history||[];
      // 找最近一个“应有但缺失”的日期（昨天往前），补上 done 记录以维持连续天数
      let cur=U.addDaysISO(U.todayISO(),-1);
      for(let i=0;i<30;i++){
        if(!d.history.find(h=>h.date===cur)){ d.history.unshift({date:cur, words:0, sentences:0, learned:0, done:true, makeup:true}); Store.saveDaily(d); toast('已为 '+U.fmtDate(cur)+' 补卡'); show(view,'t1'); return; }
        cur=U.addDaysISO(cur,-1);
      }
      toast('近 30 天无缺失，无需补卡');
    };
  }

  function t2(){
    const d = Store.getDaily();
    const hist = (d.history||[]).slice();
    let streak=0; const set=new Set(hist.filter(h=>h.done).map(h=>h.date));
    let cursor=U.todayISO();
    if(!set.has(cursor)) cursor=U.addDaysISO(cursor,-1);
    while(set.has(cursor)){ streak++; cursor=U.addDaysISO(cursor,-1); }
    const rows = hist.length? hist.map(h=>`
      <tr>
        <td><b>${U.fmtDate(h.date)}</b>${h.makeup?' <span class="tag gray">补</span>':''}</td>
        <td>${h.words} 词</td><td>${h.sentences} 句</td><td>${h.learned} 已掌握</td>
        <td>${h.done?'<span class="tag gold">已打卡</span>':'<span class="muted">未打卡</span>'}</td>
      </tr>`).join('') : `<tr><td colspan="5" class="muted center">还没有打卡记录，去「今日一练」开始吧。</td></tr>`;
    return `
      <div class="stat-row" style="margin-bottom:14px">
        <div class="stat"><div class="num ${streak?'gold':''}">${streak}</div><div class="lbl">连续打卡(天)</div></div>
        <div class="stat"><div class="num">${hist.filter(h=>h.done).length}</div><div class="lbl">累计打卡(天)</div></div>
        <div class="stat"><div class="num">${hist.reduce((a,h)=>a+h.learned,0)}</div><div class="lbl">累计掌握生词</div></div>
        <div class="stat"><div class="num">${Store.learnedCount()}</div><div class="lbl">总已掌握单词</div></div>
      </div>
      <h4>打卡记录</h4>
      <div class="tablewrap"><table><thead><tr><th>日期</th><th>生词</th><th>句子</th><th>掌握</th><th>状态</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="note">提示：每天 0 点后自动更换新一批；连续打卡形成记忆节律。漏打卡可用「补卡」维持连续天数。</div>`;
  }

  return {render, get preset(){return preset;}, set preset(v){preset=v;}};
})();
