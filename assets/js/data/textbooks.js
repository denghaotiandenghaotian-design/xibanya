/* 教材对标映射（附录B + 你好！法语 课次拆解，支持 P1-2 / P3-2 / 模块七书目总览）
 * TB.list 为「全部学习书目」完整罗列（含出版社/等级/类型/覆盖情景），供全局设置下拉与模块七书目总览共用。
 * TB.lessons 为逐课拆解（保留原结构，供 P1-2 教材对标）。
 * 注：课次拆解以《你好！法语》主流教学顺序为参照，标注 [通用框架] 的部分为通用编排，非逐字照搬。
 */
window.TB = {
  list: [
    {name:"《你好！法语》1", publisher:"外语教学与研究出版社", levels:"A1", type:"综合教材", feature:"源自 Alter Ego+，国内成人零起点主流", scenarios:["salut","famille","repas","shopping","transport","temps","telephone","etudes"]},
    {name:"《你好！法语》2", publisher:"外语教学与研究出版社", levels:"A2", type:"综合教材", feature:"延续 A1 体系，进入过去时与日常交际", scenarios:["logement","sante","transport","voyage","travail","etudes"]},
    {name:"《你好！法语》3", publisher:"外语教学与研究出版社", levels:"B1", type:"综合教材", feature:"任务型进阶，引入条件式/虚拟式", scenarios:["voyage","travail","logement","telephone"]},
    {name:"《你好！法语》4", publisher:"外语教学与研究出版社", levels:"B1-B2", type:"综合教材", feature:"贴近真实语用，备考衔接", scenarios:["travail","voyage","sante"]},
    {name:"《走遍法国》Reflets 1", publisher:"外语教学与研究出版社", levels:"A1-A2", type:"综合教材(视听)", feature:"视频教材，侧重听说与法国文化", scenarios:["salut","repas","shopping","transport","famille"]},
    {name:"《走遍法国》Reflets 2", publisher:"外语教学与研究出版社", levels:"A2-B1", type:"综合教材(视听)", feature:"情景剧驱动，强化交际", scenarios:["logement","travail","voyage","telephone"]},
    {name:"《法语》(马晓宏) 1-4", publisher:"外语教学与研究出版社", levels:"A1-B1", type:"综合教材(北外)", feature:"北外经典，语法系统性强", scenarios:["salut","famille","repas","etudes","temps"]},
    {name:"Alter Ego+ 1-4", publisher:"Hachette / 外研社引进", levels:"A1-B2", type:"综合教材(法国原版)", feature:"法国原版，任务型教学，题材现代", scenarios:["salut","repas","shopping","logement","travail","voyage"]},
    {name:"Édito 1-4", publisher:"Didier / 引进版", levels:"A1-B2", type:"综合教材(法国原版)", feature:"题材现代、社会文化视角", scenarios:["travail","voyage","sante","telephone"]},
    {name:"Grammaire progressive du français", publisher:"CLE International", levels:"A1-B1", type:"语法专项", feature:"语法渐进练习(蓝皮)", scenarios:["etudes","repas","temps"]},
    {name:"Vocabulaire progressif du français", publisher:"CLE International", levels:"A1-B2", type:"词汇专项", feature:"词汇渐进练习(橙皮)", scenarios:["shopping","repas","transport","logement","sante"]},
    {name:"《循序渐进法语听说》1-3", publisher:"外语教学与研究出版社", levels:"A1-B1", type:"听说专项", feature:"听说技能专项训练", scenarios:["telephone","transport","repas","salut"]},
    {name:"《法语发音快速入门》", publisher:"外语教学与研究出版社", levels:"A0-A1", type:"语音专项", feature:"语音/拼读入门", scenarios:["salut","etudes"]},
    {name:"ABC DELF / Réussir le DELF", publisher:"CLE International / Didier", levels:"A1-B2", type:"考试备考", feature:"DELF 官方备考练习", scenarios:["salut","repas","shopping","travail","voyage"]},
    {name:"《新公共法语》", publisher:"上海外语教育出版社", levels:"A1-A2", type:"综合教材", feature:"公共法语/二外体系", scenarios:["etudes","famille","temps"]},
    {name:"《勤快法语》(Très bien) 1-3", publisher:"外语教学与研究出版社", levels:"A1-A2", type:"青少/成人综合", feature:"法语(法国)原版引进，活泼实用", scenarios:["salut","famille","repas","etudes"]},
    {name:"Le Nouveau Taxi ! 1-3", publisher:"Hachette", levels:"A1-B1", type:"综合教材(法国原版)", feature:"话题实用，商务/旅游兼顾", scenarios:["transport","shopping","travail","voyage"]},
    {name:"Campus 1-4", publisher:"Hachette", levels:"A1-B2", type:"综合教材(法国原版)", feature:"大学法语常用，结构清晰", scenarios:["etudes","travail","logement","sante"]},
    {name:"Adosphère 1-4", publisher:"Hachette", levels:"A1-B1", type:"青少综合", feature:"青少年向，情景丰富", scenarios:["famille","telephone","voyage","temps"]},
    {name:"Les Cahiers de l'Alliance Française", publisher:"Alliance Française", levels:"A1-C1", type:"文化/拓展", feature:"法语联盟文化拓展读本", scenarios:["voyage","travail","sante","telephone"]}
  ],
  lessons: {
    "《你好！法语》1": [
      {lesson:"第1课", title:"Bonjour !", grammar:["G-A1-07","P-A1-05","V-A1-01"], vocab:["问候","国籍","礼貌称呼"], comm:["C-A1-01","K-A1-02"], level:"A1", exam:["听力","口语"]},
      {lesson:"第2课", title:"Je m'appelle...", grammar:["G-A1-01","G-A1-02"], vocab:["家庭与人物","基础名词"], comm:["C-A1-01"], level:"A1", exam:["口语","写作"]},
      {lesson:"第3课", title:"C'est un livre", grammar:["G-A1-03","G-A1-04","G-A1-09"], vocab:["物品","颜色","数字"], comm:[], level:"A1", exam:["阅读","写作"]},
      {lesson:"第4课", title:"Une question ?", grammar:["G-A1-05","G-A1-06","G-A1-08"], vocab:["疑问词","日常物品"], comm:[], level:"A1", exam:["口语","写作"]},
      {lesson:"第5课", title:"J'aime le français", grammar:["G-A2-07","V-A1-02"], vocab:["爱好","星期","时间"], comm:[], level:"A1", exam:["阅读"]},
      {lesson:"第6课", title:"Ma famille", grammar:["G-A2-08","V-A1-03"], vocab:["家庭","人物关系"], comm:[], level:"A1", exam:["写作","口语"]},
      {lesson:"第7课", title:"On va au café", grammar:["G-A2-05","G-A2-09"], vocab:["餐饮","咖啡馆"], comm:["C-A1-02"], level:"A1", exam:["口语","听力"]},
      {lesson:"第8课", title:"Je viens de...", grammar:["G-A2-04","V-A1-04"], vocab:["餐饮","活动"], comm:[], level:"A1", exam:["口语"]},
      {lesson:"第9课", title:"Le week-end dernier", grammar:["G-A2-01"], vocab:["休闲","周末"], comm:["C-A2-01"], level:"A2", exam:["写作","口语"]},
      {lesson:"第10课", title:"Une histoire", grammar:["G-A2-01","G-A2-02"], vocab:["叙事","过去"], comm:[], level:"A2", exam:["写作","阅读"]},
      {lesson:"第11课", title:"Quand j'étais petit", grammar:["G-A2-02","G-A2-03"], vocab:["童年","习惯"], comm:[], level:"A2", exam:["写作","阅读"]},
      {lesson:"第12课", title:"Chez moi", grammar:["G-A2-06","V-A2-01"], vocab:["住房","家居"], comm:[], level:"A2", exam:["阅读","口语"]}
    ],
    "《你好！法语》2": [
      {lesson:"第1课", title:"Le futur", grammar:["G-B1-01","G-A2-05"], vocab:["计划","将来"], comm:[], level:"B1", exam:["写作","口语"]},
      {lesson:"第3课", title:"Le conditionnel", grammar:["G-B1-02","C-A2-03"], vocab:["愿望","建议"], comm:["C-A2-03"], level:"B1", exam:["口语","写作"]},
      {lesson:"第4课", title:"Les relatifs", grammar:["G-B1-04","G-A2-10"], vocab:["描述","连接"], comm:[], level:"B1", exam:["写作","阅读"]},
      {lesson:"第6课", title:"Le subjonctif", grammar:["G-B1-05"], vocab:["情感","意愿"], comm:["C-B1-01"], level:"B1", exam:["写作","口语"]}
    ]
  }
};
