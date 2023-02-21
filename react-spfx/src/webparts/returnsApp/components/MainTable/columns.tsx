import React from 'react';
import { IColumn } from 'office-ui-fabric-react';
import EditModal from '../EditItem/EditModal';
import { IReturnsItem } from '../../models/IReturnsItem';

export interface IDetailsListReturnsProps {
    property: any;
}

const RenderProperty = ({ property }: IDetailsListReturnsProps) => {
    return <span>{property}</span>;
};

export default function getColumns(setTableItems: Function) {
    const columns: IColumn[] = [
        {
            key: 'upc',
            name: 'UPC',
            minWidth: 100,
            data: 'number',
            onRender: (item: IReturnsItem) => {
                return <RenderProperty property={item.UPC} />;
            },
        },
        {
            key: 'edit',
            name: 'Edit',
            minWidth: 100,
            onRender: (item: IReturnsItem) => {
                return <EditModal setItems={setTableItems} data={item} />;
            },
        },
        {
            key: 'stockUnit',
            name: 'StockUnit',
            minWidth: 100,
            data: 'string',
            // For some reason, any SharePoint list created from an Excel table
            // names this column Title instead of StockUnit. How annoying! 
            onRender: (item: IReturnsItem) => {
                return <RenderProperty property={item.Title} />;
            },
        },
        {
            key: 'productDescription',
            name: 'ProductDescription',
            minWidth: 100,
            onRender: (item: IReturnsItem) => {
                return <RenderProperty property={item.ProductDescription} />;
            },
        },
        {
            key: 'returnsLocation',
            name: 'ReturnsLocation',
            minWidth: 100,
            onRender: (item: IReturnsItem) => {
                return <RenderProperty property={item.ReturnsLocation} />;
            },
        },
        {
            key: 'price',
            name: 'Price',
            minWidth: 100,
            onRender: (item: IReturnsItem) => {
                return <RenderProperty property={item.Price} />;
            },
        },
        {
            key: 'itemCost',
            name: 'Item Cost',
            minWidth: 100,
            onRender: (item: IReturnsItem) => {
                return <RenderProperty property={item.ItemCost} />;
            },
        },
        {
            key: 'returnsId',
            name: 'ReturnsId',
            minWidth: 100,
            onRender: (item: IReturnsItem) => {
                return <RenderProperty property={item.ReturnsId} />;
            },
        },
    ];
    return columns;
}
