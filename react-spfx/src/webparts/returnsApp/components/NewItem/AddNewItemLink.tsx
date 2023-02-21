import React from 'react';

export interface AddNewItemLinkProps {
    setModalState: Function;
}

export default function AddNewItemLink({ setModalState }: AddNewItemLinkProps) {
    return (
        <div>
            <a href="#" onClick={() => setModalState(true)}>
                Add New Returns Item
            </a>
        </div>
    );
}
