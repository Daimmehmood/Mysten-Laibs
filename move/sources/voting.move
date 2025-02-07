module mysten_voting::voting {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;
    use sui::pay;
    use std::vector;

    // Error codes
    const EInsufficientPayment: u64 = 1;

    // Events
    struct ProposalCreated has copy, drop {
        proposal_id: address,
        title: vector<u8>,
        description: vector<u8>
    }

    struct VoteCast has copy, drop {
        proposal_id: address,
        voter: address,
        vote: bool
    }

    // A proposal that can be voted on
    struct Proposal has key {
        id: UID,
        title: vector<u8>,
        description: vector<u8>,
        yes_votes: u64,
        no_votes: u64,
        creator: address
    }

    // Treasury to store the payment
    struct Treasury has key {
        id: UID,
        balance: Coin<SUI>
    }

    // Create the treasury
    fun init(ctx: &mut TxContext) {
        transfer::share_object(Treasury {
            id: object::new(ctx),
            balance: coin::zero<SUI>(ctx)
        })
    }

    // Create a new proposal
    public entry fun create_proposal(
        title: vector<u8>,
        description: vector<u8>,
        coins: vector<Coin<SUI>>,
        treasury: &mut Treasury,
        ctx: &mut TxContext
    ) {
        let required_payment: u64 = 1_000_000_000; // 1 SUI
        
        // Merge all coins into one
        let payment = vector::pop_back(&mut coins);
        pay::join_vec(&mut payment, coins);
        
        // Check payment amount
        assert!(coin::value<SUI>(&payment) >= required_payment, EInsufficientPayment);
        
        // Split exact payment and refund excess
        let paid = coin::split(&mut payment, required_payment, ctx);
        if (coin::value(&payment) > 0) {
            transfer::public_transfer(payment, tx_context::sender(ctx));
        } else {
            coin::destroy_zero(payment);
        };
        
        // Add to treasury
        coin::join(&mut treasury.balance, paid);
        
        // Create the proposal
        let proposal = Proposal {
            id: object::new(ctx),
            title,
            description,
            yes_votes: 0,
            no_votes: 0,
            creator: tx_context::sender(ctx)
        };

        // Emit creation event
        event::emit(ProposalCreated {
            proposal_id: object::uid_to_address(&proposal.id),
            title,
            description
        });

        // Transfer the proposal to shared ownership
        transfer::share_object(proposal);
    }

    // Vote on a proposal (free)
    public entry fun vote(
        proposal: &mut Proposal,
        vote: bool,
        ctx: &mut TxContext
    ) {
        // Record the vote
        if (vote) {
            proposal.yes_votes = proposal.yes_votes + 1;
        } else {
            proposal.no_votes = proposal.no_votes + 1;
        };

        // Emit vote event
        event::emit(VoteCast {
            proposal_id: object::uid_to_address(&proposal.id),
            voter: tx_context::sender(ctx),
            vote
        });
    }

    // View functions
    public fun get_votes(proposal: &Proposal): (u64, u64) {
        (proposal.yes_votes, proposal.no_votes)
    }

    public fun get_treasury_balance(treasury: &Treasury): u64 {
        coin::value(&treasury.balance)
    }
}
