# Sui AI Agent デモ

このサンプルは、Sui の開発者向けイベントで「AI エージェントからウォレット操作を呼び出す」体験を提供するための最小構成プロジェクトです。OpenAI の関数呼び出しと Nimbus の `@getnimbus/sui-agent-kit` を組み合わせ、CLI でプロンプトを入力すると Sui の保有資産を取得して整理表示してくれます。

## できること
- CLI から自然言語で質問すると、OpenAI (`gpt-4o-mini`) が回答
- 保有資産に関する質問が来れば、AI が自動で `get_holdings` ツールを呼び出し
- `SuiAgentKit` が Sui RPC からウォレット残高を取得し、AI が表形式に整形して出力

## 事前準備
1. **OpenAI API キー** を取得し、課金設定を完了しておきます  
2. **Sui プライベートキー**（Base64 または `0x` 形式）と接続したい **RPC URL**（例: `https://fullnode.testnet.sui.io:443`）を用意  
3. プロジェクト直下に `.env` を作成し、以下を記入
   ```bash
   OPENAI_API_KEY=sk-...
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
1. Node.js スクリプト (`index.js`) が OpenAI クライアントと `SuiAgentKit` を初期化  
2. ユーザー入力を `gpt-4o-mini` に渡し、関数呼び出しツール（`get_holdings`）を解決  
3. ツールが呼ばれた場合は `agent.getHoldings()` が RPC からトークン情報を取得  
4. 取得した JSON を再度 OpenAI に渡し、テーブル形式のテキストに整形して出力

## 参考リンク
- Nimbus Sui Agent Kit ドキュメント: https://docs.getnimbus.io/introduction
- ワークショップ用スライド/資料: https://www.canva.com/design/DAGzSCxJHf8/MR806r6TvHZNZ7iN7vyKlA/edit?utm_content=DAGzSCxJHf8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

イベント内では、このリポジトリを配布して環境変数を設定 → `node index.js` を実行 → プロンプトを通じて Sui エコシステム上の資産管理を疑似的に体験してもらう構成を想定しています。さらにツールを追加すれば、トランザクション送信や NFT 閲覧などの拡張デモも可能です。
