import React, { useEffect, useState, useRef } from "react";
import './Modal.scss';
import { connectWalletFunction } from '../action/connect.js'
import CatsABI from '../../contractsABI/cat.json'
import TokenABI from '../../contractsABI/token.json'
import Web3 from 'web3';
import { getMeta, updatefather } from '../action/action.js'
function CloneMint() {
    const [UserAccountAddr, Set_UserAccountAddr] = React.useState('');
    const [UserAccountBalance, Set_UserAccountBalance] = React.useState(0);
    const [UserTokenBalance, Set_UserTokenBalance] = React.useState(0);
    const [NumberOfNFT, setNumberOfNFT] = React.useState(1);
    const [TotalPrice, setTotalPrice] = React.useState(0);
    const catAddress = '0x312705554997e8a8Cce00ecfF4025976d62e767F';  // NFT Addresss
    const TokenAddress = '0x7CAB80ce0E55F46378E493B584eE61aD68878f11'  //Token Address
    useEffect(() => {
        connectWallet();
    }, [])
    // get UserAddress and Balance from connect.js
    async function connectWallet() {
        var accountdetails = await connectWalletFunction();
        console.log("Account details", accountdetails);
        Set_UserAccountAddr(accountdetails.userAddress)
        Set_UserAccountBalance(accountdetails.userBalance)
        Set_UserTokenBalance(accountdetails.UserTokenBalance)
    }
    //get Approve from Users(Token Contract Call Functions)
    async function approveCall() {
        console.log("Approve Call calling")
        var provider = window.ethereum;
        var web3 = new Web3(provider);
        var contractObj = new web3.eth.Contract(CatsABI, catAddress);
        var fatherNFTCount = await contractObj.methods._fatherNft(UserAccountAddr).call();
        var axeNFTCount = await contractObj.methods._axeNft(UserAccountAddr).call();
        if (fatherNFTCount >= 2) {
            var mintclonefee = await contractObj.methods.minTokenBalance().call()/1e18;
            var tokencontractObj = new web3.eth.Contract(TokenABI, TokenAddress);
            var userAlowance = await tokencontractObj.methods.allowance(UserAccountAddr, catAddress).call()/1e18;
            if (Number(mintclonefee) <= Number(UserTokenBalance)) {
                if (axeNFTCount < 2) {
                    alert("User get 80% sucess Breade 20% fail");
                }
                var price = mintclonefee * NumberOfNFT;
                setTotalPrice(price)
                var totalallowance = web3.utils.toWei(String((mintclonefee * NumberOfNFT) + userAlowance));
                var userAlowance = await tokencontractObj.methods.approve(catAddress, totalallowance).send({ from: UserAccountAddr });
            }
            else {
                alert("User Not Enougth GCC Token Balance");
            }

        }


    }
    //Clone Nft Minting Functions(NFT Contract Call) Mint Only noe NFT at a Time
    async function mintCall() {
        var provider = window.ethereum;
        var web3 = new Web3(provider);
        var contractObj = new web3.eth.Contract(CatsABI, catAddress);
        var mintfee = await contractObj.methods.mintFee().call();
        console.log("minting Fee", mintfee * NumberOfNFT)
        var nftDetails = await getMeta({ NFTCounts: NumberOfNFT, Type: "Breade" });
        console.log("get All datas from dbs", nftDetails.data)
        var handle = null;
        var receipt = null;
        // contractObj.methods.mint(nftDetails.data.ipfsMetas,nftDetails.data.tokenIDs,NumberOfNFT,"Breade").send({from:UserAccountAddr}).on('transactionHash',async (transactionHash) => {
        contractObj.methods.mint(nftDetails.data.ipfsMetas, 1, "Breade").send({ from: UserAccountAddr }).on('transactionHash', async (transactionHash) => {
            handle = setInterval(async () => {
                receipt = await web3.eth.getTransactionReceipt(transactionHash)
                clearfunction();
            }, 2000)
        })
        async function clearfunction() {

            if (receipt != null) {
                clearInterval(handle);
                if (receipt.status == true) {
                    var updateResponse = await updatefather({ id: nftDetails.data.tokenIDs })
                }
            }
        }
    }
    const inputChange = (e) => {
        if (e && e.target && typeof e.target.value != 'undefined' && e.target.name) {
            var value = e.target.value;
            setNumberOfNFT(value)
        }
    }
    return (
        <div className="container">
            <div class="modal fade" id="myCloneModal" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">

                            <h4 class="modal-title">Mint Clone NFT</h4>
                            <button type="button" class="close" data-dismiss="myCloneModal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <input type="Number" className="form-control" onChange={inputChange} name="nftcount" id="nftcount" placeholder="Enter the Count" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" onClick={() => approveCall()}>Approve Call</button>
                            <button type="button" class="btn btn-success" onClick={() => mintCall()}>Clone Mint</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CloneMint;