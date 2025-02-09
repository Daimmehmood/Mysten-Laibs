import { TransactionBlock } from '@mysten/sui.js/transactions';

export const handleSuiPayment = async (signAndExecuteTransactionBlock) => {
  if (!signAndExecuteTransactionBlock) {
    throw new Error("Wallet not connected");
  }

  const FUND_RECEIVER_ADDRESS = "0xc4000ea0fd3244857575799ef4f8164c7b42d1c5bf840cfd54030f608b07556d";
  const SUI_AMOUNT = BigInt(1_000_000_000); 

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
