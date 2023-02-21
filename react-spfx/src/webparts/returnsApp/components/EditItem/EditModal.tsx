import { IReturnsItem } from '../../models/IReturnsItem';
import { Modal } from '@fluentui/react';
import React, { useState } from 'react';

import { getListItems, updateListCall } from '../../api/listUtils';
import EditItemModalHeader from './EditIitemModalHeader';
import EditItemCTAButtons from './EditItemCTAButtons';
import EditFormItem from './EditItemForm';
import EditItemLink from './EditItemLink';

interface IEditModalProps {
    data: IReturnsItem | undefined;
    setItems: Function;
}

const modalStyles = {
    main: [
        {
            padding: '10px',
        },
    ],
};

export default function EditModal({ data, setItems }: IEditModalProps) {
    const [isModalOpen, setModalState] = useState<boolean>(false);
    const [formState, setFormState] = useState<IReturnsItem>(data);

    const _updateList: any = async (event: any) => {
        const response = await updateListCall(formState);
        // Update state
        const newList = await getListItems();
        setItems(newList);
        setModalState(false);
        return response.text();
    };

    const _closeModal = async () => {
        setModalState(false);
    };

    const _onDropdownChanged = (event: any) => {
        const { outerText } = event.currentTarget;
        const existingFormState = formState;
        existingFormState.ReturnsLocation = outerText;
        setFormState(existingFormState);
    };

    return isModalOpen ? (
        <div>
            <Modal isOpen={isModalOpen} isBlocking={true} styles={modalStyles}>
                <h2>Edit Modal Test</h2>
                <EditItemModalHeader
                    closeModal={_closeModal}
                    productDescription={data?.ProductDescription}
                />
                <EditFormItem
                    formState={formState}
                    onDropdownChanged={_onDropdownChanged}
                />
                <EditItemCTAButtons
                    updateList={_updateList}
                    setModalState={setModalState}
                />
            </Modal>
        </div>
    ) : (
        <EditItemLink setModalState={setModalState} />
    );
}
