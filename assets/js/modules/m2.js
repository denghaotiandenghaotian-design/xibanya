/* 模块二 复习计划生成（P2-1 总计划 / P2-2 周计划 / P2-3 弱项补强 / P2-4 动态调整） */
window.Modules = window.Modules || {};
Modules.m2 = (function(){
  const {$, esc, toast, todayISO, fmtDate, daysBetween} = U;

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块二 · 复习计划生成</h3>
          <div class="row">
            <button class="btn sm" data-t="t1">P2-1 总计划</button>
            <button class="btn sm" data-t="t2">P2-2 周计划</button>
            <button class="btn sm" data-t="t3">P2-3 弱项补强</button>
            <button class="btn sm" data-t="t4">P2-4 动态调整</button>
          </div>
        </div>
        <div id="m2body"></div>
      </div>`;
    view.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ view.querySelectorAll('[data-t]').forEach(x=>x.classList.remove('primary')); b.classList.add('primary'); show(view,b.dataset.t); });
    view.querySelector('[data-t="t1"]').classList.add('primary');
    show(view,'t1');
  }
  function show(view,t){ const b=view.querySelector('#m2body');
    if(t==='t1') b.innerHTML=p21(); if(t==='t2') b.innerHTML=p22(); if(t==='t3') b.innerHTML=p23(); if(t==='t4') b.innerHTML=p24();
    if(t==='t1') bind21(view); if(t==='t2') bind22(view); if(t==='t3') bind23(view); if(t==='t4') bind24(view);
  }

  /* P2-1 总计划 */
  function p21(){
    const s=Store.getSettings();
    return `
      <h4>从 0 到 1 分阶段总计划</h4>
      <div class="grid2">
        <div>
          <label class="fld"><span class="lab">目标等级</span><select id="g_lv">${U.lvOptions(s.targetLevel)}</select></label>
          <label class="fld"><span class="lab">目标考试</span><select id="g_exam">${["无","DELF A1","DELF A2","DELF B1","DELF B2","TCF","TEF"].map(e=>`<option ${e===s.exam?'selected':''}>${e}</option>`).join("")}</select></label>
          <label class="fld"><span class="lab">考试日期（留空=不限）</span><input id="g_examdate" type="date" value="${s.examDate||''}"></label>
          <label class="fld"><span class="lab">每日可投入（分钟）</span><input id="g_min" type="number" value="${s.dailyMinutes||30}" min="10" max="300"></label>
          <label class="fld"><span class="lab">主用教材</span><select id="g_tb">${TB.list.map(t=>`<option ${t.name===s.textbook?'selected':''}>${esc(t.name)}</option>`).join("")}</select></label>
          <button class="btn primary" id="g_gen">生成总计划</button>
          <button class="btn sm" id="g_save">保存为我的计划</button>
        </div>
        <div><div id="g_out"></div></div>
      </div>`;
  }
  function bind21(view){
    const b=view.querySelector('#m2body');
    function gen(){
      const lv=b.querySelector('#g_lv').value;
      const exam=b.querySelector('#g_exam').value;
      const ed=b.querySelector('#g_examdate').value;
      const min=parseInt(b.querySelector('#g_min').value)||30;
      const tb=b.querySelector('#g_tb').value;
      const idx=U.LV.indexOf(lv);
      const stagesDef=[
        {n:"语音入门",sub:"A0→A1语音基础",wk:2,voc:"掌握字母/元音/辅音",gram:"语音规则、联诵、省音"},
        {n:"A1",sub:"日常表达与简单交流",wk:8,voc:"500-800",gram:"现在时、冠词、疑问/否定、数字"},
        {n:"A2",sub:"家庭/购物/出行",wk:10,voc:"1500-2000",gram:"复合过去时、imparfait、最近将来/过去时"},
        {n:"B1",sub:"熟悉话题讨论与观点",wk:12,voc:"2500-4000",gram:"简单将来时、条件式、关系代词、虚拟式基础"},
        {n:"B2",sub:"复杂文本与流畅交流",wk:12,voc:"5000-8000",gram:"虚拟式、被动态、高级衔接"}
      ];
      const stages=stagesDef.slice(0, Math.max(1, idx)); // A0/A1->1 stage... but idx of A1=1 => slice(0,1) only 语音入门. Need A1 included.
      // 修正：A1 => 语音入门 + A1
      const need = idx; // A1->1 means include 语音入门(0) + A1(index1) = 2 stages, use slice(0, idx+1)
      const sel=stagesDef.slice(0, idx+1);
      let weeks=sel.map(s=>s.wk);
      let note="";
      if(ed){
        const avail=Math.max(0, Math.round(daysBetween(todayISO(), ed)/7) - 3); // 预留冲刺+机动
        const sum=weeks.reduce((a,c)=>a+c,0);
        if(avail>0 && avail<sum){
          weeks=weeks.map(w=>Math.max(1,Math.round(w*avail/sum)));
          note=`⚠ 距考试 ${avail} 周（已预留3周冲刺+机动），原需 ${sum} 周，已按比例压缩，需提高每日强度。`;
        } else if(avail>=sum){
          note=`距考试 ${Math.round(daysBetween(todayISO(),ed)/7)} 周，时间充裕，含 2 周冲刺 + 1 周机动。`;
        } else { note=`⚠ 考试日期已过或不足，请检查。`; }
      }
      // 教材进度估算（你好！法语每级约12课）
      const perStageLessons = sel.map((s,i)=> s.n==="语音入门"?"发音入门":`第${i===0?1:((i-1)*12+1)}-${i===0?0:(i*12)}课`).filter(x=>x!=="第1-0课");
      let html=`<div class="note bleu">${esc(note)||'已按 CECRL 通用框架估算各阶段周数。'}</div>
        <div class="tablewrap"><table>
        <thead><tr><th>阶段</th><th>目标</th><th>周数</th><th>教材进度</th><th>语法主线</th><th>词汇目标</th><th>每日配比(听/说/读/写)</th><th>里程碑自测</th></tr></thead><tbody>`;
      sel.forEach((s,i)=>{
        const lp = s.n==="语音入门"?"《发音快速入门》":`${tb.split(' ')[0]} 第${i===0?1:(i-1)*12+1}–${i*12}课`;
        html+=`<tr>
          <td><b>${esc(s.n)}</b></td><td>${esc(s.sub)}</td><td><b>${weeks[i]}</b></td>
          <td class="muted">${esc(lp)}</td><td>${esc(s.gram)}</td><td>${esc(s.voc)}</td>
          <td><span class="tag gray">听25%</span><span class="tag gray">说15%</span><span class="tag gray">读30%</span><span class="tag gray">写30%</span></td>
          <td class="muted">${s.n==="语音入门"?"能读全部字母":"完成对应 DELF/自测题 ≥80%"}</td></tr>`;
      });
      html+=`</tbody></table></div>
        <div class="note">约束自检：单阶段 ≤12 周 ✓；每日配比含听力与口语 ✓；考试倒排已预留 2 周冲刺 + 1 周机动 ✓。</div>`;
      b.querySelector('#g_out').innerHTML=html;
      b.querySelector('#g_save').onclick=()=>{ Store.savePlans(Object.assign(Store.getPlans().filter(p=>p.kind!=='master'),[{kind:'master',lv,exam:exam,ed,min,tb,stages:sel.map((s,i)=>({n:s.n,wk:weeks[i],gram:s.gram,voc:s.voc})),date:todayISO()}])); toast('已保存总计划'); };
    }
    b.querySelector('#g_gen').onclick=gen;
    if(b.querySelector('#g_examdate').value) gen();
  }

  /* P2-2 周计划 */
  function p22(){
    const weak=Store.computeWeakness().map(w=>w.code);
    return `
      <h4>周度学习排程（含艾宾浩斯复习 + 听说任务）</h4>
      <div class="grid2">
        <div>
          <label class="fld"><span class="lab">阶段目标</span><select id="w_stage">${["A1 基础","A2 进阶","B1 提升","B2 精通"].map(s=>`<option>${s}</option>`).join("")}</select></label>
          <label class="fld"><span class="lab">本周可用天数</span><input id="w_days" type="number" value="6" min="1" max="7"></label>
          <label class="fld"><span class="lab">每日时长（分钟）</span><input id="w_min" type="number" value="40" min="10" max="300"></label>
          <label class="fld"><span class="lab">教材进度（如 第3-4课）</span><input id="w_prog" value="第3课"></label>
          <label class="fld"><span class="lab">薄弱考点（可选，插入每日专项）</span>
            <div class="row" id="w_weak">${weak.length?weak.map(c=>`<label class="chip"><input type="checkbox" value="${esc(c)}" checked> ${esc(c)}</label>`).join(''):'<span class="muted">暂无（可先在 P1-4 记录错题）</span>'}</div></label>
          <button class="btn primary" id="w_gen">生成周计划</button>
        </div>
        <div><div id="w_out"></div></div>
      </div>`;
  }
  function bind22(view){
    const b=view.querySelector('#m2body');
    b.querySelector('#w_gen').onclick=()=>{
      const stage=b.querySelector('#w_stage').value;
      const days=Math.min(7,Math.max(1,parseInt(b.querySelector('#w_days').value)||6));
      const min=parseInt(b.querySelector('#w_min').value)||40;
      const prog=b.querySelector('#w_prog').value.trim()||'本周进度';
      const weak=Array.from(b.querySelectorAll('#w_weak input:checked')).map(x=>x.value);
      const dayNames=["周一","周二","周三","周四","周五","周六","周日"];
      // 新课分配：前 days-2 天排新课
      let html=`<div class="note bleu">阶段：${esc(stage)} · 可用 ${days} 天 · 每日约 ${min} 分钟 · 艾宾浩斯复习嵌入第1/2/4/7天</div>
        <div class="tablewrap"><table><thead><tr><th>日期</th><th>新课内容</th><th>复习内容(艾宾浩斯)</th><th>听力/口语任务</th><th>预估</th><th>完成</th></tr></thead><tbody>`;
      let oral=0, listen=0;
      for(let i=0;i<days;i++){
        const dn=dayNames[i];
        const isNewDay = i<days-1;
        const newC = isNewDay?`${prog} 新知识点 ${i+1}`:'本周小结与自测';
        let rev=[];
        if(i>=1) rev.push(`复习 D${i} 新学`);
        if(i===3) rev.push('复习 D1 新学(间隔4)');
        if(i===6) rev.push('复习 D2 新学(间隔7)');
        const hasWeak = weak.length && (i%2===0);
        if(hasWeak) rev.push(`薄弱专项·${weak[0]}`);
        // 听说任务：保证≥3口语 ≥3听力
        let task='';
        if(i%2===0){ task='口语：情景对话 10min'; oral++; }
        else { task='听力：分级材料 10min'; listen++; }
        if(i===days-1){ task='口语自测 + 听力泛听'; oral++; listen++; }
        html+=`<tr><td><b>${dn}</b></td><td>${esc(newC)}</td><td class="muted">${rev.join('；')||'—'}</td><td>${esc(task)}</td><td class="muted">${min}′</td>
          <td><input type="checkbox" class="wchk"></td></tr>`;
      }
      html+=`</tbody></table></div>`;
      if(oral<3||listen<3) html+=`<div class="note red">⚠ 当前天数下口语(${oral})或听力(${listen})任务不足3次，建议增加可用天数。</div>`;
      else html+=`<div class="note">约束自检：口语 ${oral} 次 ≥3 ✓；听力 ${listen} 次 ≥3 ✓；每日≤${min}+15′ ✓。</div>`;
      html+=`<button class="btn sm" id="w_print">打印 / 导出此周计划</button>`;
      b.querySelector('#w_out').innerHTML=html;
      b.querySelector('#w_print').onclick=()=>{ U.download('weekplan_'+U.todayISO()+'.json',{stage,days,min,prog,weak,generated:U.todayISO()}); toast('已导出 JSON'); };
      b.querySelectorAll('.wchk').forEach(c=>c.onchange=()=>{ const done=b.querySelectorAll('.wchk:checked').length; toast(`本周完成 ${done}/${days}`); });
    };
  }

  /* P2-3 弱项补强 */
  const SUB={
    "G-A2-01":["助动词选择(avoir/être)","过去分词构成","性数配合(être类/直宾前置)"],
    "G-A2-02":["词根提取","词尾(-ais/-ait/-ions)","与PC的区分"],
    "G-A1-01":["-er 规则变位","-ir 规则变位","-re 规则变位","不规则高频(être/avoir/aller)"],
    "G-A1-04":["定冠词","不定冠词","缩合冠词"],
    "G-A2-06":["部分冠词用法","与不定冠词区分"],
    "G-A2-09":["à 的方向义","de 的来源/所属义","固定搭配记忆"],
    "G-B1-01":["词根判断","词尾(-ai/-as/-a)","与最近将来时区分"]
  };
  function p23(){
    const weak=Store.computeWeakness();
    return `
      <h4>弱项补强计划（消费 P1-4 薄弱点）</h4>
      <div id="p23_in"></div>
      <div id="p23_out"></div>`;
  }
  function render23(view, codes){
    const b=view.querySelector('#m2body');
    const weak=Store.computeWeakness();
    const list = codes && codes.length ? codes : weak.map(w=>w.code);
    if(!list.length){
      b.querySelector('#p23_out').innerHTML=`<div class="note">暂无系统性薄弱点。可手动选择考点生成补强方案：</div>
        <div class="row" style="margin:8px 0">${Store.allPoints().slice(0,40).map(p=>`<label class="chip"><input type="checkbox" class="mc" value="${esc(p.code)}"> ${esc(p.code)}</label>`).join('')}</div>
        <button class="btn primary" id="mc_go">为所选考点生成方案</button>`;
      const go=b.querySelector('#mc_go'); if(go) go.onclick=()=>{ const sel=Array.from(b.querySelectorAll('.mc:checked')).map(x=>x.value); render23(view, sel); };
      return;
    }
    let html='';
    list.forEach(code=>{
      const p=Store.findPoint(code); if(!p) return;
      const subs=SUB[code]||["理解规则","辨析易错点","造句应用"];
      const days=Math.min(7, Math.max(3, subs.length+ (subs.length>=5?1:0)));
      html+=`<h4 style="margin-top:16px"><span class="tag ${U.lvClass(p.level)}">${esc(p.level)}</span> ${esc(p.name)} <span class="muted">${esc(code)}</span></h4>
        <div class="tablewrap"><table><thead><tr><th>天数</th><th>任务内容</th><th>材料来源</th><th>预估</th><th>通过标准</th></tr></thead><tbody>`;
      for(let d=0; d<days; d++){
        const phase = d===0?'讲解':(d===days-1?'检测':(d<days-1?'练习':'应用'));
        const subj = subs[d%subs.length];
        const src = (p.source&&p.source!=='通用框架')?p.source:'教材对应章节 + 练习册';
        const pass = d===days-1?'正确率 ≥80%':'完成本步练习';
        html+=`<tr><td><b>Day ${d+1}</b></td><td>${phase}：${esc(subj)}</td><td class="muted">${esc(src)} 第${d+1}步</td><td class="muted">${15+ (d===days-1?10:0)}′</td><td>${esc(pass)}</td></tr>`;
      }
      html+=`</tbody></table></div>`;
    });
    html+=`<div class="note">约束：单考点方案 ≤7 天 ✓；通过标准可量化(≥80%) ✓；连续2轮未达标应降低难度而非加量。</div>`;
    b.querySelector('#p23_out').innerHTML=html;
  }
  function bind23(view){
    const b=view.querySelector('#m2body');
    const codes = window.__weakCodes || [];
    b.querySelector('#p23_in').innerHTML = `<div class="note bleu">来源：${codes.length?'P1-4 传递的薄弱点':'P1-4 已识别的薄弱点'}。${codes.length?'已为您预载。':''}</div>`;
    render23(view, codes);
    window.__weakCodes=null;
  }
  function openP23(codes){ /* 由 P1-4 跳转调用 */ }

  /* P2-4 动态调整 */
  function p24(){
    return `
      <h4>学习计划动态调整</h4>
      <div class="grid2">
        <div>
          <label class="fld"><span class="lab">原计划周数</span><input id="d_planwk" type="number" value="8" min="1"></label>
          <label class="fld"><span class="lab">实际已完成周数</span><input id="d_donewk" type="number" value="4" min="0"></label>
          <label class="fld"><span class="lab">计划任务完成率（%）</span><input id="d_rate" type="number" value="60" min="0" max="100"></label>
          <label class="fld"><span class="lab">偏差类型提示</span><select id="d_type"><option value="滞后">进度滞后</option><option value="超前">进度超前</option><option value="失衡">模块失衡</option></select></label>
          <button class="btn primary" id="d_gen">生成未来7天调整计划</button>
        </div>
        <div><div id="d_out"></div></div>
      </div>`;
  }
  function bind24(view){
    const b=view.querySelector('#m2body');
    b.querySelector('#d_gen').onclick=()=>{
      const pw=parseInt(b.querySelector('#d_planwk').value)||8;
      const dw=parseInt(b.querySelector('#d_donewk').value)||4;
      const rate=parseInt(b.querySelector('#d_rate').value)||60;
      const type=b.querySelector('#d_type').value;
      const lag = (1-rate/100)*100;
      let explain='';
      if(type==='滞后' || lag>20){
        explain=`偏差：完成率 ${rate}%，滞后 ${(lag).toFixed(0)}% > 20% → 压缩非核心内容（精读/写作篇幅），保听力与口语。`;
      } else if(type==='超前'){
        explain=`偏差：完成率 ${rate}%，进度超前 → 增加应用练习（口语情景/写作输出）。`;
      } else {
        explain=`偏差：模块失衡 → 重新平衡听说读写配比，强化薄弱模块。`;
      }
      const dayNames=["第1天","第2天","第3天","第4天","第5天","第6天","第7天"];
      let html=`<div class="note red">${esc(explain)}</div><div class="tablewrap"><table>
        <thead><tr><th>日期</th><th>调整内容</th><th>类型</th><th>预估</th></tr></thead><tbody>`;
      dayNames.forEach((dn,i)=>{
        let content, kind;
        if(type==='超前'){ content=`应用练习：口语情景对话 + 主题写作`; kind='加量应用'; }
        else if(lag>20){ content= i%2===0?'核心语法/词汇速过(压缩版)':'听力精听 + 口语跟读(保底)'; kind='压缩非核心·保听说'; }
        else { content= i%3===0?'听力/口语补强':'阅读/写作补强'; kind='平衡'; }
        html+=`<tr><td><b>${dn}</b></td><td>${content}</td><td><span class="tag gray">${kind}</span></td><td class="muted">40′</td></tr>`;
      });
      html+=`</tbody></table></div><div class="note">约束：调整频率 ≤1 次/周 ✓；不删听力/口语任务 ✓；仍满足考试倒排 ✓。</div>`;
      b.querySelector('#d_out').innerHTML=html;
    };
  }

  return {render, openP23};
})();
