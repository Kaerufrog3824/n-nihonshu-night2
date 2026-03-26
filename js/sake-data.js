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
 *    // --- 味わいプロファイル（各 1〜5、数値が大きいほど強い）---
 *    sweetDry:  3,  // 甘さ（1=すっきり ⇔ 5=甘い）
 *    richLight: 3,  // 濃醇さ（1=あっさり ⇔ 5=濃醇）
 *    aroma:     3,  // フルーティーさ（1=控えめ ⇔ 5=華やか）
 *    mouthfeel: 3,  // まろやかさ（1=キレ ⇔ 5=まろやか）
 *  }
 *
 * ===================================================
 */

const SAKE_LIST = [
  {
    id: 1,
    name: "新政 秋櫻",
    type: "純米酒",
    brewery: "新政酒造",
    region: "秋田県",
    desc: "木桶仕込みならではのやわらかな酸味と上品な甘み。花のような余韻が広がる革新的な一本。",
    image: "images/sake/01.jpg",
    sweetDry: 4,
    richLight: 2,
    aroma: 4,
    mouthfeel: 4,
  },
  {
    id: 2,
    name: "一白水成 良心 特別純米 ささにごり",
    type: "特別純米",
    brewery: "福禄寿酒造",
    region: "秋田県",
    desc: "ほのかなにごりとやさしい甘み。フレッシュな微発泡感が心地よい、親しみやすい味わい。",
    image: "images/sake/02.jpg",
    sweetDry: 4,
    richLight: 3,
    aroma: 4,
    mouthfeel: 4,
  },
  {
    id: 3,
    name: "角右衛門 超速即詰 純米吟醸生原酒",
    type: "純米吟醸生原酒",
    brewery: "木村酒造",
    region: "秋田県",
    desc: "搾りたてを超速で瓶詰め。フレッシュな果実香とジューシーな旨味が弾ける、生原酒の醍醐味。",
    image: "images/sake/03.jpg",
    sweetDry: 4,
    richLight: 4,
    aroma: 5,
    mouthfeel: 3,
  },
  {
    id: 4,
    name: "黒龍 あどそ 純米大吟醸",
    type: "純米大吟醸",
    brewery: "黒龍酒造",
    region: "福井県",
    desc: "繊細で透明感のある吟醸香と、シルクのようになめらかな口当たり。気品あふれるエレガントな一杯。",
    image: "images/sake/04.jpg",
    sweetDry: 3,
    richLight: 2,
    aroma: 5,
    mouthfeel: 4,
  },
  {
    id: 5,
    name: "超王祿 純米 春季限定 生原酒",
    type: "純米生原酒",
    brewery: "王祿酒造",
    region: "島根県",
    desc: "力強い旨味と厚みのあるコク。生原酒のパワフルさと春限定のフレッシュ感が同居する通好みの逸品。",
    image: "images/sake/05.jpg",
    sweetDry: 2,
    richLight: 5,
    aroma: 3,
    mouthfeel: 2,
  },
  {
    id: 6,
    name: "天美 純米吟醸うすにごり生原酒",
    type: "純米吟醸生原酒",
    brewery: "長州酒造",
    region: "山口県",
    desc: "白桃やマスカットを思わせる華やかな果実香。うすにごりのやわらかな甘みと微発泡が弾ける。",
    image: "images/sake/06.jpg",
    sweetDry: 5,
    richLight: 4,
    aroma: 5,
    mouthfeel: 5,
  },
  {
    id: 7,
    name: "廣戸川 純米にごり生酒",
    type: "純米にごり生酒",
    brewery: "松崎酒造",
    region: "福島県",
    desc: "クリーミーなにごりに包まれたやさしい甘味と酸味。活性のシュワッと感がたまらない冬の風物詩。",
    image: "images/sake/07.jpg",
    sweetDry: 5,
    richLight: 4,
    aroma: 4,
    mouthfeel: 5,
  },
  {
    id: 8,
    name: "来福 うすにごり純米生原酒 さくら花酵母",
    type: "純米生原酒",
    brewery: "来福酒造",
    region: "茨城県",
    desc: "さくら花酵母が生み出す華やかな香りと甘酸っぱい味わい。春を感じるやわらかなうすにごり。",
    image: "images/sake/08.jpg",
    sweetDry: 5,
    richLight: 3,
    aroma: 5,
    mouthfeel: 4,
  },
];
