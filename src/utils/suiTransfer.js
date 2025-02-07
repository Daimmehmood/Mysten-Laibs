import { TransactionBlock } from '@mysten/sui.js/transactions';

export const handleSuiPayment = async (signAndExecuteTransactionBlock) => {
  if (!signAndExecuteTransactionBlock) {
    throw new Error("Wallet not connected");
  }

  const FUND_RECEIVER_ADDRESS = "0x564e18f3d2a1051b66562ecda8744601ab83ac187307625ba59981e11c1e2649";
  const SUI_AMOUNT = BigInt(1_000_000_000); // 1 SUI in MIST

  try {
    const txb = new TransactionBlock();
    
    // Create and transfer coin
    const [coin] = txb.splitCoins(txb.gas, [txb.pure(SUI_AMOUNT)]);
    txb.transferObjects([coin], txb.pure(FUND_RECEIVER_ADDRESS));

    // Execute the transaction
    const response = await signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: {
        showEvents: true,
      },
    });

    return {
      digest: response.digest,
      status: "success",
      amount: SUI_AMOUNT,
      receiver: FUND_RECEIVER_ADDRESS
    };
  } catch (error) {
    console.error("Payment error:", error);
    if (error.message?.toLowerCase().includes("insufficient")) {
      throw new Error("Insufficient SUI balance");
    }
    if (error.message?.toLowerCase().includes("reject")) {
      throw new Error("User rejected the transaction");
    }
    throw error;
  }
};