import React, { useEffect, useState, useRef } from "react";
import './Modal.scss';
import {connectWalletFunction} from '../action/connect.js'
import CatsABI from '../../contractsABI/cat.json'
import Web3 from 'web3';
import {getMeta,updatefather} from '../action/action.js'
function FatherMint(){
    const [UserAccountAddr, Set_UserAccountAddr] = React.useState('');
    const [UserAccountBalance, Set_UserAccountBalance] = React.useState(0);
    const [NumberOfNFT, setNumberOfNFT] = React.useState(0);
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
    //Father Nft Minting Functions(NFT Contract Call) 
    async function mintCall(){
        var provider = window.ethereum;
        var web3 = new Web3(provider);
        var contractObj = new web3.eth.Contract(CatsABI, catAddress);
        var mintfee = await contractObj.methods.fmintFee().call();
        console.log("minting Fee",mintfee*NumberOfNFT)
        var nftDetails = await getMeta({NFTCounts:NumberOfNFT,Type:"Father"});
        console.log("get All datas from dbs",nftDetails)
        var handle=null;
        var receipt=null;
        contractObj.methods.mintFather(nftDetails.data.ipfsMetas,NumberOfNFT).send({from:UserAccountAddr,value:mintfee*NumberOfNFT}).on('transactionHash',async (transactionHash) => {
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
            <div class="modal fade" id="myFatherModal" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    
                    <h4 class="modal-title">Mint Father NFT</h4>
                    <button type="button" class="close" data-dismiss="myFatherModal">&times;</button>
                    </div>
                    <div class="modal-body">
                    <input type="Number" className="form-control" onChange={inputChange} name="nftcount" id="nftcount" placeholder="Enter the Count"/>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-success" onClick={()=>mintCall()}>Submit</button>
                    {/* <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
};

export default FatherMint;