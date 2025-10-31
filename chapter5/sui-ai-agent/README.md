# Sui AI Agent デモ (Gemini対応)

このサンプルは、Sui の開発者向けイベントで「AI エージェントからウォレット操作を呼び出す」体験を提供するための最小構成プロジェクトです。**Google Gemini** (無料) の関数呼び出しと Nimbus の `@getnimbus/sui-agent-kit` を組み合わせ、CLI でプロンプトを入力すると Sui の保有資産を取得して整理表示してくれます。

> **Note**: このプロジェクトは OpenAI 互換 API を使用しており、Gemini API を OpenAI SDK で利用しています。

## できること
- CLI から自然言語で質問すると、**Google Gemini** (`gemini-2.0-flash-exp`) が回答
- 保有資産に関する質問が来れば、AI が自動で `get_holdings` ツールを呼び出し
- `SuiAgentKit` が Sui RPC からウォレット残高を取得し、AI が表形式に整形して出力
- **完全無料**: Gemini API の無料枠で動作可能（OpenAI API キー不要）

## 事前準備
1. **Google Gemini API キー** を取得（無料）
   - [Google AI Studio](https://aistudio.google.com/app/apikey) にアクセス
   - 「Create API Key」をクリックして API キーを取得
   - 課金設定は不要（無料枠で利用可能）

2. **Sui プライベートキー**（Base64 または `0x` 形式）と接続したい **RPC URL**（例: `https://fullnode.testnet.sui.io:443`）を用意

3. プロジェクト直下に `.env` を作成し、以下を記入
   ```bash
   GEMINI_API_KEY=AIzaSy...
   SUI_PRIVATE_KEY=0x... # または Base64 形式
   RPC_URL=https://fullnode.testnet.sui.io:443
   ```
   ※ 秘密鍵はハードコードせず `.env` のみに保存し、コミットしないよう注意してください

## 実行方法
1. 依存パッケージをインストール  
   ```bash
   npm install
   ```
2. CLI を起動  
   ```bash
   node index.js
   ```
3. `Prompt:` が表示されたら質問を入力  
   - 一般的な質問 → AI がそのまま回答  
   - 「ウォレットの残高は？」など、保有資産を尋ねる → エージェントが `getHoldings()` を呼び出し、AI が結果を表形式で表示

## 動作フロー
1. Node.js スクリプト (`index.js`) が Gemini クライアント（OpenAI 互換）と `SuiAgentKit` を初期化
2. ユーザー入力を `gemini-2.0-flash-exp` に渡し、関数呼び出しツール（`get_holdings`）を解決
3. ツールが呼ばれた場合は `agent.getHoldings()` が RPC からトークン情報を取得
4. 取得した JSON を再度 Gemini に渡し、テーブル形式のテキストに整形して出力

## AI Provider について

### OpenAI 互換 API
このプロジェクトは **OpenAI SDK** を使用していますが、実際には **Google Gemini API** に接続しています。これは Gemini が OpenAI 互換 API を提供しているためです。

```javascript
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
```

### 他の AI Provider への切り替え
OpenAI 互換 API を提供している他のプロバイダー（OpenAI、Claude、Groq など）にも簡単に切り替え可能です：

1. `.env` の API キーを変更
2. `index.js` の `baseURL` を対応するエンドポイントに変更
3. `model` を対応するモデル名に変更

**例: OpenAI に戻す場合**
```javascript
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // baseURL は指定しない（デフォルトで OpenAI）
});
// model: "gpt-4o-mini" に変更
```

## 参考リンク
- **Gemini API**: https://ai.google.dev/gemini-api/docs/openai
- **Google AI Studio** (APIキー取得): https://aistudio.google.com/app/apikey
- **Nimbus Sui Agent Kit** ドキュメント: https://docs.getnimbus.io/introduction
- **ワークショップ用スライド/資料**: https://www.canva.com/design/DAGzSCxJHf8/MR806r6TvHZNZ7iN7vyKlA/edit

イベント内では、このリポジトリを配布して環境変数を設定 → `node index.js` を実行 → **無料の Gemini API** を使ったプロンプトを通じて Sui エコシステム上の資産管理を疑似的に体験してもらう構成を想定しています。さらにツールを追加すれば、トランザクション送信や NFT 閲覧などの拡張デモも可能です。
