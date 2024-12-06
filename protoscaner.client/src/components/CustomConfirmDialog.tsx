// src/components/CustomConfirmDialog.tsx

import React from 'react';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

type CustomConfirmDialogProps = {
    visible: boolean;
    message: string;
    header: string;
    iconClass?: string;
    acceptLabel?: string;
    rejectLabel?: string;
    onAccept: () => void;
    onReject: () => void;
    onHide: () => void;
};

const CustomConfirmDialog: React.FC<CustomConfirmDialogProps> = ({
    visible,
    message,
    header,
    iconClass = 'pi pi-question',
    acceptLabel = 'Save',
    rejectLabel = 'Cancel',
    onAccept,
    onReject,
    onHide,
}) => {
    return (
        <ConfirmDialog
            visible={visible}
            onHide={onHide}
            footer={
                <div className="flex justify-content-center gap-2 mt-4">
                    <Button label={acceptLabel} className="w-8rem" onClick={onAccept} />
                    <Button label={rejectLabel} outlined className="w-8rem" onClick={onReject} />
                </div>
            }
            className="custom-confirm-dialog"
        >
            <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
                <div className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                    <i className={`${iconClass} text-5xl text-white`}></i>
                </div>
                <span className="font-bold text-2xl block mb-2 mt-4">{header}</span>
                <p className="text-center mb-0">{message}</p>
            </div>
        </ConfirmDialog>
    );
};

export default CustomConfirmDialog;
