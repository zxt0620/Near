const nearAPI = require('near-api-js');

async function interactWithContract() {
  const config = {
    networkId: 'mainnet',
    keyStore: new nearAPI.keyStores.InMemoryKeyStore(),
    //nodeUrl: "https://rpc.mainnet.near.org",
    nodeUrl: "自己RPC",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
  };

  const privateKey = '私钥'; // 替换私钥
  const keyPair = nearAPI.utils.KeyPair.fromString(privateKey);
  config.keyStore.setKey('mainnet', '名字', keyPair); // 替换NEAR账户名

  const near = await nearAPI.connect(config);
  const account = await near.account('名字'); // 替换NEAR账户名

  const contractId = 'inscription.near'; 
  const contractMethod = 'inscribe'; 
  const contractArgs = {
    "p": "nrc-20",
    "op": "mint",
    "tick": "neat",
    "amt": "100000000"
  };

  for (let i = 0; i < 10000; i++) {
    try {
      const result = await account.functionCall({
        contractId,
        methodName: contractMethod,
        args: contractArgs,
      });

      const transactionHash = result.transaction_outcome.id;
      console.log(`第${i + 1}次：成功，交易哈希：${transactionHash}`);
    } catch (error) {
      console.error(`第${i + 1}次：失败，错误信息：${error.message}`);
    }
  }
}

interactWithContract().catch(console.error);
