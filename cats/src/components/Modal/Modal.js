import React from 'react';
import './Modal.scss';
function Modal(){
    return(
        <div className="container">
            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    
                    <h4 class="modal-title">Fill the detail</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                    <input type="text" className="form-control" id="type" placeholder="Enter the details"/>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal">Submit</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
    )
};

export default Modal;