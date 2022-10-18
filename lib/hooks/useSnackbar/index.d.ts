import React from "react";
import { SnackbarProps } from "../../components/Snackbar";
interface SnackbarContextProps {
    enqueueSnackbar: (options: SnackbarProps) => void;
    closeSnackbar: (id: number) => void;
}
export declare const useSnackbar: () => SnackbarContextProps;
export declare const SnackbarProvider: React.MemoExoticComponent<(props: React.PropsWithChildren) => JSX.Element>;
export {};
