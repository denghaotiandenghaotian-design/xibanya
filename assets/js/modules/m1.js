/* 模块一 考点库管理（P1-1 录入 / P1-2 对标 / P1-3 检索关联 / P1-4 错题归因） */
window.Modules = window.Modules || {};
Modules.m1 = (function(){
  const {$, esc, toast} = U;
  const CAT_ABBR = {"语音":"P","语法":"G","词汇":"V","交际":"C","文化常识":"K"};

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块一 · 考点库管理</h3>
          <div class="row">
            <button class="btn sm" data-t="t1">P1-1 标准化录入</button>
            <button class="btn sm" data-t="t2">P1-2 教材对标</button>
            <button class="btn sm" data-t="t3">P1-3 检索关联</button>
            <button class="btn sm" data-t="t4">P1-4 错题归因</button>
          </div>
        </div>
        <div class="note bleu">全部考点存于本地浏览器（localStorage），刷新不丢；可随时导出备份。新增考点自动按「类别缩写+等级+序号」编码。</div>
        <div id="m1body"></div>
      </div>`;
    view.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ view.querySelectorAll('[data-t]').forEach(x=>x.classList.remove('primary')); b.classList.add('primary'); show(view, b.dataset.t); });
    view.querySelector('[data-t="t1"]').classList.add('primary');
    show(view,'t1');
  }

  function show(view, t){
    const body = view.querySelector('#m1body');
    if(t==='t1') body.innerHTML = t1();
    if(t==='t2') body.innerHTML = t2();
    if(t==='t3') body.innerHTML = t3();
    if(t==='t4') body.innerHTML = t4();
    bind(view, t, body);
  }

  /* P1-1 录入 */
  function t1(){
    return `
      <div class="grid2">
        <div>
          <h4>新增考点（标准化录入）</h4>
          <label class="fld"><span class="lab">分类</span>
            <select id="p_cat">${["语音","语法","词汇","交际","文化常识"].map(c=>`<option>${c}</option>`).join("")}</select></label>
          <label class="fld"><span class="lab">考点名称</span><input id="p_name" placeholder="如：复合过去时助动词选择"></label>
          <label class="fld"><span class="lab">CECRL 等级</span><select id="p_lv">${U.lvOptions('A1')}</select></label>
          <label class="fld"><span class="lab">教材出处（册/课/页）</span><input id="p_src" placeholder="如：你好！法语1·第9课"></label>
          <label class="fld"><span class="lab">典型题型（可多选）</span>
            <div class="row" id="p_types">
              ${["听力","阅读","写作","口语","翻译"].map(t=>`<label class="chip"><input type="checkbox" value="${t}"> ${t}</label>`).join("")}
            </div></label>
          <label class="fld"><span class="lab">备注 / 易错提示</span><textarea id="p_note" placeholder="不确定的点标注 [À VÉRIFIER]"></textarea></label>
          <div class="row"><button class="btn primary" id="p_add">生成编码并入库</button>
            <span id="p_code_preview" class="muted">编码将自动生成</span></div>
        </div>
        <div>
          <h4>考点库（种子 + 我的录入）</h4>
          <input id="p_search" class="sm" placeholder="搜索名称/编码/分类…" style="margin-bottom:10px">
          <div class="tablewrap"><table id="p_table"><thead><tr><th>编码</th><th>名称</th><th>分类</th><th>等级</th><th>题型</th><th></th></tr></thead><tbody></tbody></table></div>
        </div>
      </div>`;
  }
  function bindP1(view){
    const body = view.querySelector('#m1body');
    const search = body.querySelector('#p_search');
    function renderTable(){
      const q=(search.value||'').toLowerCase();
      const rows = Store.allPoints().filter(p=>
        !q || p.name.toLowerCase().includes(q) || (p.code||'').toLowerCase().includes(q) || (p.cat||'').includes(q));
      const tb = body.querySelector('#p_table tbody');
      tb.innerHTML = rows.map(p=>`
        <tr>
          <td><b>${esc(p.code)}</b></td><td>${esc(p.name)}</td>
          <td><span class="tag cat-${U.catClass(p.cat)}">${esc(p.cat)}</span></td>
          <td><span class="tag ${U.lvClass(p.level)}">${esc(p.level)}</span></td>
          <td class="muted">${(p.types||[]).join('/')||'—'}</td>
          <td>${p.user?'<button class="btn sm danger" data-del="'+esc(p.code)+'">删</button>':'<span class="muted">种子</span>'}</td>
        </tr>`).join('');
      body.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{ Store.delUserPoint(b.dataset.del); toast('已删除'); renderTable(); });
    }
    function previewCode(){
      const cat=body.querySelector('#p_cat').value, lv=body.querySelector('#p_lv').value;
      const abbr=CAT_ABBR[cat];
      const same=Store.allPoints().filter(p=>p.code&&p.code.startsWith(abbr+'-'+lv+'-'));
      let max=0; same.forEach(p=>{ const n=parseInt((p.code.split('-')[2]||'0'),10); if(!isNaN(n)) max=Math.max(max,n); });
      body.querySelector('#p_code_preview').textContent = `预览编码：${abbr}-${lv}-${String(max+1).padStart(2,'0')}`;
    }
    ['#p_cat','#p_lv'].forEach(s=>body.querySelector(s).onchange=previewCode);
    previewCode();
    search.oninput=renderTable; renderTable();
    body.querySelector('#p_add').onclick=()=>{
      const cat=body.querySelector('#p_cat').value, name=body.querySelector('#p_name').value.trim();
      const lv=body.querySelector('#p_lv').value, src=body.querySelector('#p_src').value.trim();
      const note=body.querySelector('#p_note').value.trim();
      const types=Array.from(body.querySelectorAll('#p_types input:checked')).map(x=>x.value);
      if(!name){ toast('请填写考点名称'); return; }
      const abbr=CAT_ABBR[cat];
      const same=Store.allPoints().filter(p=>p.code&&p.code.startsWith(abbr+'-'+lv+'-'));
      let max=0; same.forEach(p=>{ const n=parseInt((p.code.split('-')[2]||'0'),10); if(!isNaN(n)) max=Math.max(max,n); });
      const code=`${abbr}-${lv}-${String(max+1).padStart(2,'0')}`;
      Store.addUserPoint({code, name, cat, level:lv, source:src, types, note, user:true, prereq:[],next:[],confuse:[]});
      toast('已入库：'+code);
      body.querySelector('#p_name').value=''; body.querySelector('#p_src').value=''; body.querySelector('#p_note').value='';
      body.querySelectorAll('#p_types input').forEach(x=>x.checked=false);
      renderTable(); previewCode();
    };
  }

  /* P1-2 教材对标 */
  function t2(){
    const books = Object.keys(TB.lessons).concat(['《你好！法语》2']);
    const sel = Object.keys(TB.lessons);
    return `
      <h4>教材对标映射（逐课拆解）</h4>
      <label class="fld" style="max-width:360px"><span class="lab">选择教材</span>
        <select id="bk">${sel.map(b=>`<option>${b}</option>`).join("")}</select></label>
      <div id="bk_out"></div>`;
  }
  function bindP1_2(view){
    const body=view.querySelector('#m1body');
    function render(){
      const bk=body.querySelector('#bk').value;
      const lessons=TB.lessons[bk]||[];
      if(!lessons.length){ body.querySelector('#bk_out').innerHTML=`<div class="note">该教材暂无逐课拆解（[ASSUMPTION]），可在 P1-1 自行录入考点。</div>`; return; }
      body.querySelector('#bk_out').innerHTML = `
        <div class="tablewrap"><table>
          <thead><tr><th>课次</th><th>主题</th><th>核心语法(编码)</th><th>核心词汇主题</th><th>交际功能</th><th>等级</th><th>考试题型</th></tr></thead>
          <tbody>${lessons.map(l=>`
            <tr>
              <td><b>${esc(l.lesson)}</b></td><td>${esc(l.title)}</td>
              <td>${(l.grammar||[]).map(g=>`<span class="tag gray">${esc(g)}</span>`).join(' ')||'—'}</td>
              <td>${(l.vocab||[]).map(v=>`${esc(v)}`).join('、')||'—'}</td>
              <td>${(l.comm||[]).map(c=>`<span class="tag gold">${esc(c)}</span>`).join(' ')||'—'}</td>
              <td><span class="tag ${U.lvClass(l.level)}">${esc(l.level)}</span></td>
              <td class="muted">${(l.exam||[]).join('/')}</td>
            </tr>`).join('')}</tbody>
        </table></div>
        <div class="note">编码可复制到 P1-3 检索详情；未录入教材内容请用 P1-1 补充（标注 [ASSUMPTION]）。</div>`;
    }
    body.querySelector('#bk').onchange=render; render();
  }

  /* P1-3 检索关联 */
  function t3(){
    return `
      <h4>考点检索与关联（前置 / 后续 / 易混）</h4>
      <div class="row" style="margin-bottom:12px">
        <input id="s_kw" placeholder="输入关键词，如：复合过去时 / à 与 de / G-A2-01" style="max-width:420px">
        <button class="btn primary" id="s_go">检索</button>
      </div>
      <div id="s_out"></div>`;
  }
  function bindP1_3(view){
    const body=view.querySelector('#m1body');
    function rec(code){
      const all=Store.allPoints();
      const p=Store.findPoint(code); if(!p) return null;
      const prereq=(p.prereq||[]).map(c=>({c,p:Store.findPoint(c)})).filter(x=>x.p);
      const next=all.filter(x=>(x.prereq||[]).includes(code)).map(x=>({c:x.code,p:x}));
      const confuse=(p.confuse||[]).map(c=>({c,p:Store.findPoint(c)})).filter(x=>x.p);
      return {p,prereq,next,confuse};
    }
    function card(code){
      const r=rec(code); if(!r) return `<div class="note red">未找到编码 ${esc(code)}，可在 P1-1 录入。</div>`;
      const {p,prereq,next,confuse}=r;
      const tips={
        "G-A2-01":{易混:"PC 表完成的动作，imparfait 表背景/习惯；区分口诀：‘完成一次用PC，状态习惯用imparfait’。"},
        "G-A2-02":{易混:"imparfait 用于描述过去的状态、年龄、天气、重复性动作。"},
        "G-A2-03":{易混:"PC 与 imparfait 同现于叙事：imparfait 铺陈背景，PC 推进情节。"},
        "G-A1-04":{易混:"不定冠词表‘一个/一些’，定冠词表确指；可数用 un/une，不可数用 du/de la。"}
      };
      const tip=(tips[code]||{易混:"建议结合教材该课练习巩固；与相邻等级考点对照学习。"});
      return `
        <div class="qcard">
          <div class="qt"><span class="tag ${U.lvClass(p.level)}">${esc(p.level)}</span> <b>${esc(p.name)}</b> <span class="muted">${esc(p.code)}</span></div>
          <div class="row" style="gap:6px;margin-bottom:8px">
            <span class="tag cat-${U.catClass(p.cat)}">${esc(p.cat)}</span>
            <span class="muted">出处：${esc(p.source||'—')}</span>
          </div>
          <div style="font-size:13px">
            <div><b>前置考点：</b>${prereq.length?prereq.map(x=>`<span class="tag gray">${esc(x.c)} ${esc(x.p.name)}</span>`).join(' '):'<span class="muted">无（基础点）</span>'}</div>
            <div style="margin-top:6px"><b>后续考点：</b>${next.length?next.map(x=>`<span class="tag gray">${esc(x.c)} ${esc(x.p.name)}</span>`).join(' '):'<span class="muted">暂无</span>'}</div>
            <div style="margin-top:6px"><b>⚠ 易混对比：</b>${confuse.length?confuse.map(x=>`<span class="tag red">${esc(x.c)} ${esc(x.p.name)}</span>`).join(' '):'<span class="muted">无</span>'}</div>
            <div style="margin-top:8px" class="note">学习建议：${esc(tip.易混)}</div>
          </div>
        </div>`;
    }
    function go(){
      const kw=body.querySelector('#s_kw').value.trim();
      if(!kw){ toast('请输入关键词'); return; }
      const all=Store.allPoints();
      let hit = Store.findPoint(kw) ? [kw] : [];
      // 关键词模糊匹配名称/分类
      all.forEach(p=>{ if(p.name.toLowerCase().includes(kw.toLowerCase())||(p.cat||'').includes(kw)) hit.push(p.code); });
      hit=[...new Set(hit)].slice(0,5);
      if(!hit.length){ body.querySelector('#s_out').innerHTML=`<div class="note red">未匹配到考点，换个关键词试试。</div>`; return; }
      body.querySelector('#s_out').innerHTML = hit.map(card).join('');
    }
    body.querySelector('#s_go').onclick=go;
    body.querySelector('#s_kw').onkeydown=e=>{ if(e.key==='Enter') go(); };
  }

  /* P1-4 错题归因 */
  function t4(){
    return `
      <div class="grid2">
        <div>
          <h4>错题考点归因</h4>
          <label class="fld"><span class="lab">题号</span><input id="e_no" placeholder="如 Q3"></label>
          <label class="fld"><span class="lab">题目 / 你的作答 / 正确答案</span>
            <textarea id="e_q" placeholder="题目：___&#10;我的答案：___&#10;正确答案：___"></textarea></label>
          <label class="fld"><span class="lab">归因考点（编码）</span>
            <select id="e_code"><option value="">— 选择/留空 —</option>${Store.allPoints().map(p=>`<option value="${esc(p.code)}">${esc(p.code)} ${esc(p.name)}</option>`).join("")}</select></label>
          <label class="fld"><span class="lab">错误类型</span>
            <select id="e_type">${["知识性(不会)","技能性(会但用错)","策略性(审题/时间)"].map(t=>`<option>${t}</option>`).join("")}</select></label>
          <button class="btn primary" id="e_add">记录归因</button>
        </div>
        <div>
          <h4>诊断记录</h4>
          <div class="tablewrap"><table><thead><tr><th>题号</th><th>编码</th><th>类型</th><th>日期</th><th></th></tr></thead><tbody id="e_tb"></tbody></table></div>
          <div id="weak_box"></div>
        </div>
      </div>`;
  }
  function bindP1_4(view){
    const body=view.querySelector('#m1body');
    function render(){
      const errs=Store.getErrors();
      body.querySelector('#e_tb').innerHTML = errs.length?errs.slice().reverse().map(e=>`
        <tr><td>${esc(e.no)}</td><td>${esc(e.code||'—')}</td><td>${esc(e.type)}</td><td class="muted">${U.fmtDate(e.date)}</td>
        <td><button class="btn sm danger" data-del="${e.id}">删</button></td></tr>`).join('') : `<tr><td colspan="5" class="muted center">暂无记录</td></tr>`;
      body.querySelectorAll('#e_tb [data-del]').forEach(b=>b.onclick=()=>{ Store.delError(b.dataset.del); toast('已删除'); render(); });
      // 薄弱点
      const wk=Store.computeWeakness();
      body.querySelector('#weak_box').innerHTML = wk.length?`
        <div class="note red" style="margin-top:12px">
          <b>⚠ 系统性薄弱点（同类错误 ≥2 次）：</b>
          <div class="row" style="margin-top:6px">${wk.map(w=>`<span class="tag red">${esc(w.code)} ${esc(w.point?w.point.name:'?')} ×${w.count}</span>`).join('')}</div>
          <button class="btn gold sm" id="to_p23" style="margin-top:8px">→ 生成弱项补强计划 (P2-3)</button>
        </div>`:`<div class="note" style="margin-top:12px">尚未识别到系统性薄弱点（同一考点需 ≥2 次错误）。</div>`;
      const btn=body.querySelector('#to_p23');
      if(btn) btn.onclick=()=>{ window.__weakCodes = wk.map(w=>w.code); App.go('m2','t3'); };
    }
    body.querySelector('#e_add').onclick=()=>{
      const no=body.querySelector('#e_no').value.trim();
      const q=body.querySelector('#e_q').value.trim();
      const code=body.querySelector('#e_code').value;
      const type=body.querySelector('#e_type').value;
      if(!q){ toast('请填写题目/答案'); return; }
      Store.addError({id:'e'+Date.now(), no:no||('Q'+Store.getErrors().length), q, code, type, date:U.todayISO()});
      toast('已记录');
      body.querySelector('#e_q').value=''; body.querySelector('#e_no').value=''; body.querySelector('#e_code').value='';
      render();
    };
    render();
  }

  function bind(view,t,body){
    if(t==='t1') bindP1(view);
    if(t==='t2') bindP1_2(view);
    if(t==='t3') bindP1_3(view);
    if(t==='t4') bindP1_4(view);
  }
  return {render};
})();
