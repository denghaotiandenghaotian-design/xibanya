/* 模块七 字母表与键盘（法语字母 + IPA + 例词 + AZERTY 键盘布局）
 * 点击字母/键位即可用浏览器法语 TTS 朗读。
 */
window.Modules = window.Modules || {};
Modules.m7 = (function(){
  const {$, esc, toast} = U;

  // 法语字母表（含重音字母说明）。name=字母读音(IPA)，ex=例词
  const ALPHA = [
    {ch:"A", ipa:"[a]", ex:"ami (朋友)"},
    {ch:"B", ipa:"[be]", ex:"bonjour (你好)"},
    {ch:"C", ipa:"[se]", ex:"chat (猫)"},
    {ch:"D", ipa:"[de]", ex:"deux (二)"},
    {ch:"E", ipa:"[ə]/[ɛ]", ex:"étudiant (学生)"},
    {ch:"F", ipa:"[ɛf]", ex:"français (法国的)"},
    {ch:"G", ipa:"[ʒe]", ex:"garage (车库)"},
    {ch:"H", ipa:"[aʃ]", ex:"hôtel (酒店)"},
    {ch:"I", ipa:"[i]", ex:"île (岛)"},
    {ch:"J", ipa:"[ʒi]", ex:"journal (报纸)"},
    {ch:"K", ipa:"[ka]", ex:"kilo (公斤)"},
    {ch:"L", ipa:"[ɛl]", ex:"livre (书)"},
    {ch:"M", ipa:"[ɛm]", ex:"madame (女士)"},
    {ch:"N", ipa:"[ɛn]", ex:"nom (名字)"},
    {ch:"O", ipa:"[o]", ex:"oui (是)"},
    {ch:"P", ipa:"[pe]", ex:"père (父亲)"},
    {ch:"Q", ipa:"[ky]", ex:"quatre (四)"},
    {ch:"R", ipa:"[ɛʁ]", ex:"rue (街道)"},
    {ch:"S", ipa:"[ɛs]", ex:"salut (嗨)"},
    {ch:"T", ipa:"[te]", ex:"table (桌子)"},
    {ch:"U", ipa:"[y]", ex:"une (一个)"},
    {ch:"V", ipa:"[ve]", ex:"ville (城市)"},
    {ch:"W", ipa:"[dubləve]", ex:"wagon (车厢)"},
    {ch:"X", ipa:"[iks]", ex:"taxi (出租车)"},
    {ch:"Y", ipa:"[igʁɛk]", ex:"yaourt (酸奶)"},
    {ch:"Z", ipa:"[zɛd]", ex:"zéro (零)"}
  ];
  // AZERTY 键盘三行（法语布局，含重音键）
  const AZERTY = [
    ["A","Z","E","R","T","Y","U","I","O","P"],
    ["Q","S","D","F","G","H","J","K","L","M"],
    ["W","X","C","V","B","N"]
  ];
  // 重音/特殊字母（键盘上通过组合或独立键输入）
  const ACCENTS = [
    {ch:"À / Â / Ä", note:"A 的大写重音形式"},
    {ch:"É / È / Ê / Ë", note:"E 的重音形式（é 最常见）"},
    {ch:"Î / Ï", note:"I 的重音形式"},
    {ch:"Ô / Ö", note:"O 的重音形式"},
    {ch:"Ù / Û / Ü", note:"U 的重音形式"},
    {ch:"Ç", note:"C 的软音形式（读 [s]）"}
  ];

  function render(view){
    view.innerHTML = `
      <div class="card">
        <div class="spread"><h3>模块七 · 字母表与键盘</h3>
          <div class="row">
            <button class="btn sm" data-t="t1">字母表</button>
            <button class="btn sm" data-t="t2">AZERTY 键盘</button>
          </div>
        </div>
        <div class="note bleu">法语使用 <b>26 个拉丁字母</b>（与英语相同），但含丰富<b>重音符号</b>影响读音。点击任意字母或键位，用浏览器法语真人语音朗读其名称。键盘采用法国标准 <b>AZERTY</b> 布局（与英语 QWERTY 不同）。</div>
        <div id="m7body"></div>
      </div>`;
    view.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ view.querySelectorAll('[data-t]').forEach(x=>x.classList.remove('primary')); b.classList.add('primary'); show(view, b.dataset.t); });
    view.querySelector('[data-t="t1"]').classList.add('primary');
    show(view,'t1');
  }
  function show(view,t){
    const body=view.querySelector('#m7body');
    if(t==='t1') body.innerHTML=t1();
    if(t==='t2') body.innerHTML=t2();
    bind(body);
  }

  /* t1 字母表 */
  function t1(){
    const cards = ALPHA.map(a=>`
      <div class="alpha-card" data-ch="${esc(a.ch)}">
        <div class="alpha-ch">${esc(a.ch)}</div>
        <div class="alpha-ipa">${esc(a.ipa)}</div>
        <div class="alpha-ex">${esc(a.ex)}</div>
        <button class="audio-btn alpha-spk" title="朗读字母名">🔊</button>
      </div>`).join('');
    const acc = ACCENTS.map(x=>`
      <div class="acc-card"><b>${esc(x.ch)}</b><span class="muted"> — ${esc(x.note)}</span></div>`).join('');
    return `
      <h4>法语字母表（26 个 · 点击朗读）</h4>
      <div class="alpha-grid">${cards}</div>
      <h4 style="margin-top:18px">重音字母（影响读音，拼写时不可省略）</h4>
      <div class="grid2" style="gap:8px">${acc}</div>
      <div class="note">💡 法语重音符号（é è à ç ê î ô û 等）是拼写的一部分，改变读音但不改变字母排序。打字时可用法语键盘或长按选字符。</div>`;
  }

  /* t2 AZERTY 键盘 */
  function t2(){
    const rows = AZERTY.map(r=>`
      <div class="kb-row">${r.map(k=>`<button class="kb-key" data-k="${esc(k)}">${esc(k)}</button>`).join('')}</div>`).join('');
    return `
      <h4>AZERTY 键盘布局（法国标准 · 点击键位朗读字母名）</h4>
      <div class="kbd-wrap">${rows}</div>
      <div class="note">与英语 <b>QWERTY</b> 的关键差异：A 与 Q 互换、Z 与 W 互换、M 在 L 右侧。法语最常用字母如 E/A/S/R 都放在了更顺手的位置。在数字行上方还有 <b>é è à ç</b> 等重音键。</div>
      <div class="row" style="margin-top:12px">
        <button class="btn sm" id="kb_all">🔊 依次朗读整行 A→Z</button>
      </div>`;
  }

  function bind(body){
    body.querySelectorAll('.alpha-card').forEach(c=>{
      c.querySelector('.alpha-spk').onclick=(e)=>{ e.stopPropagation(); U.speak(c.dataset.ch); };
      c.onclick=()=>U.speak(c.dataset.ch);
    });
    body.querySelectorAll('.kb-key').forEach(k=>k.onclick=()=>U.speak(k.dataset.k));
    const all=body.querySelector('#kb_all');
    if(all) all.onclick=()=>{ ALPHA.forEach((a,i)=> setTimeout(()=>U.speak(a.ch), i*420)); toast('正在依次朗读…'); };
  }

  return {render};
})();
