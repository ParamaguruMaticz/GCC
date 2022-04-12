import React from "react";
import './Form.scss';
import Modal from './Modal/Modal.js';
function Connect() {
    
    return(
        <>
        <Modal />
        <div className="d-flex align-items-center">
        <div className="container">
            <div className="form">
                <h3 className="text-center my-4 text-uppercase">Fill the details</h3>
                <form className="form-group">
                <div className="d-flex align-items-center justify-content-center">
                    
                <div className="bg-light rounded-1 w-75 p-5">
                    <div className="row mb-3">
                        <div className="col-12 col-lg-4 col-md-4">
                            <label class="text-left">First Name:</label>
                        </div>
                        <div className="col-12 col-lg-8 col-md-8">
                            <input type="text" className="form-control" placeholder="Enter Your First Name" required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-lg-4 col-md-4">
                            <label class="text-left">Last Name:</label>
                        </div>
                        <div className="col-12 col-lg-8 col-md-8">
                            <input type="text" className="form-control" placeholder="Enter Your Last Name" required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-lg-4 col-md-4">
                            <label class="text-left">Email:</label>
                        </div>
                        <div className="col-12 col-lg-8 col-md-8">
                            <input type="email" className="form-control" placeholder="Enter Your Email" required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-lg-4 col-md-4">
                            <label class="text-left">Mobile Number:</label>
                        </div>
                        <div className="col-12 col-lg-8 col-md-8">
                            <input type="number" className="form-control" placeholder="Enter Your Mobile" required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col-12 col-lg-4 col-md-4">
                            <label class="text-left">Choose your option:</label>
                        </div>
                        <div className="col-12 col-lg-8 col-md-8">
                    <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio" />&nbsp;Yes
                            </label>
                            </div>
                            <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio" />&nbsp;No
                            </label>
                            </div>
                            </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-lg-4 col-md-4">
                        <label class="text-left">Choose your type:</label>      
                        </div>
                        <div className="col-12 col-lg-8 col-md-8">
                        <div className="dropdown">
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
                                Choose Type
                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Ethereum</a>
                                <a className="dropdown-item" href="#">BSC</a>
                                <a className="dropdown-item" href="#">rarible</a>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 mt-4">
                        <div className="col-12 col-lg-4 col-md-4">
                            <label className="">Address</label>
                        </div>
                        <div className="col-12 col-lg-8 col-md-8">
                        <textarea id="address" name="address" rows="4" cols="50"></textarea>
                        </div>
                    </div>
                </div>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-lg-12 col-md-12">
                    <button type="button" class="btn btn-success btn-lg" data-toggle="modal" data-target="#myModal">Confirm</button>
                    </div>
                </div>
                </form>
                </div>
        </div>
        </div>
        </>
    )
};

export default Connect;