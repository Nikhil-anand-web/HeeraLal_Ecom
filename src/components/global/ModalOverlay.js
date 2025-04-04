"use client"

import Modal from 'react-bootstrap/Modal';

function ModalOverlay({show,setShow,children , title}) {
  

  return (
    <>
      

      <Modal
      size='xl'
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {children}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalOverlay;