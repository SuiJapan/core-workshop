# Shinami Gas Station デモ

このサンプルは、Sui の開発者イベントで「スポンサー付きトランザクション（Gas Station）」の使い方を体験してもらうために用意した教材です。ウォレットにガス代がなくてもトランザクションを送れるようにする仕組みを、Next.js 製のデモアプリと最小限のスクリプトで確認できます。

## できること
- ブラウザから Sui ウォレット（Sui Wallet, Suiet など）に接続し、テストネット残高を確認
- Shinami Gas Station API を使って、`clock::access` トランザクションにスポンサー署名を追加
- 送信者のウォレット署名とスポンサー署名をまとめて Sui testnet に送信
- `gas_station_min.ts` で Node.js から同じフローを再現

## 事前準備
1. Shinami のダッシュボードで Gas Station 用の API キーを発行  
2. ルート直下に `.env.local` を作成し、次を設定
   ```bash
   NEXT_PUBLIC_SHINAMI_ACCESS_KEY=発行したAPIキー
   ```
   `NEXT_PUBLIC_` と付いていますが、このサンプルではサーバーサイドの API ルートのみで参照し、ブラウザに露出しないようにしています。

## 使い方
1. 依存関係をインストール  
   ```bash
   npm install
   ```
2. 開発サーバーを起動  
   ```bash
   npm run dev
   ```
3. ブラウザで表示されたページからウォレットを接続し、`Execute Transaction` ボタンでスポンサー付きトランザクションを送信  
4. 成功するとトランザクションダイジェストと SuiVision へのリンクが表示されます

## フロー概要
1. ブラウザ側 (`app/page.tsx`) でトランザクションの `txKind` を組み立てる  
2. `/api/sponsor` に `txKind` と送信者アドレスを POST  
3. サーバー側で Shinami Gas Station API (`gas_sponsorTransactionBlock`) を呼び出し、スポンサー署名付きトランザクションを取得  
4. ウォレットで送信者署名を付与し、両方の署名を添えて Testnet へ送信  
5. 完了後に残高を再取得し、スポンサーがガスを負担したことを確認

## リンク
- デモ公開版: https://sui-gas-station-demo.vercel.app/
- Shinami 公式: https://www.shinami.com/
- Sui 公式ドキュメント: https://docs.sui.io/

Sui のスポンサー付きトランザクションを短時間で説明したい場面で、そのままデモしたり、コードリーディング用の教材としてご利用ください。
