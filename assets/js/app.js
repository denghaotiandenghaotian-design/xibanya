/* 应用主控：路由 / 总览 / 全局设置 / 清空
 * 各模块（Modules.mX）暴露 render(view)；App.go(mod, tab) 负责渲染并可选定位到某子页签。
 */
window.App = (function(){
  const {$, $$, esc, toast, todayISO, fmtDate} = U;

  const TITLE = {
    dashboard:"总览 / 全局设置",
    m1:"模块一 · 考点库管理",
    m2:"模块二 · 复习计划生成",
    m3:"模块三 · 知识点思维导图",
    m4:"模块四 · 背诵打卡（艾宾浩斯）",
    m5:"模块五 · 口语练习",
    m6:"模块六 · 日常听力训练",
    m7:"模块七 · 字母表与键盘",
    m8:"模块八 · 情景板块",
    m9:"模块九 · 单词学习",
    m10:"模块十 · 句子学习",
    m11:"模块十一 · 每日一练",
    m12:"模块十二 · 自测中心"
  };

  /* —— 总览面板 —— */
  function renderDashboard(view){
    const s = Store.getSettings();
    const weak = Store.computeWeakness();
    const vocab = Store.getVocab();
    const stats = {total:vocab.length, active:vocab.filter(v=>!v.mastered).length, mastered:vocab.filter(v=>v.mastered).length};
    const due = vocab.filter(v=>!v.mastered && v.next && v.next<=todayISO()).length;
    const plans = Store.getPlans();
    const learned = Store.learnedCount();
    const dly = Store.getDaily(); const hist = (dly.history||[]).filter(h=>h.done).map(h=>h.date);
    let streak=0; const set=new Set(hist); let cur=U.todayISO(); if(!set.has(cur)) cur=U.addDaysISO(cur,-1); while(set.has(cur)){ streak++; cur=U.addDaysISO(cur,-1); }
    const tests = Store.getTests(); const lastTest = tests.length? tests[tests.length-1].scores.total : null;
    const modules = [
      ["m1","①","考点库管理","录入 / 对标 / 检索 / 错题归因"],
      ["m2","②","复习计划生成","总计划 / 周计划 / 弱项 / 动态调整"],
      ["m3","③","知识点思维导图","单点 / 全景 / 跨点关联"],
      ["m4","④","背诵打卡","艾宾浩斯任务 / 三向检测 / 队列"],
      ["m5","⑤","口语练习","情景对话 / 发音跟读 / 评分"],
      ["m6","⑥","日常听力训练","分级材料 / 精听 / 泛听检测"],
      ["m7","⑦","字母表与键盘","26字母 / IPA / AZERTY"],
      ["m8","⑧","情景板块","12 情景总览 / 进单词句子"],
      ["m9","🔤","单词学习","按情景 / TTS / 加背诵 / 标记"],
      ["m10","💡","句子学习","句型 + 语法注释 + 跟读"],
      ["m11","📅","每日一练","每日8-10词+3句 / 打卡"],
      ["m12","🎯","自测中心","听/说/读/写四维评分"]
    ];
    view.innerHTML = `
      <div class="card">
        <div class="spread">
          <h3>总览 · 全局设置（提示词 0.0）</h3>
          <button class="btn primary" id="openSettings">⚙ 填写全局参数</button>
        </div>
        <div class="grid2" style="margin-top:8px">
          <div>
            <div class="stat-row">
              <div class="stat"><div class="num">${esc(s.targetLevel)}</div><div class="lbl">目标等级</div></div>
              <div class="stat"><div class="num">${esc(s.exam==='无'?'—':s.exam)}</div><div class="lbl">目标考试</div></div>
              <div class="stat"><div class="num">${s.dailyMinutes}</div><div class="lbl">分钟/天</div></div>
              <div class="stat"><div class="num">${esc(s.textbook.split(' ')[0])}</div><div class="lbl">主用教材</div></div>
            </div>
            <div class="note bleu" style="margin-top:10px">考试日期：${s.examDate?esc(fmtDate(s.examDate)):'未设置（自由学习）'}。所有模块按此参数生成内容。</div>
          </div>
          <div>
            <div class="stat-row">
              <div class="stat"><div class="num ${weak.length?'red':''}">${weak.length}</div><div class="lbl">薄弱考点</div></div>
              <div class="stat"><div class="num">${stats.active}</div><div class="lbl">背诵在学</div></div>
              <div class="stat"><div class="num ${due?'gold':''}">${due}</div><div class="lbl">今日待打卡</div></div>
              <div class="stat"><div class="num">${stats.mastered}</div><div class="lbl">已掌握</div></div>
            </div>
            ${weak.length?`<div class="note red" style="margin-top:10px">⚠ 系统性薄弱点：${weak.map(w=>esc(w.code)).join('、')}。建议去 模块二 → P2-3 生成补强计划。</div>`:`<div class="note" style="margin-top:10px">尚未识别薄弱点（先在 P1-4 记录 ≥2 次同类错题）。</div>`}
          </div>
        </div>
      </div>

      <div class="stat-row" style="margin-top:14px">
        <div class="stat"><div class="num ${learned?'gold':''}">${learned}</div><div class="lbl">已掌握单词</div></div>
        <div class="stat"><div class="num ${streak?'gold':''}">${streak}</div><div class="lbl">连续打卡(天)</div></div>
        <div class="stat"><div class="num ${lastTest!=null?'bleu':''}">${lastTest!=null?lastTest:'—'}</div><div class="lbl">最近自测总分</div></div>
        <div class="stat"><div class="num">${FRV.allWords().length}</div><div class="lbl">词库总量</div></div>
      </div>

      <h3 style="margin:18px 0 10px">十二大模块</h3>
      <div class="mod-grid">
        ${modules.map(m=>`
          <div class="mod-card" data-mod="${m[0]}">
            <div class="mod-badge">${m[1]}</div>
            <div class="mod-name">${m[2]}</div>
            <div class="mod-desc">${m[3]}</div>
            <div class="mod-go">进入 →</div>
          </div>`).join('')}
      </div>
      <div class="note" style="margin-top:14px">数据全部保存在本机浏览器（localStorage），刷新不丢；可用各模块导出功能备份。本应用为纯静态前端，离线 / file:// 直接打开即可使用。</div>`;
    view.querySelector('#openSettings').onclick=openSettings;
    view.querySelectorAll('.mod-card').forEach(c=>c.onclick=()=>go(c.dataset.mod));
  }

  /* —— 路由 —— */
  function go(mod, tab){
    const view = $('#view');
    $$('.nav-item').forEach(b=>b.classList.toggle('active', b.dataset.mod===mod));
    $('#topTitle').textContent = TITLE[mod]||'';
    $('#topMeta').textContent = fmtDate(todayISO());
    if(mod==='dashboard'){ renderDashboard(view); return; }
    const fn = Modules[mod] && Modules[mod].render;
    if(!fn){ view.innerHTML='<div class="note red">模块未加载</div>'; return; }
    fn(view);
    if(tab){ const t=view.querySelector('[data-t="'+tab+'"]'); if(t) t.click(); }
  }

  /* —— 全局设置弹层 —— */
  function openSettings(){
    const s = Store.getSettings();
    const body = $('#settingsBody');
    body.innerHTML = `
      <label class="fld"><span class="lab">学习目标等级</span><select id="set_lv">${U.lvOptions(s.targetLevel)}</select></label>
      <label class="fld"><span class="lab">目标考试</span><select id="set_exam">${["无","DELF A1","DELF A2","DELF B1","DELF B2","TCF","TEF"].map(e=>`<option ${e===s.exam?'selected':''}>${e}</option>`).join("")}</select></label>
      <label class="fld"><span class="lab">主用教材</span><select id="set_tb">${TB.list.map(t=>`<option ${t.name===s.textbook?'selected':''}>${esc(t.name)}</option>`).join("")}</select></label>
      <label class="fld"><span class="lab">配套资料</span><input id="set_mat" value="${esc(s.material||'')}" placeholder="如 Grammaire progressive / Vocabulaire progressif"></label>
      <label class="fld"><span class="lab">每日可投入（分钟）</span><input id="set_min" type="number" value="${s.dailyMinutes||30}" min="10" max="300"></label>
      <label class="fld"><span class="lab">考试日期（留空=不限）</span><input id="set_date" type="date" value="${s.examDate||''}"></label>`;
    $('#settingsModal').classList.remove('hidden');
  }
  function saveSettings(){
    const s = {
      targetLevel: $('#set_lv').value,
      exam: $('#set_exam').value,
      textbook: $('#set_tb').value,
      material: $('#set_mat').value.trim(),
      dailyMinutes: parseInt($('#set_min').value)||30,
      examDate: $('#set_date').value||''
    };
    Store.setSettings(s);
    updateBadge();
    $('#settingsModal').classList.add('hidden');
    toast('全局参数已保存');
    if($('.nav-item.active') && $('.nav-item.active').dataset.mod==='dashboard') go('dashboard');
  }
  function updateBadge(){
    const s = Store.getSettings();
    const el = $('#globalBadge');
    el.textContent = `目标 ${s.targetLevel} · ${s.exam==='无'?'自由学习':s.exam} · ${s.dailyMinutes}分/天`;
  }

  /* —— 事件绑定 —— */
  function bind(){
    $$('.nav-item').forEach(b=>b.onclick=()=>go(b.dataset.mod));
    $('#menuToggle').onclick=()=>$('#sidebar').classList.toggle('open');
    $('#saveSettings').onclick=saveSettings;
    $$('#settingsModal [data-close]').forEach(b=>b.onclick=()=>$('#settingsModal').classList.add('hidden'));
    $('#settingsModal').onclick=e=>{ if(e.target.id==='settingsModal') $('#settingsModal').classList.add('hidden'); };
    $('#resetBtn').onclick=()=>{
      if(confirm('确认清空全部本地数据（考点、错题、计划、词库、打卡）？此操作不可撤销。')){
        Store.resetAll(); toast('已清空本地数据'); updateBadge(); go('dashboard');
      }
    };
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') $('#settingsModal').classList.add('hidden'); });
  }

  function init(){
    bind();
    updateBadge();
    go('dashboard');
  }

  return {go, init, openSettings};
})();

document.addEventListener('DOMContentLoaded', App.init);
