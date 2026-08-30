/* 模块三 P3-1/3-2/3-3 思维导图数据
 * points[].tree 层级结构（≤4 级）：{t 标题, fr 法语示例, zh 中文, children:[...]}
 * relations 用于 P3-3 跨知识点关联图（边带关系类型）
 */
window.GRAMMAR = {
  points: [
    {
      id:"pres", name:"直陈式现在时", code:"G-A1-01", level:"A1", kind:"single",
      tree:{
        t:"直陈式现在时 (présent)", children:[
          {t:"构成", children:[
            {t:"-er 规则", fr:"e / es / e / ons / ez / ent", zh:"parler"},
            {t:"-ir 规则", fr:"is / is / it / issons / issez / issent", zh:"finir"},
            {t:"-re 规则", fr:"s / s / t / ons / ez / ent", zh:"rendre"},
            {t:"高频不规则", children:[
              {t:"être", fr:"suis / es / est / sommes / êtes / sont", zh:""},
              {t:"avoir", fr:"ai / as / a / avons / avez / ont", zh:""},
              {t:"aller", fr:"vais / vas / va / allons / allez / vont", zh:""}
            ]}
          ]},
          {t:"用法", children:[
            {t:"当前状态/动作", zh:"Je suis étudiant."},
            {t:"习惯", zh:"Je lis le soir."},
            {t:"客观真理", zh:"La Terre est ronde."}
          ]},
          {t:"易错点", children:[
            {t:"-ent 第三人称复数不发音", zh:"ils parlent → /paʁl/"},
            {t:"变位须与主语一致", zh:"tu 用 -es，il 用 -e"}
          ]},
          {t:"对应考点", fr:"G-A1-01 / G-A1-02", zh:""}
        ]
      }
    },
    {
      id:"passe", name:"复合过去时", code:"G-A2-01", level:"A2", kind:"single",
      tree:{
        t:"复合过去时 (passé composé)", children:[
          {t:"结构", fr:"助动词(avoir/être) + 过去分词", zh:""},
          {t:"用 avoir 作助动词", children:[
            {t:"绝大多数动词", zh:"parler → parlé"},
            {t:"过去分词不配合宾语", zh:"J'ai vu Marie."}
          ]},
          {t:"用 être 作助动词", children:[
            {t:"位移/状态不及物 (DR & MRS VANDERTRAMP)", zh:"aller, venir, naître..."},
            {t:"性数配合主语", zh:"Elle est allée."}
          ]},
          {t:"用法", zh:"表示已完成、有界限的过去动作"},
          {t:"易错点", children:[
            {t:"être 类需配合", zh:"需与主语性数一致"},
            {t:"直接宾语在助动词前需配合", zh:"La pomme que j'ai mangée."}
          ]},
          {t:"对应考点", fr:"G-A2-01 / G-A2-03", zh:""}
        ]
      }
    },
    {
      id:"article", name:"冠词系统", code:"G-A1-04", level:"A1", kind:"single",
      tree:{
        t:"法语冠词系统", children:[
          {t:"定冠词", children:[
            {t:"le / la / les", zh:"确指、已知事物"},
            {t:"例子", fr:"le livre (这本书)", zh:""}
          ]},
          {t:"不定冠词", children:[
            {t:"un / une / des", zh:"泛指、首次提及"},
            {t:"例子", fr:"un livre (一本书)", zh:""}
          ]},
          {t:"部分冠词 (A2)", children:[
            {t:"du / de la / des", zh:"不可数/抽象的一部分"},
            {t:"例子", fr:"du pain", zh:""}
          ]},
          {t:"缩合冠词", children:[
            {t:"au = à+le, aux = à+les", zh:""},
            {t:"du = de+le, des = de+les", zh:""}
          ]},
          {t:"易错点", children:[
            {t:"à/de + le 必须缩合", zh:"au bureau"},
            {t:"部分冠词表量", zh:"避免用 un 表‘一些’"}
          ]}
        ]
      }
    },
    {
      id:"prep", name:"介词 à 与 de", code:"G-A2-09", level:"A2", kind:"single",
      tree:{
        t:"介词 à 与 de", children:[
          {t:"à 的核心义", children:[
            {t:"向/到 (方向)", fr:"Je vais à Paris.", zh:""},
            {t:"在 (地点/时间)", fr:"à la maison", zh:""},
            {t:"宾语代词前置标记", fr:"Je lui parle (à lui)", zh:""}
          ]},
          {t:"de 的核心义", children:[
            {t:"从/属于 (来源/所属)", fr:"la clé de la porte", zh:""},
            {t:"部分/材料", fr:"une tasse de thé", zh:""},
            {t:"宾语代词前置标记", fr:"J'en parle (de ça)", zh:""}
          ]},
          {t:"易混对比", children:[
            {t:"à = 朝某方向；de = 从某处来", zh:"aller à / venir de"},
            {t:"固定搭配", fr:"avoir besoin de / répondre à", zh:""}
          ]}
        ]
      }
    },
    {
      id:"pronom", name:"代词系统", code:"G-A2-10", level:"A2", kind:"single",
      tree:{
        t:"法语代词系统", children:[
          {t:"主语人称代词", fr:"je/tu/il/elle/nous/vous/ils/elles", zh:""},
          {t:"直接宾语代词", fr:"me/te/le/la/les", zh:"置于变位动词前"},
          {t:"间接宾语代词", fr:"me/te/lui/leur", zh:"à+人 时用"},
          {t:"副代词 en / y", children:[
            {t:"en = de+名词", fr:"J'en achete.", zh:""},
            {t:"y = à+名词(物)", fr:"J'y vais.", zh:""}
          ]},
          {t:"易错点", children:[
            {t:"双宾语顺序", fr:"me le / te la / lui les", zh:""},
            {t:"肯定命令式后置", fr:"Donne-le-moi.", zh:""}
          ]}
        ]
      }
    }
  ],
  // P3-3 跨知识点关联
  relations: [
    {
      id:"past", name:"过去时态体系", level:"B1",
      nodes:[
        {id:"pc", label:"复合过去时", code:"G-A2-01"},
        {id:"imp", label:"未完成过去时", code:"G-A2-02"},
        {id:"pqp", label:"愈过去时", code:"—"},
        {id:"fut_ant", label:"先将来时", code:"—"}
      ],
      edges:[
        {from:"pc", to:"imp", type:"⚠易混"},
        {from:"imp", to:"pqp", type:"递进"},
        {from:"pc", to:"fut_ant", type:"因果(时间轴)"},
        {from:"imp", to:"pc", type:"并列(背景vs动作)"}
      ],
      order:["先掌握 PC 与 imparfait 的区别","再学愈过去时作‘过去的过去’背景","先将来时用于主句将来时+从句已发生动作"]
    }
  ]
};
