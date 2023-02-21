import React, { MouseEventHandler } from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';

export interface NewItemCTAButtonsProps {
    closeModal: MouseEventHandler<HTMLButtonElement>;
    addItemToList: MouseEventHandler<HTMLButtonElement>;
}

export default function NewItemCTAButtons({
    closeModal,
    addItemToList,
}: NewItemCTAButtonsProps) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '15px',
            }}
        >
            <PrimaryButton
                onClick={addItemToList}
                style={{ marginRight: '10px' }}
            >
                Save
            </PrimaryButton>
            <DefaultButton onClick={closeModal}>Cancel</DefaultButton>
        </div>
    );
}
