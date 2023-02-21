import React from 'react';

export interface EditItemLinkProps {
    setModalState: Function;
}

export default function EditItemLink({ setModalState }: EditItemLinkProps) {
    return (
        <div>
            <a href="#" onClick={() => setModalState(true)}>
                Edit
            </a>
        </div>
    );
}
