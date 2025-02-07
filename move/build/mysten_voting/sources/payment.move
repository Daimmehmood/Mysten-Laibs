module mysten_voting::payment {
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, UID};
    use sui::balance::{Self, Balance};

    // Error codes
    const EInsufficientPayment: u64 = 0;
    const EInvalidTreasury: u64 = 1;

    // Constants
    const REQUIRED_PAYMENT: u64 = 1_000_000_000; // 1 SUI in MIST

    // Treasury capability - only the owner can withdraw
    struct Treasury has key {
        id: UID,
        balance: Balance<SUI>
    }

    // === Events ===
    struct PaymentReceived has copy, drop {
        amount: u64,
        sender: address
    }

    // === Public Functions ===

    /// Initialize the treasury. Called only once by the contract deployer.
    fun init(ctx: &mut TxContext) {
        let treasury = Treasury {
            id: object::new(ctx),
            balance: balance::zero()
        };
        transfer::share_object(treasury);
    }

    /// Pay the required amount to create a proposal
    public fun pay(payment: &mut Coin<SUI>, treasury: &mut Treasury, ctx: &mut TxContext) {
        let amount = REQUIRED_PAYMENT;
        assert!(coin::value(payment) >= amount, EInsufficientPayment);
        
        // Split the exact payment amount
        let paid = coin::split(payment, amount, ctx);
        let paid_balance = coin::into_balance(paid);
        
        // Add to treasury
        balance::join(&mut treasury.balance, paid_balance);

        // Emit event
        sui::event::emit(PaymentReceived {
            amount,
            sender: tx_context::sender(ctx)
        });
    }

    /// Withdraw funds from treasury - only owner can call this
    public entry fun withdraw(
        treasury: &mut Treasury,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == @mysten_voting, EInvalidTreasury);
        
        let coin_balance = balance::split(&mut treasury.balance, amount);
        let withdrawn_coin = coin::from_balance(coin_balance, ctx);
        transfer::public_transfer(withdrawn_coin, recipient);
    }

    // === View Functions ===

    /// Get the required payment amount
    public fun get_required_payment(): u64 {
        REQUIRED_PAYMENT
    }

    /// Get treasury balance
    public fun get_treasury_balance(treasury: &Treasury): u64 {
        balance::value(&treasury.balance)
    }
}
