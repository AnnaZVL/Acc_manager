import type { Label } from "@/types/inputs";

export interface Account {
    id: number
    label: Label[];
    type: AccountType | null
    login: string
    password: string | null
};

export enum AccountType {
    LOCAL = 'Локальная',
    LDAP = 'LDAP'
}