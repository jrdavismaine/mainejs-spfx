import React from 'react';
import { TextField, Dropdown, SearchBox } from '@fluentui/react';
import { IAddNewReturnsItem } from '../../models';
import { DROP_DOWN_DATA } from '../locationDropDownData';

export interface NewItemFormInterface {
    formState: IAddNewReturnsItem;
    onDropdownChanged: any;
    onSearchUPC: any;
}

export default function NewItemForm({
    formState,
    onDropdownChanged,
    onSearchUPC,
}: NewItemFormInterface) {
    return (
        <div>
            {/* <TextField label="UPC" description="Scan UPC Barcode Here" value="assdd" /> */}
            <SearchBox placeholder="Search by UPC" onSearch={onSearchUPC} />
            <TextField
                label="StockUnit"
                description="Scan SLU Barcode Here"
                disabled
                value={formState?.StockUnit}
            />
            <TextField
                label="Product Description"
                disabled
                value={formState?.ProductDescription}
            />
            <Dropdown
                label="Returns Location"
                placeholder="Select a return location"
                options={DROP_DOWN_DATA}
                onChange={onDropdownChanged}
            />
            <TextField
                label="Price"
                disabled
                value={
                    formState.Price === null ? '' : formState.Price.toString()
                }
            ></TextField>
            <TextField
                label="Item Cost"
                description="Will be populated automatically after UPC or SKU scanned"
                disabled
                value={
                    formState.ItemCost === null
                        ? ''
                        : formState.ItemCost.toString()
                }
            ></TextField>
        </div>
    );
}
