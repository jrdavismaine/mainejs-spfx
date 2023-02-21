import React from 'react';
import styles from './ReturnsApp.module.scss';
import { MainTable } from './MainTable/MainTable';
import { IReturnsItem } from '../models';

export interface IReturnsAppProps {
    returnsItems: IReturnsItem[];
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
}

export default function ReturnsApp(props: IReturnsAppProps) {
    const { returnsItems, hasTeamsContext } = props;
    return (
        <section
            className={`${styles.helloWorld} ${
                hasTeamsContext ? styles.teams : ''
            }`}
        >
            <MainTable items={returnsItems} />
        </section>
    );
}
