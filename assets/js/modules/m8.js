/* 模块八 情景板块（独立总览，进入单词/句子学习 或 每日一练）
 * 与模块九/十/十一 联动：点击「学单词 / 学句子」预设对应情景。
 */
window.Modules = window.Modules || {};
Modules.m8 = (function(){
  const {$, esc, toast} = U;

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块八 · 情景板块</h3>
          <div class="row">
            <button class="btn sm" data-t="t1">情景总览</button>
            <button class="btn sm" data-t="t2">学习书目标注</button>
          </div>
        </div>
        <div class="note bleu">将全部词汇与句子按 <b>${FRV.scenarios.length}</b> 个真实生活情景归类。点选情景可直达「单词学习 / 句子学习」，每天循序渐进覆盖不同场景。也可一键进入「每日一练」。</div>
        <div id="m8body"></div>
      </div>`;
    view.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ view.querySelectorAll('[data-t]').forEach(x=>x.classList.remove('primary')); b.classList.add('primary'); show(view, b.dataset.t); });
    view.querySelector('[data-t="t1"]').classList.add('primary');
    show(view,'t1');
  }
  function show(view,t){
    const body=view.querySelector('#m8body');
    if(t==='t1') body.innerHTML=t1();
    if(t==='t2') body.innerHTML=t2();
    bind(body);
  }

  function t1(){
    const cards = FRV.scenarios.map(s=>`
      <div class="sc-card">
        <div class="sc-emoji">${s.emoji}</div>
        <div class="sc-name">${esc(s.name)}</div>
        <div class="sc-fr">${esc(s.fr)} ${U.speakBtn(s.fr,{level:s.level,label:"🔊"})}</div>
        <div class="sc-meta"><span class="tag ${U.lvClass(s.level)}">${esc(s.level)}</span>
          <span class="muted">${FRV.data[s.id].words.length} 词 · ${FRV.data[s.id].sentences.length} 句</span></div>
        <div class="sc-desc">${esc(s.desc)}</div>
        <div class="row" style="margin-top:8px">
          <button class="btn sm primary" data-go="w" data-s="${s.id}">🔤 学单词</button>
          <button class="btn sm" data-go="s" data-s="${s.id}">💡 学句子</button>
        </div>
        <div class="row" style="margin-top:6px">
          <button class="btn sm ghost" data-go="d" data-s="${s.id}">📅 加入今日一练</button>
        </div>
      </div>`).join('');
    return `<h4>12 个情景板块</h4><div class="sc-grid">${cards}</div>`;
  }

  function t2(){
    const nm={}; (FRV.scenarios||[]).forEach(s=>nm[s.id]=s.name);
    const tbMap={};
    (TB.list||[]).forEach(b=>(b.scenarios||[]).forEach(s=>{ (tbMap[s]=tbMap[s]||[]).push(b.name); }));
    const rows = FRV.scenarios.map(s=>`
      <tr>
        <td><b>${esc(s.name)}</b> <span class="muted">${esc(s.fr)}</span></td>
        <td><span class="tag ${U.lvClass(s.level)}">${esc(s.level)}</span></td>
        <td>${(tbMap[s.id]||[]).map(n=>`<span class="pill">${esc(n)}</span>`).join(' ')||'<span class="muted">—</span>'}</td>
      </tr>`).join('');
    return `<h4>各情景对应教材</h4>
      <div class="tablewrap"><table><thead><tr><th>情景</th><th>等级</th><th>覆盖教材</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="note">单词与句子内容已对标上述教材（以《你好！法语》《走遍法国》等课次标注出处）。</div>`;
  }

  function bind(body){
    body.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{
      const sid=b.dataset.s;
      const go=b.dataset.go;
      if(go==='w'){ Modules.m9.preset=sid; App.go('m9'); }
      else if(go==='s'){ Modules.m10.preset=sid; App.go('m10'); }
      else if(go==='d'){ Modules.m11.preset=sid; App.go('m11'); }
    });
  }

  return {render};
})();
