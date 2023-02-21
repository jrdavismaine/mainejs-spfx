import { IReturnsItem } from '../models';

export interface IReturnsAppProps {
    returnsItems: IReturnsItem[];
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
}
