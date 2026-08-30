/* 模块十二 自测中心（听/说/读/写 四维，自动打分 + 最薄弱维度定位 + 针对性建议 + 历史）
 * 听：TTS 播放 → 选中文（客观，自动）
 * 读：法文篇章 → 选正确中文翻译（客观，自动）
 * 写：中文 → 拼写法文（编辑距离相似度，自动，容忍重音）
 * 说：提示口语 → 语音识别 或 打字输入，按相似度打分（自动）；不支持则自评兜底
 * 完成后算 四维分+综合分，定位最薄弱维度并给建议；历史可查。
 */
window.Modules = window.Modules || {};
Modules.m12 = (function(){
  const {$, esc, toast} = U;
  let curTest=null, selMap={}, speakScores={}, writeScores={}, lastReport=null;

  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function norm(s){ return (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim(); }
  function sim(a,b){ const na=norm(a).split(' ').filter(Boolean); const nb=new Set(norm(b).split(' ').filter(Boolean)); if(!na.length) return 0; return na.filter(t=>nb.has(t)).length/na.length; }
  function buildMCQ(item, pool){
    const zhPool=shuffle(pool.map(p=>p.zh).filter(z=>z&&z!==item.zh));
    const opts=shuffle([item.zh, zhPool[0], zhPool[1], zhPool[2]]);
    return {id:item.id||item.fr, fr:item.fr, zh:item.zh, lv:item.lv, scenario:item.scenario, scName:item.scName, options:opts, a:opts.indexOf(item.zh)};
  }
  function genTest(){
    const pool=shuffle(FRV.allSent());
    const L=pool.slice(0,5), R=pool.slice(5,10), W=pool.slice(10,15), S=pool.slice(15,18);
    curTest={
      listen:L.map(x=>buildMCQ(x,pool)),
      read:R.map(x=>buildMCQ(x,pool)),
      write:W.map(x=>({id:x.fr, zh:x.zh, fr:x.fr, lv:x.lv, scenario:x.scenario, scName:x.scName})),
      speak:S.map(x=>({id:x.fr, prompt:'请用法语说出：'+x.zh, target:x.fr, lv:x.lv, scenario:x.scenario, scName:x.scName}))
    };
    selMap={}; speakScores={}; writeScores={};
    return curTest;
  }

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块十二 · 自测中心</h3>
          <div class="row">
            <button class="btn sm" data-t="t1">开始测试</button>
            <button class="btn sm" data-t="t2">测试报告 / 历史</button>
          </div>
        </div>
        <div class="note bleu">从 <b>听、说、读、写</b> 四维综合检测，提交后自动算分并<b>定位最薄弱维度</b>、给出针对性建议。历史成绩可追溯。</div>
        <div id="m12body"></div>
      </div>`;
    view.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ view.querySelectorAll('[data-t]').forEach(x=>x.classList.remove('primary')); b.classList.add('primary'); show(view,b.dataset.t); });
    view.querySelector('[data-t="t1"]').classList.add('primary');
    show(view,'t1');
  }
  function show(view,t){
    const body=view.querySelector('#m12body');
    if(t==='t1') body.innerHTML=t1();
    if(t==='t2') body.innerHTML=t2();
    bind(view,t,body);
  }

  function t1(){
    genTest();
    const hasRec=(typeof SpeechRecognition!=='undefined'||typeof webkitSpeechRecognition!=='undefined');
    const listen=curTest.listen.map((q,i)=>`
      <div class="qcard" data-dim="listen" data-qid="${esc(q.id)}">
        <div class="qt"><span class="tag ${U.lvClass(q.lv)}">听 ${i+1}</span> 请听录音，选择对应的中文意思</div>
        ${U.speakBtn(q.fr,{level:q.lv,label:"🔊 播放录音"})}
        <div class="opts" style="margin-top:10px">${q.options.map((o,k)=>`<div class="opt" data-k="${k}">${esc(o)}</div>`).join('')}</div>
        <div class="reveal-box hidden" data-rev></div>
      </div>`).join('');
    const read=curTest.read.map((q,i)=>`
      <div class="qcard" data-dim="read" data-qid="${esc(q.id)}">
        <div class="qt"><span class="tag ${U.lvClass(q.lv)}">读 ${i+1}</span> 阅读并选择正确中文翻译</div>
        <div class="fr-line">${esc(q.fr)} ${U.speakBtn(q.fr,{level:q.lv,label:"🔊"})}</div>
        <div class="opts" style="margin-top:8px">${q.options.map((o,k)=>`<div class="opt" data-k="${k}">${esc(o)}</div>`).join('')}</div>
        <div class="reveal-box hidden" data-rev></div>
      </div>`).join('');
    const write=curTest.write.map((q,i)=>`
      <div class="qcard" data-dim="write" data-qid="${esc(q.id)}">
        <div class="qt"><span class="tag ${U.lvClass(q.lv)}">写 ${i+1}</span> 将下列中文翻译成法语</div>
        <div class="fr-line">${esc(q.zh)}</div>
        <input class="w-input" data-qid="${esc(q.id)}" placeholder="写法文…" style="margin-top:8px">
        <div class="reveal-box hidden" data-rev></div>
      </div>`).join('');
    const speak=curTest.speak.map((q,i)=>`
      <div class="qcard" data-dim="speak" data-qid="${esc(q.id)}">
        <div class="qt"><span class="tag ${U.lvClass(q.lv)}">说 ${i+1}</span> ${esc(q.prompt)}</div>
        <div class="row" style="gap:8px;margin-bottom:8px">
          ${U.speakBtn(q.target,{level:q.lv,label:"🔊 听示范"})}
          <span class="muted" style="font-size:12px">目标：${esc(q.target)}</span>
        </div>
        <input class="w-input sp-type" data-qid="${esc(q.id)}" placeholder="或在此打字输入法语…" style="margin-top:4px">
        ${hasRec?`<button class="btn sm primary" data-mic>🎤 语音识别并评分</button>`:''}
        <div class="row" style="margin-top:8px;gap:6px">
          <span class="muted" style="font-size:12px">无法输入？自评：</span>
          <button class="chip sp-self" data-sc="0">完全不会</button>
          <button class="chip sp-self" data-sc="40">较困难</button>
          <button class="chip sp-self" data-sc="75">基本流利</button>
          <button class="chip sp-self" data-sc="100">流利准确</button>
        </div>
        <div class="reveal-box hidden" data-rev></div>
      </div>`).join('');
    return `
      <div class="test-sec"><h4>🔊 听力（${curTest.listen.length} 题）</h4>${listen}</div>
      <div class="test-sec"><h4>📖 阅读（${curTest.read.length} 题）</h4>${read}</div>
      <div class="test-sec"><h4>✍️ 写作（${curTest.write.length} 题）</h4>${write}</div>
      <div class="test-sec"><h4>🗣️ 口语（${curTest.speak.length} 题）</h4>${speak}</div>
      <div class="row" style="margin-top:14px">
        <button class="btn primary" id="t_submit">📊 提交并自动评分</button>
        <button class="btn ghost" id="t_regen">↻ 重新生成测试</button>
        <span class="muted" id="t_tip"></span>
      </div>`;
  }

  function bind(view,t,body){
    if(t!=='t1'){ bindT2(view,body); return; }
    body.querySelectorAll('.qcard[data-dim="listen"],.qcard[data-dim="read"]').forEach(card=>{
      const qid=card.dataset.qid;
      card.querySelectorAll('.opt').forEach(o=>o.onclick=()=>{ card.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel')); o.classList.add('sel'); selMap[qid]=parseInt(o.dataset.k); });
    });
    body.querySelectorAll('.qcard[data-dim="speak"]').forEach(card=>{
      const qid=card.dataset.qid;
      card.querySelectorAll('.sp-self').forEach(b=>b.onclick=()=>{
        card.querySelectorAll('.sp-self').forEach(x=>x.classList.remove('on')); b.classList.add('on');
        speakScores[qid]=parseInt(b.dataset.sc);
        const rev=card.querySelector('[data-rev]'); rev.classList.remove('hidden'); rev.textContent='自评得分：'+speakScores[qid]+' 分。';
      });
      const mic=card.querySelector('[data-mic]');
      if(mic) mic.onclick=()=>{
        const SR=(typeof SpeechRecognition!=='undefined')?SpeechRecognition:(typeof webkitSpeechRecognition!=='undefined'?webkitSpeechRecognition:null);
        if(!SR) return;
        const rec=new SR(); rec.lang='fr-FR'; rec.interimResults=false; rec.maxAlternatives=1;
        const rev=card.querySelector('[data-rev]'); rev.classList.remove('hidden'); rev.textContent='正在聆听…请说法语';
        try{ rec.start(); }catch(e){ rev.textContent='无法启动麦克风：'+e.message; return; }
        rec.onresult=e=>{ const txt=e.results[0][0].transcript; const score=Math.round(sim(txt, curTest.speak.find(q=>q.id===qid).target)*100); speakScores[qid]=score; rev.textContent='识别到：'+txt+' ｜ 匹配度 '+score+' 分'; };
        rec.onerror=e=>{ rev.textContent='识别失败（'+e.error+'），请改用自评或打字。'; };
      };
    });
    body.querySelector('#t_regen').onclick=()=>show(view,'t1');
    body.querySelector('#t_submit').onclick=()=>{
      const rep=score(); lastReport=rep; Store.addTest({date:U.todayISO(), scores:rep.scores, advice:rep.advice.length, weakest:rep.weakest});
      toast('评分完成！总分 '+rep.scores.total+' ｜ 最薄弱：'+rep.weakest);
      view.querySelectorAll('[data-t]').forEach(x=>x.classList.toggle('primary', x.dataset.t==='t2'));
      show(view,'t2');
    };
  }

  function score(){
    const adv=[];
    let lc=0; curTest.listen.forEach(q=>{ const ok=selMap[q.id]===q.a; if(ok) lc++; else adv.push({dim:'听', sc:q.scName, fr:q.fr, zh:q.zh}); });
    let rc=0; curTest.read.forEach(q=>{ const ok=selMap[q.id]===q.a; if(ok) rc++; else adv.push({dim:'读', sc:q.scName, fr:q.fr, zh:q.zh}); });
    let wc=0, wsum=0; curTest.write.forEach(q=>{ const el=document.querySelector('.w-input[data-qid="'+CSS.escape(q.id)+'"]'); const v=el?el.value:''; const s=Math.round(sim(v,q.fr)*100); writeScores[q.id]=s; wsum+=s; if(s>=75){wc++;} else adv.push({dim:'写', sc:q.scName, fr:q.fr, zh:q.zh, your:v}); });
    let scSum=0; curTest.speak.forEach(q=>{
      const typedEl=document.querySelector('.sp-type[data-qid="'+CSS.escape(q.id)+'"]');
      let s = typeof speakScores[q.id]==='number'? speakScores[q.id] : (typedEl&&typedEl.value.trim()? Math.round(sim(typedEl.value.trim(), q.target)*100) : 0);
      scSum+=s; if(s<60) adv.push({dim:'说', sc:q.scName, fr:q.target});
    });
    const listen=Math.round(lc/curTest.listen.length*100);
    const read=Math.round(rc/curTest.read.length*100);
    const write=Math.round(wsum/curTest.write.length);
    const speak=Math.round(scSum/curTest.speak.length);
    const total=Math.round((listen+read+write+speak)/4);
    const dims={听:listen,说:speak,读:read,写:write};
    let weakest='听', wv=999; Object.keys(dims).forEach(k=>{ if(dims[k]<wv){ wv=dims[k]; weakest=k; } });
    return {scores:{listen,read,write,speak,total}, detail:{lc,rc,wc}, advice:adv, weakest, weakestVal:wv};
  }

  function t2(){
    const rep=lastReport || (Store.getTests().length? buildFromStore(Store.getTests()[0]):null);
    if(!rep) return `<div class="note">还没有测试记录。请先到「开始测试」完成一次自测。</div>`;
    const sc=rep.scores;
    const dimCard=(name,val)=>`<div class="score-row"><div style="flex:0 0 90px;font-weight:700">${name}</div>
      <div class="bar" style="flex:1"><i style="width:${val}%"></i></div>
      <div class="num" style="width:54px;text-align:right;font-weight:800;color:${val>=75?'var(--ok)':val>=50?'var(--warn)':'var(--bad)'}">${val}</div></div>`;
    const advice=(rep.advice&&rep.advice.length)? buildAdvice(rep.advice) : `<div class="note ok">太棒了！本次自测四个维度均表现良好，继续保持节奏即可。</div>`;
    const hist=Store.getTests().slice().reverse().slice(0,6).map(t=>`
      <tr><td>${U.fmtDate(t.date)}</td><td>${t.scores.total}</td><td>${t.scores.listen}</td><td>${t.scores.read}</td><td>${t.scores.write}</td><td>${t.scores.speak}</td>${t.weakest?`<td><span class="tag red">${esc(t.weakest)}</span></td>`:'<td>—</td>'}</tr>`).join('');
    return `
      <div class="spread" style="align-items:flex-end">
        <h4>本次综合得分</h4>
        <div class="row">
          <div class="stat" style="padding:10px 16px"><div class="num" style="color:${sc.total>=75?'var(--ok)':sc.total>=50?'var(--warn)':'var(--bad)'}">${sc.total}</div><div class="lbl">总分</div></div>
          <div class="stat" style="padding:10px 16px"><div class="num" style="color:var(--bad)">${esc(rep.weakest)}</div><div class="lbl">最薄弱维度</div></div>
          <button class="btn sm" id="t_again">↻ 再做一次</button>
        </div>
      </div>
      <div class="score-card" style="margin-top:10px">
        ${dimCard('🔊 听力',sc.listen)}
        ${dimCard('🗣️ 口语',sc.speak)}
        ${dimCard('📖 阅读',sc.read)}
        ${dimCard('✍️ 写作',sc.write)}
      </div>
      <h4 style="margin-top:18px">🎯 针对性学习优化建议</h4>
      ${advice}
      <h4 style="margin-top:16px">近期测试记录</h4>
      <div class="tablewrap"><table><thead><tr><th>日期</th><th>总分</th><th>听</th><th>读</th><th>写</th><th>说</th><th>薄弱</th></tr></thead><tbody>${hist||'<tr><td colspan=7 class=muted>暂无</td></tr>'}</tbody></table></div>`;
  }
  function buildFromStore(t){ return {scores:t.scores, advice:[], weakest:t.weakest||'—', weakestVal:0}; }
  function buildAdvice(adv){
    const byDim={}; adv.forEach(a=>{ (byDim[a.dim]=byDim[a.dim]||[]).push(a); });
    const tips={'听':'多听该情景法语材料（模块六听力 / 模块十句子跟读），先盲听再对照文本，逐句精听。',
      '读':'巩固该情景核心词汇与句型（模块九单词 / 模块十句子），遇到长句先抓主谓宾。',
      '写':'重点练该句法文拼写与冠词/阴阳性（模块九单词 + 模块十一每日一练），写完对照目标句修正。',
      '说':'跟读模块十 / 十二的目标句，注意语速与连读；可用「听示范」后模仿，再用录音或打字自评。'};
    let html='';
    Object.keys(byDim).forEach(dim=>{ const items=byDim[dim].slice(0,4);
      html+=`<div class="qcard"><div class="qt"><span class="tag red">${dim} 待加强</span> 共 ${byDim[dim].length} 处</div>
        <ul class="adv-list">${items.map(a=>`<li>${esc(a.sc||'')}：${esc(a.fr||'')}${a.zh?'（正确：'+esc(a.zh)+'）':''}${a.your?' ｜ 你的：'+esc(a.your):''}</li>`).join('')}</ul>
        <div class="note">${esc(tips[dim]||'')}</div></div>`; });
    return html;
  }
  function bindT2(view,body){ const b=body.querySelector('#t_again'); if(b) b.onclick=()=>{ view.querySelectorAll('[data-t]').forEach(x=>x.classList.toggle('primary', x.dataset.t==='t1')); show(view,'t1'); }; }

  return {render};
})();
