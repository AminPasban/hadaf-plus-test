export enum IDomainListOrder {
    Ascending = "ascending",
    Descending = "descending",
}

export interface IDomainListFilters {
    order: IDomainListOrder;
    search: string;
}
