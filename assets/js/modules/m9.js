/* 模块九 单词学习（按情景浏览 / 🔊浏览器真人语音朗读 / 一键加入背诵打卡 / 标记已学）
 * 衔接：加入背诵打卡 → Store.addToRecite（模块四 艾宾浩斯滚动复习）
 *      标记已学 → Store.setLearnedWord（供每日一练去重、计入进度）
 */
window.Modules = window.Modules || {};
Modules.m9 = (function(){
  const {$, esc, toast} = U;
  let preset = null;  // 从情景板块点入时预设的情景 id

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块九 · 单词学习</h3>
          <button class="btn sm ghost" id="toScenes">← 返回情景板块</button>
        </div>
        <div class="note bleu">按情景浏览核心单词：<b>🔊 朗读</b>用浏览器法语真人语音；<b>加入背诵打卡</b>把单词送入模块四的艾宾浩斯滚动复习；<b>标记已学</b>计入进度并供每日一练去重。</div>
        <div id="m9body"></div>
      </div>`;
    view.querySelector('#toScenes').onclick=()=>App.go('m8');
    body(view);
  }

  function body(view){
    const body=view.querySelector('#m9body');
    const opts = FRV.scenarios.map(s=>`<option value="${s.id}" ${preset===s.id?'selected':''}>${esc(s.name)}（${s.emoji}）</option>`).join('');
    body.innerHTML = `
      <div class="row" style="margin-bottom:12px;align-items:flex-end">
        <label class="fld" style="margin:0;flex:1"><span class="lab">选择情景板块</span><select id="w_sc">${opts}</select></label>
        <button class="btn primary" id="w_all">🔊 朗读全部</button>
        <label class="chip" style="margin:0"><input type="checkbox" id="w_quiz"> 自测模式（隐藏中文）</label>
      </div>
      <div class="row" style="margin-bottom:8px">
        <span class="muted">已掌握单词：<b id="w_lc">${Store.learnedCount()}</b> / ${FRV.allWords().length}</span>
        <span class="muted" style="margin-left:14px">已加入背诵：<b id="w_rc">${Store.getVocab().length}</b></span>
        <button class="btn sm ghost" id="w_tom11" style="margin-left:auto">→ 去「每日一练」巩固</button>
      </div>
      <div id="w_list" class="word-grid"></div>`;
    bind(body);
  }

  function bind(body){
    const list=body.querySelector('#w_list');
    function render(){
      const sid=body.querySelector('#w_sc').value; preset=sid;
      const sc=FRV.data[sid];
      const quiz = body.querySelector('#w_quiz').checked;
      list.className='word-grid'+(quiz?' quiz':'');
      list.innerHTML=(sc.words||[]).map((w,i)=>`
        <div class="w-card" data-fr="${esc(w.fr)}">
          <div class="w-top">
            <div class="w-fr">${esc(w.fr)}</div>
            ${U.speakBtn(w.fr,{level:w.lv,label:"🔊"})}
          </div>
          <div class="ipa">${esc(w.ipa)}</div>
          <div class="w-zh zh-mean">${esc(w.zh)}</div>
          ${quiz?`<button class="btn sm ghost w-reveal" data-i="${i}">看答案</button>`:''}
          <div class="w-foot">
            <span class="muted">${esc(w.src||'')}</span>
            <div class="row" style="gap:6px">
              <button class="recite-btn ${Store.isRecited(w.fr)?'on':''}" data-fr="${esc(w.fr)}">${Store.isRecited(w.fr)?'✓ 已加背诵':'＋背诵'}</button>
              <button class="learn-btn ${Store.isWordLearned(w.fr)?'on':''}" data-fr="${esc(w.fr)}">${Store.isWordLearned(w.fr)?'✓ 已学':'标记已学'}</button>
            </div>
          </div>
        </div>`).join('');
      list.querySelectorAll('.w-reveal').forEach(b=>b.onclick=()=>{ b.closest('.w-card').classList.add('reveal'); b.remove(); });
      list.querySelectorAll('.recite-btn').forEach(b=>b.onclick=()=>{
        const fr=b.dataset.fr; const w=FRV.data[sid].words.find(x=>x.fr===fr);
        const ok=Store.addToRecite(fr,{ipa:w.ipa, zh:w.zh, lv:w.lv, pos:w.pos||''});
        if(ok){ b.classList.add('on'); b.textContent='✓ 已加背诵'; body.querySelector('#w_rc').textContent=Store.getVocab().length; toast('已加入背诵打卡：'+fr); }
        else toast('该词已在背诵词库中');
      });
      list.querySelectorAll('.learn-btn').forEach(b=>b.onclick=()=>{
        const fr=b.dataset.fr; const on=Store.isWordLearned(fr);
        Store.setLearnedWord(fr, !on);
        b.classList.toggle('on', !on); b.textContent=!on?'✓ 已学':'标记已学';
        body.querySelector('#w_lc').textContent=Store.learnedCount();
      });
    }
    body.querySelector('#w_sc').onchange=()=>render();
    body.querySelector('#w_quiz').onchange=()=>render();
    body.querySelector('#w_all').onclick=()=>{
      const sid=body.querySelector('#w_sc').value; (FRV.data[sid].words||[]).forEach((w,i)=> setTimeout(()=>U.speak(w.fr,{level:w.lv}), i*1100));
      toast('正在依次朗读…');
    };
    body.querySelector('#w_tom11').onclick=()=>App.go('m11');
    render();
  }

  return {render, get preset(){return preset;}, set preset(v){preset=v;}};
})();
