module amm::simple_lp;

use sui::balance::{Balance, Supply, zero};

public struct LP<phantom T> has drop {}

public struct Pool<phantom T> has store {
    balance: Balance<T>,
    shares: Supply<LP<T>>,
}

public fun withdraw<T>(pool: &mut Pool<T>, shares_in: Balance<LP<T>>): Balance<T> {
    if (shares_in.value() == 0) {
        shares_in.destroy_zero();
        return zero()
    };

    let balance = pool.balance.value();
    let shares = pool.shares.supply_value();

    let balance_to_withdraw =
        (((shares_in.value() as u128) * (balance as u128)) / (shares as u128)) as u64;

    pool.shares.decrease_supply(shares_in);
    pool.balance.split(balance_to_withdraw)
}

#[spec_only]
use prover::prover::{ensures, requires, old};

#[spec(prove)]
fun withdraw_spec<T>(pool: &mut Pool<T>, shares_in: Balance<LP<T>>): Balance<T> {
    // 前提
    requires(shares_in.value() <= pool.shares.supply_value());
    let old_pool = old!(pool);
    let result = withdraw(pool, shares_in);
    // 検証
    let old_balance = old_pool.balance.value().to_int();
    let new_balance = pool.balance.value().to_int();
    let old_shares = old_pool.shares.supply_value().to_int();
    let new_shares = pool.shares.supply_value().to_int();

    ensures(old_balance.mul(new_shares).lte(new_balance.mul(old_shares)));

    result
}
