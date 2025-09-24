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

<!-- Title -->
###### モジュール5 - 高度な機能
# 高度な機能
Sui 上で AI を構築し、スマートコントラクトと連携する方法、  
zkLogin とスポンサー付きトランザクションによるスムーズなオンボーディングを学びます

---

# アジェンダ
1. zkLogin の仕組み  
2. スポンサー付きトランザクション — ガス代の管理  
3. Sui のオラクル — オフチェーンデータをオンチェーンへ  
4. Sui のクロスチェーンブリッジ  
5. Sui 上での自律型 AI エージェントの構築  
6. 演習

---

# zkLogin の仕組み
<div class="columns compact-sm">

<div>

### ユーザーログイン
- Google や Facebook の認証情報で認証  
- 個人情報を開示せずに本人性を検証

### プライバシー保護 — 証明の生成
- JWT とソルトを用いて zkProof を生成し、アカウントの安全性を確保

</div>

<div>

### なぜ重要か
- 慣れ親しんだ Web 認証情報で Sui dApp にログインでき、  
  ゼロ知識証明によりプライバシーを確保。

**ドキュメント**  
https://docs.sui.io/concepts/cryptography/zklogin

</div>

</div>

---

## 演習 — zkLogin の統合
<div class="compact-sm">

**課題:** `login.ts` ハンドラーを完成させる。  
- 認証に `@googleapis/oauth2` を使用  
- `@sui/sui.js` の `generateZkProof` ヘルパーを使用  

**例**  
https://docs.sui.io/guides/developer/cryptography/zklogin-integration/zklogin-example

</div>

---

# スポンサー付きトランザクション — ガス代管理
<div class="columns compact-sm">

<div>

### ガススポンサーの役割
- ユーザー／ガスステーション／スポンサーで手数料をシームレスに管理

### サービス例
- Shinami の Gas Station によりガス代のスポンサーが容易  
  https://blog.sui.io/shinami-gas-station-tutorial/

### ユースケース
- ゲーム dApp が初期トランザクションのガス代を肩代わりしユーザー獲得を促進

</div>

<div>

## 演習 — 最初のトランザクションをスポンサー
- スポンサーを設定  
- スポンサー負担でユーザートランザクションを送信  
- レシートとガス支払者をオンチェーンで確認

</div>

</div>

---

# Sui のオラクル — オフチェーンデータをオンチェーンへ
<div class="columns compact-sm">

<div>

### 利用可能なオラクル
- Chainlink  
- Band Protocol  
- Mysten Labs の simple oracle と meta oracle

### 開発者向けガイド
- 天気オラクルの例  
  https://docs.sui.io/guides/developer/app-examples/weather-oracle#initialize-the-project  
- Move オラクルのサンプル  
  https://github.com/pentagonxyz/move-oracles

</div>

<div>

## 演習 — オンチェーンの価格フィード
**要件:**  
POST API `http://localhost:8080/price?symbol=ETH/USD` を作成し、  
Node スクリプトで JSON をパースして、Move オラクルコントラクトの  
`submit_price` 関数を呼び出す。

</div>

</div>

---

# Sui のクロスチェーンブリッジ — 相互運用性
<div class="compact-sm">

### Sui Bridge（ネイティブブリッジ）
- **対応資産:** ETH, WETH, USDT, WBTC, LBTC  
- **方式:** ロック＆ミント方式  
https://bridge.sui.io/

### その他のブリッジ
- Wormhole のメッセージングで Sui と接続  
  https://wormhole.com/docs/tutorials/messaging/sui-connect/

### Circle の CCTP（USDC 用）
- USDC のクロスチェーン転送の概要

</div>

---

# Sui 上での AI エージェント構築
<div class="columns compact-sm">

<div>

### エージェントロジック
- オンチェーンのアクションは Move スマートコントラクトで定義

### オラクルと自動化
- データフィードを接続し、スポンサー付きトランザクションで自動化

### 外部 AI モデル
- 意思決定にオフチェーンの AI を統合

### セキュリティ
- Move のケイパビリティとアクセス制御を活用

</div>

<div>

### Nimbus AI Agent Kit
1. このキットは Sui 上で AI エージェントを構築するためのサポートを提供  
2. ウォレット残高の取得をサポート  
3. 複数の Sui DeFi プロトコルとの連携をサポート  

https://agent.getnimbus.io/

</div>

</div>

---

# 演習
<div class="compact-sm">

- **サンプル AI エージェントキット:**  
  https://docs.getnimbus.io/sui-ai-agent/introduction  
- **SDK:**  
  https://www.npmjs.com/package/@flowx-finance/sdk  

### シンプルな AI エージェントを作る
- SDK でウォレット残高を監視  
- Move で定義したロジックでオンチェーンのアクションを実行

</div>

---

# ありがとうございました。
