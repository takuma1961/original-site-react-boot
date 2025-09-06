// profileItems.js

// typeはkeyに使っているので一意である必要があります
export const profileItems = [
  {
    type: "名前",
    text: "勝間田 拓真（カツマタ タクマ）",
    isDetail: false,
  },
  {
    type: "職業",
    text: "正社員（ITエンジニア）",
    isDetail: false,
  },
  {
    type: "仕事内容",
    text: "介護保険システムの導入、運用保守",
    isDetail: true,
    detailText:
      "自治体へ介護保険システムを導入する際の要件をヒアリング、夜間処理やシステム運用に関する問い合わせ対応、データの調査",
  },
  {
    type: "趣味",
    text: "プログラミング、ランニング、スポーツ観戦、海外ドラマなど",
    isDetail: false,
  },
  {
    type: "資格",
    text: "応用情報処理試験",
    isDetail: false,
  },
];
