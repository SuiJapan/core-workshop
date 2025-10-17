---
marp: true
theme: slides
backgroundColor: #0a1628
color: #ffffff
---

![bg cover](../common/cover-bg.svg)

# 最初の<br>スマートコントラクトを作る

高度な Move の概念、Sui 固有機能、
フレームワーク連携、実践プロジェクト


---

# アジェンダ

1. **高度な Move 概念**（Sui 向け）
2. **所有権モデル**（単独/共有/不変）
3. **PTB**（Programmable Transaction Blocks）
4. **テストと検証 & ガス最適化**
5. **共有オブジェクトと動的フィールド**
6. **Sui Kioskについて**
7. **Clock と時間／分散型ガバナンス**
8. **Sui フレームワーク & ライブラリ連携**
9. **ワークショップ**


---

# 高度な Move 概念（1/2）

| 概念                | 説明                                           | 関連性          |
| ----------------- | -------------------------------------------- | ------------ |
| **オブジェクト中心ストレージ** | Suiはグローバルストレージを廃し、固有IDを持つオブジェクトで管理      | 並列実行・スケールの中核 |
| **アドレスとオブジェクトID** | どちらも32バイト識別子。オブジェクトは`id: UID`を最初に持つ   | 一意性・追跡に必須    |
| **`key` アビリティ**   | オンチェーンの第一級エンティティ。最初のフィールドは `id: UID` が必須 | 検証器によって強制    |

> 参考：Move Book（日本語） [https://move-book.com/](https://move-book.com/)

---

# 高度なMove概念（2/2）

| 概念                  | 説明                           | 関連性           |
| ------------------- | ---------------------------- | ------------- |
| **モジュール初期化子（init）** | パッケージ公開時に1度だけ実行        | シングルトン/権限の初期化 |
| **エントリ関数（entry）**   |PTBから直接呼べる関数（引数/戻り値に制約） | ユーザー操作の入口     |
| **所有権モデル**          | 単独所有 / 共有 / 不変               | アクセス制御の設計指針   |
| **動的フィールド**         | 実行時にキー/値を追加                  | 拡張性の高いデータ設計   |

---

## 高度なMove概念（やさしい説明）

* **オブジェクト** = 「名前札の付いた箱」。`UID` がその名前札。
* **`key`** = 「箱をブロックチェーンの外に出さない約束」。最初に `id: UID` を入れる決まり。
* **init** = 「お店の開店準備」。公開時に一度だけ棚や店長証（Capability）を用意。
* **entry** = 「お客さんが押すボタン」。トランザクションから直接呼べる関数。

> まずは “箱を作る→誰かに渡す” をマスターしよう。

---

## init と Capability（例）

```move
module workshop::admin_cap {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;

    public struct AdminCap has key, store { id: UID }

    fun init(ctx: &mut TxContext) {
        let cap = AdminCap { id: object::new(ctx) };
        transfer::public_transfer(cap, tx_context::sender(ctx));
    }
}
```

> 公開時に一度だけ権限オブジェクトを作成→デプロイヤに渡す。

---

# 所有権モデル（概観）

* **単独所有**：所有者のみ変更可能（速い）
* **共有オブジェクト**：誰でも変更可能だが合意が必要（遅くなりやすい）
* **不変オブジェクト**：変更不可（パッケージなど）

リンク：[https://docs.sui.io/concepts/object-model](https://docs.sui.io/concepts/object-model)

---

## 所有権モデル（優しいたとえ）

* **単独所有**：自分の財布。中身をいじれるのは持ち主だけ → 速い。
* **共有オブジェクト**：学校の掲示板。みんなが書けるが、ルールが必要 → 遅くなりやすい。
* **不変**：校則集。あとで変えられない → ルールの参照用。

> 迷ったらまずは **単独所有** で作るのが理解の近道。

---

## 所有権モデル（コード例）

```move
// コイン C を 0xB0B へ譲渡
transfer::public_transfer(C, @0xB0B);
```

> 所有者が変わると、操作できる主体も移ります。

---

# PTB（Programmable Transaction Blocks）

**構造（最低限）**

```json
{
  "inputs": [Input],
  "commands": [Command]
}
```

* `inputs`：引数群
* `commands`：操作列（例：`TransferObjects`, `SplitCoins`, `MoveCall`, `MakeMoveVec`）

参考： [https://docs.sui.io/concepts/transactions/prog-txn-blocks](https://docs.sui.io/concepts/transactions/prog-txn-blocks)

---

## PTB（やさしい説明）

* **レシピ帳**：`inputs`（材料） と `commands`（手順）のセット。
* 例：

  1. コインを割る（`SplitCoins`）
  2. 手数料を払う（`Pay`）
  3. NFT を渡す（`TransferObjects`）
* 1回のトランザクションで **複数の手順** を安全にまとめて実行できる。

---

# テストと検証 & ガス最適化（概観）

* **ユニットテスト**：`#[test]` + `tx_context::dummy()`
* **形式検証（Move Prover）**：仕様で安全性を証明
* **ガス最適化**：コピー削減、共有の抑制、ストレージ節約

---

## なぜテスト/検証/最適化？

* **テスト**：壊れていないかを素早く確認（小テスト）。
* **Prover**：数学の先生。理屈で「必ず安全」を証明。
* **ガス最適化**：荷物を軽くして、安く・速く。

> アプリが大きくなる前に“習慣化”しておくのがコツ。

---

## ユニットテスト（最小例）

```move
module workshop::tests {
    use std::string::utf8;
    use sui::tx_context as tx;
    use workshop::nft;

    #[test]
    fun mint_works() {
        let mut ctx = tx::dummy();
        nft::mint(utf8(b"A"), utf8(b"B"), utf8(b"C"), &mut ctx);
        // アボートしなければ最小合格
    }
}
```

CLI：`sui move test`

---

## Move Prover（超入門）

```move
module workshop::safe_math {
    public fun add(a: u64, b: u64): u64 { a + b }

    spec add {
        ensures result >= a && result >= b;
        aborts_if false;
    }
}
```

* `requires` / `ensures` / `aborts_if` を使って性質を定義
* 実行：`sui move prove`

---

## ガス最適化の指針

* `copy` 乱用を避ける（`copy` アビリティ付与は慎重に）
* **イベントで履歴**、恒久保存は最小限
* 巨大 `vector<T>` の再構築を避ける
* **共有オブジェクトは必要最小限**（合意コスト）

---

# 共有オブジェクトと動的フィールド（概観）

* **共有オブジェクト**：複数主体で更新
* **Dynamic Field**：親 `UID` に任意値（`store`）をキー付き保存
* **Dynamic Object Field**：親 `UID` に **オブジェクト（`key`）** をキー付き保存

---

## 動的フィールド（やさしい説明）

* **あとから付け足せる引き出し**。
* **Dynamic Field**：メモ（任意の値）を貼るイメージ。
* **Dynamic Object Field**：小さな箱（`key`オブジェクト）を差し込むイメージ。IDで見つけやすい。

> NFTに「称号」「レベル」などを後から足す時に便利。

---

## 共有オブジェクト（初期化パターン）

```move
fun init(ctx: &mut TxContext) {
    transfer::share_object(DonutShop {
        id: object::new(ctx),
        price: 1000,
    });
}
```

> 公開時に `share_object` して、誰でも操作できる板・プール等に。

---

## Dynamic Field / Dynamic Object Field の違い

| 種類                   | 値            | 参照性                     |
| -------------------- | ------------ | ----------------------- |
| Dynamic Field        | 任意の `store`  | 値がラップされ ID 直参照は不可       |
| Dynamic Object Field | `key` オブジェクト | **オブジェクトID** で外部から辿りやすい |

---

## Dynamic Field（例）

```move
module workshop::attrs {
    use std::string::String;
    use sui::dynamic_field as df;
    use workshop::nft::Nft;

    public fun put_attr(nft: &mut Nft, key: String, val: String) {
        df::add(&mut nft.id, key, val);
    }
}
```

---

## Dynamic Object Field（例）

```move
module workshop::child_link {
    use sui::dynamic_object_field as dof;
    use sui::object::{Self, UID};

    public struct Child has key, store { id: UID }

    public fun link(parent: &mut UID, child: Child) {
        let id = object::uid_to_inner(&child.id);
        dof::add(parent, id, child);
    }
}
```

---

## Suiにおけるマーケットプレイス

* SuiではKioskというマーケットプレイス用のフレームワークがあります。
* アセットを保存して販売リストを作成したり、オークションなどのカスタム取引機能を利用したりすることができます。

---

## Kiosk とは？（概要）

* **Sui ネイティブ**のオンチェーンコマース基盤（フレームワーク標準）。
* クリエイターは **取引ルール（ポリシー）** を定義でき、取引ごとに適用。
* **購入が完了する瞬間まで**、出品資産の“本当の所有者”は出品者のまま（安全）。
* マーケットは Kiosk の**イベントを購読**して一覧・検索を提供できる。

---

## 8-11. Kiosk の主要パーツ

* **Kiosk**：資産を置く場所（多くの操作を第三者が安全に扱えるよう設計）
* **KioskOwnerCap**：Kiosk に対する**所有者権限の証明**（オーナーだけが特権操作）
* **Item / Listing**：置いた資産と販売情報
* **PurchaseCap**：専用購入権（特定の購入者に“専用枠”を与える上級機能）
* **TransferPolicy**：クリエイターが定義する**取引ルール**（例：ロイヤリティ支払い、制限付き転送）

> Cap（権限）と Policy（ルール）の二本柱で「安全な売買」と「作者の意図」を両立します。

---

## 8-12. アイテムの状態（ざっくり）

* **placed**：Kiosk に置いた状態。オーナーは取り出し可能。
* **locked**：取り出し不可。**売買を経ないと**外に出せない（強い拘束）。
* **listed**：価格を付けて出品中。他人が購入でき、編集は不可。
* **listed_exclusively**：特定の **PurchaseCap** と組み合わせた専用出品（高度）。

> `locked` は **TransferPolicy が存在**する前提で使うのが安全（取り出せず“閉じ込め”ないように）。

---

## 8-13. TransferPolicy（何ができる？）

* 取引ごとに **TransferRequest** が作られ、Policy 側で検証・処理。
* 代表例：

  * **Royalty Rule**：再販売時に作者へロイヤリティ送付
  * **Lock Rule**：Kiosk 以外への不正な転送を**禁止**
  * 会員特典：特定オブジェクト保有者は手数料免除 など
* ルールの変更は**即時・全体**に反映できる設計（設計例）。

> クリエイターは「どう転送されたら困るか」をルール化し、マーケットはそれを尊重して売買を成立させます。

---

## 8-14. このワークショップ実装との関係

* 今日は **最小の非 Kiosk 市場**で“所有権の移動”を体験します。
* 実用化の順序例：

  1. NFT タイプに **TransferPolicy** を実装（ロイヤリティ等）
  2. 出品者ごとに **Kiosk** を作成 → NFT を **place / lock**
  3. **list** → **purchase** のフローを UI/SDK で実装
  4. 収益の回収や手数料の送金処理を**SDK**で補助
* クライアントからは **Kiosk SDK（TypeScript）** を使うと実装が楽です。

> まずは「動く最小形」を押さえ、のちに Kiosk へ段階的に移行するのが現実的です。

---

## 8-15. 参考リンク

* Kiosk（標準ドキュメント）: [https://docs.sui.io/standards/kiosk](https://docs.sui.io/standards/kiosk)
* Kiosk Apps: [https://docs.sui.io/standards/kiosk-apps](https://docs.sui.io/standards/kiosk-apps)
* フレームワーク `sui::kiosk` 参照: [https://docs.sui.io/references/framework/sui_sui/kiosk](https://docs.sui.io/references/framework/sui_sui/kiosk)
* フレームワーク `sui::transfer_policy` 参照: [https://docs.sui.io/references/framework/sui_sui/transfer_policy](https://docs.sui.io/references/framework/sui_sui/transfer_policy)
* Kiosk SDK（TypeScript）: [https://sdk.mystenlabs.com/kiosk](https://sdk.mystenlabs.com/kiosk)

---

# Clockと時間／分散型ガバナンス（概観）

* `Clock` はネットワークに 1 つの共有オブジェクト
* `clock::timestamp_ms(&Clock)` で現在時刻（ミリ秒）
* ガバナンスは **Capability + 共有オブジェクト + ルール** で表現

---

## Clockとガバナンス（やさしい説明）

* **Clock**：みんなが信用する **公式時計**。ズルできない。
* **ガバナンス**：投票用の鍵（Capability）を配り、結果を共有オブジェクトに記録。
* 例：一定時間後にだけミント可能、一定票数で実行可など。

---

## Clock（例）

```move
use sui::clock::{Self, Clock};

public entry fun mint_after(deadline_ms: u64, clock: &Clock /*, ... */) {
    let now = clock::timestamp_ms(clock);
    assert!(now >= deadline_ms, 1);
    // 期限を過ぎていれば続行
}
```

---

## ガバナンス（例）

```move
public struct Governor has key, store { id: UID, yes: u64, no: u64 }
public struct VoteRight has key, store { id: UID }

public entry fun vote_yes(g: &mut Governor, _vr: VoteRight) { g.yes = g.yes + 1 }
```

> 実運用：二重投票防止・期限制御・クォーラムを追加。

---

# フレームワーク & ライブラリ連携

* `sui::coin`（カスタムトークン / `TreasuryCap<T>`）
* `sui::pay`（支払いユーティリティ）
* `sui::event`（イベント発行）
* `sui::transfer` / `sui::object`（転送/生成）
* `std::string` / `std::vector`（基本構造）

```move
use sui::event;

public struct Minted has drop { name: vector<u8> }
public fun emit_minted(n: vector<u8>) { event::emit(Minted { name: n }) }
```

---

## 工具箱としてのフレームワーク

* `sui::coin` = お金の型・金庫の鍵（`TreasuryCap<T>`）
* `sui::pay` = 支払い・おつり計算
* `sui::event` = 連絡網（履歴を外に出す）
* `std::string` / `std::vector` = メモと箱

> まずは“何があるか”を知っておく。細かい使い方は都度辞書引き。

---

# ここからはワークショップ

この先は**手を動かす時間**です。スライドのコードはコピペOK。まずは動かすことを最優先に進めます。

---

# 8. ワークショップ（ハンズオン開始）

* 目標：最小の **NFT** を作って動かす
* 方式：講師の投影に合わせて **写経（code-along）**
* ゴール：`publish` → `call` で **動作確認ができる**

> 「完璧な設計」よりも「動く体験」をしてみよう！

---

## 8-1. 進め方

1. `sui move new nft_workshop` で新しいパッケージを作成
2. NFTのコードを作成
3. `sui move publish` → `call` で動作確認
4. 分からない所はその場で質問OK（手が止まったら合図）

---

## 8-2. 教材リポジトリ

* リポジトリ：`SuiJapan/nft-mint-sample`

  * URL: [https://github.com/SuiJapan/nft-mint-sample](https://github.com/SuiJapan/nft-mint-sample)
  * **`contracts/`** に Move の見本コード
* VS Code で開き、（必要なら）Devコンテナで実行
* この章では、`contracts/` を **見本** にしながら自分のパッケージに写経します

---

## 8-3. 新しいパッケージを作る

**どこで実行する？** → リポジトリの**ルート**（`contracts/` と同じ階層）がおすすめ。

```bash
# リポジトリのルートで（例: nft-mint-sample/ の直下）
sui move new nft_workshop
```

* すると `./nft_workshop/` が作られます（`Move.toml` と `sources/` を含む）
* 自分で `sources/nft.move` を作ります

---

## 8-4. Move.toml の設定（名前付きアドレス）

`nft_workshop/Move.toml` に **`nft`**** アドレス** を追加します。

```toml
[package]
name = "nft_workshop"
version = "0.0.1"

[addresses]
# 見本コードは `module nft::nft;` なので、`nft` を定義
nft = "0x0"
```

> 以降、モジュールは `module nft::nft { ... }` と書けます。

---

## 8-5. ファイル作成：`sources/nft.move`

1. リポジトリで `contracts/nft.move` を開く
2. nftのコントラクトを見本を見ながら作成してみよう

---
## 8-6. 重要ポイント（コード解説）

* **`module nft::nft`**：`Move.toml` の `[addresses] nft = "0x0"` とペア（名前付きアドレス）。
* **`WorkshopNFT has key, store`**：オンチェーン第一級オブジェクト。最初のフィールドは **`id: UID`**** 必須**。
* **`init`**** + ****`package::claim`**：Publish時だけ使える**ワンタイム証明**で `display` を初期化、`update_version()` で有効化。
* **`mint`**** → ****`mint_internal`**：エントリは入口、ロジックは内部関数へ分離（再利用しやすくテストもしやすい）。
* **`assert!`**** による最小バリデーション**：空文字など明らかな不正を早期に弾く。
---

## 8-7. Publish & Call（動かす）

```bash
# nft_workshop ディレクトリで
cd nft_workshop

# ビルド
sui move build

# （必要なら）ネットワークを testnet に
sui client switch --env testnet

# 公開（PACKAGE_ID をメモ）
sui client publish --gas-budget 100000000

```

---

```bash
# ミント（単発）
sui client call \
  --package <PACKAGE_ID> \
  --module nft \
  --function mint \
  --args "SuiJapan NFT" "Hello" "https://example.com/image.png" \
  --gas-budget 100000000

# ミント（複数）例
sui client call \
  --package <PACKAGE_ID> \
  --module nft \
  --function mint_bulk \
  --args 2 \
  '["A","B"]' '["descA","descB"]' '["https://ex/a.png","https://ex/b.png"]' \
  --gas-budget 100000000
```


