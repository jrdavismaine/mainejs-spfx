import React from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';

export interface EditItemCTAButtonsProps {
    updateList: any;
    setModalState: any;
}

export default function EditItemCTAButtons({
    updateList,
    setModalState,
}: EditItemCTAButtonsProps) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
            }}
        >
            <PrimaryButton onClick={updateList} style={{ marginRight: '10px' }}>
                Save
            </PrimaryButton>
            <DefaultButton onClick={() => setModalState(false)}>
                Cancel
            </DefaultButton>
        </div>
    );
}
