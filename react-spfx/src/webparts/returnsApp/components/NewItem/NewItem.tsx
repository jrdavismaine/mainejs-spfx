import { Modal } from '@fluentui/react';
import React, { useState } from 'react';
import { IAddNewReturnsItem } from '../../models';
import { createRandomItem } from '../../utils/createRandomItem';
import { getListItems, addItemToListCall } from '../../api/listUtils';
import { defaultFormData } from './defaultNewItemFormState';
import NewItemModalHeader from './NewItemModalHeader';
import NewItemCTAButtons from './NewItemCTAButtons';
import NewItemForm from './NewItemForm';
import AddNewItemLink from './AddNewItemLink';

const modalStyles = {
    main: [
        {
            padding: '10px',
        },
    ],
};

export interface INewItemProps {
    setItems: Function;
}

export default function NewItem({ setItems }: INewItemProps) {
    const [isModalOpen, setModalState] = useState(false);
    const [formState, setFormState] =
        useState<IAddNewReturnsItem>(defaultFormData);

    const _closeModal = async () => {
        setModalState(false);
        setFormState(defaultFormData);
    };

    const addItemToList = async (event: any) => {
        const response = await addItemToListCall(formState);
        const newList = await getListItems();

        // Update table data items.
        setItems(newList);
        _closeModal();
        return response.text();
    };

    const _onSearchUPC = async (value: string) => {
        const props = { upc: true, sku: false };
        const randomItem = createRandomItem(props, value);
        setFormState(randomItem);
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
                <NewItemModalHeader closeModal={_closeModal} />
                <NewItemForm
                    formState={formState}
                    onDropdownChanged={_onDropdownChanged}
                    onSearchUPC={_onSearchUPC}
                />
                <NewItemCTAButtons
                    addItemToList={addItemToList}
                    closeModal={_closeModal}
                />
            </Modal>
        </div>
    ) : (
        <AddNewItemLink setModalState={setModalState} />
    );
}
