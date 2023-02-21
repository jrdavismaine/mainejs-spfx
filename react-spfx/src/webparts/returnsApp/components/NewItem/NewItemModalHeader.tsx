import React, { MouseEventHandler } from 'react';

export interface NewItemModalHeaderProps {
    closeModal: MouseEventHandler<HTMLButtonElement>;
}

export default function NewItemModalHeader({
    closeModal,
}: NewItemModalHeaderProps) {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ justifyContent: 'flex-start', paddingRight: 'auto' }}>
                Add New Returns Item
            </div>
            <div style={{ justifyContent: 'flex-end', paddingLeft: 'auto' }}>
                <button onClick={closeModal}>X</button>
            </div>
        </div>
    );
}
