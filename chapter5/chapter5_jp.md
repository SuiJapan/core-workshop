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
###### モジュール5 - Suiの高度な機能
# Suiの高度な機能
<br/>
このモジュールでは以下のような高度な機能について学びます
<br/>

### SuiでのAI構築とスマートコントラクト連携
### zkLoginとスポンサー付きトランザクションによる円滑なオンボーディング

---

# 目次
1. zkLoginの仕組み  
2. スポンサー付きトランザクション — ガス代の支払い代行  
3. Suiのオラクル — オフチェーンデータのオンチェーン利用  
4. Suiのクロスチェーンブリッジ  
5. Suiでの自律型AIエージェント構築  
6. 演習

---

# zkLoginの仕組み
<div class="columns compact-sm">

<div>

### ユーザーログイン
- GoogleやFacebookなどの既存の<br/>認証情報でウォレット生成 
- 認証情報とウォレットアドレスが<br/>直接紐づかない

### プライバシー保護
- JWTとソルトからzkProofを生成
  アカウントの安全性を確保します。

</div>

<div>

### なぜ重要か
- 使い慣れたWeb認証情報でdAppにログインしつつ、  
  ゼロ知識証明によってプライバシーを保護します。

**ドキュメント**  
https://docs.sui.io/concepts/cryptography/zklogin

</div>

</div>

---

## 演習 — zkLoginのデモアプリを作ってみよう！
<br/>
<div class="compact-sm">

### UNCHAINの教材のリンク

https://buidl.unchain.tech/Sui/Sui-zklogin/

### スターターキット

https://github.com/unchain-tech/sui-zklogin-app

</div>

---

# ガスレストランザクション
<div class="columns compact-sm">

<div>

### ガススポンサーの役割
- ユーザー、ガスステーション、スポンサー間で手数料をシームレスに管理します。

### サービス例
- ShinamiのGas Stationを利用することで、ガス代のスポンサーが容易になります。  
  https://blog.sui.io/shinami-gas-station-tutorial/

### ユースケース
- ゲームdAppが初期トランザクションのガス代を負担し、ユーザー獲得を促進します。

</div>

<div>

## 演習
- スポンサーを設定します。  
- ガスレストランザクションを送信します。  
- レシートとガス支払者をオンチェーンで確認します。

</div>

</div>

---

# Suiでのオラクル利用 
<div class="columns compact-sm">

<div>

### 利用可能なオラクル
- Chainlink  
- Band Protocol  
- Mysten Labs製のsimple oracleとmeta oracle

### 開発者向けガイド
- 天気オラクルの実装例  
  https://docs.sui.io/guides/developer/app-examples/weather-oracle#initialize-the-project  
- Moveオラクルのサンプルコード  
  https://github.com/pentagonxyz/move-oracles

</div>

<div>

## 演習 — オンチェーン価格フィードの実装
**要件:**  
POST API `http://localhost:8080/price?symbol=ETH/USD` を作成し、  
NodeスクリプトでJSONをパースして、Moveオラクルコントラクトの  
`submit_price`関数を呼び出します。

</div>

</div>

---

# Suiのクロスチェーンブリッジ — 相互運用性
<div class="compact-sm">

### Sui Bridge（ネイティブブリッジ）
- **対応資産:** ETH, WETH, USDT, WBTC, LBTC  
- **方式:** ロック＆ミント方式  
https://bridge.sui.io/

### その他のブリッジ
- Wormholeのメッセージング機能でSuiと接続  
  https://wormhole.com/docs/tutorials/messaging/sui-connect/

### CircleのCCTP（USDC用）
- USDCのクロスチェーン転送の概要

</div>

---

# SuiでのAIエージェント構築
<div class="columns compact-sm">

<div>

### エージェントロジック
- オンチェーンでのアクションはMoveスマートコントラクトで定義します。

### オラクルと自動化
- データフィードを接続し、スポンサー付きトランザクションでプロセスを自動化します。

### 外部AIモデル
- 意思決定にオフチェーンのAIモデルを統合します。

### セキュリティ
- Moveのケイパビリティとアクセス制御を活用します。

</div>

<div>

### Nimbus AI Agent Kit
1. このキットはSui上でAIエージェントを構築するためのサポートを提供します。  
2. ウォレット残高の取得をサポートします。  
3. 複数のSui DeFiプロトコルとの連携をサポートします。  

https://agent.getnimbus.io/

</div>

</div>

---

# 演習
<br/>
<div class="compact-sm">

- **サンプルAIエージェントキット:**  
  https://docs.getnimbus.io/sui-ai-agent/introduction  
- **SDK:**  
  https://www.npmjs.com/package/@flowx-finance/sdk  

### シンプルなAIエージェントを作成する
- SDKでウォレット残高を監視します。  
- Moveで定義したロジックに基づき、オンチェーンアクションを実行します。

</div>

---

# Thank you!
