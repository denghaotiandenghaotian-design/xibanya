/* 模块十 句子学习（按情景学核心句型 + 语法注释 + 朗读跟读）
 * 跟读评分：Web Speech 识别（法语）→ 编辑距离相似度；不支持则自评兜底。
 */
window.Modules = window.Modules || {};
Modules.m10 = (function(){
  const {$, esc, toast} = U;
  let preset = null;

  function norm(s){ return (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim(); }
  function sim(a,b){ const na=norm(a).split(' ').filter(Boolean); const nb=new Set(norm(b).split(' ').filter(Boolean)); if(!na.length) return 0; return na.filter(t=>nb.has(t)).length/na.length; }

  // 各情景语法注释（要点式，供学习时参考）
  const GRAM = {
    salut:["主语代词 je / tu / vous 的区别（vous 表敬称）","être 的现在时：je suis, tu es, il/elle est","礼貌用语 s'il vous plaît / merci / de rien"],
    famille:["avoir 的现在时：j'ai, il a","主有形容词 mon / ma / mes（我的）","数字 1-10 与家庭成员搭配"],
    repas:["部分冠词 du / de la / des（一些…）","点餐句型 Je voudrais + 名词","命令式在 service 中的用法：apportez, apportez-moi"],
    shopping:["疑问词 combien / quel 的价格问法","尺码与颜色形容词的性数配合","比较级 plus… que / moins… que"],
    transport:["方向介词 à droite / à gauche / tout droit","乘坐交通工具用 prendre + 名词：prendre le métro","问路句型 Où est… ? Excusez-moi"],
    logement:["location 相关动词 louer / visiter / habiter","名词阴阳性与冠词 le / la","序数词 premier / deuxième 表楼层"],
    temps:["天气表达 Il fait + 形容词","星期与日期的提问 Quel jour… / Quelle date…","最近将来时 je vais + 动词原形"],
    sante:["身体不适表达 j'ai mal à + 身体部位","就医动词 prendre rendez-vous / consulter","命令式建议 Reposez-vous, buvez…"],
    telephone:["打电话 Je voudrais parler à…","留言 Laissez un message","联系方式 donner / demander un numéro"],
    travail:["职业名词的阴阳性（e.g. étudiant / étudiante）","工作表达 travailler dans / chez","求职 candidature / compétence / expérience"],
    voyage:["旅行动词 réserver / visiter / découvrir","住宿 une chambre d'hôtel","建议 On + 动词（我们…）"],
    etudes:["学习表达 étudier / réviser","学校场所 école / université / bibliothèque","评价形容词 facile / difficile 的配合"]
  };

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块十 · 句子学习</h3>
          <button class="btn sm ghost" id="toScenes">← 返回情景板块</button>
        </div>
        <div class="note bleu">按情景学习核心句型：先看<b>语法注释</b>，再<b>朗读跟读</b>。跟读可用麦克风识别打分（不支持时自评）。</div>
        <div id="m10body"></div>
      </div>`;
    view.querySelector('#toScenes').onclick=()=>App.go('m8');
    body(view);
  }

  function body(view){
    const body=view.querySelector('#m10body');
    const opts = FRV.scenarios.map(s=>`<option value="${s.id}" ${preset===s.id?'selected':''}>${esc(s.name)}（${s.emoji}）</option>`).join('');
    body.innerHTML = `
      <div class="row" style="margin-bottom:12px;align-items:flex-end">
        <label class="fld" style="margin:0;flex:1"><span class="lab">选择情景板块</span><select id="s_sc">${opts}</select></label>
        <button class="btn primary" id="s_all">🔊 朗读全部句子</button>
      </div>
      <div id="s_gram" class="gram-box"></div>
      <div id="s_list"></div>`;
    bind(body);
  }

  function bind(body){
    function render(){
      const sid=body.querySelector('#s_sc').value; preset=sid;
      const sc=FRV.data[sid];
      const notes=(GRAM[sid]||[]).map(n=>`<li>${esc(n)}</li>`).join('');
      body.querySelector('#s_gram').innerHTML = notes? `<h4>📘 本情景语法注释</h4><ul class="adv-list">${notes}</ul>` : '';
      body.querySelector('#s_list').innerHTML=(sc.sentences||[]).map((x,i)=>`
        <div class="sent-card" data-fr="${esc(x.fr)}">
          <div class="sent-fr">${esc(x.fr)} ${U.speakBtn(x.fr,{level:x.lv,label:"🔊"})}</div>
          <div class="ipa">${esc(x.ipa)}</div>
          <div class="sent-zh">${esc(x.zh)}</div>
          <div class="muted" style="font-size:12px">出处：${esc(x.src||'')}</div>
          <div class="row" style="margin-top:8px;gap:6px">
            <button class="btn sm primary s-follow" data-i="${i}">🗣️ 跟读</button>
            <span class="s-fb muted" style="font-size:12px"></span>
          </div>
        </div>`).join('');
      body.querySelectorAll('.s-follow').forEach(b=>b.onclick=()=>{
        const card=b.closest('.sent-card'); const fr=card.dataset.fr;
        U.speak(fr,{level:sc.sentences[b.dataset.i].lv});   // 先放示范
        const fb=card.querySelector('.s-fb');
        const SR=(typeof SpeechRecognition!=='undefined')?SpeechRecognition:(typeof webkitSpeechRecognition!=='undefined'?webkitSpeechRecognition:null);
        if(!SR){ fb.textContent='（无麦克风识别，请对照示范自评）'; return; }
        const rec=new SR(); rec.lang='fr-FR'; rec.interimResults=false; rec.maxAlternatives=1;
        fb.textContent='正在聆听…请跟读';
        try{ rec.start(); }catch(e){ fb.textContent='无法启动麦克风'; return; }
        rec.onresult=e=>{ const txt=e.results[0][0].transcript; const s=Math.round(sim(txt,fr)*100); fb.textContent='识别：'+txt+' ｜ 匹配度 '+s; };
        rec.onerror=e=>{ fb.textContent='识别失败（'+e.error+'），请对照示范自评'; };
      });
    }
    body.querySelector('#s_sc').onchange=()=>render();
    body.querySelector('#s_all').onclick=()=>{
      const sid=body.querySelector('#s_sc').value; (FRV.data[sid].sentences||[]).forEach((x,i)=> setTimeout(()=>U.speak(x.fr,{level:x.lv}), i*2200));
      toast('正在依次朗读句子…');
    };
    render();
  }

  return {render, get preset(){return preset;}, set preset(v){preset=v;}};
})();
