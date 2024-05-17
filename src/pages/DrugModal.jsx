import React from 'react';
import './IlacGrubu.css'; // Modal stilini eklemek için

const DrugModal = ({ isOpen, closeModal, drugs, group }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>{group} Grubundaki İlaçlar</h2>
                <ul>
                    {drugs.map(drug => (
                        <li key={drug.id}>{drug.ilacAdi} - {drug.ilacEtkenMaddesi} (Stok: {drug.totalStock})</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DrugModal;
