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
###### Module 4 - Sui上でのdApp構築
# Sui上でのdApp構築
スマートコントラクト開発、フロントエンド
統合、ウォレット接続を含む、Sui上での
dApp構築プロセスを理解する。

---

# アジェンダ
1. フロントエンドとSuiスマート
   コントラクトの接続
2. ウォレット統合
3. NFTミントアプリの構築
4. 基本的なDeFiアプリの構築
5. 実践的な演習

---

# フロントエンドとSui
## スマートコントラクトの接続

<div class="columns compact-sm">

<div>

### Sui TypeScript SDK
- 低レベルブロックチェーン
  インタラクション
- スマートコントラクト
  関数の呼び出し
- ネットワーク用の
  SuiClientProvider
- ウォレット管理用の
  WalletProvider
- ユーザーログイン用の
  ConnectButton

</div>

<div>

### React用dApp Kitの使用例
- アプリをプロバイダーで
  ラップし、ConnectButtonを
  使用してウォレットアドレス
  を取得

</div>

</div>

---

# ウォレット統合
<div class="columns compact-sm">

<div>

### ウォレットの役割
- トランザクションの署名、
  ユーザーアセットの管理

</div>

<div>

### dApp Kitの使用法
- WalletProvider +
  ConnectButtonでシームレス
  な接続を実現

### 開発者向けヒント
- <code>useCurrentAccount</code>
  フックでウォレット情報に
  アクセス

</div>

</div>

---

# NFTミントアプリの構築
<div class="columns compact-sm">

<div>

### スマートコントラクト
- keyとstore属性を持つ
  NFT構造体を定義

### ミント関数
- 新しく作成されたNFTを
  送信者に転送

</div>

<div>

### フロントエンド
- SDK/dApp Kitを使用して
  メタデータ付きでミント
  を呼び出し

<p>*MoveとJavaScriptの実装例が利用可能です。</p>

</div>

</div>

---

# 基本的なDeFiアプリの構築
<div class="columns compact-sm">

<div>

### レンディングプール
### スマートコントラクト
- レンディングプール
  構造体を定義
- 預金、借入、返済
  関数を実装
- 金利処理を含む

</div>

<div>

### フロントエンド
### インターフェース
- SUI預金ページ
- 担保を使った借入
- ローン返済ページ

### SDK統合
- UIからコントラクト
  関数を呼び出し

</div>

</div>

---

# フロントエンド統合の最適化
<div class="columns compact-sm">

<div>

### React Hooks
- 状態とアカウント管理に
  フックを使用

### プロバイダーラッピング
- アプリをSuiClientと
  Walletプロバイダーで
  ラップ

</div>

<div>

### ユーザーエクスペリエンス
- ウォレット接続状況と
  エラーハンドリングを
  表示

</div>

</div>

---

# 実践的な演習
<div class="compact-sm">

### NFTミントアプリ
- NFT構造体用のMoveコード、フロントエンド
  ミント呼び出し用のTypeScript

### 基本的なDeFiアプリの構築
- SDKを使用：預金、借入、返済のために
  フロントエンドからスマートコントラクト関数を呼び出し

<p>(<a href="https://mirror.xyz/greymate.eth/_P2NXvVoh9wISj_mqgavDymIERCnW2DgC1gigJNrmUI">https://mirror.xyz/greymate.eth/_P2NXvVoh9wISj_mqgavDymIERCnW2DgC1gigJNrmUI</a>)</p>
<p>(<a href="https://docs.sui.io/guides/developer/app-examples">https://docs.sui.io/guides/developer/app-examples</a>)</p>

</div>

---

# ありがとうございました。

