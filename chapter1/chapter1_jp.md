---
marp: true
theme: uncover
backgroundColor: #0a1628
color: #ffffff
style: |
  section {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(135deg, #0a1628 0%, #1a2332 100%);
    padding: 20px;
    line-height: 1.35;
    text-align: left;
    font-size: 28px;
  }
  /* Headings */
  h1, h2 {
    color: #5eb3e6;
    font-weight: 300;
    margin-top: 0;
    line-height: 1.15;
  }
  h1 {
    font-size: 58.8px;
    margin-bottom: 0.2em;
  }
  h2 {
    font-size: 47.6px;
    margin-bottom: 0.2em;
  }
  h3 {
    font-size: 28px;
    color: #ffffff;
    margin-bottom: 0.2em;
    text-align: left;
  }
  /* Lists */
  ul {
    text-align: left !important;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    padding-left: 1em;
    list-style: none;
  }
  ul li {
    text-align: left !important;
    margin-bottom: 0.35em;
    font-size: 22.4px;
    line-height: 1.35;
    position: relative;
  }
  ul li:before {
    content: "✓ ";
    color: #5eb3e6;
    font-weight: bold;
    display: inline-block;
    margin-left: -1em;
    width: 1em;
  }
  ol {
    text-align: left !important;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    padding-left: 1.2em;
  }
  ol li {
    font-size: 22.4px;
    line-height: 1.35;
    margin-bottom: 0.35em;
  }
  /* Code */
  code {
    background-color: #1e2936;
    color: #5eb3e6;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 26.6px;
  }
  pre {
    background-color: #1e2936;
    border: 1px solid #2a3f5f;
    border-radius: 8px;
    padding: 0.7em;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    font-size: 25.2px;
  }
  /* Layout helpers */
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2em;
    text-align: left;
  }
  .compact {
    font-size: 25.2px;
  }
  .compact h3 {
    font-size: 30.8px;
    margin-bottom: 0.15em;
  }
  .compact ul li {
    font-size: 26.6px;
    margin-bottom: 0.25em;
    line-height: 1.25;
  }
  .compact p {
    font-size: 25.2px;
    line-height: 1.25;
  }
  /* Slightly more compact variant for dense slides */
  .compact-sm {
    font-size: 24.6px;
  }
  .compact-sm h3 {
    font-size: 28px;
    margin-bottom: 0.15em;
  }
  .compact-sm ul li,
  .compact-sm ol li {
    font-size: 25.8px;
    line-height: 1.28;
    margin-bottom: 0.25em;
  }
  /* Text */
  p {
    font-size: 22.4px;
    text-align: left;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    line-height: 1.35;
  }
  a {
    color: #5eb3e6;
    font-size: 26.6px;
  }
---

# Sui 101
## Sui入門

<p class="subtitle">対象: 学生・Web2開発者・クリプトに興味がある人</p>

---

# 学習目標

✓ Sui とブロックチェーンの基礎を理解する

✓ ネットワークとやり取りするために Sui ウォレットをセットアップする

✓ Sui ブロックチェーン上で NFT をミントする

---

# Sui とは？

• 高速性とスケーラビリティに特化した高性能レイヤー1ブロックチェーン
• 資産（アセット）とオブジェクトを中心とした設計
• Move プログラミング言語を採用

---

# Sui の特長
## オブジェクト中心モデル

• Sui 上の資産は **オブジェクト** と呼ばれる
• 各オブジェクトは一意の ID を持ち、データを保持・更新できる
• アカウントベースのブロックチェーンとは異なるモデル

---

# ブロックチェーンとは？

• 分散型台帳技術
• 変更不能で透明性の高い記録管理
• 取引はネットワーク上の多数のコンピュータに保存される

---

# Move 言語と Sui CLI 入門

• Move 言語は、安全かつ柔軟なスマートコントラクト用プログラミング言語

• Sui CLI は、Sui ネットワークと対話するためのコマンドラインツール

---

# 基本的なトランザクション
## NFT のミントとトークン送金

• Sui テストネットでシンプルな NFT をミント

• 別のウォレットへトークンを送金

---

# クイズ + 実践チャレンジ

<div class="columns">
<div>

### ミニクイズ

• Sui のオブジェクトモデルとは？
• Move は Solidity とどう違う？

</div>
<div>

### チャレンジ

• NFT スマートコントラクトをデプロイ
• コントラクト関数を呼び出して NFT をミント

**スクリーンショットを撮って提出**

</div>
</div>

---

# まとめ

• ブロックチェーンの概要と Sui の仕組み
• Sui のオブジェクト中心モデルの特長
• ウォレットの基本設定、Move、基本トランザクション

### 参考資料

• [docs.sui.io](https://docs.sui.io)
• Sui ウォレット
• Sui 開発者フォーラム

---

# Slush ウォレットをセットアップ

### Slush をインストール
### シードフレーズをバックアップ
### Faucet から SUI を入手

---

# Faucet で SUI を受け取る

1. Sui テストネットの Faucet サイトへアクセス
2. 自分のアドレスを貼り付け
3. テストネットトークンを請求

---

# ウォレット画面を確認

1. SUI のトークン残高
2. ミント済みの NFT コレクション

---

# Sui CLI をインストール

**macOS** `brew install sui`

**Windows** `Winget install sui`

**Linux** `0 ALTER`

---

# CLI コマンドのウォークスルー

① `sui client new-address` — 新しいアドレスを作成

② `sui client transfer-sui` — SUI を送金

③ `sui client call` — コントラクト関数を呼び出し

---

## エントリ関数と構造体

1. エントリ関数 = 直接実行できる関数
2. 構造体 = カスタムデータ型

```rust
Module counter {
  Struct Counter has key, store {
    value: u64;
  }
  public entry fun increment
    (my_counter: &mut Counter)
    my_counter.value += 1;
  }
}
```

---

# モジュールを確認

1. Sui Explorer にアクセス
   [https://suiscan.xyz/mainnet/home](https://suiscan.xyz/mainnet/home)

2. 自分の Move モジュールを検索

---

# よくある質問

• Sui ウォレットのリカバリ手順は？
• Sui ウォレットを dApp に接続するには？
• Move の学習リソースはどこで見つかりますか？
• このコースは本当に初心者向けですか？

---

# 次回: ビルダートラック予告

• コントラクトの作成とデプロイに注力
• ガスとストレージの理解

---

# ありがとうございました
