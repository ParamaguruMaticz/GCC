import React, { useEffect, useState, useRef } from "react";
import './Form.scss';
import Modal from './Modal/Modal.js';
import FatherMoal from './Modal/fathermint.js';
import AxeMoal from './Modal/axemint.js';
import CloneMint from './Modal/clonemint.js';
import StakNFT from './Modal/stak.js';
import Web3 from 'web3';
import {img_file_upload} from './action/action.js'


import {connectWalletFunction} from './action/connect.js'

function Form(props) {
    const [UserAccountAddr, Set_UserAccountAddr] = React.useState('');
    const [UserAccountBalance, Set_UserAccountBalance] = React.useState(0);
    const [File, setFile] = useState("");
    useEffect(() => {
        connectWallet();
    },[])

    // Storing Images in State variables
    const selectFileChange = (e) => {
        console.log("Image Files1",e.target.files)
        if (e.target && e.target.files) {
            console.log("Image Files",e.target.files)
            setFile(e.target.files);
        }
      }
    //   Get UserAddress and Token Balance
    async function connectWallet(){
        var accountdetails = await connectWalletFunction();
        console.log("Account details",accountdetails);
        Set_UserAccountAddr(accountdetails.userAddress)
        Set_UserAccountBalance(accountdetails.userBalance)                  
    }
    // Upload the Images on server
    const File_Uploads =async(type)=>{
        var file_up = await img_file_upload({file:File,location:type})
        if(file_up){
            alert('succesfully uploaded')
        }
    }
    
    
    return(
        <>
        <FatherMoal />
        <AxeMoal />
        <CloneMint />
        <StakNFT />
        <div className="d-flex align-items-center">
        <div className="container">
            <div className="form">
                <h3 className="text-center my-4 text-uppercase">Admin Features</h3>
               {/* Upload Father NFT Section */}
                <div className="row my-3">
                    <p>Upload Father NFT</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <input type="file" 
                    id="fileInputControl"
                          webkitdirectory="true"
                          multiple
                          onChange={selectFileChange}
                         class="btn btn-success btn-lg" />
                    </div>
                </div>
               

                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                    // data-toggle="modal" data-target="#myModal" 
                    onClick={()=>File_Uploads("Father")}>Upload Father</button>
                    </div>
                </div>
                 {/* End Upload Father NFT Section */}
                 {/* Upload AXE NFT Section */}
                <div className="row my-3">
                    <p>Upload AXE NFT</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <input type="file" 
                    id="fileInputControl"
                          webkitdirectory="true"
                          multiple
                          onChange={selectFileChange}
                         class="btn btn-success btn-lg" />
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                    // data-toggle="modal" data-target="#myModal" 
                    onClick={()=>File_Uploads("AXE")}>Upload AXE</button>
                    </div>
                </div>
                {/* End Upload AXE NFT Section */}
                {/* Upload Clone NFT Section */}
                <div className="row my-3">
                    <p>Upload CLONE NFT</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <input type="file" 
                    id="fileInputControl"
                          webkitdirectory="true"
                          multiple
                          onChange={selectFileChange}
                         class="btn btn-success btn-lg" />
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                    // data-toggle="modal" data-target="#myModal" 
                    onClick={()=>File_Uploads("Breade")}>Upload Clone</button>
                    </div>
                </div>
                {/* End Upload Clone NFT Section */}
                {/* Admin Open Stak Module */}
                <div className="row my-3">
                    <p>Enable Disable Staking Features</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                     data-toggle="modal" data-target="#openStak"
                    >Open Disable Stack</button>
                    </div>
                </div>
                {/* End Admin Open Stak Module */}
                <h3 className="text-center my-4 text-uppercase">Users Features</h3>
                {/* Mint Father NFT Section */}
                <div className="row my-3">
                    <p>mint Father NFT</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                     data-toggle="modal" data-target="#myFatherModal" 
                    >Mint Father</button>
                    </div>
                </div>
                {/* End Mint Father NFT Section */}
                {/* Mint AXE NFT Section */}
                <div className="row my-3">
                    <p>mint AXE NFT</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                     data-toggle="modal" data-target="#myAxeModal" 
                    >Mint AXE</button>
                    </div>
                </div>
                {/* End Mint AXE NFT Section */}
                {/* Mint Clone NFT Section */}
                <div className="row my-3">
                    <p>mint Clone NFT</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                     data-toggle="modal" data-target="#myCloneModal" 
                    >Mint Clone</button>
                    </div>
                </div>
                {/* End Mint Clone NFT Section */}
                {/* User Staking Section */}
                <div className="row my-3">
                    <p>staking NFT</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                     data-toggle="modal" data-target="#myStak" 
                    >NFT Stak</button>
                    </div>
                </div>
                {/* End User Staking Section */}
                {/* User Claim Reward Section */}
                <div className="row my-3">
                    <p>Claim Reward</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                     data-toggle="modal" data-target="#myClaim" 
                    >Claim Reward</button>
                    </div>
                </div>
                {/* End User Claim Reward Section */}
                {/* User Claim NFT Section */}
                <div className="row my-3">
                    <p>Claim NFT</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                     data-toggle="modal" data-target="#myClaimNFT" 
                    >Claim NFT</button>
                    </div>
                </div>
                {/* End User Claim NFT Section */}
                <h3 className="text-center my-4 text-uppercase">Fees Edit Section</h3>
                {/* Edit Father Minting Fees Section */}
                <div className="row my-3">
                    <p>Edit Father NFT Fees</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                     data-toggle="modal" data-target="#myFathetNFTFee" 
                    >Edit Father Fees</button>
                    </div>
                </div>
                {/* End  Edit Father Minting Fees Section */}
                {/* Edit Reward Section */}
                <div className="row my-3">
                    <p>Edit GCC Rewards</p>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" 
                     data-toggle="modal" data-target="#myReward" 
                    >Edit GCC Rewards</button>
                    </div>
                </div>
                {/* End Edit Reward Section */}
                </div>
        </div>
        </div>
        </>
    )
};

export default Form;