import Web3 from 'web3';
import TokenABI from '../../contractsABI/token.json'
const TokenAddress = '0x7CAB80ce0E55F46378E493B584eE61aD68878f11'
// User Wallet Connect Functions
export const connectWalletFunction = async () => {
    try {
        var provider = window.ethereum;
        var userdetais = {};
        if (provider) {
            try {
              await  provider.enable()
              .then(async function () {
                var web3=new Web3(provider)                
                if((web3.currentProvider.chainId == 97))
                {
                    var result = await web3.eth.getAccounts()
                    var setacc = result[0];
                      var val = await web3.eth.getBalance(setacc)/1e18 
                      var tokencontractObj = new web3.eth.Contract(TokenABI, TokenAddress);
                      var userTokenBalance = await tokencontractObj.methods.balanceOf(setacc).call()/1e18;
                       userdetais = {
                          userAddress : setacc.toLowerCase(),
                          userBalance : val,
                          UserTokenBalance : userTokenBalance     
                      }
                }
              })
              .catch((e) => {
              })
              return userdetais;         
            } catch (err) {
              console.log("Connection Error")
            }
          }
    }
    catch (err) {
        return false
    }
  }