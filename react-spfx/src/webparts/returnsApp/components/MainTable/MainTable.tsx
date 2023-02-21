import { DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react';
import React, { useState } from 'react';
import { IReturnsItem } from '../../models/IReturnsItem';
import NewItem from '../NewItem/NewItem';
import getColumns from './columns';

export interface IDetailsListReturnsProps {
    items: IReturnsItem[];
}

export function MainTable({ items }: IDetailsListReturnsProps) {
    const [tableItems, setTableItems] = useState<IReturnsItem[]>(items);
    const columns = getColumns(setTableItems);
    return (
        <div>
            <NewItem setItems={setTableItems} />
            <DetailsList
                items={tableItems}
                columns={columns}
                layoutMode={DetailsListLayoutMode.justified}
            />
        </div>
    );
}
