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

# Move入門

### 目標
• 堅牢な基盤と設計パターンに基づいてSui上にスマートコントラクトを構築する
• Move言語とSui特有のオブジェクト中心モデルを学ぶ

---

# アジェンダ

1. Moveとは？
2. ツールチェーンと環境構築
3. 変数・データ型・可変性
4. Suiのスマートコントラクト設計パターン
5. SuiにおけるCapability（権限）
6. エラー処理とセキュリティ実践

---

# 学習目標

• 重要なポイント: Moveは安全性を重視し、SuiのオブジェクトモデルとCapabilityが高度なパターンを可能にする。
• さらなる学習のためのリソースと演習を紹介。
• 追加リソース: Sui Developer Portal。
(https://sui.io/developers)

---

# Moveとは？

### 安全かつ柔軟
Moveは、Sui上で安全かつ柔軟に動作するスマートコントラクトのために設計されています。

### リソース指向
資産を安全に管理し、リエントランシーのような一般的な脆弱性を防ぎます。

### Suiでの利用
Moveはオンチェーンのオブジェクトを制御し、効率的かつ安全なデータ管理を実現します。

---

# ツールチェーンと環境構築

### **Sui CLIのインストール**
デジタル資産の希少性を保証し、複製を防ぎます。

### **新しいパッケージを初期化**
`sui move new <project>`

---

## 変数・データ型・可変性

### 所有権モデル
変数はRustに類似した所有権規則に従い、メモリ安全性を確保します。

### データ型
- bool: 真偽値（true/false）
- u8, u64: 符号なし整数
- address: アカウント識別子
- vector: 可変長配列

### 可変性
`let` は不変変数を、`let mut` は可変変数を作成します。

(https://move-book.com/reference/primitive-types)

---

# リソースとオブジェクト

### **リソース**
希少性を保証し、デジタル資産の複製を防ぎます。

### **オブジェクト**
Suiの中核データ構造。所有、共有、不変のいずれかになり得ます。

### **所有権**
Wrapping（ラップ）により単一所有を強制し、不正な複製を防ぎます。

### **移転（Transfer）**
`transfer::transfer` を用いて、オブジェクトの所有権を安全に移転します。

---

<!-- class: compact -->

# モジュールと関数

<div class="columns">
<div>

### モジュール
構造体や関数を定義するコード単位で、プロジェクトを整理します。

### 関数
オンチェーンのビジネスロジックを実装するエントリポイントです。

</div>
<div>

### 可視性
**Public:** モジュール外から呼び出し可能
**Private:** モジュール内に限定
**Entry:** トランザクションから呼び出し可能

### 例
Sui上で代替可能トークン（Fungible Token）を作成・管理するモジュール。

</div>
</div>

---

<!-- class: compact-sm -->

## Moveプロジェクトの基本構成

### Move.toml
- プロジェクトの主要な設定ファイル
- プロジェクト名、依存関係、公開アドレスの情報を含む
- Node.jsのpackage.jsonやRustのCargo.tomlに相当

### sources/
- プロジェクトの主要なソースコードを格納するディレクトリ
- .moveファイルにスマートコントラクトのコードを記述
- 各Moveモジュールは別ファイルで定義

### tests/
- テスト用のディレクトリ
- テストファイルは通常 `_test.move` 接尾辞
- スマートコントラクトのユニットテストを記述

---

# 代表的な設計パターン

### データをオブジェクトとして扱う
Suiのモデルはデータをオブジェクト（所有または共有）として保存します。

### SuiのCapability（権限）
Capabilityによってアクセスを制御し、許可された操作のみを許容します。

### One-time Witnessパターン
一意に作成された証明オブジェクトにより、操作を一度だけ実行可能にします。

---

# セキュリティの考慮事項

<div class="columns">
<div>

### ガス最適化
高コストなトランザクションによるサービス拒否を避けるため、コストを最小化します。

</div>
<div>

### リエントランシー対策
リソースモデルによりリエントランシー攻撃を効率的に阻止します。

### 形式検証
重要なコントラクトロジックの正しさを数学的に証明します。

</div>
</div>

---

# 演習

• 参考: Suiドキュメント「はじめてのスマートコントラクト」。
(https://docs.sui.io/guides/developer/writing-your-first-smart-contract)

• スマートコントラクトを実装: トークン作成、所有権移転、Capabilityを用いたリソース管理。

---

# ありがとうございました。
