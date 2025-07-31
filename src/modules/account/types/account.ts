export interface Account {
    id: number
    label: string[];
    type: AccountType
    login: string
    password: string | null
};

export enum AccountType {
    LOCAL = 'Локальная',
    LDAP = 'LDAP'
}