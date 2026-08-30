/* 模块七/八/九 内容底座：12 个情景板块 + 单词 + 句子
 * 单词 word: {fr, ipa, zh, lv, src}  src=教材出处(册/课)
 * 句子 sent: {fr, ipa, zh, lv, src}
 * 教材出处主要对标《你好！法语》《走遍法国》等主流教材课次。
 */
window.FRV = {
  scenarios: [
    {id:"salut",    name:"问候与介绍", fr:"Salutations et présentations", emoji:"👋", level:"A1", desc:"见面、称呼、自我介绍与寒暄，一切对话的起点。"},
    {id:"famille",  name:"家庭与亲友", fr:"Famille et amis",              emoji:"👨‍👩‍👧", level:"A1", desc:"家庭成员、人际关系与日常相处表达。"},
    {id:"repas",    name:"就餐",       fr:"Au restaurant / À table",       emoji:"🍽️", level:"A1", desc:"点餐、评价味道、付账与餐桌礼貌用语。"},
    {id:"shopping", name:"购物",       fr:"Faire du shopping",             emoji:"🛍️", level:"A1", desc:"询价、试穿、议价与结账的实用表达。"},
    {id:"transport",name:"交通出行",   fr:"Se déplacer",                   emoji:"🚇", level:"A1", desc:"问路、乘车、买票与描述方位。"},
    {id:"logement", name:"住宿与租房", fr:"Logement",                     emoji:"🏠", level:"A2", desc:"看房、描述户型、谈租金与家具家电。"},
    {id:"temps",    name:"时间与天气", fr:"Temps et météo",               emoji:"🌤️", level:"A1", desc:"日期、时刻、星期与天气描述。"},
    {id:"sante",    name:"健康与就医", fr:"Santé",                        emoji:"🩺", level:"A2", desc:"身体部位、症状描述与看病买药。"},
    {id:"telephone",name:"电话与通讯", fr:"Téléphone et communication",   emoji:"📞", level:"A1", desc:"打电话、留言、约时间与网络沟通。"},
    {id:"travail",  name:"工作与职业", fr:"Travail et professions",        emoji:"💼", level:"A2", desc:"职业名称、工作内容、求职与会议。"},
    {id:"voyage",   name:"旅行与休闲", fr:"Voyages et loisirs",           emoji:"✈️", level:"A2", desc:"订票、入住、游玩与表达旅行感受。"},
    {id:"etudes",   name:"学习校园",   fr:"Études et campus",             emoji:"🎓", level:"A1", desc:"课堂、科目、作业与校园生活。"}
  ],
  data: {
    /* ===== 1. 问候与介绍 ===== */
    salut: {
      words:[
        {fr:"bonjour", ipa:"[bɔ̃ʒuʁ]", zh:"你好（白天）", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"bonsoir", ipa:"[bɔ̃swaʁ]", zh:"晚上好", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"salut", ipa:"[saly]", zh:"嗨 / 再见（熟人）", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"au revoir", ipa:"[o ʁəvwaʁ]", zh:"再见", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"merci", ipa:"[mɛʁsi]", zh:"谢谢", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"madame", ipa:"[madam]", zh:"女士（尊称）", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"monsieur", ipa:"[məsjø]", zh:"先生", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"mademoiselle", ipa:"[madmwazɛl]", zh:"小姐", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"je", ipa:"[ʒə]", zh:"我", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"m'appelle", ipa:"[apɛl]", zh:"叫（我叫…）", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"comment", ipa:"[kɔmɑ̃]", zh:"怎样", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"aller", ipa:"[ale]", zh:"去 / 身体好", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"bien", ipa:"[bjɛ̃]", zh:"好", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"toi", ipa:"[twa]", zh:"你（重读）", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"oui", ipa:"[wi]", zh:"是", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"non", ipa:"[nɔ̃]", zh:"不", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"français(e)", ipa:"[fʁɑ̃sɛ]", zh:"法国的 / 法国人", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"chinois(e)", ipa:"[ʃinwa]", zh:"中国的 / 中国人", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"étudiant(e)", ipa:"[etydjɑ̃]", zh:"大学生", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"professeur", ipa:"[pʁɔfesœʁ]", zh:"老师 / 教授", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"enchanté(e)", ipa:"[ɑ̃ʃɑ̃te]", zh:"很高兴认识你", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"s'il vous plaît", ipa:"[s‿il vu plɛ]", zh:"请（敬称）", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"de rien", ipa:"[də ʁjɛ̃]", zh:"不客气", lv:"A1", src:"你好！法语1·第1课"}
      ],
      sentences:[
        {fr:"Bonjour, madame. Comment allez-vous ?", ipa:"[bɔ̃ʒuʁ madam kɔmɑ̃ tale vu]", zh:"您好，女士。您身体好吗？", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"Je m'appelle Marie, enchantée.", ipa:"[ʒə mapɛl maʁi ɑ̃ʃɑ̃te]", zh:"我叫玛丽，很高兴认识你。", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"Ça va ? Ça va bien, merci.", ipa:"[sa va sa va bjɛ̃ mɛʁsi]", zh:"还好吗？挺好的，谢谢。", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"Je suis étudiant, et toi ?", ipa:"[ʒə sɥi etydjɑ̃ e twa]", zh:"我是学生，你呢？", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"Au revoir, à demain !", ipa:"[o ʁəvwaʁ a dəmɛ̃]", zh:"再见，明天见！", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"Enchanté de faire votre connaissance.", ipa:"[ɑ̃ʃɑ̃te də fɛʁ vɔtʁ kɔnɛsɑ̃s]", zh:"很高兴认识您。", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"Comment t'appelles-tu ?", ipa:"[kɔmɑ̃ tapɛl ty]", zh:"你叫什么名字？", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"Je suis chinois, de Pékin.", ipa:"[ʒə sɥi ʃinwa də pekɛ̃]", zh:"我是中国人，来自北京。", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"Merci beaucoup, au revoir !", ipa:"[mɛʁsi boku o ʁəvwaʁ]", zh:"非常感谢，再见！", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"S'il vous plaît, parlez lentement.", ipa:"[s‿il vu plɛ paʁle lɑ̃tmɑ̃]", zh:"请您说慢一点。", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"De rien, à bientôt.", ipa:"[də ʁjɛ̃ a bjɛ̃to]", zh:"不客气，回头见。", lv:"A1", src:"你好！法语1·第1课"},
        {fr:"Je vous présente mon ami Paul.", ipa:"[ʒə vu pʁezɑ̃t mɔ̃ ami pɔl]", zh:"我向您介绍我的朋友保罗。", lv:"A1", src:"你好！法语1·第2课"}
      ]
    },
    /* ===== 2. 家庭与亲友 ===== */
    famille: {
      words:[
        {fr:"famille", ipa:"[famij]", zh:"家庭", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"père", ipa:"[pɛʁ]", zh:"父亲", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"mère", ipa:"[mɛʁ]", zh:"母亲", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"frère", ipa:"[fʁɛʁ]", zh:"兄弟", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"sœur", ipa:"[sœʁ]", zh:"姐妹", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"fils", ipa:"[fis]", zh:"儿子", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"fille", ipa:"[fij]", zh:"女儿", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"grand-père", ipa:"[ɡʁɑ̃ pɛʁ]", zh:"祖父 / 外祖父", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"grand-mère", ipa:"[ɡʁɑ̃ mɛʁ]", zh:"祖母 / 外祖母", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"ami(e)", ipa:"[ami]", zh:"朋友", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"enfant", ipa:"[ɑ̃fɑ̃]", zh:"孩子", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"mari", ipa:"[maʁi]", zh:"丈夫", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"femme", ipa:"[fam]", zh:"妻子 / 女人", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"avoir", ipa:"[avwaʁ]", zh:"有", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"habiter", ipa:"[abite]", zh:"居住", lv:"A1", src:"你好！法语1·第12课"},
        {fr:"ensemble", ipa:"[ɑ̃sɑ̃bl]", zh:"一起", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"petit(e)", ipa:"[pəti]", zh:"小的", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"grand(e)", ipa:"[ɡʁɑ̃d]", zh:"大的", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"ami", ipa:"[ami]", zh:"男朋友", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"nombreux", ipa:"[nɔ̃bʁø]", zh:"众多的", lv:"A2", src:"你好！法语1·第6课"}
      ],
      sentences:[
        {fr:"Je suis fils unique, j'ai une sœur.", ipa:"[ʒə sɥi fis ynik ʒe yːn sœʁ]", zh:"我是独子，我有一个姐姐。", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"Ma mère est professeur, mon père est médecin.", ipa:"[ma mɛʁ ɛ pʁɔfesœʁ mɔ̃ pɛʁ ɛ medsɛ̃]", zh:"我妈妈是老师，爸爸是医生。", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"J'habite avec ma famille à Pékin.", ipa:"[ʒabite avɛk ma famij a pekɛ̃]", zh:"我和家人住在北京。", lv:"A1", src:"你好！法语1·第12课"},
        {fr:"Nous avons deux grands enfants.", ipa:"[nu zavɔ̃ dø ɡʁɑ̃ zɑ̃fɑ̃]", zh:"我们有两个成年的孩子。", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"Mon grand-père a soixante-dix ans.", ipa:"[mɔ̃ ɡʁɑ̃ pɛʁ a swasɑ̃t dis ɑ̃]", zh:"我爷爷七十岁。", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"Elle présente sa famille à ses amis.", ipa:"[ɛl pʁezɑ̃t sa famij a se zami]", zh:"她把家人介绍给朋友们。", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"On dîne ensemble le dimanche.", ipa:"[ɔ̃ din ɑ̃sɑ̃bl lə dimɑ̃ʃ]", zh:"我们星期天一起吃饭。", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"Ma petite sœur aime beaucoup les chats.", ipa:"[ma pətit sœʁ ɛm boku le ʃa]", zh:"我小妹非常喜欢猫。", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"Ils sont mariés depuis dix ans.", ipa:"[il sɔ̃ maʁje dəpɥi dis ɑ̃]", zh:"他们结婚十年了。", lv:"A2", src:"你好！法语1·第6课"},
        {fr:"J'ai beaucoup d'amis à l'université.", ipa:"[ʒe boku dami a lynivɛʁsite]", zh:"我在大学有很多朋友。", lv:"A1", src:"你好！法语1·第6课"},
        {fr:"Ma grand-mère habite à la campagne.", ipa:"[ma ɡʁɑ̃ mɛʁ abit a la kɑ̃paɲ]", zh:"我奶奶住在乡下。", lv:"A1", src:"你好！法语1·第12课"},
        {fr:"Notre famille est nombreuse et heureuse.", ipa:"[nɔtʁ famij ɛ nɔ̃brøz e øʁøz]", zh:"我们家人口多，也很幸福。", lv:"A2", src:"你好！法语1·第6课"}
      ]
    },
    /* ===== 3. 就餐 ===== */
    repas: {
      words:[
        {fr:"restaurant", ipa:"[ʁɛstɔʁɑ̃]", zh:"餐厅", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"menu", ipa:"[məny]", zh:"菜单 / 套餐", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"entrée", ipa:"[ɑ̃tʁe]", zh:"前菜", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"plat", ipa:"[pla]", zh:"主菜", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"boisson", ipa:"[bwasɔ̃]", zh:"饮料", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"eau", ipa:"[o]", zh:"水", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"vin", ipa:"[vɛ̃]", zh:"葡萄酒", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"pain", ipa:"[pɛ̃]", zh:"面包", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"viande", ipa:"[vjɑ̃d]", zh:"肉", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"poisson", ipa:"[pwasɔ̃]", zh:"鱼", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"légume", ipa:"[leɡym]", zh:"蔬菜", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"fromage", ipa:"[fʁɔmaʒ]", zh:"奶酪", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"déjeuner", ipa:"[deʒœne]", zh:"吃午饭", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"dîner", ipa:"[dine]", zh:"吃晚饭", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"commande", ipa:"[kɔmɑ̃d]", zh:"点餐 / 订单", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"addition", ipa:"[adisjɔ̃]", zh:"账单", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"serveur", ipa:"[sɛʁvœʁ]", zh:"男服务员", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"délicieux", ipa:"[delisjø]", zh:"美味的", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"appétit", ipa:"[apeti]", zh:"胃口", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"rapide", ipa:"[ʁapid]", zh:"快的", lv:"A1", src:"你好！法语1·第7课"}
      ],
      sentences:[
        {fr:"Je voudrais le menu, s'il vous plaît.", ipa:"[ʒə vudʁɛ lə məny s‿il vu plɛ]", zh:"我想要一份菜单，谢谢。", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"Qu'est-ce que vous recommandez ?", ipa:"[kɛs kə vu ʁəkɔmɑ̃de]", zh:"您推荐什么？", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"Comme plat, je prends le steak frites.", ipa:"[kɔm pla ʒə pʁɑ̃ lə stɛk fʁit]", zh:"主菜我要牛排薯条。", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"L'addition, s'il vous plaît.", ipa:"[ladisjɔ̃ s‿il vu plɛ]", zh:"买单，谢谢。", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"C'est très délicieux, merci beaucoup.", ipa:"[sɛ tʁɛ delisjø mɛʁsi boku]", zh:"非常美味，多谢。", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"On déjeune ensemble au restaurant ?", ipa:"[ɔ̃ deʒœn ɑ̃sɑ̃bl o ʁɛstɔʁɑ̃]", zh:"我们中午一起在餐厅吃吗？", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"Je suis végétarien, pas de viande.", ipa:"[ʒə sɥi veʒetaʁjɛ̃ pa də vjɑ̃d]", zh:"我是素食者，不要肉。", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"Un café et un croissant, s'il vous plaît.", ipa:"[œ̃ kafe e œ̃ kʁwasɑ̃ s‿il vu plɛ]", zh:"一杯咖啡和一个羊角面包，谢谢。", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"Bon appétit !", ipa:"[bɔ̃ apeti]", zh:"祝好胃口！", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"Est-ce que le service est compris ?", ipa:"[ɛs kə lə sɛʁvis ɛ kɔ̃pʁi]", zh:"服务费包含在内吗？", lv:"A2", src:"你好！法语1·第7课"},
        {fr:"Je paie par carte, c'est possible ?", ipa:"[ʒə pɛ paʁ kaʁt sɛ pɔsibl]", zh:"我刷卡付，可以吗？", lv:"A1", src:"你好！法语1·第7课"},
        {fr:"La serveuse apporte le plat rapidement.", ipa:"[la sɛʁvøz apɔʁt lə pla ʁapidmɑ̃]", zh:"女服务员很快把菜端上来。", lv:"A1", src:"你好！法语1·第7课"}
      ]
    },
    /* ===== 4. 购物 ===== */
    shopping: {
      words:[
        {fr:"magasin", ipa:"[maɡazɛ̃]", zh:"商店", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"acheter", ipa:"[aʃte]", zh:"买", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"vendre", ipa:"[vɑ̃dʁ]", zh:"卖", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"prix", ipa:"[pʁi]", zh:"价格", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"cher", ipa:"[ʃɛʁ]", zh:"贵的", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"pas cher", ipa:"[pa ʃɛʁ]", zh:"便宜的", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"euro", ipa:"[øʁo]", zh:"欧元", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"combien", ipa:"[kɔ̃bjɛ̃]", zh:"多少（钱）", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"robe", ipa:"[ʁɔb]", zh:"连衣裙", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"chemise", ipa:"[ʃəmiz]", zh:"衬衫", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"chaussures", ipa:"[ʃosyʁ]", zh:"鞋", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"taille", ipa:"[taj]", zh:"尺码", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"essayer", ipa:"[ɛsɛje]", zh:"试穿", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"couleur", ipa:"[kulœʁ]", zh:"颜色", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"soldes", ipa:"[sɔld]", zh:"打折 / 促销", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"caisse", ipa:"[kɛs]", zh:"收银台", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"sac", ipa:"[sak]", zh:"包", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"livre", ipa:"[livʁ]", zh:"书", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"porte-monnaie", ipa:"[pɔʁt mɔnɛ]", zh:"钱包", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"ouvert", ipa:"[uvɛʁ]", zh:"营业的 / 开着的", lv:"A1", src:"你好！法语1·第3课"}
      ],
      sentences:[
        {fr:"Combien coûte cette robe, s'il vous plaît ?", ipa:"[kɔ̃bjɛ̃ kut sɛt ʁɔb s‿il vu plɛ]", zh:"这条连衣裙多少钱？", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"Je voudrais essayer cette chemise en bleu.", ipa:"[ʒə vudʁɛ ɛsɛje sɛt ʃəmiz ɑ̃ blø]", zh:"我想试穿这件蓝色衬衫。", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"C'est trop cher, vous faites un meilleur prix ?", ipa:"[sɛ tʁo ʃɛʁ vu fɛt œ̃ mɛjœʁ pʁi]", zh:"太贵了，能便宜点吗？", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"La taille M me va bien.", ipa:"[la taj ɛm va bjɛ̃]", zh:"M 码我穿着合适。", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"Je paie à la caisse, merci.", ipa:"[ʒə pɛ a la kɛs mɛʁsi]", zh:"我在收银台付款，谢谢。", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"Le magasin est ouvert de neuf à dix-neuf.", ipa:"[lə maɡazɛ̃ ɛt uvɛʁ də nœf a diz nœf]", zh:"商店九点到十九点营业。", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"Il y a de bonnes soldes cette semaine.", ipa:"[il ja də bɔn sɔld sɛt sɛmɛn]", zh:"这周有大促销。", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"Je cherche un sac de couleur noire.", ipa:"[ʒə ʃɛʁʃ œ̃ sak də kulœʁ nwaʁ]", zh:"我在找黑色的包。", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"Ces chaussures sont très confortables.", ipa:"[se ʃosyʁ sɔ̃ tʁɛ kɔ̃fɔʁtabl]", zh:"这双鞋很舒服。", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"Je prends deux livres, ça fait dix euros.", ipa:"[ʒə pʁɑ̃ dø livʁ sa fɛ dis øʁo]", zh:"我要两本书，一共十欧。", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"Le porte-monnaie est en solde.", ipa:"[lə pɔʁt mɔnɛ ɛ ɑ̃ sɔld]", zh:"钱包在打折。", lv:"A1", src:"你好！法语1·第3课"},
        {fr:"Où sont les rayons des vêtements ?", ipa:"[u sɔ̃ le ʁɛjɔ̃ de vɛtmɑ̃]", zh:"服装区在哪儿？", lv:"A2", src:"你好！法语1·第3课"}
      ]
    },
    /* ===== 5. 交通出行 ===== */
    transport: {
      words:[
        {fr:"gare", ipa:"[ɡaʁ]", zh:"火车站", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"aéroport", ipa:"[aeʁɔpɔʁ]", zh:"机场", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"bus", ipa:"[bys]", zh:"公交车", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"métro", ipa:"[metʁo]", zh:"地铁", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"train", ipa:"[tʁɛ̃]", zh:"火车", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"avion", ipa:"[avjɔ̃]", zh:"飞机", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"arrêt", ipa:"[aʁɛ]", zh:"车站（停靠点）", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"billet", ipa:"[bijɛ]", zh:"票", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"rue", ipa:"[ʁy]", zh:"街道", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"loin", ipa:"[lwɛ̃]", zh:"远", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"près", ipa:"[pʁɛ]", zh:"近", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"à droite", ipa:"[a dʁwat]", zh:"向右", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"à gauche", ipa:"[a ɡoʃ]", zh:"向左", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"tout droit", ipa:"[tu dʁwa]", zh:"直走", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"carte", ipa:"[kaʁt]", zh:"地图 / 卡", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"station", ipa:"[stasjɔ̃]", zh:"（交通）站", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"piéton", ipa:"[pjetɔ̃]", zh:"行人", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"vitesse", ipa:"[vitɛs]", zh:"速度", lv:"A2", src:"你好！法语1·第4课"},
        {fr:"départ", ipa:"[depaʁ]", zh:"出发 / 始发", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"arrivée", ipa:"[aʁive]", zh:"到达", lv:"A1", src:"你好！法语1·第4课"}
      ],
      sentences:[
        {fr:"Excusez-moi, où est la gare, s'il vous plaît ?", ipa:"[ɛkskyze mwa u ɛ la ɡaʁ s‿il vu plɛ]", zh:"打扰一下，火车站在哪儿？", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"Prenez le métro ligne deux, station République.", ipa:"[pʁəne lə metʁo liɲ dø stasjɔ̃ ʁepyblik]", zh:"乘二号线地铁，共和国站。", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"Le train part à neuf heures.", ipa:"[lə tʁɛ̃ paʁ a nœf œʁ]", zh:"火车九点出发。", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"L'aéroport est loin du centre.", ipa:"[laeʁɔpɔʁ ɛ lwɛ̃ dy sɑ̃tʁ]", zh:"机场离市中心很远。", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"Continuez tout droit, puis à gauche.", ipa:"[kɔ̃tinye tu dʁwa pɥi a ɡoʃ]", zh:"一直走，然后左转。", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"Un billet pour Paris, s'il vous plaît.", ipa:"[œ̃ bijɛ puʁ paʁi s‿il vu plɛ]", zh:"一张去巴黎的票，谢谢。", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"L'arrêt de bus est juste en face.", ipa:"[laʁɛ də bys ɛ ʒyst ɑ̃ fas]", zh:"公交站就在对面。", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"C'est à dix minutes à pied.", ipa:"[sɛ a diz minyt a pje]", zh:"走路十分钟就到。", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"Je rate mon train, il est en retard.", ipa:"[ʒə ʁat mɔ̃ tʁɛ̃ il ɛ ɑ̃ ʁətaʁ]", zh:"我要误火车了，它晚点了。", lv:"A2", src:"你好！法语1·第4课"},
        {fr:"La gare est près de la bibliothèque.", ipa:"[la ɡaʁ ɛ pʁɛ də la bibljotɛk]", zh:"火车站在图书馆附近。", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"On prend un taxi à l'arrivée ?", ipa:"[ɔ̃ pʁɑ̃ œ̃ taksi a laʁive]", zh:"到了之后我们打车吗？", lv:"A1", src:"你好！法语1·第4课"},
        {fr:"Le métro est plus rapide que la voiture.", ipa:"[lə metʁo ɛ ply ʁapid kə la vwatyʁ]", zh:"地铁比开车更快。", lv:"A2", src:"你好！法语1·第4课"}
      ]
    },
    /* ===== 6. 住宿与租房 ===== */
    logement: {
      words:[
        {fr:"appartement", ipa:"[apaʁtəmɑ̃]", zh:"公寓", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"maison", ipa:"[mɛzɔ̃]", zh:"房子", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"studio", ipa:"[stydjo]", zh:"单间公寓", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"chambre", ipa:"[ʃɑ̃bʁ]", zh:"房间 / 卧室", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"cuisine", ipa:"[kɥizin]", zh:"厨房", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"salle de bains", ipa:"[sal də bɛ̃]", zh:"浴室", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"louer", ipa:"[lwe]", zh:"租", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"loyer", ipa:"[lwaje]", zh:"租金", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"propriétaire", ipa:"[pʁɔpʁijetɛʁ]", zh:"房东", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"meublé", ipa:"[møble]", zh:"带家具的", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"budget", ipa:"[by(d)ʒɛ]", zh:"预算", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"quartier", ipa:"[kaʁtje]", zh:"街区", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"calme", ipa:"[kalm]", zh:"安静的", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"voisin", ipa:"[vwazɛ̃]", zh:"邻居", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"ascenseur", ipa:"[asɑ̃sœʁ]", zh:"电梯", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"balcon", ipa:"[balkɔ̃]", zh:"阳台", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"chauffage", ipa:"[ʃofaʒ]", zh:"暖气", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"bail", ipa:"[baj]", zh:"租约", lv:"B1", src:"你好！法语2·第1课"},
        {fr:"charges", ipa:"[ʃaʁʒ]", zh:"杂费", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"visiter", ipa:"[vizite]", zh:"看（房）", lv:"A2", src:"你好！法语1·第12课"}
      ],
      sentences:[
        {fr:"Je cherche un appartement près du centre.", ipa:"[ʒə ʃɛʁʃ œ̃ apaʁtəmɑ̃ pʁɛ dy sɑ̃tʁ]", zh:"我想在市中心附近找套公寓。", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"Quel est le loyer par mois ?", ipa:"[kɛl ɛ lə lwaje paʁ mwa]", zh:"月租金是多少？", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"C'est un studio meublé de trente mètres.", ipa:"[sɛt œ̃ stydjo møble də tʁɑ̃t mɛtʁ]", zh:"这是个三十平米带家具的单间。", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"Les charges sont comprises dans le prix.", ipa:"[le ʃaʁʒ sɔ̃ kɔ̃pʁiz dɑ̃ lə pʁi]", zh:"杂费包含在价格里。", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"Le quartier est calme et sûr.", ipa:"[lə kaʁtje ɛ kalm e syʁ]", zh:"这个街区安静又安全。", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"Puis-je visiter l'appartement samedi ?", ipa:"[pɥi ʒə vizite lapaʁtəmɑ̃ samdi]", zh:"我周六能看房吗？", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"Il y a un ascenseur et un balcon.", ipa:"[il ja œ̃ nasɑ̃sœʁ e œ̃ balkɔ̃]", zh:"有电梯和阳台。", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"Le chauffage fonctionne bien en hiver.", ipa:"[lə ʃofaʒ fɔ̃ksjɔn bjɛ̃ ɑ̃ ivɛʁ]", zh:"冬天暖气很管用。", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"Mon voisin est très sympathique.", ipa:"[mɔ̃ vwazɛ̃ ɛ tʁɛ sɛ̃patik]", zh:"我的邻居很友善。", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"Je signe le bail pour un an.", ipa:"[ʒə siɲ lə baj puʁ œ̃ nɑ̃]", zh:"我签了一年的租约。", lv:"B1", src:"你好！法语2·第1课"},
        {fr:"La cuisine est petite mais fonctionnelle.", ipa:"[la kɥizin ɛ pətit mɛ fɔ̃ksjɔnɛl]", zh:"厨房小但实用。", lv:"A2", src:"你好！法语1·第12课"},
        {fr:"Le propriétaire demande deux mois de caution.", ipa:"[lə pʁɔpʁijetɛʁ dəmɑ̃d dø mwa də kosjɔ̃]", zh:"房东要求押二个月。", lv:"B1", src:"你好！法语2·第1课"}
      ]
    },
    /* ===== 7. 时间与天气 ===== */
    temps: {
      words:[
        {fr:"aujourd'hui", ipa:"[oʒuʁdɥi]", zh:"今天", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"demain", ipa:"[dəmɛ̃]", zh:"明天", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"hier", ipa:"[jɛʁ]", zh:"昨天", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"matin", ipa:"[matɛ̃]", zh:"早上", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"après-midi", ipa:"[apʁɛ midi]", zh:"下午", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"soir", ipa:"[swaʁ]", zh:"晚上", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"heure", ipa:"[œʁ]", zh:"小时 / 钟点", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"lundi", ipa:"[lœ̃di]", zh:"星期一", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"week-end", ipa:"[wikɛnd]", zh:"周末", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"beau", ipa:"[bo]", zh:"晴朗的", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"temps", ipa:"[tɑ̃]", zh:"天气 / 时间", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"pluie", ipa:"[plɥi]", zh:"雨", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"neige", ipa:"[nɛʒ]", zh:"雪", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"vent", ipa:"[vɑ̃]", zh:"风", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"froid", ipa:"[fʁwa]", zh:"冷的", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"chaud", ipa:"[ʃo]", zh:"热的", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"soleil", ipa:"[sɔlɛj]", zh:"太阳", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"nuageux", ipa:"[nɥaʒø]", zh:"多云的", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"date", ipa:"[dat]", zh:"日期", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"mois", ipa:"[mwa]", zh:"月", lv:"A1", src:"你好！法语1·第5课"}
      ],
      sentences:[
        {fr:"Quel jour sommes-nous aujourd'hui ?", ipa:"[kɛl ʒuʁ sɔm ny oʒuʁdɥi]", zh:"今天星期几？", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"Il fait beau, on va se promener.", ipa:"[il fɛ bo ɔ̃ va sə pʁɔmne]", zh:"天气好，我们去散步。", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"Demain, il va pleuvoir à Paris.", ipa:"[dəmɛ̃ il va pløvwaʁ a paʁi]", zh:"明天巴黎会下雨。", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"Le cours commence à neuf heures.", ipa:"[lə kuʁ kɔmɑ̃s a nœf œʁ]", zh:"课九点开始。", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"Quelle est la date d'aujourd'hui ?", ipa:"[kɛl ɛ la dat oʒuʁdɥi]", zh:"今天几号？", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"Le week-end, je dors tard.", ipa:"[lə wikɛnd ʒə dɔʁ taʁ]", zh:"周末我睡懒觉。", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"Il neige beaucoup en hiver.", ipa:"[il nɛʒ boku ɑ̃ ivɛʁ]", zh:"冬天下很多雪。", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"Hier, il faisait froid et venteux.", ipa:"[jɛʁ il fɛz fʁwa e vɑ̃tø]", zh:"昨天又冷又刮风。", lv:"A2", src:"你好！法语1·第5课"},
        {fr:"Le soleil se lève à six heures.", ipa:"[lə sɔlɛj sə lɛv a sis œʁ]", zh:"太阳六点升起。", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"En été, il fait chaud et ensoleillé.", ipa:"[ɑ̃ ete il fɛ ʃo e ɑ̃sɔlɛje]", zh:"夏天又热又晴朗。", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"Je suis libre mardi après-midi.", ipa:"[ʒə sɥi libʁ mardi apʁɛ midi]", zh:"我周二下午有空。", lv:"A1", src:"你好！法语1·第5课"},
        {fr:"Quel temps fera-t-il ce week-end ?", ipa:"[kɛl tɑ̃ fʁa til sə wikɛnd]", zh:"这个周末天气如何？", lv:"A1", src:"你好！法语1·第5课"}
      ]
    },
    /* ===== 8. 健康与就医 ===== */
    sante: {
      words:[
        {fr:"médecin", ipa:"[mɛdsɛ̃]", zh:"医生", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"docteur", ipa:"[dɔktœʁ]", zh:"医生（称呼）", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"hôpital", ipa:"[opital]", zh:"医院", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"malade", ipa:"[malad]", zh:"生病的", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"tête", ipa:"[tɛt]", zh:"头", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"dos", ipa:"[do]", zh:"背", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"ventre", ipa:"[vɑ̃tʁ]", zh:"肚子", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"mal", ipa:"[mal]", zh:"痛 / 坏", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"fièvre", ipa:"[fjɛvʁ]", zh:"发烧", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"toux", ipa:"[tu]", zh:"咳嗽", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"médicament", ipa:"[medikamɑ̃]", zh:"药", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"ordonnance", ipa:"[ɔʁdɔnɑ̃s]", zh:"处方", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"pharmacie", ipa:"[faʁmasi]", zh:"药店", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"rendez-vous", ipa:"[ʁɑ̃devu]", zh:"预约", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"rhume", ipa:"[ʁym]", zh:"感冒", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"blessure", ipa:"[blɛsyʁ]", zh:"伤口", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"repos", ipa:"[ʁəpo]", zh:"休息", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"santé", ipa:"[sɑ̃te]", zh:"健康", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"gorge", ipa:"[ɡɔʁʒ]", zh:"喉咙", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"prendre", ipa:"[pʁɑ̃dʁ]", zh:"吃（药）/ 拿", lv:"A2", src:"你好！法语2·第5课"}
      ],
      sentences:[
        {fr:"Je ne me sens pas bien, j'ai mal à la tête.", ipa:"[ʒə nə mə sɑ̃ pa bjɛ̃ ʒe mal a la tɛt]", zh:"我不舒服，头疼。", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"Il faut prendre rendez-vous chez le médecin.", ipa:"[il fo pʁɑ̃dʁ ʁɑ̃devu ʃe lə mɛdsɛ̃]", zh:"得预约看医生。", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"J'ai de la fièvre et je tousse beaucoup.", ipa:"[ʒe də la fjɛvʁ e ʒə tus boku]", zh:"我发烧，而且咳得厉害。", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"Le médecin m'a donné une ordonnance.", ipa:"[lə mɛdsɛ̃ ma dɔne yn ɔʁdɔnɑ̃s]", zh:"医生给我开了处方。", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"Je vais à la pharmacie acheter des médicaments.", ipa:"[ʒə vɛ za la faʁmasi aʃte de medikamɑ̃]", zh:"我去药店买药。", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"Prenez ce médicament trois fois par jour.", ipa:"[pʁəne sə medikamɑ̃ tʁwa fwa paʁ ʒuʁ]", zh:"这药每天三次。", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"Il est parti aux urgences de l'hôpital.", ipa:"[il ɛ paʁti o zyʁʒɑ̃s də lopital]", zh:"他去了医院急诊。", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"Reposez-vous bien et buvez de l'eau.", ipa:"[ʁəpoze vu bjɛ̃ e byve də lo]", zh:"好好休息，多喝点水。", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"Ma gorge me fait mal depuis hier.", ipa:"[ma ɡɔʁʒ mə fɛ mal dəpɥi jɛʁ]", zh:"我从昨天起喉咙痛。", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"C'est une simple grippe, pas grave.", ipa:"[sɛt yn sɛ̃pl ɡʁip pa ɡʁav]", zh:"只是普通感冒，不严重。", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"Le pansement protège la blessure.", ipa:"[lə pɑ̃smɑ̃ pʁɔtɛʒ la blɛsyʁ]", zh:"绷带保护伤口。", lv:"A2", src:"你好！法语2·第5课"},
        {fr:"La santé est la chose la plus importante.", ipa:"[la sɑ̃te ɛ la ʃoz la ply zɛ̃pɔʁtɑ̃t]", zh:"健康是最重要的事。", lv:"B1", src:"你好！法语2·第5课"}
      ]
    },
    /* ===== 9. 电话与通讯 ===== */
    telephone: {
      words:[
        {fr:"téléphone", ipa:"[telefɔn]", zh:"电话", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"appeler", ipa:"[aple]", zh:"打电话", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"message", ipa:"[mɛsaʒ]", zh:"短信 / 留言", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"porter", ipa:"[pɔʁte]", zh:"携带", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"joindre", ipa:"[ʒwɛ̃dʁ]", zh:"联系上", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"occupé", ipa:"[ɔkype]", zh:"占线的 / 忙的", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"rappeler", ipa:"[ʁaple]", zh:"回电", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"ligne", ipa:"[liɲ]", zh:"线路", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"répondeur", ipa:"[ʁepɔ̃dœʁ]", zh:"答录机", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"texte", ipa:"[tɛkst]", zh:"短信", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"e-mail", ipa:"[imɛl]", zh:"电子邮件", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"adresse", ipa:"[adʁɛs]", zh:"地址", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"numéro", ipa:"[nymero]", zh:"号码", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"immédiatement", ipa:"[immedjamɑ̃]", zh:"立刻", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"sonner", ipa:"[sɔne]", zh:"响（铃）", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"réseau", ipa:"[ʁezo]", zh:"网络", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"contact", ipa:"[kɔ̃takt]", zh:"联系人", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"compris", ipa:"[kɔ̃pʁi]", zh:"听懂的 / 包含", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"demander", ipa:"[dəmɑ̃de]", zh:"请求 / 问", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"donner", ipa:"[dɔne]", zh:"给", lv:"A1", src:"你好！法语1·第8课"}
      ],
      sentences:[
        {fr:"Bonjour, je voudrais parler à Paul.", ipa:"[bɔ̃ʒuʁ ʒə vudʁɛ paʁle a pɔl]", zh:"您好，我想和保罗通话。", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"La ligne est occupée, rappelle plus tard.", ipa:"[la liɲ ɛt ɔkype ʁapɛl ply taʁ]", zh:"占线，晚点再打。", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"Laissez un message après le bip.", ipa:"[lɛse œ̃ mɛsaʒ apʁɛ lə bip]", zh:"请在‘哔’声后留言。", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"Je t'envoie un message tout de suite.", ipa:"[ʒə tɑ̃vwa œ̃ mɛsaʒ tu də sɥit]", zh:"我马上给你发消息。", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"Quel est ton numéro de téléphone ?", ipa:"[kɛl ɛ tɔ̃ nymero də telefɔn]", zh:"你的电话号码是多少？", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"Il m'a laissé son adresse e-mail.", ipa:"[il ma lɛse sɔ̃n adʁɛs imɛl]", zh:"他留了电子邮箱给我。", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"Je ne peux pas te joindre sur ton portable.", ipa:"[ʒə nə pø pa tə ʒwɛ̃dʁ syʁ tɔ̃ pɔʁtatil]", zh:"我打不通你手机。", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"Rappelle-moi dès que tu es libre.", ipa:"[ʁapɛl mwa dɛ kə ty ɛ libʁ]", zh:"你一有空就回我电话。", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"Mon téléphone ne sonne plus.", ipa:"[mɔ̃ telefɔn nə sɔn ply]", zh:"我的手机不响了。", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"Envoie-moi le fichier par e-mail.", ipa:"[ɑ̃vwa mwa lə fiʃje paʁ imɛl]", zh:"把文件用邮件发我。", lv:"A1", src:"你好！法语1·第8课"},
        {fr:"Le réseau est mauvais ici, je coupe.", ipa:"[lə ʁezo ɛ movɛ isi ʒə kup]", zh:"这里信号差，我先挂了。", lv:"A2", src:"你好！法语1·第8课"},
        {fr:"Donne-moi ton numéro, je t'appelle.", ipa:"[dɔn mwa tɔ̃ nymero ʒə tapɛl]", zh:"给我号码，我打给你。", lv:"A1", src:"你好！法语1·第8课"}
      ]
    },
    /* ===== 10. 工作与职业 ===== */
    travail: {
      words:[
        {fr:"travail", ipa:"[tʁavaj]", zh:"工作", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"travailler", ipa:"[tʁavaje]", zh:"工作（动词）", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"emploi", ipa:"[ɑ̃plwa]", zh:"职位 / 就业", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"bureau", ipa:"[byʁo]", zh:"办公室", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"collègue", ipa:"[kɔlɛɡ]", zh:"同事", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"patron", ipa:"[patʁɔ̃]", zh:"老板", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"salaire", ipa:"[salɛʁ]", zh:"工资", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"réunion", ipa:"[ʁeynjɔ̃]", zh:"会议", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"client", ipa:"[klijɑ̃]", zh:"客户", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"lettre", ipa:"[lɛtʁ]", zh:"信", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"candidature", ipa:"[kɑ̃didatyr]", zh:"求职 / 申请", lv:"B1", src:"你好！法语2·第3课"},
        {fr:"expérience", ipa:"[ɛkspeʁjɑ̃s]", zh:"经验", lv:"B1", src:"你好！法语2·第3课"},
        {fr:"compétence", ipa:"[kɔ̃petɑ̃s]", zh:"能力", lv:"B1", src:"你好！法语2·第3课"},
        {fr:"horaires", ipa:"[ɔʁɛʁ]", zh:"作息时间", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"stress", ipa:"[stʁɛs]", zh:"压力", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"projet", ipa:"[pʁɔʒɛ]", zh:"项目", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"congé", ipa:"[kɔ̃ʒe]", zh:"假期 / 休假", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"responsable", ipa:"[ʁɛspɔ̃sabl]", zh:"负责的 / 主管", lv:"B1", src:"你好！法语2·第3课"},
        {fr:"formation", ipa:"[fɔʁmasjɔ̃]", zh:"培训", lv:"B1", src:"你好！法语2·第3课"},
        {fr:"entreprise", ipa:"[ɑ̃tʁəpʁiz]", zh:"企业", lv:"B1", src:"你好！法语2·第3课"}
      ],
      sentences:[
        {fr:"Je travaille dans une entreprise à Lyon.", ipa:"[ʒə tʁavaj dɑ̃z ynn ɑ̃tʁəpʁiz a ljɔ̃]", zh:"我在里昂的一家企业工作。", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"Mon bureau est au cinquième étage.", ipa:"[mɔ̃ byʁo ɛ o sɛ̃kjɛm etaʒ]", zh:"我的办公室在五楼。", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"J'ai une réunion importante à quatorze heures.", ipa:"[ʒe yn ʁeynjɔ̃ ɛ̃pɔʁtɑ̃t a katzɔʁz œʁ]", zh:"我十四点有个重要会议。", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"Mes collègues sont très sympathiques.", ipa:"[me kɔlɛɡ sɔ̃ tʁɛ sɛ̃patik]", zh:"我的同事很友善。", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"Je cherche un emploi plus intéressant.", ipa:"[ʒə ʃɛʁʃ œ̃ nɑ̃plwa ply ɛ̃tʁɛsɑ̃]", zh:"我想找更有意思的工作。", lv:"B1", src:"你好！法语2·第3课"},
        {fr:"J'envoie ma candidature par e-mail.", ipa:"[ʒɑ̃vwa ma kɑ̃didatyr paʁ imɛl]", zh:"我邮件投递求职信。", lv:"B1", src:"你好！法语2·第3课"},
        {fr:"Le patron est content de mon projet.", ipa:"[lə patʁɔ̃ ɛ kɔ̃tɑ̃ də mɔ̃ pʁɔʒɛ]", zh:"老板对我的项目满意。", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"Je prends mes congés en août.", ipa:"[ʒə pʁɑ̃ me kɔ̃ʒe ɑ̃ nu]", zh:"我八月休假。", lv:"A2", src:"你好！法语2·第3课"},
        {fr:"Cette formation améliore mes compétences.", ipa:"[sɛt fɔʁmasjɔ̃ ameljɔʁ me kɔ̃petɑ̃s]", zh:"这个培训提升了我的能力。", lv:"B1", src:"你好！法语2·第3课"},
        {fr:"Le client demande un devis rapide.", ipa:"[lə klijɑ̃ dəmɑ̃d œ̃ dəvi ʁapid]", zh:"客户要一份快速报价。", lv:"B2", src:"你好！法语2·第3课"},
        {fr:"Je suis responsable du service client.", ipa:"[ʒə sɥi ʁɛspɔ̃sabl dy sɛʁvis klijɑ̃]", zh:"我负责客服部。", lv:"B1", src:"你好！法语2·第3课"},
        {fr:"Le salaire est versé à la fin du mois.", ipa:"[lə salɛʁ ɛ vɛʁse a la fɛ̃ dy mwa]", zh:"工资月末发放。", lv:"B1", src:"你好！法语2·第3课"}
      ]
    },
    /* ===== 11. 旅行与休闲 ===== */
    voyage: {
      words:[
        {fr:"voyage", ipa:"[vwajaʒ]", zh:"旅行", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"vacances", ipa:"[vakɑ̃s]", zh:"假期", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"passport", ipa:"[paspɔʁ]", zh:"护照", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"valise", ipa:"[valiz]", zh:"行李箱", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"hôtel", ipa:"[otɛl]", zh:"酒店", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"réserver", ipa:"[ʁezɛʁve]", zh:"预订", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"visite", ipa:"[vizit]", zh:"参观 / 访问", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"musée", ipa:"[myze]", zh:"博物馆", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"plage", ipa:"[plaʒ]", zh:"海滩", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"montagne", ipa:"[mɔ̃taɲ]", zh:"山", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"guide", ipa:"[gid]", zh:"导游 / 指南", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"souvenir", ipa:"[suvniʁ]", zh:"纪念品", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"découvrir", ipa:"[dekuvʁiʁ]", zh:"发现", lv:"B1", src:"你好！法语2·第4课"},
        {fr:"pièce", ipa:"[pjɛs]", zh:"房间（套房）", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"destination", ipa:"[dɛstinasjɔ̃]", zh:"目的地", lv:"B1", src:"你好！法语2·第4课"},
        {fr:"excursion", ipa:"[ɛkskyʁsjɔ̃]", zh:"短途游玩", lv:"B1", src:"你好！法语2·第4课"},
        {fr:"pays", ipa:"[pei]", zh:"国家", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"étranger", ipa:"[etʁɑ̃ʒe]", zh:"外国", lv:"B1", src:"你好！法语2·第4课"},
        {fr:"photo", ipa:"[fɔto]", zh:"照片", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"piéton", ipa:"[pjetɔ̃]", zh:"行人", lv:"A2", src:"你好！法语2·第4课"}
      ],
      sentences:[
        {fr:"Je réserve une chambre d'hôtel pour deux nuits.", ipa:"[ʒə ʁezɛʁv yn ʃɑ̃bʁ dotɛl puʁ dø nɥi]", zh:"我订了两晚酒店房。", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"On part en vacances la semaine prochaine.", ipa:"[ɔ̃ paʁ ɑ̃ vakɑ̃s la sɛmɛn pʁɔʃɛn]", zh:"我们下周去度假。", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"N'oublie pas ton passeport et ta valise.", ipa:"[nubli pa tɔ̃ paspɔʁ e ta valiz]", zh:"别忘了护照和箱子。", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"On visite le musée demain matin.", ipa:"[ɔ̃ vizit lə myze dəmɛ̃ matɛ̃]", zh:"我们明天上午参观博物馆。", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"J'aime la plage, mais la montagne aussi.", ipa:"[ʒɛm la plaʒ mɛ la mɔ̃taɲ osi]", zh:"我喜欢海边，也喜欢山。", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"Le guide nous explique l'histoire.", ipa:"[lə gid nu zɛksplik listwaʁ]", zh:"导游给我们讲解历史。", lv:"B1", src:"你好！法语2·第4课"},
        {fr:"Je rapporte des souvenirs pour mes amis.", ipa:"[ʒə ʁapɔʁt de suvniʁ puʁ me zami]", zh:"我给朋友们带纪念品。", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"Cette destination est magnifique en été.", ipa:"[sɛt dɛstinasjɔ̃ ɛ maɲifik ɑ̃ ete]", zh:"这地方夏天美极了。", lv:"B1", src:"你好！法语2·第4课"},
        {fr:"On fait une excursion à la campagne.", ipa:"[ɔ̃ fɛ yn ɛkskyʁsjɔ̃ a la kɑ̃paɲ]", zh:"我们去乡下短途游。", lv:"B1", src:"你好！法语2·第4课"},
        {fr:"J'adore découvrir de nouveaux pays.", ipa:"[ʒadɔʁ dekuvʁiʁ də nuvо pɛi]", zh:"我热爱探索新的国家。", lv:"B1", src:"你好！法语2·第4课"},
        {fr:"La photo devant la tour est superbe.", ipa:"[la fɔto dəvɑ̃ la tuʁ ɛ sypɛʁb]", zh:"塔前的照片很棒。", lv:"A2", src:"你好！法语2·第4课"},
        {fr:"Le voyage nous aide à comprendre d'autres cultures.", ipa:"[lə vwajaʒ nu zɛd a kɔ̃pʁɑ̃dʁ dotʁ kyltyʁ]", zh:"旅行帮我们理解其他文化。", lv:"B1", src:"你好！法语2·第4课"}
      ]
    },
    /* ===== 12. 学习校园 ===== */
    etudes: {
      words:[
        {fr:"école", ipa:"[ekɔl]", zh:"学校", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"université", ipa:"[ynivɛʁsite]", zh:"大学", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"classe", ipa:"[klas]", zh:"班级 / 课", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"cours", ipa:"[kuʁ]", zh:"课程", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"étudier", ipa:"[etydije]", zh:"学习", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"devoir", ipa:"[dəvwaʁ]", zh:"作业", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"examen", ipa:"[ɛɡzamɛ̃]", zh:"考试", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"livre", ipa:"[livʁ]", zh:"书", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"cahier", ipa:"[kaje]", zh:"笔记本", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"professeur", ipa:"[pʁɔfesœʁ]", zh:"老师", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"étudiant", ipa:"[etydjɑ̃]", zh:"大学生", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"langue", ipa:"[lɑ̃ɡ]", zh:"语言", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"mot", ipa:"[mo]", zh:"词", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"leçon", ipa:"[ləsɔ̃]", zh:"课", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"difficile", ipa:"[difikil]", zh:"难的", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"facile", ipa:"[fasil]", zh:"容易的", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"note", ipa:"[nɔt]", zh:"分数 / 笔记", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"bibliothèque", ipa:"[bibljotɛk]", zh:"图书馆", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"salle de classe", ipa:"[sal də klas]", zh:"教室", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"réviser", ipa:"[ʁevize]", zh:"复习", lv:"A2", src:"你好！法语1·第2课"}
      ],
      sentences:[
        {fr:"Je étudie le français à l'université.", ipa:"[ʒə etydij lə fʁɑ̃sɛ a lynivɛʁsite]", zh:"我在大学学法语。", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"Le cours de grammaire commence à huit heures.", ipa:"[lə kuʁ də ɡʁamɛʁ kɔmɑ̃s a ɥit œʁ]", zh:"语法课八点开始。", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"J'ai beaucoup de devoirs ce soir.", ipa:"[ʒe boku də dəvwaʁ sə swaʁ]", zh:"今晚我有很多作业。", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"L'examen de français est la semaine prochaine.", ipa:"[lɛɡzamɛ̃ də fʁɑ̃sɛ ɛ la sɛmɛn pʁɔʃɛn]", zh:"法语考试在下周。", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"Je révise mes leçons à la bibliothèque.", ipa:"[ʒə ʁeviz me ləsɔ̃ a la bibljotɛk]", zh:"我在图书馆复习功课。", lv:"A2", src:"你好！法语1·第2课"},
        {fr:"Le professeur explique le mot au tableau.", ipa:"[lə pʁɔfesœʁ ɛksplik lə mo o tablo]", zh:"老师在黑板上讲解单词。", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"C'est difficile, mais je continue.", ipa:"[sɛ difisil mɛ ʒə kɔ̃tiny]", zh:"很难，但我继续。", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"J'écris mes notes dans le cahier.", ipa:"[ʒekʁi me nɔt dɑ̃ lə kaje]", zh:"我把笔记写在笔记本上。", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"La classe est grande et lumineuse.", ipa:"[la klas ɛ ɡʁɑ̃d e lyninøz]", zh:"教室又大又明亮。", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"Combien de langues parles-tu ?", ipa:"[kɔ̃bjɛ̃ də lɑ̃ɡ paʁl ty]", zh:"你会几种语言？", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"J'ai une bonne note à l'examen.", ipa:"[ʒe yn bɔn nɔt a lɛɡzamɛ̃]", zh:"我考试拿了高分。", lv:"A1", src:"你好！法语1·第2课"},
        {fr:"On forme un groupe d'étude le mercredi.", ipa:"[ɔ̃ fɔʁm œ̃ ɡʁup detyd lə mɛʁkʁədi]", zh:"我们周三组成学习小组。", lv:"A2", src:"你好！法语1·第2课"}
      ]
    }
  },
  // 扁平化工具
  allWords(){
    const out=[];
    this.scenarios.forEach(s=>{ (this.data[s.id].words||[]).forEach(w=> out.push(Object.assign({scenario:s.id, scName:s.name}, w))); });
    return out;
  },
  allSent(){
    const out=[];
    this.scenarios.forEach(s=>{ (this.data[s.id].sentences||[]).forEach(x=> out.push(Object.assign({scenario:s.id, scName:s.name}, x))); });
    return out;
  },
  scenarioById(id){ return this.scenarios.find(s=>s.id===id); }
};
