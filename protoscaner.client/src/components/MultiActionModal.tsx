import React from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

interface MultiActionModalProps {
    message: string;
    header: string;
    icon: string;
    actions: Array<{
        label: string;
        className?: string;
        onClick: () => void;
        autoFocus?: boolean;
    }>;
}

const MultiActionModal: React.FC<MultiActionModalProps> = ({ message, header, icon, actions }) => {
    const show = () => {
        confirmDialog({
            message,
            header,
            icon,
            footer: (
                <div className="flex justify-end gap-3">
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            label={action.label}
                            className={action.className}
                            onClick={action.onClick}
                            autoFocus={action.autoFocus}
                        />
                    ))}
                </div>
            ),
        });
    };

    return (
        <Button label="Abrir Modal" className="p-button-outlined" onClick={show} />
    );
};

export default MultiActionModal;
