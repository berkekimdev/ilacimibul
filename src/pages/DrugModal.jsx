import React from 'react';

const DrugModal = ({ isOpen, closeModal, drugs }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>İlaçlar</h2>
                <ul>
                    {drugs.map(drug => (
                        <li key={drug.id}>{drug.adi} - {drug.etkenMadde}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DrugModal;
