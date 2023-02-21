import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'HelloWorldWebPartStrings';
import ReturnsApp from './components/ReturnsApp';
import { IReturnsAppProps } from './components/IReturnsAppProps';

// List imports
import { SPHttpClient } from '@microsoft/sp-http';
import { IReturnsItem } from './models';
import ContextService from './services/ContextService';

export interface IHelloWorldWebPartProps {
    description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
    private _isDarkTheme: boolean = false;
    private _environmentMessage: string = '';
    private _returnsItems: IReturnsItem[] = [];

    private async _getReturnsItems(): Promise<IReturnsItem[]> {
        // Make call to the SharePoint list.The select is not necessary and skus the results. We want all items.
        // this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('ReturnsData')/items?$select=Id,Title`,
        // REF: https://hevodata.com/learn/sharepoint-api/#g
        const sharepointListURL =
            this.context.pageContext.web.absoluteUrl +
            `/_api/web/lists/getbytitle('ReturnsItemData')/items`;
        const response = await this.context.spHttpClient.get(
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
    }

    public render(): void {
        console.log(this.context.pageContext);
        const element: React.ReactElement<IReturnsAppProps> =
            React.createElement(ReturnsApp, {
                returnsItems: this._returnsItems,
                description: this.properties.description,
                isDarkTheme: this._isDarkTheme,
                environmentMessage: this._environmentMessage,
                hasTeamsContext: !!this.context.sdks.microsoftTeams,
                userDisplayName: this.context.pageContext.user.displayName,
            });
        ReactDom.render(element, this.domElement);
    }

    // Executed automatically when the webpart is initialized.
    // This is the place to make the call to the SPList and store the response.
    protected async onInit(): Promise<void> {
        this._environmentMessage = this._getEnvironmentMessage();

        // Get list items when webpart is initialized
        this._returnsItems = await this._getReturnsItems();

        // Add the SharePoint context to the ContextService, used in api/listUtils.
        ContextService.init(this.context);
        return super.onInit();
    }

    private _getEnvironmentMessage(): string {
        if (!!this.context.sdks.microsoftTeams) {
            // running in Teams
            return this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
        }

        return this.context.isServedFromLocalhost
            ? strings.AppLocalEnvironmentSharePoint
            : strings.AppSharePointEnvironment;
    }

    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
        if (!currentTheme) {
            return;
        }

        this._isDarkTheme = !!currentTheme.isInverted;
        const { semanticColors } = currentTheme;

        if (semanticColors) {
            this.domElement.style.setProperty(
                '--bodyText',
                semanticColors.bodyText || null
            );
            this.domElement.style.setProperty(
                '--link',
                semanticColors.link || null
            );
            this.domElement.style.setProperty(
                '--linkHovered',
                semanticColors.linkHovered || null
            );
        }
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription,
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel,
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    }
}
