# Shinami Gas Station デモ

このサンプルは、Sui の開発者イベントで「スポンサー付きトランザクション（Gas Station）」の使い方を体験してもらうために用意した教材です。ウォレットにガス代がなくてもトランザクションを送れるようにする仕組みを、Next.js 製のデモアプリと最小限のスクリプトで確認できます。

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **UI**: React 19 + Tailwind CSS
- **Sui SDK**:
  - `@mysten/dapp-kit` - ウォレット接続とトランザクション署名
  - `@mysten/sui` - Sui ブロックチェーン操作
- **Shinami**: `@shinami/clients` - Gas Station API クライアント
- **状態管理**: TanStack Query (React Query)

## できること

- ブラウザから Sui ウォレット（Sui Wallet, Suiet など）に接続し、テストネット残高を確認
- Shinami Gas Station API を使って、`clock::access` トランザクションにスポンサー署名を追加
- 送信者のウォレット署名とスポンサー署名をまとめて Sui testnet に送信
- `gas_station_min.ts` で Node.js から同じフローを再現

## プロジェクト構成

```
chapter5/shinami/
├── app/
│   ├── layout.tsx              # ルートレイアウト（Providers設定）
│   ├── page.tsx                # メインページ（ウォレット接続とトランザクション実行UI）
│   ├── globals.css             # グローバルスタイル
│   └── api/
│       └── sponsor/
│           └── route.ts        # スポンサー署名取得APIエンドポイント
├── lib/
│   └── providers.tsx           # Sui dApp Kit プロバイダー設定
├── gas_station_min.ts          # Node.js用の最小実装スクリプト
├── package.json                # 依存関係
├── .env.local                  # 環境変数（要作成）
└── README.md                   # このファイル
```

## 事前準備

### 1. Shinamiアカウントを作成

#### 1-1. サインアップ・ログイン
1. [Shinamiサインアップページ](https://app.shinami.com/signup)にアクセス
2. アカウントを作成
   - Googleアカウントでサインアップ（「Continue with Google」ボタン）
   - または、メールアドレスとパスワードで登録

### 2. Gas Station Fundを作成

> **重要**: APIキーを作成する前に、まずFund（資金プール）を作成する必要があります

1. ダッシュボードの**「Sui Gas Station」**ページに移動
2. **「+ Create Fund」**ボタンをクリック
3. Fund設定を入力：
   - **Network**: `Sui Testnet` を選択（テスト用）
   - **Fund Name**: 任意の名前（例: "My Test Fund"）
4. Fundを作成

### 3. Access Key（APIキー）を発行

1. ダッシュボードの**「Access Keys」**ページに移動
2. **「+ Create Key」**ボタンをクリック
3. 以下の情報を入力：
   - **Service**: `Gas Station` ✅
   - **Chain**: `Sui`
   - **Network**: `Sui Testnet`（手順2で作成したFundと同じネットワーク）
   - **QPS Limit**: リクエスト数の上限（例: 10）
   - **Gas Station Fund**: 手順2で作成したFundを選択
   - **Key Name**: 任意の名前（例: "Gas Station Dev Key"）
4. **「+ Create key」**をクリック
5. 生成されたAPIキーをコピー
   - ⚠️ **重要**: APIキーは一度しか表示されないので、必ず安全な場所に保存してください

APIキーの形式: `us1_sui_testnet_xxxxxxxxxxxxx`

### 4. 環境変数を設定

1. プロジェクトルート（`chapter5/shinami/`）に `.env.local` を作成
2. 次の内容を設定：
   ```bash
   NEXT_PUBLIC_SHINAMI_ACCESS_KEY=us1_sui_testnet_xxxxxxxxxxxxx
   ```
   - `NEXT_PUBLIC_` と付いていますが、このサンプルではサーバーサイドの API ルートのみで参照し、ブラウザに露出しないようにしています

## 使い方

### 1. 依存関係をインストール

```bash
npm install
```

### 2. 開発サーバーを起動

```bash
npm run dev
```

### 3. ブラウザでアプリを開く

1. ブラウザで `http://localhost:3000` にアクセス
2. **「Connect Wallet」**ボタンをクリックしてウォレットを接続
   - Sui Wallet、Suiet など対応ウォレットが選択可能
3. ウォレットが接続されると、アドレスと残高が表示されます
4. **「Execute Transaction (Clock Access)」**ボタンをクリック
5. ウォレットで署名を承認
6. 成功するとトランザクションダイジェストと SuiVision へのリンクが表示されます

### 4. Node.jsスクリプトで試す（オプション）

`gas_station_min.ts` を使って、ブラウザなしでも同じフローを確認できます：

```bash
# シークレットキーを設定
# gas_station_min.ts の SENDER_SECRET を自分の秘密鍵に置き換える

# 実行
npx esrun gas_station_min.ts
```

## 仕組みの詳細

### フロー概要

```
┌─────────────┐      ┌──────────────┐      ┌───────────────┐      ┌─────────────┐
│ ブラウザ    │ ───→ │ Next.js API  │ ───→ │ Shinami Gas   │      │ Sui Testnet │
│ (page.tsx)  │      │ (/api/sponsor)│      │ Station       │      │             │
└─────────────┘      └──────────────┘      └───────────────┘      └─────────────┘
      │                     │                      │                      │
      │ 1.TX Kind作成       │                      │                      │
      │────────────────────→│                      │                      │
      │                     │ 2.スポンサー署名要求  │                      │
      │                     │────────────────────→│                      │
      │                     │                      │ 3.スポンサー署名      │
      │                     │←────────────────────│                      │
      │ 4.スポンサー情報取得 │                      │                      │
      │←────────────────────│                      │                      │
      │ 5.ウォレットで署名   │                      │                      │
      │ (送信者署名)         │                      │                      │
      │ 6.両方の署名でトランザクション実行             │                      │
      │───────────────────────────────────────────────────────────────→│
      │ 7.トランザクション結果                                             │
      │←──────────────────────────────────────────────────────────────│
```

### ステップ詳細

1. **トランザクションKind作成** (`app/page.tsx`)
   - ガス情報を含まない「トランザクションの本体」だけを作成
   - `onlyTransactionKind: true` オプションを使用

2. **スポンサー署名取得** (`/api/sponsor`)
   - サーバーサイドでShinami Gas Station APIを呼び出し
   - `gas_sponsorTransactionBlock` メソッドでスポンサー署名を取得
   - CORSエラーを回避するためAPIルート経由

3. **送信者署名**
   - 接続したウォレットでトランザクションに署名
   - ユーザーの承認が必要

4. **トランザクション実行**
   - 送信者署名とスポンサー署名の両方を添えてSui testnetに送信
   - スポンサー（Shinami）がガス代を負担

5. **残高確認**
   - トランザクション完了後、残高を再取得
   - ガス代が引かれていないことを確認

### 2つの署名の役割

#### 送信者署名（Sender Signature）
- **役割**: トランザクション実行の承認
- **署名者**: ユーザーのウォレット
- **意味**: 「このトランザクションを実行することに同意します」

#### スポンサー署名（Sponsor Signature）
- **役割**: ガス代の支払い保証
- **署名者**: Shinami Gas Station
- **意味**: 「このトランザクションのガス代を私が支払います」

この2つの署名を組み合わせることで、**ユーザーはガス代を支払わずにトランザクションを実行**できます。

### セキュリティ

- ⚠️ **APIキーは公開しないでください**
  - `.env.local` が `.gitignore` に含まれているか確認
  - GitHubなどの公開リポジトリにコミットしない
- ⚠️ **本番環境では追加の保護が必要**
  - レート制限
  - IPホワイトリスト
  - トランザクション検証ロジック

### 本番環境への移行

テストから本番環境に移行する際は：

1. **Mainnet Fundを作成**
   - Shinamiダッシュボードで「Sui Mainnet」を選択
   - 本物のSUIトークンをチャージ

2. **Mainnet用APIキーを発行**
   - Network: `Sui Mainnet`
   - 本番用のQPS制限を設定

3. **環境変数を更新**
   - 本番環境の環境変数に新しいAPIキーを設定

4. **コスト管理**
   - トランザクション使用量を監視
   - 予算アラートを設定
   - 悪用防止策を実装

Sui のスポンサー付きトランザクションを短時間で説明したい場面で、そのままデモしたり、コードリーディング用の教材としてご利用ください。
