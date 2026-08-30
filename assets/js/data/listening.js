/* 模块六 P6-1/6-2/6-3 分级听力材料
 * text: 分段 [fr, zh]；vocab: 生词[词, IPA, 词性, 中文]；speed: 目标语速(词/分)
 * quiz: 理解检测[类型, 题干, 选项[], 答案索引, 解析]
 */
window.LISTEN = [
  {
    id:"l1", title:"问路去火车站", level:"A1", topic:"问路", speed:110,
    text:[
      {fr:"Bonjour, madame. Excusez-moi, où est la gare, s'il vous plaît ?", zh:"您好女士。打扰一下，请问火车站在哪儿？"},
      {fr:"La gare ? Elle est un peu loin. Prenez le bus numéro douze, devant la boulangerie.", zh:"火车站？有点远。请在面包店前乘 12 路公交。"},
      {fr:"D'accord, merci beaucoup. Au revoir !", zh:"好的，非常感谢。再见！"}
    ],
    vocab:[
      {w:"gare", ipa:"/gaʁ/", pos:"n.f.", zh:"火车站"},
      {w:"loin", ipa:"/lwɛ̃/", pos:"adv.", zh:"远"},
      {w:"bus", ipa:"/bys/", pos:"n.m.", zh:"公交车"},
      {w:"boulangerie", ipa:"/bulɑ̃ʒʁi/", pos:"n.f.", zh:"面包店"},
      {w:"devant", ipa:"/dəvɑ̃/", pos:"prép.", zh:"在…前面"}
    ],
    quiz:[
      {type:"主旨", q:"对话的主要目的？", options:["买面包","问火车站怎么走","坐公交车"], a:1, r:"男士开头就问 où est la gare（火车站在哪）。"},
      {type:"细节", q:"面包店与公交站的关系是？", options:["公交站在面包店前","面包店在公交站后","两者无关"], a:0, r:"原文 devant la boulangerie（面包店前）乘 12 路。"},
      {type:"推断", q:"女士建议男士怎么去？", options:["走路","坐 12 路公交","打的"], a:1, r:"Prenez le bus numéro douze。"}
    ]
  },
  {
    id:"l2", title:"超市买面包和苹果", level:"A1", topic:"购物", speed:115,
    text:[
      {fr:"Bonjour, monsieur. Je voudrais deux baguettes et un kilo de pommes.", zh:"您好先生。我要两根法棍和一公斤苹果。"},
      {fr:"Très bien. Une baguette, c'est un euro vingt. Les pommes, trois euros le kilo.", zh:"好的。法棍一根 1 欧 20，苹果每公斤 3 欧。"},
      {fr:"Voilà. Ça fait combien, s'il vous plaît ?", zh:"给。请问一共多少钱？"},
      {fr:"Ça fait quatre euros quatre-vingts. Merci, au revoir !", zh:"一共 4 欧 80。谢谢，再见！"}
    ],
    vocab:[
      {w:"baguette", ipa:"/baɡɛt/", pos:"n.f.", zh:"法棍面包"},
      {w:"kilo", ipa:"/kilo/", pos:"n.m.", zh:"公斤"},
      {w:"pomme", ipa:"/pɔm/", pos:"n.f.", zh:"苹果"},
      {w:"euro", ipa:"/øʁo/", pos:"n.m.", zh:"欧元"}
    ],
    quiz:[
      {type:"细节", q:"苹果每公斤多少钱？", options:["1.20 欧","3 欧","4.80 欧"], a:1, r:"Les pommes, trois euros le kilo。"},
      {type:"推断", q:"两根法棍加一公斤苹果的总价应为？", options:["4.80 欧","5 欧","2.40 欧"], a:0, r:"1.20×2 + 3.00 = 5.40？注意收银员最终报价 4.80，说明有抹零/组合价，以原文 Ça fait quatre euros quatre-vingts 为准。"},
      {type:"主旨", q:"这是一段什么场景？", options:["餐厅点餐","超市结账","问路"], a:1, r:"出现 baguettes、pommes、付款等购物元素。"}
    ]
  },
  {
    id:"l3", title:"自我介绍（偶遇）", level:"A1", topic:"交际", speed:105,
    text:[
      {fr:"Salut, je m'appelle Marie. Je suis française, de Lyon.", zh:"嗨，我叫玛丽。我是法国人，来自里昂。"},
      {fr:"J'étudie le chinois à la fac, et j'aime beaucoup la culture chinoise.", zh:"我在大学学中文，也非常喜欢中国文化。"},
      {fr:"Enchantée ! Et toi, tu étudies quoi ?", zh:"很高兴认识你！你呢，你学什么？"}
    ],
    vocab:[
      {w:"français(e)", ipa:"/fʁɑ̃sɛ/", pos:"adj./n.", zh:"法国的/法国人"},
      {w:"étudier", ipa:"/etydije/", pos:"v.", zh:"学习"},
      {w:"culture", ipa:"/kyltyʁ/", pos:"n.f.", zh:"文化"},
      {w:"fac", ipa:"/fak/", pos:"n.f.", zh:"大学(faculté 简称)"}
    ],
    quiz:[
      {type:"细节", q:"Marie 来自哪里？", options:["巴黎","里昂","中国"], a:1, r:"Je suis... de Lyon。"},
      {type:"细节", q:"Marie 在大学学什么？", options:["法语","中文","文化"], a:1, r:"J'étudie le chinois。"},
      {type:"推断", q:"对话双方关系是？", options:["师生","刚认识的同龄人","医患"], a:1, r:"用 tu、Salut、Enchantée，属非正式初次相识。"}
    ]
  },
  {
    id:"l4", title:"租房咨询", level:"A2", topic:"住房", speed:140,
    text:[
      {fr:"Bonjour, je m'appelle Thomas. Je cherche un appartement près du centre, avec un budget de sept cents euros par mois.", zh:"您好，我叫托马斯。我想在市中心附近找房，预算每月 700 欧。"},
      {fr:"Il y a un studio de trente mètres carrés, à six cent cinquante euros. Les charges sont comprises.", zh:"有一套 30 平的单间，650 欧。杂费包含在内。"},
      {fr:"Parfait. Puis-je visiter samedi matin ?", zh:"太好了。我周六上午能看房吗？"}
    ],
    vocab:[
      {w:"appartement", ipa:"/apaʁtəmɑ̃/", pos:"n.m.", zh:"公寓"},
      {w:"budget", ipa:"/by(d)ʒɛ/", pos:"n.m.", zh:"预算"},
      {w:"studio", ipa:"/stydjo/", pos:"n.m.", zh:"单间公寓"},
      {w:"charges comprises", ipa:"/ʃaʁʒ kɔ̃pʁiz/", pos:"loc.", zh:"含杂费"},
      {w:"visiter", ipa:"/vizite/", pos:"v.", zh:"看（房）"}
    ],
    quiz:[
      {type:"细节", q:"托马斯的月预算是？", options:["650 欧","700 欧","750 欧"], a:1, r:"un budget de sept cents euros。"},
      {type:"细节", q:"那套单间的租金与杂费？", options:["650 欧含杂费","650 欧不含杂费","700 欧含杂费"], a:0, r:"à six cent cinquante euros. Les charges sont comprises。"},
      {type:"推断", q:"托马斯对这套房的态度？", options:["拒绝","满意并约看房","犹豫"], a:1, r:"Parfait 后立刻约 samedi matin 看房。"}
    ]
  },
  {
    id:"l5", title:"电话留言", level:"A2", topic:"电话", speed:150,
    text:[
      {fr:"Bonjour, c'est Julie. Je ne suis pas là pour le moment.", zh:"您好，我是朱莉。我现在不在。"},
      {fr:"Laissez un message après le bip, et je vous rappellerai.", zh:"请在‘哔’声后留言，我会回电给您。"},
      {fr:"Merci beaucoup, à bientôt !", zh:"非常感谢，回头见！"}
    ],
    vocab:[
      {w:"message", ipa:"/mɛsaʒ/", pos:"n.m.", zh:"留言/信息"},
      {w:"bip", ipa:"/bip/", pos:"n.m.", zh:"（提示）哔声"},
      {w:"rappeler", ipa:"/ʁaple/", pos:"v.", zh:"回电"}
    ],
    quiz:[
      {type:"主旨", q:"这是一段？", options:["现场对话","电话答录留言","广播通知"], a:1, r:"Je ne suis pas là + laissez un message 是典型留言。"},
      {type:"细节", q:"朱莉请对方做什么？", options:["直接挂断","哔声后留言","发短信"], a:1, r:"Laissez un message après le bip。"},
      {type:"推断", q:"‘je vous rappellerai’ 表示？", options:["她会回电","她不会回电","请对方回电"], a:0, r:"rappeler 的将来时，意思是‘我会给您回电话’。"}
    ]
  },
  {
    id:"l6", title:"旅行的意义（观点）", level:"B1", topic:"观点表达", speed:175,
    text:[
      {fr:"Le voyage, c'est une ouverture au monde. Selon moi, partir à l'étranger permet de comprendre d'autres cultures.", zh:"旅行是对世界的一次敞开。在我看来，出国能让人理解其他文化。"},
      {fr:"Pourtant, le tourisme de masse détruit parfois les sites protégés et les habitudes locales.", zh:"然而，大众旅游有时破坏了受保护景点与当地习俗。"},
      {fr:"Il faut donc voyager avec respect, et privilégier des formes de tourisme durable.", zh:"因此应当怀着尊重去旅行，并优先选择可持续旅游形式。"}
    ],
    vocab:[
      {w:"ouverture", ipa:"/uvɛʁtyʁ/", pos:"n.f.", zh:"开放/开启"},
      {w:"étranger", ipa:"/etʁɑ̃ʒe/", pos:"n.m./adj.", zh:"外国"},
      {w:"tourisme de masse", ipa:"/tuʁism də mas/", pos:"loc.", zh:"大众旅游"},
      {w:"protégé", ipa:"/pʁɔteʒe/", pos:"adj.", zh:"受保护的"},
      {w:"durable", ipa:"/dyʁabl/", pos:"adj.", zh:"可持续的"}
    ],
    quiz:[
      {type:"主旨", q:"作者的主要观点是？", options:["反对一切旅行","旅行有正面价值但需负责任","只应去发达国家"], a:1, r:"先肯定理解文化，再指出大众旅游破坏，最后主张负责任旅行。"},
      {type:"细节", q:"作者认为大众旅游的问题？", options:["太贵","破坏景点与当地习俗","不安全"], a:1, r:"détruit les sites protégés et les habitudes locales。"},
      {type:"推断", q:"‘voyager avec respect’ 暗示？", options:["随意拍照","尊重当地文化与环境","只住五星酒店"], a:1, r:"与‘可持续旅游’并列，强调对当地与环境的尊重。"}
    ]
  }
];
