import React, { useEffect, useState, useRef } from "react";
import './Modal.scss';
import {connectWalletFunction} from '../action/connect.js'
import CatsABI from '../../contractsABI/cat.json'
import TokenABI from '../../contractsABI/token.json'
import Web3 from 'web3';
import {getMeta,updatefather} from '../action/action.js'
function AxeMint(){
    const [UserAccountAddr, Set_UserAccountAddr] = React.useState('');
    const [UserAccountBalance, Set_UserAccountBalance] = React.useState(0);
    const [UserTokenBalance, Set_UserTokenBalance] = React.useState(0);
    const [NumberOfNFT, setNumberOfNFT] = React.useState(0);
    const [TotalPrice, setTotalPrice] = React.useState(0);
    const catAddress = '0x312705554997e8a8Cce00ecfF4025976d62e767F';
    const TokenAddress = '0x7CAB80ce0E55F46378E493B584eE61aD68878f11'
    useEffect(() => {
        connectWallet();
    },[])
    // get UserAddress and Balance from connect.js
    async function connectWallet(){
        var accountdetails = await connectWalletFunction();
        console.log("Account details",accountdetails);
        Set_UserAccountAddr(accountdetails.userAddress)
        Set_UserAccountBalance(accountdetails.userBalance)
        Set_UserTokenBalance(accountdetails.UserTokenBalance)
    }
    //get Approve from Users(Token Contract Call Functions)
    async function approveCall(){
        console.log("Approve Call calling")
        var provider = window.ethereum;
        var web3 = new Web3(provider);
        var contractObj = new web3.eth.Contract(CatsABI, catAddress);
        var mintaxefee = await contractObj.methods.mintFee().call()/1e18;
        console.log("minting fees",typeof mintaxefee,typeof UserTokenBalance)
        var tokencontractObj = new web3.eth.Contract(TokenABI, TokenAddress);
        var userAlowance = await tokencontractObj.methods.allowance(UserAccountAddr,catAddress).call()/1e18;
        if(Number(mintaxefee) <= Number(UserTokenBalance)){
            console.log("Approve function")
            var price = mintaxefee * NumberOfNFT;
            setTotalPrice(price)
            var totalallowance = web3.utils.toWei(String((mintaxefee * NumberOfNFT) + userAlowance));
            var Alowance = await tokencontractObj.methods.approve(catAddress,totalallowance).send({from:UserAccountAddr});
        }
        else{
            alert("User Not Enougth GCC Token Balance");
        }
        
    } 
    //Axe Nft Minting Functions(NFT Contract Call)
    async function mintCall(){
        var provider = window.ethereum;
        var web3 = new Web3(provider);
        var contractObj = new web3.eth.Contract(CatsABI, catAddress);
        var mintfee = await contractObj.methods.mintFee().call();
        console.log("minting Fee",mintfee*NumberOfNFT)
        var nftDetails = await getMeta({NFTCounts:NumberOfNFT,Type:"AXE"});
        console.log("get All datas from dbs",nftDetails.data)
        var handle=null;
        var receipt=null;
        contractObj.methods.mint(nftDetails.data.ipfsMetas,NumberOfNFT,"AXE").send({from:UserAccountAddr}).on('transactionHash',async (transactionHash) => {
            handle = setInterval(async () => {
                receipt =  await web3.eth.getTransactionReceipt(transactionHash)
                clearfunction();
              }, 2000)
        })
        async function clearfunction(){
   
            if(receipt!=null){
                clearInterval(handle);
                if(receipt.status==true){    
                    var updateResponse = await updatefather({id:nftDetails.data.tokenIDs})
              }
            }
        }
    }
    const inputChange = (e) => {
        if(e && e.target && typeof e.target.value != 'undefined' && e.target.name) {
          var value = e.target.value;
          setNumberOfNFT(value)
        }
    }
    return(
        <div className="container">
            <div class="modal fade" id="myAxeModal" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    
                    <h4 class="modal-title">Mint Father NFT</h4>
                    <button type="button" class="close" data-dismiss="myAxeModal">&times;</button>
                    </div>
                    <div class="modal-body">
                    <input type="Number" className="form-control" onChange={inputChange} name="nftcount" id="nftcount" placeholder="Enter the Count"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" onClick={()=>approveCall()}>Approve Call</button>
                        <button type="button" class="btn btn-success" onClick={()=>mintCall()}>Axe Mint</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
};

export default AxeMint;