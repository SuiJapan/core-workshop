import { GasStationClient, createSuiClient } from "@shinami/clients/sui";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

const ACCESS_KEY = process.env.NEXT_PUBLIC_SHINAMI_ACCESS_KEY!;
const SENDER_SECRET = "<シークレットキー>";

async function main() {
  const node = createSuiClient(ACCESS_KEY); // Node Service
  const gas = new GasStationClient(ACCESS_KEY); // Gas Station
  const keypair = Ed25519Keypair.fromSecretKey(SENDER_SECRET);

  // 1) ガス無しTxKindを作る（時計アクセス）
  const tx = new Transaction();
  tx.moveCall({
    target:
      "0xfa0e78030bd16672174c2d6cc4cd5d1d1423d03c28a74909b2a148eda8bcca16::clock::access",
    arguments: [tx.object("0x6")],
  });
  const txKindBytes = await tx.build({
    client: node,
    onlyTransactionKind: true,
  });
  const txKindB64 = Buffer.from(txKindBytes).toString("base64");

  // 2) スポンサー取得（Auto-budget）
  const sponsorship = await gas.sponsorTransaction({
    txKind: txKindB64,
    sender: keypair.toSuiAddress(),
  });

  // 3) 送信者署名
  const signedBySender = await Transaction.from(sponsorship.txBytes).sign({
    signer: keypair,
  });

  // 4) 送信（スポンサー署名 + 送信者署名）
  const exec = await node.executeTransactionBlock({
    transactionBlock: sponsorship.txBytes,
    signature: [signedBySender.signature, sponsorship.signature],
  });

  console.log("txDigest:", exec.digest);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
