/**
 * ===================================================
 *  日本酒データベース
 * ===================================================
 *
 *  ■ 新しい日本酒を追加するには：
 *    SAKE_LIST 配列に下記の形式でオブジェクトを追加してください。
 *
 *  {
 *    id: 13,                          // ユニークなID（連番）
 *    name:    "銘柄名",                // 銘柄名
 *    type:    "純米大吟醸",            // 種別
 *    brewery: "蔵元名",               // 蔵元
 *    region:  "都道府県",             // 産地
 *    desc:    "一言コメント",          // 簡単な説明
 *    image:   "images/sake/13.jpg",   // 瓶ラベル画像（images/sake/ に配置）
 *    // --- 味わいプロファイル（各 1〜5）---
 *    sweetDry:  3,  // 1=甘口  ⇔ 5=辛口
 *    richLight: 3,  // 1=芳醇  ⇔ 5=淡麗
 *    aroma:     3,  // 1=フルーティー ⇔ 5=スッキリ
 *    mouthfeel: 3,  // 1=まろやか ⇔ 5=キレ
 *  }
 *
 * ===================================================
 */

const SAKE_LIST = [
  {
    id: 1,
    name: "獺祭 純米大吟醸45",
    type: "純米大吟醸",
    brewery: "旭酒造",
    region: "山口県",
    desc: "華やかな香りとクリアな味わい。日本酒入門にも最適な一本。",
    image: "images/sake/01.jpg",
    sweetDry: 2,
    richLight: 4,
    aroma: 1,
    mouthfeel: 2,
  },
  {
    id: 2,
    name: "久保田 千寿",
    type: "吟醸",
    brewery: "朝日酒造",
    region: "新潟県",
    desc: "すっきりとした飲み口とキレのある淡麗辛口の代名詞。",
    image: "images/sake/02.jpg",
    sweetDry: 4,
    richLight: 4,
    aroma: 4,
    mouthfeel: 4,
  },
  {
    id: 3,
    name: "八海山 特別本醸造",
    type: "特別本醸造",
    brewery: "八海醸造",
    region: "新潟県",
    desc: "清涼感あふれる軽快な辛口。食中酒として万能。",
    image: "images/sake/03.jpg",
    sweetDry: 4,
    richLight: 5,
    aroma: 4,
    mouthfeel: 4,
  },
  {
    id: 4,
    name: "十四代 本丸",
    type: "本醸造",
    brewery: "高木酒造",
    region: "山形県",
    desc: "芳醇でフルーティーな甘み。入手困難な幻の銘酒。",
    image: "images/sake/04.jpg",
    sweetDry: 1,
    richLight: 1,
    aroma: 1,
    mouthfeel: 2,
  },
  {
    id: 5,
    name: "而今 純米吟醸",
    type: "純米吟醸",
    brewery: "木屋正酒造",
    region: "三重県",
    desc: "ジューシーで上品な甘みと透明感のある余韻。",
    image: "images/sake/05.jpg",
    sweetDry: 2,
    richLight: 2,
    aroma: 1,
    mouthfeel: 2,
  },
  {
    id: 6,
    name: "田酒 特別純米",
    type: "特別純米",
    brewery: "西田酒造店",
    region: "青森県",
    desc: "米の旨味をしっかり感じる骨太な味わい。",
    image: "images/sake/06.jpg",
    sweetDry: 3,
    richLight: 2,
    aroma: 3,
    mouthfeel: 3,
  },
  {
    id: 7,
    name: "黒龍 純吟",
    type: "純米吟醸",
    brewery: "黒龍酒造",
    region: "福井県",
    desc: "繊細でエレガントな香りと、なめらかな口当たり。",
    image: "images/sake/07.jpg",
    sweetDry: 2,
    richLight: 3,
    aroma: 2,
    mouthfeel: 2,
  },
  {
    id: 8,
    name: "新政 No.6 X-type",
    type: "純米",
    brewery: "新政酒造",
    region: "秋田県",
    desc: "革新的な酸味と甘みの調和。日本酒の概念を覆す一本。",
    image: "images/sake/08.jpg",
    sweetDry: 1,
    richLight: 2,
    aroma: 1,
    mouthfeel: 1,
  },
  {
    id: 9,
    name: "飛露喜 特別純米",
    type: "特別純米",
    brewery: "廣木酒造",
    region: "福島県",
    desc: "バランスの取れた万能型。どんな料理にも寄り添う。",
    image: "images/sake/09.jpg",
    sweetDry: 3,
    richLight: 3,
    aroma: 3,
    mouthfeel: 3,
  },
  {
    id: 10,
    name: "鍋島 特別純米",
    type: "特別純米",
    brewery: "富久千代酒造",
    region: "佐賀県",
    desc: "上品な甘みと軽やかなキレの絶妙なバランス。",
    image: "images/sake/10.jpg",
    sweetDry: 2,
    richLight: 3,
    aroma: 2,
    mouthfeel: 3,
  },
  {
    id: 11,
    name: "〆張鶴 純",
    type: "純米吟醸",
    brewery: "宮尾酒造",
    region: "新潟県",
    desc: "端正な淡麗辛口。新潟の正統派を味わえる一本。",
    image: "images/sake/11.jpg",
    sweetDry: 5,
    richLight: 5,
    aroma: 5,
    mouthfeel: 5,
  },
  {
    id: 12,
    name: "酔鯨 特別純米",
    type: "特別純米",
    brewery: "酔鯨酒造",
    region: "高知県",
    desc: "キレ味抜群の辛口。土佐の食文化が生んだ銘酒。",
    image: "images/sake/12.jpg",
    sweetDry: 4,
    richLight: 3,
    aroma: 4,
    mouthfeel: 5,
  },
];
