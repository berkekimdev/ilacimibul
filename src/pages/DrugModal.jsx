import React from 'react';
import './DrugModal.css'; // CSS dosyasını dahil et

const DrugModal = ({ isOpen, closeModal, drugs, group }) => {
    if (!isOpen) return null; // Modal açık değilse hiçbir şey render etmez

    return (
        <div className="modal-overlay"> {/* Modalın üst üste binen kısmı */}
            <div className="modal-content"> {/* Modalın içeriği */}
                <h2>{group} Grubundaki İlaçlar</h2> {/* Grup adına göre başlık */}
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
                                <td>{drug.ilacAdi}</td> {/* İlaç adı */}
                                <td>{drug.ilacGrubu}</td> {/* İlaç grubu */}
                                <td>{drug.ilacEtkenMaddesi}</td> {/* İlaç etken maddesi */}
                                <td>{drug.totalStock}</td> {/* İlaç stoğu */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={closeModal}>Kapat</button> {/* Modalı kapatmak için buton */}
            </div>
        </div>
    );
};

export default DrugModal;
