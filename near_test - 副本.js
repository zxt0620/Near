const nearAPI = require('near-api-js');

async function interactWithContract() {
  const config = {
    networkId: 'mainnet',
    keyStore: new nearAPI.keyStores.InMemoryKeyStore(),
    //nodeUrl: "https://rpc.mainnet.near.org",
    nodeUrl: "https://rpc.ankr.com/near/177a550efab9e170a1caa499b7b00542c97c74a6ccd77e318ebf7d4e743ec6ef",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
  };

  const privateKey = 'ed25519:3XSJh6AKriEQu3y92XRMMgegZDbzAn7HxRHv2wHz3SBFTDKzHiESL4XT4C7nNiAm2TK26Y5J1e7vkDCtCmtDY8eR'; // 替换私钥
  const keyPair = nearAPI.utils.KeyPair.fromString(privateKey);
  config.keyStore.setKey('mainnet', '9fb103649e4f7c2be74c00f21b8f4105cec59060b64a2d97379f82dea1256a6e', keyPair); // 替换NEAR账户名

  const near = await nearAPI.connect(config);
  const account = await near.account('9fb103649e4f7c2be74c00f21b8f4105cec59060b64a2d97379f82dea1256a6e'); // 替换NEAR账户名

  const contractId = 'inscription.near'; 
  const contractMethod = 'inscribe'; 
  const contractArgs = {
    "p": "nrc-20",
    "op": "mint",
    "tick": "neat",
    "amt": "100000000"
  };

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

async function xx(){
	for(i=0;i<1000;i++){
		interactWithContract().catch(console.error);
	}
}

xx()