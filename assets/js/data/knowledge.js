/* 模块一种子库：CECRL 分级考点
 * 字段：code 编码 | name 名称 | cat 分类 | level 等级 | source 出处 | types 题型 | prereq 前置 | next 后续 | confuse 易混 | note 备注
 * 用户新增的考点会追加到 Store.userPoints，与种子库合并使用。
 */
window.KB = {
  points: [
    // —— 语音 ——
    {code:"P-A1-01",name:"法语字母与基本元音/辅音",cat:"语音",level:"A1",source:"法语发音快速入门·第1课",types:["听力","口语"],prereq:[],next:["P-A1-02","P-A1-03"],confuse:[],note:"a e i o u 为元音；注意 u /y/ 与 ou /u/ 不同"},
    {code:"P-A1-02",name:"鼻元音 /ɑ̃/ /ɔ̃/ /ɛ̃/ /œ̃/",cat:"语音",level:"A1",source:"法语发音快速入门·第2课",types:["听力","口语"],prereq:["P-A1-01"],next:[],confuse:["P-A1-03"],note:"鼻化元音后通常不发音 n/m（如 vin /vɛ̃/）"},
    {code:"P-A1-03",name:"小舌音 /ʁ/",cat:"语音",level:"A1",source:"法语发音快速入门·第2课",types:["听力","口语"],prereq:["P-A1-01"],next:[],confuse:[],note:"舌根抵小舌的摩擦/颤音，近似汉语‘喝’的弱化"},
    {code:"P-A1-04",name:"联诵 liaison",cat:"语音",level:"A1",source:"法语发音快速入门·第3课",types:["听力","口语"],prereq:["P-A1-01"],next:["P-A2-01"],confuse:[],note:"以不发音辅音结尾的词+以元音开头的词之间连读"},
    {code:"P-A1-05",name:"省音 élision",cat:"语音",level:"A1",source:"你好！法语1·第1课",types:["听力","写作"],prereq:["P-A1-01"],next:[],confuse:[],note:"ce+est→c'est；la+école→l'école"},
    {code:"P-A2-01",name:"连音 enchaînement",cat:"语音",level:"A2",source:"循序渐进法语听说·第1册",types:["听力","口语"],prereq:["P-A1-04"],next:[],confuse:[],note:"词末发音辅音与下一词首元音自然连读"},

    // —— 语法 ——
    {code:"G-A1-01",name:"直陈式现在时·规则动词 (-er/-ir/-re)",cat:"语法",level:"A1",source:"你好！法语1·第2-3课",types:["写作","口语","阅读"],prereq:[],next:["G-A1-02","G-A1-07"],confuse:[],note:"-er: e/es/e/ons/ez/ent；-ir: is/is/it/issons/issez/issent"},
    {code:"G-A1-02",name:"现在时·高频不规则动词 (être/avoir/aller/faire)",cat:"语法",level:"A1",source:"你好！法语1·第1-4课",types:["写作","口语"],prereq:["G-A1-01"],next:["G-A2-01"],confuse:[],note:"être: suis/es/est/sommes/êtes/sont"},
    {code:"G-A1-03",name:"名词阴阳性",cat:"语法",level:"A1",source:"你好！法语1·第1课",types:["写作","阅读"],prereq:[],next:["G-A1-04","G-A2-07"],confuse:[],note:"阳性 le，阴性 la；多数职业词+-e 变阴性（acteur→actrice）"},
    {code:"G-A1-04",name:"定冠词/不定冠词 (le/la/un/une)",cat:"语法",level:"A1",source:"你好！法语1·第2课",types:["写作","阅读"],prereq:["G-A1-03"],next:["G-A2-06"],confuse:["G-A2-06"],note:"不定 un/une 表‘一个’，定冠词表确指"},
    {code:"G-A1-05",name:"疑问句 (est-ce que / 倒装 / 语调)",cat:"语法",level:"A1",source:"你好！法语1·第4课",types:["口语","写作"],prereq:["G-A1-01"],next:[],confuse:[],note:"口语常用升调；正式用 est-ce que 或主谓倒装"},
    {code:"G-A1-06",name:"否定句 ne...pas",cat:"语法",level:"A1",source:"你好！法语1·第5课",types:["写作","口语"],prereq:["G-A1-01"],next:[],confuse:[],note:"变位动词夹在 ne...pas 中间：je ne parle pas"},
    {code:"G-A1-07",name:"主语人称代词",cat:"语法",level:"A1",source:"你好！法语1·第1课",types:["写作"],prereq:[],next:["G-A1-01"],confuse:[],note:"je/tu/il/elle/nous/vous/ils/elles"},
    {code:"G-A1-08",name:"指示形容词 ce/cet/cette/ces",cat:"语法",level:"A1",source:"你好！法语1·第6课",types:["写作","阅读"],prereq:["G-A1-03"],next:[],confuse:[],note:"cet 用于元音/哑音h开头的阳性单数"},
    {code:"G-A1-09",name:"数字 0-100 与价格表达",cat:"语法",level:"A1",source:"你好！法语1·第3课",types:["听力","口语"],prereq:[],next:[],confuse:[],note:"70=soixante-dix，80=quatre-vingts，90=quatre-vingt-dix"},
    {code:"G-A2-01",name:"复合过去时 passé composé",cat:"语法",level:"A2",source:"你好！法语1·第9-10课",types:["写作","口语","阅读"],prereq:["G-A1-02"],next:["G-A2-02","G-A2-03"],confuse:["G-A2-02","G-A2-03"],note:"avoir/être + 过去分词；être 作助动词需性数配合"},
    {code:"G-A2-02",name:"未完成过去时 imparfait",cat:"语法",level:"A2",source:"你好！法语1·第11课",types:["写作","阅读"],prereq:["G-A1-01"],next:["G-A2-03"],confuse:["G-A2-01","G-A2-03"],note:"描述过去的状态/习惯：nous 词根 + -ais/-ait/-ions..."},
    {code:"G-A2-03",name:"复合过去时 vs 未完成过去时",cat:"语法",level:"A2",source:"你好！法语1·第11课",types:["写作","阅读"],prereq:["G-A2-01","G-A2-02"],next:[],confuse:["G-A2-01","G-A2-02"],note:"PC 表完成的动作；imparfait 表背景/习惯"},
    {code:"G-A2-04",name:"最近过去时 (venir de + inf)",cat:"语法",level:"A2",source:"你好！法语1·第8课",types:["口语","写作"],prereq:["G-A1-02"],next:[],confuse:["G-A2-05"],note:"je viens de manger = 我刚吃完"},
    {code:"G-A2-05",name:"最近将来时 (aller + inf)",cat:"语法",level:"A2",source:"你好！法语1·第7课",types:["口语","写作"],prereq:["G-A1-02"],next:["G-B1-01"],confuse:["G-A2-04","G-B1-01"],note:"je vais partir = 我就要走了"},
    {code:"G-A2-06",name:"部分冠词 du/de la/des",cat:"语法",level:"A2",source:"你好！法语1·第12课",types:["写作","阅读"],prereq:["G-A1-04"],next:[],confuse:["G-A1-04"],note:"表不可数/抽象概念的一部分：du pain"},
    {code:"G-A2-07",name:"形容词的性数配合",cat:"语法",level:"A2",source:"你好！法语1·第5课",types:["写作","阅读"],prereq:["G-A1-03"],next:[],confuse:[],note:"形容词随所修饰名词的性数变化"},
    {code:"G-A2-08",name:"主有形容词 mon/ma/son...",cat:"语法",level:"A2",source:"你好！法语1·第6课",types:["写作","阅读"],prereq:["G-A1-03"],next:[],confuse:[],note:"按‘占有者’的人称/数变化，不按被占有物"},
    {code:"G-A2-09",name:"介词 à / de 的基本用法",cat:"语法",level:"A2",source:"你好！法语1·第7-12课",types:["写作","阅读"],prereq:[],next:["G-B1-04"],confuse:[],note:"à 表‘向/在’，de 表‘从/的’；固定搭配需记忆"},
    {code:"G-A2-10",name:"直接/间接宾语代词",cat:"语法",level:"A2",source:"你好！法语1·第13课",types:["写作","口语"],prereq:["G-A1-07"],next:["G-B1-04"],confuse:[],note:"me/te/le/la/lui/les/leur 置于变位动词前"},
    {code:"G-B1-01",name:"简单将来时 futur simple",cat:"语法",level:"B1",source:"你好！法语2·第1课",types:["写作","口语"],prereq:["G-A2-05"],next:["G-B1-02"],confuse:["G-A2-05"],note:"词根 + -ai/-as/-a/-ons/-ez/-ont"},
    {code:"G-B1-02",name:"条件式现在时",cat:"语法",level:"B1",source:"你好！法语2·第3课",types:["写作","口语"],prereq:["G-A1-01"],next:[],confuse:[],note:"表委婉请求/假设：je voudrais"},
    {code:"G-B1-03",name:"被动语态 (être + participe passé)",cat:"语法",level:"B1",source:"你好！法语2·第5课",types:["写作","阅读"],prereq:["G-A2-01"],next:[],confuse:[],note:"强调动作承受者；过去分词需配合"},
    {code:"G-B1-04",name:"关系代词 qui/que/dont",cat:"语法",level:"B1",source:"你好！法语2·第4课",types:["写作","阅读"],prereq:["G-A2-10"],next:[],confuse:[],note:"qui 作主语，que 作宾语，dont 表 de+名词"},
    {code:"G-B1-05",name:"虚拟式基础",cat:"语法",level:"B1",source:"你好！法语2·第6课",types:["写作","阅读"],prereq:["G-A2-01"],next:[],confuse:[],note:"用于 il faut que / 情感/意愿等从句"},

    // —— 词汇 ——
    {code:"V-A1-01",name:"问候与自我介绍用语",cat:"词汇",level:"A1",source:"你好！法语1·第1课",types:["口语","听力"],prereq:[],next:["C-A1-01"],confuse:[],note:"bonjour / salut / enchanté(e)"},
    {code:"V-A1-02",name:"颜色 / 时间 / 星期",cat:"词汇",level:"A1",source:"你好！法语1·第3-4课",types:["听力","阅读"],prereq:[],next:[],confuse:[],note:"lundi...dimanche；il est trois heures"},
    {code:"V-A1-03",name:"家庭与人物",cat:"词汇",level:"A1",source:"你好！法语1·第6课",types:["口语","阅读"],prereq:[],next:[],confuse:[],note:"père/mère/frère/soeur"},
    {code:"V-A1-04",name:"食物与餐饮",cat:"词汇",level:"A1",source:"你好！法语1·第7课",types:["口语","听力"],prereq:[],next:["C-A1-02"],confuse:[],note:"petit-déjeuner / déjeuner / dîner"},
    {code:"V-A2-01",name:"住房与家居",cat:"词汇",level:"A2",source:"你好！法语1·第14课",types:["阅读","口语"],prereq:[],next:[],confuse:[],note:"appartement / chambre / cuisine"},
    {code:"V-A2-02",name:"交通与出行",cat:"词汇",level:"A2",source:"你好！法语1·第15课",types:["听力","阅读"],prereq:[],next:["C-A1-03"],confuse:[],note:"train / avion / arrêt / gare"},
    {code:"V-A2-03",name:"购物与金钱",cat:"词汇",level:"A2",source:"你好！法语1·第16课",types:["口语","听力"],prereq:[],next:[],confuse:[],note:"payer / prix / cher / bon marché"},
    {code:"V-A2-04",name:"工作与职业",cat:"词汇",level:"A2",source:"你好！法语1·第17课",types:["阅读","口语"],prereq:[],next:[],confuse:[],note:"professeur / ingénieur / bureau"},
    {code:"V-B1-01",name:"旅行与休闲活动",cat:"词汇",level:"B1",source:"你好！法语2·第2课",types:["阅读","口语"],prereq:[],next:[],confuse:[],note:"voyage / réserver / activité"},

    // —— 交际功能 ——
    {code:"C-A1-01",name:"自我介绍（姓名/国籍/职业）",cat:"交际",level:"A1",source:"你好！法语1·第1课",types:["口语"],prereq:["V-A1-01"],next:[],confuse:[],note:"Je m'appelle... / Je suis..."},
    {code:"C-A1-02",name:"餐厅点餐",cat:"交际",level:"A1",source:"你好！法语1·第7课",types:["口语","听力"],prereq:["V-A1-04"],next:[],confuse:[],note:"une table pour deux / l'addition s'il vous plaît"},
    {code:"C-A1-03",name:"问路与方位",cat:"交际",level:"A1",source:"你好！法语1·第15课",types:["口语","听力"],prereq:["V-A2-02"],next:[],confuse:[],note:"où est... / tout droit / à gauche"},
    {code:"C-A2-01",name:"描述过去经历",cat:"交际",level:"A2",source:"你好！法语1·第11课",types:["口语","写作"],prereq:["G-A2-01","G-A2-02"],next:[],confuse:[],note:"用 PC + imparfait 讲述故事"},
    {code:"C-A2-02",name:"电话沟通",cat:"交际",level:"A2",source:"循序渐进法语听说·第2册",types:["口语","听力"],prereq:[],next:[],confuse:[],note:"Allô / ne quittez pas / je rappelle"},
    {code:"C-A2-03",name:"表达观点与同意/反对",cat:"交际",level:"A2",source:"你好！法语2·第3课",types:["口语","写作"],prereq:["G-B1-02"],next:["C-B1-01"],confuse:[],note:"je pense que / d'accord / je ne suis pas d'accord"},
    {code:"C-B1-01",name:"辩论与论证",cat:"交际",level:"B1",source:"你好！法语2·第6课",types:["口语","写作"],prereq:["C-A2-03"],next:[],confuse:[],note:"pour / contre / par conséquent"},

    // —— 文化常识 ——
    {code:"K-A1-01",name:"法语国家与地区 (Francophonie)",cat:"文化常识",level:"A1",source:"通用框架",types:["阅读"],prereq:[],next:[],confuse:[],note:"全球约30个官方法语国家"},
    {code:"K-A1-02",name:"礼貌称呼 tu / vous",cat:"文化常识",level:"A1",source:"通用框架",types:["口语"],prereq:[],next:[],confuse:[],note:"对陌生/长辈用 vous，熟人用 tu"},
    {code:"K-A2-01",name:"法国节假日与餐饮文化",cat:"文化常识",level:"A2",source:"通用框架",types:["阅读"],prereq:[],next:[],confuse:[],note:"14 juillet 国庆；餐序 entrée/plat/fromage/dessert"},
    {code:"K-B1-01",name:"DELF / TCF 考试结构",cat:"文化常识",level:"B1",source:"附录C",types:["阅读"],prereq:[],next:[],confuse:[],note:"DELF 分 A1-B2 独立文凭；TCF 为水平测试"}
  ]
};
