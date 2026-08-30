/* 模块三 知识点思维导图（P3-1 单点 / P3-2 章节全景 / P3-3 跨点关联） */
window.Modules = window.Modules || {};
Modules.m3 = (function(){
  const {$, esc, toast} = U;

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块三 · 知识点思维导图</h3>
          <div class="row">
            <button class="btn sm" data-t="t1">P3-1 单语法点</button>
            <button class="btn sm" data-t="t2">P3-2 章节全景</button>
            <button class="btn sm" data-t="t3">P3-3 跨点关联</button>
          </div>
        </div>
        <div id="m3body"></div>
      </div>`;
    view.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ view.querySelectorAll('[data-t]').forEach(x=>x.classList.remove('primary')); b.classList.add('primary'); show(view,b.dataset.t); });
    view.querySelector('[data-t="t1"]').classList.add('primary'); show(view,'t1');
  }
  function show(view,t){ const b=view.querySelector('#m3body');
    if(t==='t1') b.innerHTML=p31(); if(t==='t2') b.innerHTML=p32(); if(t==='t3') b.innerHTML=p33();
    if(t==='t1') bind31(view); if(t==='t2') bind32(view); if(t==='t3') bind33(view);
  }

  /* 递归树 → HTML（缩进层级） */
  function treeHTML(node, depth){
    const cls = depth===0?'mm-root':depth===1?'mm-l1':depth===2?'mm-l2':'mm-l3';
    let html = `<div style="margin-left:${depth*24}px;margin-top:6px">
      <span class="mm-node ${cls}">${esc(node.t)}${node.fr?` <span class="ipa">${esc(node.fr)}</span>`:''}${node.zh?` <span class="muted">(${esc(node.zh)})</span>`:''}</span></div>`;
    if(node.children) node.children.forEach(c=>html+=treeHTML(c,depth+1));
    return html;
  }
  function mermaid(node, depth, acc){
    acc = acc||[];
    const indent = '  '.repeat(depth+1);
    acc.push(indent + (depth===0?`root((${node.t}))`:node.t));
    if(node.children) node.children.forEach(c=>mermaid(c,depth+1,acc));
    return acc.join('\n');
  }

  /* P3-1 */
  function p31(){
    return `<h4>单语法点导图（≤4 级）</h4>
      <label class="fld" style="max-width:420px"><span class="lab">选择语法点</span>
        <select id="g_sel">${GRAMMAR.points.filter(p=>p.kind==='single').map(p=>`<option value="${esc(p.id)}">${esc(p.name)} (${esc(p.code||'')})</option>`).join('')}</select></label>
      <div class="grid2"><div id="g_tree"></div><div><div class="note">可复制下方 Mermaid 代码到支持 Mermaid 的编辑器直接生成导图。</div><pre class="code" id="g_mm"></pre><button class="btn sm" id="g_copy">复制 Mermaid</button></div></div>`;
  }
  function bind31(view){
    const b=view.querySelector('#m3body');
    function render(){
      const p=GRAMMAR.points.find(x=>x.id===b.querySelector('#g_sel').value);
      if(!p) return;
      b.querySelector('#g_tree').innerHTML=`<div class="qcard"><b>${esc(p.name)}</b> <span class="tag ${U.lvClass(p.level)}">${esc(p.level)}</span> <span class="muted">${esc(p.code||'')}</span><hr class="sep">${treeHTML(p.tree,0)}</div>`;
      const mm='mindmap\n'+mermaid(p.tree,0);
      b.querySelector('#g_mm').textContent=mm;
    }
    b.querySelector('#g_sel').onchange=render; render();
    b.querySelector('#g_copy').onclick=()=>{ navigator.clipboard && navigator.clipboard.writeText(b.querySelector('#g_mm').textContent); toast('已复制 Mermaid 代码'); };
  }

  /* P3-2 章节/主题全景 */
  function p32(){
    const books=Object.keys(TB.lessons);
    return `<h4>章节 / 主题全景导图</h4>
      <div class="row" style="margin-bottom:12px">
        <label class="fld" style="margin:0"><span class="lab">教材</span><select id="bk2">${books.map(x=>`<option>${esc(x)}</option>`).join('')}</select></label>
        <label class="fld" style="margin:0"><span class="lab">课次</span><select id="ls2"></select></label>
      </div>
      <div id="pan_out"></div>`;
  }
  function bind32(view){
    const b=view.querySelector('#m3body');
    function fillLessons(){
      const bk=b.querySelector('#bk2').value;
      const ls=TB.lessons[bk]||[];
      b.querySelector('#ls2').innerHTML=ls.map((l,i)=>`<option value="${i}">${esc(l.lesson)} · ${esc(l.title)}</option>`).join('');
      render();
    }
    function render(){
      const bk=b.querySelector('#bk2').value; const idx=parseInt(b.querySelector('#ls2').value)||0;
      const l=(TB.lessons[bk]||[])[idx]; if(!l) return;
      const g=(TB.lessons[bk]||[])[idx];
      const gramNodes=(l.grammar||[]).map(code=>{ const p=Store.findPoint(code); return {t:(p?p.name:code)+(p?' ('+code+')':''), zh:''}; });
      const vocNodes=(l.vocab||[]).map(v=>({t:v}));
      const commNodes=(l.comm||[]).map(code=>{ const p=Store.findPoint(code); return {t:(p?p.name:code)+(p?' ('+code+')':'')}; });
      const culNodes=[{t:'文化/语用提示', zh:'参见 K 类考点'}];
      const root={t:`${l.lesson} ${l.title}`, children:[
        {t:'语法', children:gramNodes.length?gramNodes:[{t:'（暂无）'}]},
        {t:'词汇主题', children:vocNodes.length?vocNodes:[{t:'（暂无）'}]},
        {t:'交际功能', children:commNodes.length?commNodes:[{t:'（暂无）'}]},
        {t:'文化常识', children:culNodes}
      ]};
      b.querySelector('#pan_out').innerHTML=`<div class="qcard"><b>${esc(l.lesson)} · ${esc(l.title)}</b> <span class="tag ${U.lvClass(l.level)}">${esc(l.level)}</span> <span class="muted">考试题型：${(l.exam||[]).join('/')}</span><hr class="sep">${treeHTML(root,0)}</div>
        <div class="note">词汇标注词性见 P1 考点库；交际/文化节点可点开对应 P3-1 单点导图深化。</div>`;
    }
    b.querySelector('#bk2').onchange=fillLessons;
    b.querySelector('#ls2').onchange=render;
    fillLessons();
  }

  /* P3-3 跨点关联 */
  function p33(){
    return `<h4>跨知识点关联图</h4>
      <label class="fld" style="max-width:420px"><span class="lab">选择关联主题</span>
        <select id="rel_sel">${GRAMMAR.relations.map(r=>`<option value="${esc(r.id)}">${esc(r.name)}</option>`).join('')}</select></label>
      <div id="rel_out"></div>`;
  }
  function bind33(view){
    const b=view.querySelector('#m3body');
    function render(){
      const r=GRAMMAR.relations.find(x=>x.id===b.querySelector('#rel_sel').value);
      if(!r) return;
      const pos={}; const n=r.nodes.length;
      r.nodes.forEach((nd,i)=>{ pos[nd.id]={x:60+i*200, y:90}; });
      const svgW = 60+(n-1)*200+160, svgH=200;
      let edges='';
      r.edges.forEach(e=>{
        const a=pos[e.from], c=pos[e.to];
        const mx=(a.x+c.x)/2, my=(a.y+c.y)/2;
        edges+=`<line x1="${a.x}" y1="${a.y}" x2="${c.x}" y2="${c.y}" stroke="#c9a227" stroke-width="2" marker-end="url(#ar)"/>`;
        edges+=`<text x="${mx}" y="${my-6}" font-size="11" fill="#b9762a" text-anchor="middle">${esc(e.type)}</text>`;
      });
      let nodesSvg=r.nodes.map(nd=>{
        const p=pos[nd.id];
        return `<g><rect x="${p.x-55}" y="${p.y-22}" width="110" height="44" rx="9" fill="#fff" stroke="#1e3a5f" stroke-width="1.5"/>
          <text x="${p.x}" y="${p.y-2}" font-size="12" fill="#1e3a5f" text-anchor="middle" font-weight="700">${esc(nd.label)}</text>
          <text x="${p.x}" y="${p.y+13}" font-size="9.5" fill="#8a94a6" text-anchor="middle">${esc(nd.code||'')}</text></g>`;
      }).join('');
      const svg=`<svg viewBox="0 0 ${svgW} ${svgH}" style="width:100%;max-width:760px;background:#fbfcfe;border:1px solid #e4e9f0;border-radius:10px">
        <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#c9a227"/></marker></defs>
        ${edges}${nodesSvg}</svg>`;
      b.querySelector('#rel_out').innerHTML=`${svg}
        <div class="note">关系边标注类型（⚠易混 / 递进 / 并列 / 因果）。易混项须附区分规则（见对应 P3-1）。</div>
        <h4 style="margin-top:14px">建议学习顺序</h4>
        <ol>${r.order.map(o=>`<li style="margin-bottom:6px">${esc(o)}</li>`).join('')}</ol>`;
    }
    b.querySelector('#rel_sel').onchange=render; render();
  }

  return {render};
})();
