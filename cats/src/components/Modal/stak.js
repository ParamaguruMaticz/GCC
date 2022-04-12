import React, { useEffect, useState, useRef } from "react";
import './Modal.scss';
import {connectWalletFunction} from '../action/connect.js'
import CatsABI from '../../contractsABI/cat.json'
import Web3 from 'web3';
import {getMeta,updatefather} from '../action/action.js'
function Stak(){
    const [UserAccountAddr, Set_UserAccountAddr] = React.useState('');
    const [UserAccountBalance, Set_UserAccountBalance] = React.useState(0);
    const [NFTId, setNFTId] = React.useState(0);
    const [AxemintReward, setAxemintReward] = React.useState(0);
    const [StakReward, setStakReward] = React.useState(0);
    
    const catAddress = '0x312705554997e8a8Cce00ecfF4025976d62e767F';
    useEffect(() => {
        connectWallet();
    },[])
    // get UserAddress and Balance from connect.js
    async function connectWallet(){
        var accountdetails = await connectWalletFunction();
        console.log("Account details",accountdetails);
        Set_UserAccountAddr(accountdetails.userAddress)
        Set_UserAccountBalance(accountdetails.userBalance)
    }
    // staking User Nft Function(Contract Function Call) 
    async function stakCall(){
        var provider = window.ethereum;
        var web3 = new Web3(provider);
        var contractObj = new web3.eth.Contract(CatsABI, catAddress);
        var handle=null;
        var receipt=null;
        contractObj.methods.stackclone(NFTId).send({from:UserAccountAddr}).on('transactionHash',async (transactionHash) => {
            handle = setInterval(async () => {
                receipt =  await web3.eth.getTransactionReceipt(transactionHash)
                clearfunction();
              }, 2000)
        })
        async function clearfunction(){
   
            if(receipt!=null){
                clearInterval(handle);
                if(receipt.status==true){    
                   alert("NFT staking is Completed");
              }
            }
        }
    }
    // User Claim Reward and NFT Function (Contract Function Call) 
    async function claimRewardAndNFTCall(options){
        alert("Minimum Stak 1 day then only you get a reward")
        var provider = window.ethereum;
        var web3 = new Web3(provider);
        var contractObj = new web3.eth.Contract(CatsABI, catAddress);
        var handle=null;
        var receipt=null;
        if(options == "Reward"){
            contractObj.methods.claimReward(NFTId).send({from:UserAccountAddr}).on('transactionHash',async (transactionHash) => {
                handle = setInterval(async () => {
                    receipt =  await web3.eth.getTransactionReceipt(transactionHash)
                    clearfunction();
                  }, 2000)
            })
        }
        else{
            contractObj.methods.claimNFT(NFTId).send({from:UserAccountAddr}).on('transactionHash',async (transactionHash) => {
                handle = setInterval(async () => {
                    receipt =  await web3.eth.getTransactionReceipt(transactionHash)
                    clearfunction();
                  }, 2000)
            })
        }
        async function clearfunction(){
            if(receipt!=null){
                clearInterval(handle);
                if(receipt.status==true){   
                    if(options == "Reward"){
                        alert("NFT Reward Claim is Completed");
                    } 
                   else{
                    alert("NFT Claim is Completed");
                   }
              }
            }
        }
    }

    // Admin Edit Father Minting Fees (Contract Function Call)
    async function FatherFeesCall(){
        var provider = window.ethereum;
        var web3 = new Web3(provider);
        var contractObj = new web3.eth.Contract(CatsABI, catAddress);
        var handle=null;
        var receipt=null;
        contractObj.methods.setFmintFee(web3.utils.toWei(String(NFTId))).send({from:UserAccountAddr}).on('transactionHash',async (transactionHash) => {
            handle = setInterval(async () => {
                receipt =  await web3.eth.getTransactionReceipt(transactionHash)
                clearfunction();
              }, 2000)
        })
        async function clearfunction(){
   
            if(receipt!=null){
                clearInterval(handle);
                if(receipt.status==true){    
                   alert("NFT Claim is Completed");
              }
            }
        }
    }
    //Admin Enable Staking Features (Contract Call)
    async function EnableStakingCall(option){
        var provider = window.ethereum;
        var web3 = new Web3(provider);
        var contractObj = new web3.eth.Contract(CatsABI, catAddress);
        var handle=null;
        var receipt=null;
        if(option){
            alert("You are Enable the Staking Modules")
        }
        else{
            alert("You are stop the Staking Modules")
        }
        console.log("Staking in Option",option)
        contractObj.methods.openStacking(option).send({from:UserAccountAddr}).on('transactionHash',async (transactionHash) => {
            handle = setInterval(async () => {
                receipt =  await web3.eth.getTransactionReceipt(transactionHash)
                clearfunction();
              }, 2000)
        })
        async function clearfunction(){
   
            if(receipt!=null){
                clearInterval(handle);
                if(receipt.status==true){    
                   alert("Staking Module Updated");
              }
            }
        }
    }
    //Admin Edit Rewards and GCC Fees(Contract Call)
    async function RewardCall(){
        var provider = window.ethereum;
        var web3 = new Web3(provider);
        var contractObj = new web3.eth.Contract(CatsABI, catAddress);
        var handle=null;
        var receipt=null;
        contractObj.methods.setGCCfee(web3.utils.toWei(String(NFTId)),
                                    web3.utils.toWei(String(AxemintReward)),
                                    web3.utils.toWei(String(StakReward)),
                                    ).send({from:UserAccountAddr}).on('transactionHash',async (transactionHash) => {
            handle = setInterval(async () => {
                receipt =  await web3.eth.getTransactionReceipt(transactionHash)
                clearfunction();
              }, 2000)
        })
        async function clearfunction(){
   
            if(receipt!=null){
                clearInterval(handle);
                if(receipt.status==true){    
                   alert("NFT Claim is Completed");
              }
            }
        }
    }
    const inputChange = (e) => {
        if(e && e.target && typeof e.target.value != 'undefined' && e.target.name) {
          var value = e.target.value;
          setNFTId(value)
        }
    }
    const inputChange1 = (e) => {
        if(e && e.target && typeof e.target.value != 'undefined' && e.target.name) {
          var value = e.target.value;
          setAxemintReward(value)
        }
    }
    const inputChange2 = (e) => {
        if(e && e.target && typeof e.target.value != 'undefined' && e.target.name) {
          var value = e.target.value;
          setStakReward(value)
        }
    }
    return(
        <div className="container">
            {/* Staking Modal */}
            <div class="modal fade" id="myStak" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    
                    <h4 class="modal-title">Stak NFT</h4>
                    <button type="button" class="close" data-dismiss="myStak">&times;</button>
                    </div>
                    <div class="modal-body">
                    <input type="Number" className="form-control" onChange={inputChange} name="nftid" id="nftid" placeholder="Enter the NFT Id"/>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-success" onClick={()=>stakCall()}>Submit</button>
                    {/* <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
                    </div>
                </div>
                </div>
            </div>
             {/* End Staking Modal */}

             {/* Claim Reward Modal */}
            <div class="modal fade" id="myClaim" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    
                    <h4 class="modal-title">Claim Reward</h4>
                    <button type="button" class="close" data-dismiss="myClaim">&times;</button>
                    </div>
                    <div class="modal-body">
                    <input type="Number" className="form-control" onChange={inputChange} name="nftid" id="nftid" placeholder="Enter the NFT Id"/>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-success" onClick={()=>claimRewardAndNFTCall("Reward")}>Submit</button>
                    {/* <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
                    </div>
                </div>
                </div>
            </div>
            {/* End Claim Reward Modal */}
             {/* Claim NFT Modal */}
             <div class="modal fade" id="myClaimNFT" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    
                    <h4 class="modal-title">Claim NFT</h4>
                    <button type="button" class="close" data-dismiss="myClaimNFT">&times;</button>
                    </div>
                    <div class="modal-body">
                    <input type="Number" className="form-control" onChange={inputChange} name="nftid" id="nftid" placeholder="Enter the NFT Id"/>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-success" onClick={()=>claimRewardAndNFTCall("NFT")}>Submit</button>
                    {/* <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
                    </div>
                </div>
                </div>
            </div>
            {/* End Claim NFT Modal */}
            {/* Father Nft Minting Fees Modal */}
            <div class="modal fade" id="myFathetNFTFee" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    
                    <h4 class="modal-title">Edit Father NFT Mint Fees</h4>
                    <button type="button" class="close" data-dismiss="myFathetNFTFee">&times;</button>
                    </div>
                    <div class="modal-body">
                    <input type="Number" className="form-control" onChange={inputChange} name="nftid" id="nftid" placeholder="Enter the NFT Id"/>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-success" onClick={()=>FatherFeesCall()}>Submit</button>
                    {/* <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
                    </div>
                </div>
                </div>
            </div>
            {/* End Father Nft Minting Fees Modal */}
            {/* Reward Modal */}
            <div class="modal fade" id="myReward" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    
                    <h4 class="modal-title">Edit Rewards</h4>
                    <button type="button" class="close" data-dismiss="myReward">&times;</button>
                    </div>
                    <div class="modal-body">
                    <input type="Number" className="form-control" onChange={inputChange} name="nftid" id="nftid" placeholder="Enter Fathe Reward in GCC"/>
                    </div>
                    <div class="modal-body">
                    <input type="Number" className="form-control" onChange={inputChange1} name="mintreward" id="mintreward" placeholder="Enter AXE Fees in GCC"/>
                    </div>
                    <div class="modal-body">
                    <input type="Number" className="form-control" onChange={inputChange2} name="stakreward" id="stakreward" placeholder="Enter Staking Reward in GCC"/>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-success" onClick={()=>RewardCall()}>Submit</button>
                    {/* <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
                    </div>
                </div>
                </div>
            </div>
            {/* End Reward Modal */}
            {/* Enable Staking Modal */}
            <div class="modal fade" id="openStak" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    
                    <h4 class="modal-title">Enable the Staking Modules</h4>
                    <button type="button" class="close" data-dismiss="openStak">&times;</button>
                    </div>
                    {/* <div class="modal-body">
                    <input type="Number" className="form-control" onChange={inputChange} name="nftid" id="nftid" placeholder="Enter the NFT Id"/>
                    </div> */}
                    <div class="modal-footer">
                    <button type="button" class="btn btn-success" onClick={()=>EnableStakingCall(true)}>Enable</button>
                    <button type="button" class="btn btn-success" onClick={()=>EnableStakingCall(false)}>Disable</button>
                    </div>
                </div>
                </div>
            </div>
            {/* End Enable Staking Modal */}
        </div>
    )
};

export default Stak;