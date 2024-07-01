import { ReactNode } from "react";
import classes from './layout.module.scss';

interface LayoutProps {
    tableEditorSlot: ReactNode,
    textEditorSlot: ReactNode,
    formSlot: ReactNode,
};

export function Layout({
    tableEditorSlot,
    textEditorSlot,
    formSlot,
}: LayoutProps) {
    return (
        <div className={classes.container}>
            <div className={classes.table}>{tableEditorSlot}</div>
            <div className={classes.text}>{textEditorSlot}</div>
            <div className={classes.form}>{formSlot}</div>
        </div>
    );
}