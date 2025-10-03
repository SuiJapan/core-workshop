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

1. Sui のための高度な Move 概念
2. テストと検証 & ガス最適化
3. 共有オブジェクトと動的フィールド
4. Clock オブジェクトと時間、分散型ガバナンス
5. Sui フレームワークとライブラリ連携
6. 実践演習

---

<!-- _class: compact-sm -->

# 高度な Move 概念

| 概念 | 説明 | 高度なオブジェクトへの関連性 |
|------------|-----------------|-----------------------------------|
| オブジェクト中心のグローバルストレージ | Sui はグローバルストレージを廃し、固有 ID を持つオブジェクトによりスケーラビリティと並列実行を実現 | 既存のストレージモデルに代わる Sui の中核 |
| アドレスとオブジェクト ID | オブジェクトとアカウントは 32 バイト識別子。オブジェクトは `id:UID` に ID を保持 | 一意なアドレス指定を担保し、オブジェクト管理に必須 |
| key アビリティを持つオブジェクト | `key` が必要で、最初のフィールドは `id:UID`。バイトコード検証器により強制 | オンチェーンの第一級エンティティとしての定義 |
| モジュール初期化子 | パッケージ公開時に 1 度だけ実行される特別関数。シングルトン等のセットアップに使用 | コントラクトの初期オブジェクト作成を容易化 |
| エントリ関数 | PTB から呼び出し可能。オンチェーン乱数など原子的操作に用いられ、引数に制約あり | 複雑なトランザクションでのオブジェクト操作を強化 |
| 所有権モデル | 単独所有（所有者のみ可変）、共有（誰でも可変・合意必要）、不変（変更不可） | アクセス制御とセキュリティ設計の要 |
| 動的フィールド | 実行時にフィールド追加/削除が可能で柔軟なデータ構造を実現 | 拡張可能なオブジェクト設計に有効 |

---

# 所有権モデル

単独所有（所有者のみが変更可）、共有オブジェクト（誰でも変更可だが合意が必要）、不変オブジェクト（変更不可。パッケージ等で利用）を解説。

リンク: https://docs.sui.io/concepts/object-model

### 例
頻繁にアドレス所有されるオブジェクトの例として Coin オブジェクトがあります。アドレス `0xA11CE` が 100 SUI を持つコイン `C` を保有し、アドレス `0xB0B` に 100 SUI を送金したい場合、`C` を `0xB0B` に転送します。

```move
transfer::public_transfer(C, @0xB0B);
```

これにより `C` の新しいアドレス所有者は `0xB0B` となり、`0xB0B` はその 100 SUI を使用できます。

---

# 高度機能: PTB（Programmable Transaction Blocks）

### トランザクション形式

PTB には実行意味論に関わる 2 つの重要要素があります。その他（送信者やガス上限など）は参照されることはあってもここでは範囲外です。PTB の構造は以下の通りです:

```json
{
  "inputs": [Input],
  "commands": [Command]
}
```

- `inputs` は引数のベクタ
- `commands` はコマンドのベクタで、例: `TransferObjects`, `SplitCoins`, `MakeMoveVec`, ...

https://docs.sui.io/concepts/transactions/prog-txn-blocks

---

<!-- _class: compact -->

# テスト、検証、ガス最適化

### テスト

`#[test]` 属性を用いたユニットテストで正しさを担保。

例: `assert!(2 + 2 == 4);`

Sui CLI でテスト実行:
```bash
sui move test
```

```move
#[test]
fun test_sword_create() {
    // テスト用のダミー TxContext を作成
    let mut ctx = tx_context::dummy();
    
    // 剣を作成
    let sword = Sword {
        id: object::new(&mut ctx),
        magic: 42,
        strength: 7,
    };
    
    // アクセサが正しい値を返すか検証
    assert!(sword.magic() == 42 && sword.strength() == 7, 1);
}
```

⇒ テストガイド | サンプルコード

---

<!-- _class: compact -->

# テスト、検証、ガス最適化

### 検証（Formal Verification）

Move Prover を用いてスマートコントラクトを形式検証。

例: 特定条件下で関数がアボートすることを証明。

・モジュール／関数／フィールド／構造体などの補完:

```move
use sui::coin::{TreasuryCap, CoinMetadata};
use sui::balance::{take};
use sui::clock::{total_supply};
use sui::coin::{treasury_into_supply};
// テスト用の共有オブジェクト
public struct Registry has key {
    id: UID,
    metadata: CoinMetadata<LOCKED_COIN>,
}
```

Sui Move Analyzer

---

<!-- _class: compact -->

# テスト、検証、ガス最適化

### ガス最適化

ストレージ使用量や計算量を抑え、ガスコストを最小化。

```move
// ロッカーを紐付けるために使用する共有オブジェクト
///
public struct Registry has key {
    id: UID,
    metadata: CoinMetadata<LOCKED_COIN>,
}

public struct LOCKED_COIN has drop {}

public struct Locker has store {
    start_date: u64,
    final_date: u64,
    original_balance: u64,
    balance: Balance<LOCKED_COIN>,
}
```

スマートコントラクト関数のガス予算の確認:
https://docs.sui.io/concepts/tokenomics/gas-in-sui

⇒ Sui ガスモデル

---

<!-- _class: compact -->

# 共有オブジェクトと動的フィールド

### 共有オブジェクト

複数の当事者が協調してアクセス・更新できるオブジェクト。

例: 分散型取引所（DEX）における共有オブジェクト。

```move
// init は公開時に 1 度だけ呼ばれるため、
/// 共有オブジェクト初期化の適所となることが多い。
fun init(ctx: &mut TxContext) {
    transfer::transfer(ShopOwnerCap {
        id: object::new(ctx)
    }, ctx.sender());
    
    // 共有化して誰でもアクセス可能に！
    transfer::share_object(DonutShop {
        id: object::new(ctx),
        price: 1000,
        balance: balance::zero()
    })
}
```

https://docs.sui.io/concepts/object-ownership/shared

---

<!-- _class: compact-sm -->

# 共有オブジェクトと動的フィールド

### 動的フィールド

実行時にオブジェクトへフィールドを追加でき、柔軟なデータ構造を実現。

例: NFT にメタデータを動的に追加。

動的フィールドには「フィールド」と「オブジェクトフィールド」の 2 種類があり、値の格納方法が異なる:

| 種類 | 説明 | モジュール |
|------|-------------|--------|
| フィールド | `store` を持つ任意の値を格納可能。ただしここにオブジェクトを格納するとラップされ、外部ツール（エクスプローラやウォレット等）から ID で直接アクセス不可。 | `dynamic_field` |
| オブジェクトフィールド | 値はオブジェクト（`key` アビリティを持ち、`id: UID` が最初のフィールド）に限るが、ID で外部ツールからアクセス可能。 | `dynamic_object_field` |

https://docs.sui.io/concepts/dynamic-fields

---

# Clock オブジェクトと時間、分散型ガバナンス

### Clock オブジェクトと時間
オンチェーン時間にアクセスして、時間依存ロジックを記述。
例: ベスティング（権利確定）スケジュールに `sui::clock::timestamp_ms` を使用。

### 分散型ガバナンス
ケイパビリティと共有オブジェクトを用いてガバナンスを実装。
例: SIPs（Sui Improvement Proposals）によるプロトコルアップグレードの投票。

時間アクセス | SIPs リポジトリ

---

# Sui フレームワークとライブラリの連携

### Sui フレームワーク
標準の Sui モジュールを活用して開発を効率化。
例: `sui::coin` によるカスタムトークン実装。

詳細

### ライブラリ
共通機能を提供する標準ライブラリを活用。
例: `sui::vector` による可変長配列。

詳細

---

<!-- _class: compact -->

# 実践演習

### NFT の作成
名前や説明などのメタデータを持つ NFT 構造体を定義。

### マーケットプレイスのロジック
`Listing` リソースを用いて出品および購入を可能にする関数を実装。

```move
module example::marketplace {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use example::nft::MyNFT;
    
    struct Listing has key, store {
        id: UID,
        nft: MyNFT,
        price: u64,
        seller: address,
    }
    
    public fun list_for_sale(nft: MyNFT, price: u64, ctx: &mut TxContext): Listing {
        Listing {
            id: object::new(ctx),
            nft,
            price,
            seller: tx_context::sender(ctx),
        }
    }
    
    public fun buy(listing: Listing, ctx: &mut TxContext) {
        let buyer = tx_context::sender(ctx);
        assert!(buyer != listing.seller, 101); // 購入者は出品者と同一であってはならない
        transfer::public_transfer(listing.nft, buyer);
        // 代金の移転ロジックはここに実装（例: Sui の coin モジュールを利用）
    }
}
```

---

# ありがとうございました

