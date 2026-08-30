/* 全局状态与本地持久化（localStorage）
 * 跨模块数据流转：P1-4 错题 → 薄弱点(weaknesses) → P2-3 补强；P4-2 打卡 → P4-3 队列
 */
window.Store = (function(){
  const NS = "fr_app_";
  function load(k, def){ try{ const v = localStorage.getItem(NS+k); return v==null?def:JSON.parse(v);}catch(e){ return def; } }
  function save(k, v){ try{ localStorage.setItem(NS+k, JSON.stringify(v)); }catch(e){} }

  // —— 全局参数（提示词 0.0）——
  const defaultSettings = {
    targetLevel:"A1", exam:"无", textbook:"《你好！法语》1", dailyMinutes:30, examDate:""
  };
  function getSettings(){ return Object.assign({}, defaultSettings, load("settings",{})); }
  function setSettings(s){ save("settings", s); }

  // —— 用户自定义考点（P1-1）——
  function getUserPoints(){ return load("userPoints", []); }
  function addUserPoint(p){ const a=getUserPoints(); a.push(p); save("userPoints", a); }
  function delUserPoint(code){ save("userPoints", getUserPoints().filter(x=>x.code!==code)); }

  // —— 全部考点（种子 + 用户）——
  function allPoints(){ return (window.KB?KB.points:[]).concat(getUserPoints()); }
  function findPoint(code){ return allPoints().find(p=>p.code===code); }

  // —— 错题归因（P1-4）——
  function getErrors(){ return load("errors", []); }
  function addError(e){ const a=getErrors(); a.push(e); save("errors", a); }
  function delError(id){ save("errors", getErrors().filter(x=>x.id!==id)); }

  // 薄弱点：同一考点 ≥2 次同类错误 → 判定薄弱
  function computeWeakness(){
    const counts = {};
    getErrors().forEach(e=>{
      if(!e.code) return;
      counts[e.code] = (counts[e.code]||0)+1;
    });
    return Object.keys(counts).filter(c=>counts[c]>=2).map(c=>({code:c, count:counts[c], point:findPoint(c)}));
  }

  // —— 复习/补强计划（P2）——
  function getPlans(){ return load("plans", []); }
  function savePlans(a){ save("plans", a); }

  // —— 背诵打卡（P4）——
  function getVocab(){ return load("vocab", []); }
  function saveVocab(a){ save("vocab", a); }
  function getCheckins(){ return load("checkins", []); }
  function saveCheckins(a){ save("checkins", a); }

  // —— 单词掌握进度（模块九/十一）——
  function getLearnedWords(){ return load("learnedWords", {}); }     // {fr:true}
  function setLearnedWord(fr, v){ const m=getLearnedWords(); if(v) m[fr]=true; else delete m[fr]; save("learnedWords", m); }
  function isWordLearned(fr){ return !!getLearnedWords()[fr]; }
  function learnedCount(){ return Object.keys(getLearnedWords()).length; }

  // —— 本地日期工具（store.js 在 util.js 之前加载，故自带实现，不依赖 U）——
  function todayISO(){ const d=new Date(); return d.toISOString().slice(0,10); }
  function addDaysISO(iso,n){ const d=new Date(iso+"T00:00:00"); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); }

  // —— 加入背诵打卡（衔接模块四 艾宾浩斯滚动复习）——
  function addToRecite(word, opts){
    opts=opts||{};
    const v=getVocab();
    if(v.some(x=>x.word===word)) return false;       // 已存在则不重复
    v.push({id:'v'+Date.now()+Math.random().toString(36).slice(2,6),
      word, ipa:opts.ipa||"", pos:opts.pos||"", zh:opts.zh||"", ex:opts.ex||"", level:opts.lv||"A1",
      added:todayISO(), next:addDaysISO(todayISO(),(window.U&&U.EB)?U.EB[0]:1), idx:0, streak:0, done:[], mastered:false});
    saveVocab(v); return true;
  }
  function isRecited(word){ return getVocab().some(x=>x.word===word); }

  // —— 每日一练（模块八）——
  // daily = {date, wordIdx, sentIdx, today:{words:[fr], sentences:[fr]}, history:[{date, words, sentences, learned, done}]}
  function getDaily(){ return load("daily", {date:"", wordIdx:0, sentIdx:0, today:null, history:[]}); }
  function saveDaily(d){ save("daily", d); }

  // —— 综合自测记录（模块九）——
  function getTests(){ return load("tests", []); }
  function addTest(t){ const a=getTests(); a.push(t); if(a.length>50) a.shift(); save("tests", a); }

  function resetAll(){
    ["settings","userPoints","errors","plans","vocab","checkins","learnedWords","daily","tests"].forEach(k=>localStorage.removeItem(NS+k));
  }

  return {
    load, save, getSettings, setSettings,
    getUserPoints, addUserPoint, delUserPoint,
    allPoints, findPoint,
    getErrors, addError, delError, computeWeakness,
    getPlans, savePlans,
    getVocab, saveVocab, getCheckins, saveCheckins,
    getLearnedWords, setLearnedWord, isWordLearned, learnedCount,
    addToRecite, isRecited,
    getDaily, saveDaily,
    getTests, addTest,
    resetAll
  };
})();
