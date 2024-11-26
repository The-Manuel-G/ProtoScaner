// src/components/ui/InputWithIcon.tsx

import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconBaseProps } from 'react-icons';

type InputWithIconProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    error?: boolean;
    icon: React.ComponentType<IconBaseProps>;
    type?: string;
    textarea?: boolean;
};

const InputWithIcon: React.FC<InputWithIconProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error = false,
    icon: Icon,
    type = 'text',
    textarea = false
}) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="block text-lg font-medium mb-2 flex items-center">
                <Icon className="mr-2 text-xl" />
                {label} {error && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {textarea ? (
                    <InputTextarea
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`w-full p-3 pl-10 text-lg rounded-md border ${error ? 'p-invalid border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                ) : (
                    <InputText
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        type={type}
                        placeholder={placeholder}
                        className={`w-full p-3 pl-10 text-lg rounded-md border ${error ? 'p-invalid border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                )}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <Icon className="text-xl" />
                </div>
            </div>
            {error && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
        </div>
    );
};

export default InputWithIcon;
