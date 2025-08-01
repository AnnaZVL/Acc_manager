export interface InputProp {
    id: string
    name: string;
    modelValue: string | null;
    type: InputType;    
    maxLength?: number;
    required?: boolean    
}

export type InputType = 'text' | 'password';

export type Label = {text: string};

export interface SelectProp {
    id: string
    name: string;
    modelValue: string | null;       
}

export interface LabelProp {
    id: string
    name: string;
    modelValue: Label[];    
    maxLength?: number;
}