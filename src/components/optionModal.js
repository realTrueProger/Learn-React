import React from 'react';
import Modal from 'react-modal';

const optionModal = (props) => (
    <Modal
        isOpen={!!props.selected}
        onRequestClose={props.closeModal}
        contentLabel={'wtf'}
        closeTimeoutMS={0}
        className="modal"
    >
        <h3 className="modal__title">Выбор пал на:</h3>
        {props.selected && <p className="modal__body">{props.selected}</p>}
        <button className="button" onClick={props.closeModal}>Close</button>
    </Modal>
);

export default optionModal;