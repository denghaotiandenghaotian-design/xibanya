/* 模块五 口语练习（P5-1 情景对话 / P5-2 发音纠正跟读 / P5-3 口语话题表达与评分）
 * 纯前端实现：Web Speech API 朗读（法语 TTS），无后端、离线可用。
 */
window.Modules = window.Modules || {};
Modules.m5 = (function(){
  const {$, esc, toast, speak, ttsSupported} = U;

  /* 法语音素与最小对立对（P5-2） */
  const PHON = [
    {grp:"元音", ipa:"/y/", name:"圆唇前高元音", tip:"舌位同 /i/（前高），双唇收圆前突，似汉语‘鱼’但更紧。", ex:["tu /ty/ 你","rue /ʁy/ 街"], pair:"tu /ty/ ↔ tout /tu/（圆唇与否）"},
    {grp:"元音", ipa:"/ø/", name:"圆唇前中元音", tip:"舌位同 /e/，双唇收圆，如 peu。", ex:["deux /dø/ 二","peu /pø/ 少"], pair:"pé /pe/ ↔ peux /pø/"},
    {grp:"元音", ipa:"/œ/", name:"圆唇前半低元音", tip:"舌位同 /ɛ/，双唇收圆，如 sœur。", ex:["sœur /sœʁ/ 姐妹","heure /œʁ/ 小时"], pair:"sel /sɛl/ ↔ seul /sœl/"},
    {grp:"鼻元音", ipa:"/ɑ̃/", name:"鼻化 a", tip:"口张开放松，气流同时从鼻出，如 champ。", ex:["chant /ʃɑ̃/ 歌","an /ɑ̃/ 年"], pair:"sans /sɑ̃/ ↔ cent /sɑ̃/（同音，语境区分）"},
    {grp:"鼻元音", ipa:"/ɔ̃/", name:"鼻化 o", tip:"双唇收圆，如 bon。", ex:["bon /bɔ̃/ 好","mon /mɔ̃/ 我的"], pair:"beau /bo/ ↔ bon /bɔ̃/"},
    {grp:"鼻元音", ipa:"/ɛ̃/", name:"鼻化 è", tip:"如 vin，注意与 /ɑ̃/ 区分。", ex:["vin /vɛ̃/ 葡萄酒","pain /pɛ̃/ 面包"], pair:"vent /vɑ̃/ ↔ vin /vɛ̃/"},
    {grp:"辅音", ipa:"/ʁ/", name:"小舌音", tip:"舌根抵小舌，气流摩擦颤动，似汉语‘喝’的弱化，勿发成 r 大舌音。", ex:["rouge /ʁuʒ/ 红","Paris /paʁi/ 巴黎"], pair:"rile(×) → 用 /ʁ/ 替代汉语 r"},
    {grp:"辅音", ipa:"/ʃ/ /ʒ/", name:"清/浊咝音", tip:"舌端靠硬腭，如 chien /ʃjɛ̃/，juin /ʒɥɛ̃/。", ex:["chaise /ʃɛz/ 椅","jour /ʒuʁ/ 日"], pair:"chou /ʃu/ ↔ jou /ʒu/"},
    {grp:"规则", ipa:"liaison", name:"联诵", tip:"以不发音辅音结尾的词 + 元音开头的词之间连读，如 les‿amis。", ex:["les amis /lɛ.z‿a.mi/","très‿utile"], pair:"注意：et、下列词(如 mais)后一般不联诵"},
    {grp:"规则", ipa:"élision", name:"省音", tip:"元音开头的词前，ce→c', la→l', je→j' 等。", ex:["c'est","l'école"], pair:"de/le 不省音（du）"}
  ];

  /* P5-3 题库（DELF/TCF 题型，附录C） */
  const TOPICS = [
    {lv:"A1", type:"自我介绍", q:"请用 3-4 句法语做自我介绍（姓名、国籍、爱好）。",
      modelB:"Je m'appelle Li. Je suis chinois, de Pékin. J'aime le sport et la musique.",
      modelA:"Bonjour, je m'appelle Li Ming. Je suis étudiant, originaire de Pékin en Chine. J'adore le football et la musique française, surtout la chanson.",
      errs:["混淆 tu/vous","忘记 être 变位（je suis）","名词漏阴阳性"]},
    {lv:"A1", type:"情景对话", q:"在咖啡馆点一杯咖啡并问价格。",
      modelB:"Un café, s'il vous plaît. Ça fait combien ?",
      modelA:"Bonjour, un café crème pour moi, s'il vous plaît. Combien est-ce que je vous dois ?",
      errs:["混淆 s'il te plaît / s'il vous plaît","疑问句语序"]},
    {lv:"A2", type:"描述经历", q:"用复合过去时讲述你上周末做过的一件事。",
      modelB:"Le week-end dernier, je suis allé au cinéma avec mes amis.",
      modelA:"Samedi dernier, je suis allé voir une exposition de photographie avec ma cousine. C'était très intéressant et nous avons beaucoup discuté.",
      errs:["avoir/être 助动词选错","être 类过去分词性数配合","PC 与 imparfait 混用"]},
    {lv:"B1", type:"观点表达", q:"谈谈你对‘大众旅游’的看法（赞成/反对 + 理由）。",
      modelB:"Le tourisme de masse est un problème. Il détruit la nature et les cultures locales.",
      modelA:"Selon moi, le tourisme de masse présente des inconvénients : il abîme souvent les sites protégés et les habitudes locales. Pourtant, il crée aussi des emplois. Il faut donc privilégier un tourisme plus durable.",
      errs:["条件式/虚拟式使用时机","连接词匮乏（donc/car/cependant）","语域过口语化"]}
  ];

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块五 · 口语练习</h3>
          <div class="row">
            <button class="btn sm" data-t="t1">P5-1 情景对话</button>
            <button class="btn sm" data-t="t2">P5-2 发音跟读</button>
            <button class="btn sm" data-t="t3">P5-3 话题评分</button>
          </div>
        </div>
        <div class="note bleu">口语陪练含 AI 引导脚本与地道替换；朗读基于浏览器法语 TTS（Web Speech API），无需联网即可发声。${ttsSupported()?'':'<b class="red"> 当前浏览器未检测到语音引擎，朗读按钮将不可用。</b>'}</div>
        <div id="m5body"></div>
      </div>`;
    view.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ view.querySelectorAll('[data-t]').forEach(x=>x.classList.remove('primary')); b.classList.add('primary'); show(view,b.dataset.t); });
    view.querySelector('[data-t="t1"]').classList.add('primary'); show(view,'t1');
  }
  function show(view,t){ const b=view.querySelector('#m5body');
    if(t==='t1') b.innerHTML=p51(); if(t==='t2') b.innerHTML=p52(); if(t==='t3') b.innerHTML=p53();
    if(t==='t1') bind51(view); if(t==='t2') bind52(view); if(t==='t3') bind53(view);
  }

  /* P5-1 情景对话 */
  function p51(){
    return `<h4>情景对话模拟（角色扮演陪练）</h4>
      <label class="fld" style="max-width:420px"><span class="lab">选择场景</span>
        <select id="sc_sel">${SCEN.map(s=>`<option value="${esc(s.id)}">${esc(s.title)} · ${esc(s.level)}（你演：${esc(s.userRole)}）</option>`).join('')}</select></label>
      <div id="sc_out"></div>`;
  }
  function bind51(view){
    const b=view.querySelector('#m5body');
    function render(){
      const s=SCEN.find(x=>x.id===b.querySelector('#sc_sel').value); if(!s) return;
      const turns=s.turns.map((t,i)=>`
        <div class="qcard">
          <div class="qt"><span class="tag ${U.lvClass(s.level)}">第${i+1}轮</span> <b>${esc(s.aiRole)}：</b></div>
          <div style="margin:6px 0"><span class="fr-line">${esc(t.ai.fr)}</span> <span class="muted">${esc(t.ai.zh)}</span>
            ${U.speakBtn(t.ai.fr,{label:"🔊"})}</div>
          <div class="note">你的任务：${esc(t.userHint)}</div>
          <textarea class="u_ans" placeholder="在此用法语回应（可自由发挥）…" style="margin:6px 0"></textarea>
          <button class="btn sm reveal">↳ 对照示范回应</button>
          <div class="hidden reveal-box" style="margin-top:8px">
            <div><b>关键表达：</b>${(t.keyExpr||[]).map(k=>`<span class="tag gold">${esc(k.fr)}</span> <span class="muted">${esc(k.zh)}</span>`).join('；')}</div>
            <div style="margin-top:6px"><b>更地道替换：</b>${(t.alts||[]).map(a=>`<div>· ${esc(a.fr)} <span class="muted">${esc(a.zh)}</span></div>`).join('')||'—'}</div>
          </div>
        </div>`).join('');
      b.querySelector('#sc_out').innerHTML=`
        <div class="qcard"><b>场景</b>：${esc(s.scene)}　<span class="muted">你：${esc(s.userRole)} / ${esc(s.aiRole)}：AI</span></div>
        ${turns}
        <div class="note">整体点评：${esc(s.comment)}</div>
        <div class="row">
          <button class="btn sm" id="sc_playall">🔊 朗读全部 AI 台词</button>
          <button class="btn sm ghost" id="sc_reset">重置作答</button>
        </div>`;
      b.querySelectorAll('.reveal').forEach(btn=>btn.onclick=()=>{ const box=btn.nextElementSibling; box.classList.toggle('hidden'); });
      b.querySelector('#sc_reset').onclick=()=>{ b.querySelectorAll('.u_ans').forEach(t=>t.value=''); toast('已清空作答'); };
      b.querySelector('#sc_playall').onclick=()=>{
        if(!ttsSupported()){ toast('当前浏览器不支持朗读'); return; }
        s.turns.forEach((t,i)=> setTimeout(()=>speak(t.ai.fr,{level:s.level}), i*1800));
      };
    }
    b.querySelector('#sc_sel').onchange=render; render();
  }

  /* P5-2 发音纠正与跟读 */
  function p52(){
    const phonRows=PHON.map(p=>`
      <tr><td><span class="ipa">${esc(p.ipa)}</span></td><td>${esc(p.name)}</td>
        <td>${(p.ex||[]).map(e=>{const [w,zh]=e.split(' /'); return `<span class="chip">${esc(w)} <span class="muted">${esc(zh||'')}</span></span>`;}).join(' ')}</td>
        <td class="muted">${esc(p.tip)}</td>
        <td>${esc(p.pair)}</td></tr>`).join('');
    return `<h4>发音纠正与跟读训练</h4>
      <div class="grid2">
        <div>
          <h4 style="margin-top:0">跟读练习区</h4>
          <label class="fld"><span class="lab">跟读文本（可自填或选例句）</span>
            <textarea id="rd_text">Bonjour, je m'appelle Marie. Enchantée de faire votre connaissance.</textarea></label>
          <label class="fld" style="max-width:320px"><span class="lab">语速</span>
            <input id="rd_rate" type="range" min="0.6" max="1.1" step="0.05" value="0.9"> <span id="rd_rval" class="muted">0.9×</span></label>
          <div class="row">
            <button class="btn primary" id="rd_play">🔊 听示范</button>
            <button class="btn sm" id="rd_ex1">填例句①</button>
            <button class="btn sm" id="rd_ex2">填例句②</button>
          </div>
          <div class="note">跟读步骤：① 盲听 ② 跟读并录音自评 ③ 再听对比。浏览器无法录音，请用纸笔/手机录后回放对比；重点音素见下表。</div>
        </div>
        <div>
          <h4 style="margin-top:0">我的跟读对照</h4>
          <textarea id="rd_mine" placeholder="把你的跟读文本写在这里，方便对照（也可用于让 AI 点评）…"></textarea>
          <div class="note">常见难点：/y/ 圆唇前高、小舌音 /ʁ/、鼻元音区分、联诵与省音。</div>
        </div>
      </div>
      <h4>音素与最小对立对（≤3 个聚焦）</h4>
      <div class="tablewrap"><table><thead><tr><th>IPA</th><th>音素</th><th>示例词</th><th>舌位/规则提示</th><th>最小对立对</th></tr></thead><tbody>${phonRows}</tbody></table></div>`;
  }
  function bind52(view){
    const b=view.querySelector('#m5body');
    const rateInput=b.querySelector('#rd_rate');
    rateInput.oninput=()=>{ b.querySelector('#rd_rval').textContent=parseFloat(rateInput.value).toFixed(2)+'×'; };
    b.querySelector('#rd_play').onclick=()=>{ const t=b.querySelector('#rd_text').value.trim(); if(!t){toast('请填写跟读文本');return;} speak(t,{rate:parseFloat(rateInput.value)}); };
    b.querySelector('#rd_ex1').onclick=()=>{ b.querySelector('#rd_text').value="Le petit chat est assis sur la chaise rouge près de la fenêtre."; toast('已填入'); };
    b.querySelector('#rd_ex2').onclick=()=>{ b.querySelector('#rd_text').value="Nous sommes allés à la campagne pendant les vacances, c'était très agréable."; toast('已填入'); };
  }

  /* P5-3 话题表达与评分 */
  function p53(){
    return `<h4>口语话题表达与评分（DELF / TCF 题型）</h4>
      <label class="fld" style="max-width:480px"><span class="lab">选择题型与题目</span>
        <select id="tp_sel">${TOPICS.map((t,i)=>`<option value="${i}">[${esc(t.lv)}] ${esc(t.type)}：${esc(t.q)}</option>`).join('')}</select></label>
      <div id="tp_out"></div>`;
  }
  function bind53(view){
    const b=view.querySelector('#m5body');
    function render(){
      const t=TOPICS[parseInt(b.querySelector('#tp_sel').value)||0];
      const dims=[["流利度","能否连贯表达，停顿是否过多"],["词汇","用词是否准确、丰富、恰当"],["语法","变位/性数/时态是否正确"],["发音","音素、重音、节奏是否清晰"]];
      const tpl=dims.map((d,i)=>`
        <div class="score-row">
          <div style="min-width:90px"><b>${d[0]}</b><div class="muted" style="font-size:11px">${esc(d[1])}</div></div>
          <select class="sc_lev" data-d="${i}">
            <option value="优">优</option><option value="良" selected>良</option><option value="待改进">待改进</option>
          </select>
          <input class="sc_note" data-d="${i}" placeholder="1 条改进建议" style="flex:1">
        </div>`).join('');
      b.querySelector('#tp_out').innerHTML=`
        <div class="qcard">
          <div class="qt"><span class="tag ${U.lvClass(t.lv)}">${esc(t.lv)}</span> <b>${esc(t.type)}</b></div>
          <div style="margin:6px 0">题目：${esc(t.q)}</div>
          <button class="btn sm" id="tp_play">🔊 朗读题目</button>
        </div>
        <h4 style="margin-top:14px">你的作答（语音考试建议脱稿口述；此处可写下关键词用于自评）</h4>
        <textarea id="tp_ans" placeholder="写下你的作答关键词 / 完整句子…" style="min-height:90px"></textarea>
        <h4 style="margin-top:14px">四维评分卡（自评 / 老师评）</h4>
        <div class="score-card">${tpl}</div>
        <div class="row" style="margin-top:10px">
          <button class="btn primary" id="tp_calc">生成评分小结</button>
        </div>
        <div id="tp_sum"></div>
        <h4 style="margin-top:14px">示范回答</h4>
        <div class="note bleu">达标版（A1≤5句 / B1≤2分钟）：<br><span class="fr-line">${esc(t.modelB)}</span></div>
        <div class="note">进阶版：<br><span class="fr-line">${esc(t.modelA)}</span></div>
        <div class="note red">本话题典型错误：${(t.errs||[]).map(e=>'· '+esc(e)).join('；')}</div>`;
      b.querySelector('#tp_play').onclick=()=>speak(t.q,{level:t.lv});
      b.querySelector('#tp_calc').onclick=()=>{
        const levels=Array.from(b.querySelectorAll('.sc_lev')).map(s=>s.value);
        const notes=Array.from(b.querySelectorAll('.sc_note')).map(s=>s.value.trim());
        const order={优:3,良:2,待改进:1};
        const total=levels.reduce((a,v)=>a+order[v],0);
        const avg=(total/levels.length).toFixed(1);
        const rate=total/(levels.length*3)*100;
        const grade = rate>=85?'优秀':rate>=65?'良好':'需加强';
        const sugg=notes.filter(Boolean).length?notes.filter(Boolean).map(n=>'· '+esc(n)).join('<br>'):'（无补充建议）';
        b.querySelector('#tp_sum').innerHTML=`<div class="qcard" style="margin-top:8px">
          <b>评分小结：</b>均分 ${avg}/3 · 综合 ${rate.toFixed(0)}% · 评级 <span class="tag gold">${grade}</span>
          <div style="margin-top:6px" class="muted">改进建议：<br>${sugg}</div>
          <div style="margin-top:6px" class="note">提示：发音维度可对照 P5-2 音素表自纠；语法维度对照 P1 考点库与 P3 思维导图。</div>
        </div>`;
        toast('评分已生成');
      };
    }
    b.querySelector('#tp_sel').onchange=render; render();
  }

  return {render};
})();
