import { IAddNewReturnsItem, IReturnsItem } from '../models';
import { SPHttpClient, ISPHttpClientOptions } from '@microsoft/sp-http';
import ContextService from '../services/ContextService';

export const updateListCall = async (formState: IReturnsItem) => {
    const ctx = ContextService.getContext();
    const sharepointListURL =
        ctx.pageContext.web.absoluteUrl +
        `/_api/web/lists/getbytitle('ReturnsItemData')/items/getbyid(${formState.ID})`;
    const headers: any = {
        // REF: https://www.dmcinfo.com/latest-thinking/blog/id/8927/sharepoint-rest-api-tips
        // If you set your If-Match header to “2” then SharePoint will allow your update, so long as nobody has updated
        // the item since you read it. Note that the quotes around the ETag number need to be included.
        'If-Match': '*',
    };
    const body = {
        ReturnsLocation: formState.ReturnsLocation,
    };

    const spHttpClientOptions: ISPHttpClientOptions = {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    };
    const response = await ctx.spHttpClient.fetch(
        sharepointListURL,
        SPHttpClient.configurations.v1,
        spHttpClientOptions
    );
    return response;
};

export const addItemToListCall = async (formState: IAddNewReturnsItem) => {
    const ctx = ContextService.getContext();
    const sharepointListURL =
        ctx.pageContext.web.absoluteUrl +
        `/_api/web/lists/getbytitle('ReturnsItemData')/items`;
    const headers: any = {
        // REF: https://www.dmcinfo.com/latest-thinking/blog/id/8927/sharepoint-rest-api-tips
        // If you set your If-Match header to “2” then SharePoint will allow your update, so long as nobody has updated
        // the item since you read it. Note that the quotes around the ETag number need to be included.
        'If-Match': '*',
    };
    const spHttpClientOptions: ISPHttpClientOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            // For some annoying reason SharePoint has made StockUnit the default!!!
            Title: formState.StockUnit,
            ProductDescription: formState.ProductDescription,
            ReturnsId: formState.ReturnsId,
            ReturnsLocation: formState.ReturnsLocation,
            Price: formState.Price,
            ItemCost: formState.ItemCost,
            UPC: formState.UPC,
        }),
    };
    const response = await ctx.spHttpClient.post(
        sharepointListURL,
        SPHttpClient.configurations.v1,
        spHttpClientOptions
    );
    return response;
};

export const getListItems = async () => {
    const ctx = ContextService.getContext();
    const sharepointListURL =
        ctx.pageContext.web.absoluteUrl +
        `/_api/web/lists/getbytitle('ReturnsItemData')/items`;
    const response = await ctx.spHttpClient.get(
        sharepointListURL,
        SPHttpClient.configurations.v1
    );

    // If error making call, throw error.
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error(responseText);
    }

    // If the call was successful parse the json.
    const responseJson = await response.json();
    return responseJson.value as IReturnsItem[];
};
