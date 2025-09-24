---
marp: true
theme: uncover
backgroundColor: #0a1628
color: #ffffff
style: |
  section {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(135deg, #0a1628 0%, #1a2332 100%);
    padding: 60px;
  }
  h1, h2, h3 {
    color: #5eb3e6;
    font-weight: 300;
    margin-top: 0;
  }
  h1 {
    font-size: 2.0em;
    margin-bottom: 0.2em;
  }
  h2 {
    font-size: 1.6em;
    color: #5eb3e6;
    margin-bottom: 0.2em;
  }
  h3 {
    font-size: 1.2em;
    color: #ffffff;
    margin-bottom: 0.2em;
  }
  ul {
    text-align: left;
    margin-top: 0.3em;
    margin-bottom: 0.3em;
  }
  ul li {
    margin-bottom: 0.4em;
    font-size: 1.05em;
  }
  ul li::marker {
    color: #5eb3e6;
  }
  code {
    background-color: #1e2936;
    color: #5eb3e6;
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }
  pre {
    background-color: #1e2936;
    border: 1px solid #2a3f5f;
    border-radius: 8px;
    padding: 0.8em;
    margin-top: 0.3em;
    margin-bottom: 0.3em;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5em;
  }
  .highlight {
    color: #5eb3e6;
  }
  a {
    color: #5eb3e6;
  }
  .subtitle {
    color: #b8c5d6;
    font-size: 0.9em;
    margin-top: 0.3em;
  }
  p {
    margin-top: 0.3em;
    margin-bottom: 0.3em;
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

# CLI Command Walkthrough

① `Sui client new-address`

② `Sui client transfer-sui`

③ `Sui client call`

---

## Entry Functions & Structs

1. Entry functions = executable functions
2. Structs = custom data types

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

# View Your Module

1. Go to Sui Explorer
   [https://suiscan.xyz/mainnet/home](https://suiscan.xyz/mainnet/home)

2. Search for your Move module

---

# Top Student Questions

• What is the Sui wallet recovery process?
• How do I connect my Sui wallet to dApps?
• Where can I find more resources on Move?
• Is this course really beginner-friendly?

---

# Next: Builder Track Preview

• Focus on writing and deploying contracts
• Understanding gas and storage

---

# Thank You.
