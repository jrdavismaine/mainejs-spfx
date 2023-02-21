import React, { MouseEventHandler } from 'react';

export interface EditItemModalHeaderProps {
    closeModal: MouseEventHandler<HTMLButtonElement>;
    productDescription: string;
}

export default function EditItemModalHeader({
    closeModal,
    productDescription,
}: EditItemModalHeaderProps) {
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div
                    style={{
                        justifyContent: 'flex-start',
                        paddingRight: 'auto',
                    }}
                >
                    Edit Returns Item
                </div>
                <div
                    style={{ justifyContent: 'flex-end', paddingLeft: 'auto' }}
                >
                    <button onClick={closeModal}>X</button>
                </div>
            </div>
            <div>{productDescription}</div>
        </div>
    );
}
