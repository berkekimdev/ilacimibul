// src/components/DrugModal.jsx
import React from 'react';
import './DrugModal.css'; // CSS dosyasını dahil et

const DrugModal = ({ isOpen, closeModal, drugs, group }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{group} Grubundaki İlaçlar</h2>
                <table>
                    <thead>
                        <tr>
                            <th>İlaç Adı</th>
                            <th>İlaç Grubu</th>
                            <th>İlaç Etken Maddesi</th>
                            <th>İlaç Stoğu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drugs.map((drug, index) => (
                            <tr key={index}>
                                <td>{drug.ilacAdi}</td>
                                <td>{drug.ilacGrubu}</td>
                                <td>{drug.ilacEtkenMaddesi}</td>
                                <td>{drug.totalStock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={closeModal}>Kapat</button>
            </div>
        </div>
    );
};

export default DrugModal;
