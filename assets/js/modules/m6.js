/* 模块六 日常听力训练（P6-1 分级材料 / P6-2 精听 / P6-3 泛听理解检测）
 * 纯前端：Web Speech API 法语 TTS 朗读；无后端、离线可用。
 */
window.Modules = window.Modules || {};
Modules.m6 = (function(){
  const {$, esc, toast, speak, ttsSupported} = U;

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块六 · 日常听力训练</h3>
          <div class="row">
            <button class="btn sm" data-t="t1">P6-1 分级材料</button>
            <button class="btn sm" data-t="t2">P6-2 精听训练</button>
            <button class="btn sm" data-t="t3">P6-3 泛听检测</button>
          </div>
        </div>
        <div class="note bleu">听力材料含法文文本、中文译文、生词 IPA 与语速标注。朗读用浏览器法语 TTS${ttsSupported()?'。':'，<b class="red">当前浏览器未检测到语音引擎</b>'}。P6-1 材料可一键送入 P6-2 精听。</div>
        <div id="m6body"></div>
      </div>`;
    view.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ view.querySelectorAll('[data-t]').forEach(x=>x.classList.remove('primary')); b.classList.add('primary'); show(view,b.dataset.t); });
    view.querySelector('[data-t="t1"]').classList.add('primary'); show(view,'t1');
  }
  function show(view,t){ const b=view.querySelector('#m6body');
    if(t==='t1') b.innerHTML=p61(); if(t==='t2') b.innerHTML=p62(); if(t==='t3') b.innerHTML=p63();
    if(t==='t1') bind61(view); if(t==='t2') bind62(view); if(t==='t3') bind63(view);
  }

  /* P6-1 分级材料 */
  function p61(){
    const lvOpts=["全部",...U.LV.filter(l=>l!=='A0')];
    return `<h4>分级听力材料（真实生活场景）</h4>
      <div class="row" style="margin-bottom:10px">
        <label class="fld" style="margin:0"><span class="lab">等级</span><select id="l_lv">${lvOpts.map(l=>`<option>${l}</option>`).join('')}</select></label>
        <label class="fld" style="margin:0"><span class="lab">主题</span><select id="l_tp"><option>全部</option>${[...new Set(LISTEN.map(x=>x.topic))].map(t=>`<option>${esc(t)}</option>`).join('')}</select></label>
        <label class="fld" style="margin:0;max-width:220px"><span class="lab">语速</span><span id="l_rate_v" class="muted">0.9×</span></label>
        <input id="l_rate" type="range" min="0.6" max="1.1" step="0.05" value="0.9" style="align-self:center">
      </div>
      <div id="l_list" class="row" style="flex-wrap:wrap;gap:8px"></div>
      <div id="l_out"></div>`;
  }
  function bind61(view){
    const b=view.querySelector('#m6body');
    const rateInput=b.querySelector('#l_rate');
    rateInput.oninput=()=>b.querySelector('#l_rate_v').textContent=parseFloat(rateInput.value).toFixed(2)+'×';
    function rate(){ return parseFloat(rateInput.value); }
    function list(){
      const lv=b.querySelector('#l_lv').value, tp=b.querySelector('#l_tp').value;
      const items=LISTEN.filter(x=>(lv==='全部'||x.level===lv)&&(tp==='全部'||x.topic===tp));
      b.querySelector('#l_list').innerHTML = items.length?items.map(x=>`<button class="chip ${x.id===view.dataset.cur?'on':''}" data-id="${x.id}">${esc(x.title)} · ${esc(x.level)}</button>`).join(''):'<span class="muted">无匹配材料</span>';
      b.querySelectorAll('#l_list .chip').forEach(c=>c.onclick=()=>{ view.dataset.cur=c.dataset.id; list(); renderOne(c.dataset.id); });
    }
    function renderOne(id){
      const x=LISTEN.find(m=>m.id===id); if(!x) return;
      const paras=x.text.map((s,i)=>`
        <div class="listen-line">
          <div><b class="muted">${i+1}.</b> <span class="fr-line">${esc(s.fr)}</span> <span class="muted">${esc(s.zh)}</span></div>
          ${U.speakBtn(s.fr,{rate:rate(),label:"🔊"})}
        </div>`).join('');
      const vocab=x.vocab.map(v=>`<tr><td><b>${esc(v.w)}</b></td><td class="ipa">${esc(v.ipa)}</td><td class="muted">${esc(v.pos)}</td><td>${esc(v.zh)}</td>
        <td>${U.speakBtn(v.w,{label:"🔊"})}</td></tr>`).join('');
      b.querySelector('#l_out').innerHTML=`
        <div class="qcard" style="margin-top:12px">
          <div class="qt"><span class="tag ${U.lvClass(x.level)}">${esc(x.level)}</span> <b>${esc(x.title)}</b>
            <span class="muted">主题：${esc(x.topic)} · 语速≈${x.speed} 词/分</span></div>
          <div class="row" style="margin-bottom:8px">
            <button class="btn sm" id="l_playall">🔊 朗读全文</button>
            <button class="btn sm gold" id="l_to62">→ 用于精听 (P6-2)</button>
          </div>
          <div style="max-width:760px">${paras}</div>
          <div class="note">生词表（IPA + 词性 + 中文）：</div>
          <div class="tablewrap"><table><thead><tr><th>词</th><th>IPA</th><th>词性</th><th>中文</th><th></th></tr></thead><tbody>${vocab}</tbody></table></div>
          <div class="note">朗读建议：首遍用 0.8× 抓大意，二遍 1.0× 抓细节；语速滑块调到 1.1× 可做加速挑战。</div>
        </div>`;
      b.querySelector('#l_playall').onclick=()=>{ if(!ttsSupported()){toast('当前浏览器不支持朗读');return;} x.text.forEach((s,i)=>setTimeout(()=>speak(s.fr,{rate:rate()}),i*2200)); };
      b.querySelector('#l_to62').onclick=()=>{ window.__listenId=x.id; App.go('m6','t2'); };
    }
    b.querySelector('#l_lv').onchange=()=>{ list(); }; b.querySelector('#l_tp').onchange=()=>{ list(); };
    list();
  }

  /* P6-2 精听训练（盲听→精听→核对） */
  function p62(){
    const id=window.__listenId||"";
    const sel=LISTEN.map(x=>`<option value="${x.id}" ${x.id===id?'selected':''}>${esc(x.title)} · ${esc(x.level)}</option>`).join('');
    return `<h4>精听训练（听写 / 填空 / 选词）</h4>
      <div class="grid2">
        <div>
          <label class="fld"><span class="lab">选择材料</span><select id="e_mat">${sel||'<option>—</option>'}</select></label>
          <label class="fld"><span class="lab">训练模式</span>
            <select id="e_mode"><option value="blank">填空（挖关键词）</option><option value="dict">整句听写</option><option value="choice">选词填空（选择题）</option></select></label>
          <label class="fld"><span class="lab">语速</span><input id="e_rate" type="range" min="0.6" max="1.1" step="0.05" value="0.85"></label>
          <div class="note">步骤：① 盲听（不看书）2 遍 ② 精听逐句写 ③ 核对。挖空密度 ≤20%。</div>
          <button class="btn primary" id="e_gen">生成练习卷</button>
        </div>
        <div><div id="e_out"></div></div>
      </div>`;
  }
  function bind62(view){
    const b=view.querySelector('#m6body');
    function rate(){ return parseFloat(b.querySelector('#e_rate').value); }
    b.querySelector('#e_gen').onclick=()=>{
      const x=LISTEN.find(m=>m.id===b.querySelector('#e_mat').value); if(!x){toast('请选择材料');return;}
      const mode=b.querySelector('#e_mode').value;
      let html=`<div class="note bleu">材料：${esc(x.title)}（${esc(x.level)}）· 模式：${mode==='blank'?'填空':mode==='dict'?'听写':'选词'} · 盲听阶段请勿看答案。</div>`;
      x.text.forEach((s,i)=>{
        if(mode==='dict'){
          html+=`<div class="qcard" style="margin-top:8px">
            <div class="spread"><b>句 ${i+1}</b>${U.speakBtn(s.fr,{rate:rate(),label:"🔊 听"})}
            <textarea class="e_dict" data-i="${i}" placeholder="听写整句…" style="margin-top:6px"></textarea>
            <button class="btn sm reveal2">核对</button><div class="hidden e_ans" style="margin-top:6px"><span class="fr-line">${esc(s.fr)}</span> <span class="muted">${esc(s.zh)}</span></div>
          </div>`;
        } else if(mode==='blank'){
          const words=s.fr.split(/\s+/).filter(w=>/^[A-Za-zàâäéèêëîïôöùûüç'’-]+$/.test(w.replace(/[.,!?;:']/g,'')));
          const n=Math.max(1, Math.round(words.length*0.2));
          const blanks=new Set(); while(blanks.size<n && words.length>1){ const idx=Math.floor(Math.random()*words.length); const w=words[idx].replace(/[.,!?;:']/g,''); if(w.length>3) blanks.add(idx); }
          const parts=s.fr.split(/(\s+)/).map(w=>{ const c=w.replace(/[.,!?;:']/g,''); if(blanks.has(words.indexOf(c)) && c.length>3){ return '____'; } return w; });
          html+=`<div class="qcard" style="margin-top:8px">
            <div class="spread"><b>句 ${i+1}</b>${U.speakBtn(s.fr,{rate:rate(),label:"🔊 听"})}
            <div class="fr-line" style="margin:6px 0">${esc(parts.join(''))}</div>
            <button class="btn sm reveal2">核对</button><div class="hidden e_ans" style="margin-top:6px"><span class="fr-line">${esc(s.fr)}</span> <span class="muted">${esc(s.zh)}</span></div>
          </div>`;
        } else {
          const words=s.fr.split(/\s+/).filter(w=>/^[A-Za-zàâäéèêëîïôöùûüç'’-]+$/.test(w.replace(/[.,!?;:']/g,''))&&w.replace(/[.,!?;:']/g,'').length>3);
          const pick=words[Math.floor(Math.random()*words.length)]||""; const ans=pick.replace(/[.,!?;:']/g,'');
          const opts=shuffle([ans, ...otherWords(x, ans)].filter(Boolean).slice(0,4));
          html+=`<div class="qcard" style="margin-top:8px">
            <div class="spread"><b>句 ${i+1}</b>${U.speakBtn(s.fr,{rate:rate(),label:"🔊 听"})}
            <div class="muted" style="margin:6px 0">句中缺词：${esc(s.fr.replace(pick,'____'))}</div>
            <div class="row">${opts.map(o=>`<button class="btn sm e_choice" data-a="${esc(o)}">${esc(o)}</button>`).join('')}</div>
            <div class="hidden e_ans" style="margin-top:6px">答案：<b>${esc(ans)}</b> ｜ ${esc(s.zh)}</div>
          </div>`;
        }
      });
      html+=`<div class="note" style="margin-top:10px">听错点解析要点：连读误听（联诵/连音）、同音词、省音吞音、语速过快。建议对照 P6-1 生词表与 IPA 复听。</div>`;
      const out=b.querySelector('#e_out'); out.innerHTML=html;
      out.querySelectorAll('.reveal2').forEach(btn=>btn.onclick=()=>btn.nextElementSibling.classList.toggle('hidden'));
      out.querySelectorAll('.e_choice').forEach(btn=>btn.onclick=()=>{ const ans=btn.closest('.qcard').querySelector('.e_ans'); if(btn.dataset.a===ans.textContent.match(/答案：(\S+)/)[1]){ btn.classList.add('gold'); ans.classList.remove('hidden'); } else { btn.classList.add('danger'); toast('再听一遍试试'); } });
    };
    function otherWords(x, ans){ const set=new Set(); LISTEN.forEach(m=>m.text.forEach(s=>s.fr.split(/\s+/).forEach(w=>{const c=w.replace(/[.,!?;:']/g,''); if(c.length>3 && c!==ans) set.add(c);}))); return [...set].slice(0,6); }
    if(window.__listenId){ window.__listenId=null; }
  }
  function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

  /* P6-3 泛听理解与检测 */
  function p63(){
    const id=window.__listenId||"";
    const sel=LISTEN.map(x=>`<option value="${x.id}" ${x.id===id?'selected':''}>${esc(x.title)} · ${esc(x.level)}</option>`).join('');
    return `<h4>泛听理解与检测（主旨 / 细节 / 推断）</h4>
      <div class="grid2">
        <div>
          <label class="fld"><span class="lab">选择材料</span><select id="q_mat">${sel||'<option>—</option>'}</select></label>
          <label class="fld"><span class="lab">语速</span><input id="q_rate" type="range" min="0.6" max="1.1" step="0.05" value="0.9"></label>
          <div class="note">两遍听法：第一遍抓主旨，第二遍抓细节。题目 ≤8 道。</div>
          <button class="btn primary" id="q_gen">生成听力任务单</button>
        </div>
        <div><div id="q_out"></div></div>
      </div>`;
  }
  function bind63(view){
    const b=view.querySelector('#m6body');
    function rate(){ return parseFloat(b.querySelector('#q_rate').value); }
    b.querySelector('#q_gen').onclick=()=>{
      const x=LISTEN.find(m=>m.id===b.querySelector('#q_mat').value); if(!x){toast('请选择材料');return;}
      const warm=["这段主要讲什么？","说话人之间的关系可能是什么？","你能猜到场景发生在哪里吗？"];
      const qs=x.quiz.map((q,i)=>`
        <div class="qcard" style="margin-top:8px">
          <div><span class="tag gray">${esc(q.type)}</span> <b>${i+1}. ${esc(q.q)}</b></div>
          <div class="row" style="margin-top:6px">${q.options.map((o,j)=>`<button class="btn sm q_opt" data-q="${i}" data-j="${j}">${esc(o)}</button>`).join('')}</div>
          <div class="hidden q_ans" style="margin-top:6px">${q.a===0?'✅':'❌'} 答案：<b>${esc(q.options[q.a])}</b> ｜ 解析：${esc(q.r)} ｜ 错因归类：<span class="tag red">${esc(errCat(q.r))}</span></div>
        </div>`).join('');
      b.querySelector('#q_out').innerHTML=`
        <div class="note bleu">听前预热（激活背景知识）：<ul style="margin:4px 0 0 18px">${warm.map(w=>'<li>'+esc(w)+'</li>').join('')}</ul></div>
        <div class="row" style="margin:8px 0"><button class="btn sm" id="q_p1">🔊 第一遍（抓主旨）</button><button class="btn sm" id="q_p2">🔊 第二遍（抓细节）</button></div>
        <div style="margin:8px 0">${qs}</div>
        <div class="note">错因归类：词汇 / 语速 / 连读 / 文化背景。对照 P6-1 生词表与 IPA 复听薄弱项。</div>`;
      b.querySelector('#q_p1').onclick=()=>playAll(x, rate());
      b.querySelector('#q_p2').onclick=()=>playAll(x, rate());
      const out=b.querySelector('#q_out');
      out.querySelectorAll('.q_opt').forEach(btn=>btn.onclick=()=>{
        const i=btn.dataset.q; const card=btn.closest('.qcard'); const ans=card.querySelector('.q_ans');
        const correct=x.quiz[i].a==parseInt(btn.dataset.j);
        card.querySelectorAll('.q_opt').forEach(o=>o.disabled=true);
        if(correct){ btn.classList.add('gold'); ans.classList.remove('hidden'); } else { btn.classList.add('danger'); ans.classList.remove('hidden'); const right=card.querySelectorAll('.q_opt')[x.quiz[i].a]; if(right) right.classList.add('gold'); }
      });
    };
    function playAll(x,r){ if(!ttsSupported()){toast('当前浏览器不支持朗读');return;} x.text.forEach((s,i)=>setTimeout(()=>speak(s.fr,{rate:r}),i*2400)); }
    function errCat(r){ if(/连读|联诵|省音|音变/.test(r)) return '连读'; if(/语速|快|太快/.test(r)) return '语速'; if(/词|词汇|生词/.test(r)) return '词汇'; if(/文化|习俗|背景/.test(r)) return '文化背景'; return '综合'; }
    if(window.__listenId){ window.__listenId=null; }
  }

  return {render};
})();
