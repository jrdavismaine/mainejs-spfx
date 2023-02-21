import random from 'random';
import { DROP_DOWN_DATA } from '../components/locationDropDownData';
import { IAddNewReturnsItem } from '../models';

export const _getRandomDescription = () => {
    const desc = [
        'XL Polo Shirt',
        'Navy Blue Chinos',
        'Medium Green Sweater',
        'US State Puzzle',
        'Downhill skiing package',
        'Small Red Shirt',
        'Fullsize Quilt',
        'XL Sleeping Bag',
        'Topographic maps',
        'Weather Radio',
    ];
    const idx = random.integer(desc.length);
    return desc[idx];
};

const _getRandomDestination = () => {
    const dest = DROP_DOWN_DATA;
    const idx = random.integer(dest.length);
    return dest[idx].text;
};

export interface _createRandomItemsProps {
    upc: boolean;
    sku: boolean;
}

export function createRandomItem(
    props: _createRandomItemsProps,
    value: string
): IAddNewReturnsItem {
    const { upc, sku } = props;
    const newReturnsItem: IAddNewReturnsItem = {
        UPC: upc ? value : random.integer(99999999999).toString(),
        StockUnit: sku
            ? value
            : 'RET' +
              random.integer(999999) +
              ' ' +
              random.integer(99999) +
              ' ' +
              random.integer(99999),
        ProductDescription: _getRandomDescription(),
        ReturnsLocation: _getRandomDestination(),
        Price: parseFloat(random.float(50, 100).toFixed(2)),
        ItemCost: parseFloat(random.float(1, 30).toFixed(2)),
        ReturnsId: random.integer(900000),
        Title: upc ? value : random.integer(99999999999).toString(),
    };
    return newReturnsItem;
}
