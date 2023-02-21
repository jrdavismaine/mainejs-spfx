import React from 'react';
import { IReturnsItem } from '../../models';
import { TextField, Dropdown } from '@fluentui/react';
import { DROP_DOWN_DATA } from '../locationDropDownData';

export interface EditFormItemProps {
    formState: IReturnsItem;
    onDropdownChanged: any;
}

export default function EditFormItem({
    formState,
    onDropdownChanged,
}: EditFormItemProps) {
    return (
        <div>
            <TextField label="UPC" value={String(formState?.Title)} disabled />
            <TextField label="StockUnit" value={String(formState?.StockUnit)} disabled />
            <TextField
                label="Description"
                value={String(formState?.ProductDescription)}
                disabled
            />
            <Dropdown
                label="Returns Location"
                defaultSelectedKey={String(formState?.ReturnsLocation)}
                options={DROP_DOWN_DATA}
                onChange={onDropdownChanged}
            />
            <TextField
                label="Price"
                value={String(formState?.Price)}
                disabled
            ></TextField>
            <TextField
                label="Item Cost"
                value={String(formState?.ItemCost)}
                disabled
            ></TextField>
        </div>
    );
}
