/* 模块四 背诵打卡（P4-1 任务生成 / P4-2 每日打卡检测 / P4-3 复习队列管理）
 * 艾宾浩斯间隔：1/2/4/7/15/30 天；连续 3 次"熟练"移入已掌握。
 */
window.Modules = window.Modules || {};
Modules.m4 = (function(){
  const {$, esc, toast, todayISO, addDaysISO, fmtDate} = U;

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块四 · 背诵打卡（艾宾浩斯）</h3>
          <div class="row">
            <button class="btn sm" data-t="t1">P4-1 任务生成</button>
            <button class="btn sm" data-t="t2">P4-2 每日打卡</button>
            <button class="btn sm" data-t="t3">P4-3 复习队列</button>
          </div>
        </div>
        <div class="note bleu">单词条目含 词性 + IPA + 中文 + 例句；每日新学 10-30 个；遗忘项自动重排次日。</div>
        <div id="m4body"></div>
      </div>`;
    view.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ view.querySelectorAll('[data-t]').forEach(x=>x.classList.remove('primary')); b.classList.add('primary'); show(view,b.dataset.t); });
    view.querySelector('[data-t="t1"]').classList.add('primary'); show(view,'t1');
  }
  function show(view,t){ const b=view.querySelector('#m4body');
    if(t==='t1') b.innerHTML=p41(); if(t==='t2') b.innerHTML=p42(); if(t==='t3') b.innerHTML=p43();
    if(t==='t1') bind41(view); if(t==='t2') bind42(view); if(t==='t3') bind43(view);
  }

  /* 工具：计算到期项 */
  function dueItems(date){
    return Store.getVocab().filter(v=>!v.mastered && v.next && v.next<=date);
  }
  function stats(){
    const v=Store.getVocab();
    return {total:v.length, active:v.filter(x=>!x.mastered).length, due:dueItems(todayISO()).length, mastered:v.filter(x=>x.mastered).length};
  }

  /* P4-1 生成 */
  function p41(){
    return `
      <h4>背诵任务生成（艾宾浩斯排程）</h4>
      <div class="grid2">
        <div>
          <label class="fld"><span class="lab">法语词 / 词组</span><input id="v_word" placeholder="如 bonjour"></label>
          <label class="fld"><span class="lab">IPA 音标</span><input id="v_ipa" placeholder="/bɔ̃ʒuʁ/"></label>
          <label class="fld"><span class="lab">词性</span><input id="v_pos" placeholder="n.m. / v. / adj."></label>
          <label class="fld"><span class="lab">中文释义</span><input id="v_zh" placeholder="你好"></label>
          <label class="fld"><span class="lab">例句（法）</span><input id="v_ex" placeholder="Bonjour, madame !"></label>
          <label class="fld"><span class="lab">CECRL 等级</span><select id="v_lv">${U.lvOptions('A1')}</select></label>
          <div class="row"><button class="btn primary" id="v_add">加入词库</button>
            <button class="btn sm" id="v_batch">批量粘贴</button></div>
          <textarea id="v_batch_box" class="hidden" placeholder="每行一条：法语,IPA,词性,中文,例句&#10;例：pomme,/pɔm/,n.f.,苹果,La pomme est rouge." style="margin-top:8px"></textarea>
        </div>
        <div>
          <h4>未来 30 天打卡表预览</h4>
          <div class="note">新学安排在「开始日」；复习按 第1/2/4/7/15/30 天触发。</div>
          <div class="tablewrap" style="max-height:420px"><table id="sch_tbl"><thead><tr><th>日期</th><th>新学</th><th>到期复习</th><th>预估</th></tr></thead><tbody></tbody></table></div>
          <div id="v_list" style="margin-top:10px"></div>
        </div>
      </div>`;
  }
  function bind41(view){
    const bb=view.querySelector('#m4body');
    function addOne(o){
      const v=Store.getVocab();
      v.push({id:'v'+Date.now()+Math.random().toString(36).slice(2,6), word:o.word, ipa:o.ipa, pos:o.pos, zh:o.zh, ex:o.ex, level:o.lv,
        added:todayISO(), next:addDaysISO(todayISO(),U.EB[0]), idx:0, streak:0, done:[], mastered:false});
      Store.saveVocab(v);
    }
    bb.querySelector('#v_add').onclick=()=>{
      const word=bb.querySelector('#v_word').value.trim();
      if(!word){ toast('请填写法语词'); return; }
      addOne({word, ipa:bb.querySelector('#v_ipa').value.trim(), pos:bb.querySelector('#v_pos').value.trim(),
        zh:bb.querySelector('#v_zh').value.trim(), ex:bb.querySelector('#v_ex').value.trim(), lv:bb.querySelector('#v_lv').value});
      toast('已加入：'+word);
      ['#v_word','#v_ipa','#v_pos','#v_zh','#v_ex'].forEach(s=>bb.querySelector(s).value='');
      refresh();
    };
    bb.querySelector('#v_batch').onclick=()=>{ const bx=bb.querySelector('#v_batch_box'); bx.classList.toggle('hidden'); };
    bb.querySelector('#v_batch_box').onblur=()=>{
      const txt=bb.querySelector('#v_batch_box').value.trim(); if(!txt) return;
      txt.split('\n').forEach(line=>{ const p=line.split(','); if(p[0]&&p[0].trim()) addOne({word:p[0].trim(),ipa:(p[1]||'').trim(),pos:(p[2]||'').trim(),zh:(p[3]||'').trim(),ex:(p[4]||'').trim(),lv:'A1'}); });
      toast('批量导入完成'); bb.querySelector('#v_batch_box').value=''; bb.querySelector('#v_batch_box').classList.add('hidden'); refresh();
    };
    function refresh(){
      // 30天表
      const v=Store.getVocab();
      const map={};
      for(let d=0; d<=30; d++){
        const day=addDaysISO(todayISO(),d);
        let neu=v.filter(x=>x.added===day).length;
        let rev=v.filter(x=>x.next===day && !x.mastered).length;
        map[day]={neu,rev};
      }
      const tb=bb.querySelector('#sch_tbl tbody');
      tb.innerHTML=Object.keys(map).map(day=>`<tr><td>${fmtDate(day)}${day===todayISO()?' <span class="tag gold">今</span>':''}</td>
        <td>${map[day].neu||'—'}</td><td>${map[day].rev||'—'}</td><td class="muted">${map[day].neu*2+map[day].rev}′</td></tr>`).join('');
      const vl=bb.querySelector('#v_list');
      vl.innerHTML = v.length? `<div class="note">词库共 ${v.length} 条。已掌握 ${v.filter(x=>x.mastered).length} 条。</div>
        <div class="row">${v.map(x=>`<span class="chip ${x.mastered?'on':''}">${esc(x.word)} ${x.mastered?'✓':''}</span>`).join('')}</div>`:'<div class="muted">词库为空，先添加单词。</div>';
    }
    refresh();
  }

  /* P4-2 打卡 */
  function p42(){
    const s=stats();
    return `<h4>每日打卡与记忆检测（三向：词→义 / 义→词 / 听写）</h4>
      <div class="row" style="margin-bottom:10px">
        <span class="tag gray">在学 ${s.active}</span><span class="tag red">今日到期 ${s.due}</span><span class="tag gold">已掌握 ${s.mastered}</span>
        <button class="btn primary sm" id="refresh42">刷新</button>
      </div>
      <div id="check_area"></div>`;
  }
  function bind42(view){
    const bb=view.querySelector('#m4body');
    function render(){
      const due=dueItems(todayISO());
      const area=bb.querySelector('#check_area');
      if(!due.length){ area.innerHTML=`<div class="note">🎉 今日无到期复习项。去 P4-1 添加新词，或享受一天休息！</div>`; return; }
      area.innerHTML = due.map((it,i)=>`
        <div class="qcard" data-id="${it.id}">
          <div class="spread">
            <div><b style="font-size:16px">${esc(it.word)}</b> <span class="ipa">${esc(it.ipa||'')}</span> <span class="muted">${esc(it.pos||'')}</span> ${U.speakBtn(it.word,{label:"🔊"})}</div>
            <span class="muted">上次：${it.done.length?esc(it.done[it.done.length-1].s):'新'}</span>
          </div>
          <hr class="sep">
          <div style="font-size:13px">
            <div><b>① 词→义：</b>你知道意思吗？
              <span class="row" style="display:inline-flex;margin-left:6px">
                <button class="btn sm r-grade" data-g="熟练">熟练</button>
                <button class="btn sm r-grade" data-g="模糊">模糊</button>
                <button class="btn sm r-grade" data-g="遗忘">遗忘</button>
              </span>
              <span class="r-show muted">（${esc(it.zh||'')}）</span>
            </div>
            <div style="margin-top:8px"><b>② 义→词：</b><span class="muted">“${esc(it.zh||'')}” 的法语是？</span>
              <input class="r-recall" placeholder="输入法语词" style="max-width:220px;display:inline-block;margin:0 6px">
              <button class="btn sm r-check">核对</button><span class="r-fb muted"></span>
            </div>
            <div style="margin-top:8px"><b>③ 听写：</b>${U.speakBtn(it.ex||it.word,{label:"🔊 播放例句"})}
              <input class="r-dict" placeholder="听写含该词的句子(可选)" style="max-width:260px;display:inline-block;margin-left:6px">
            </div>
          </div>
          <div class="spread" style="margin-top:10px"><span class="r-result muted"></span>
            <button class="btn gold sm r-submit">提交本条</button></div>
        </div>`).join('');
      // 绑定
      area.querySelectorAll('.r-grade').forEach(btn=>btn.onclick=()=>{ const card=btn.closest('.qcard'); card.dataset.g1=btn.dataset.g; card.querySelectorAll('.r-grade').forEach(x=>x.classList.remove('primary')); btn.classList.add('primary'); });
      area.querySelectorAll('.r-check').forEach(btn=>btn.onclick=()=>{ const card=btn.closest('.qcard'); const v=card.querySelector('.r-recall').value.trim().toLowerCase(); const ans=it=> (card.dataset.word||''); });
      // 上面 ans 误用，单独处理
      area.querySelectorAll('.qcard').forEach(card=>{
        const word=Store.getVocab().find(x=>x.id===card.dataset.id).word.toLowerCase();
        card.querySelector('.r-check').onclick=()=>{
          const v=card.querySelector('.r-recall').value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
          const w=word.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
          const fb=card.querySelector('.r-fb');
          if(v===w){ fb.textContent='✓ 正确（熟练）'; fb.className='r-fb ok'; card.dataset.g2='熟练'; }
          else { fb.textContent='✗ 应为 '+word+'（遗忘）'; fb.className='r-fb bad'; card.dataset.g2='遗忘'; }
        };
        card.querySelector('.r-submit').onclick=()=>{
          const g1=card.dataset.g1, g2=card.dataset.g2;
          const order={熟练:0,模糊:1,遗忘:2};
          let status = (!g1&&!g2)?'模糊':( (g1&&g2)? (order[g1]>=order[g2]?g1:g2) : (g1||g2));
          // 听写若填了且不含词 → 遗忘
          const dict=card.querySelector('.r-dict').value.trim().toLowerCase();
          if(dict && !dict.includes(word)) status='遗忘';
          if(!g1 && !g2 && !dict) status='模糊';
          record(card.dataset.id, status, card);
        };
      });
    }
    bb.querySelector('#refresh42').onclick=render;
    render();
  }
  function record(id, status, card){
    const v=Store.getVocab(); const it=v.find(x=>x.id===id); if(!it) return;
    const d=todayISO();
    it.done.push({date:d, s:status});
    if(status==='熟练') it.streak=(it.streak||0)+1; else it.streak=0;
    if(it.streak>=3){ it.mastered=true; it.next=null; toast('🏆 '+it.word+' 已掌握！'); }
    else {
      if(status==='遗忘') it.next=addDaysISO(d,1);
      else if(status==='模糊') it.next=addDaysISO(d,2);
      else { it.idx=Math.min((it.idx||0)+1, U.EB.length-1); it.next=addDaysISO(d, U.EB[it.idx]); }
    }
    Store.saveVocab(v);
    if(card){ card.style.opacity=.5; const r=card.querySelector('.r-result'); if(r){ r.textContent='已记录：'+status+'（下次 '+fmtDate(it.next||'—')+'）'; r.className='r-result ok'; } }
    toast('已保存：'+status);
  }

  /* P4-3 队列管理 */
  function p43(){
    return `<h4>复习队列管理（遗忘优先级排序）</h4><div id="q_out"></div>`;
  }
  function bind43(view){
    const bb=view.querySelector('#m4body');
    const v=Store.getVocab();
    const due=dueItems(todayISO());
    // 优先级：遗忘>模糊>熟练到期
    const prio=s=> s==='遗忘'?0: s==='模糊'?1:2;
    const sorted=due.slice().sort((a,b)=>{
      const la=a.done.length?a.done[a.done.length-1].s:'新';
      const lb=b.done.length?b.done[b.done.length-1].s:'新';
      return prio(la)-prio(lb);
    });
    const overflow = sorted.length>50;
    const s=stats();
    let html=`<div class="row" style="margin-bottom:10px">
        <span class="tag gray">在学 ${s.active}</span>
        <span class="tag red">今日到期 ${s.due}</span>
        <span class="tag gold">已掌握 ${s.mastered}</span>
        <span class="tag dark">队列 ${sorted.length}</span>
      </div>`;
    if(overflow) html+=`<div class="note red">⚠ 今日到期 ${sorted.length} 条 > 50 上限，建议优先完成「遗忘」项，其余顺延至次日。</div>`;
    if(!sorted.length){ html+=`<div class="note">队列为空。</div>`; }
    else {
      html+=`<div class="tablewrap"><table><thead><tr><th>优先级</th><th>单词</th><th>上次结果</th><th>下次复习</th><th>操作</th></tr></thead><tbody>`;
      sorted.forEach((it,i)=>{
        const last=it.done.length?it.done[it.done.length-1].s:'新';
        const pc = last==='遗忘'?'red':last==='模糊'?'gold':'gray';
        html+=`<tr><td>${i<sorted.filter(x=>{const l=x.done.length?x.done[x.done.length-1].s:'新';return l==='遗忘';}).length?'⚠':(last==='模糊'?'◐':'○')}</td>
          <td><b>${esc(it.word)}</b> <span class="muted">${esc(it.zh||'')}</span></td>
          <td><span class="tag ${pc}">${esc(last)}</span></td>
          <td class="muted">${fmtDate(it.next)}</td>
          <td><button class="btn sm" onclick="Modules.m4.jump('${it.id}')">去打卡</button></td></tr>`;
      });
      html+=`</tbody></table></div>`;
    }
    bb.querySelector('#q_out').innerHTML=html;
  }
  function jump(id){ App.go('m4','t2'); }

  return {render, jump};
})();
