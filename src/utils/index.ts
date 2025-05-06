import { IDomain, IDomainListFilters, IDomainTableData, IDomainListOrder } from "../types";

export const getDomainTableData = (filter: IDomainListFilters, domains?: IDomain[]): IDomainTableData[] => {
    return (
        domains
            ?.filter(({ domain }) => domain.toLowerCase().includes(filter.search.toLocaleLowerCase()))
            .sort((a, b) =>
                filter.order === IDomainListOrder.Ascending
                    ? a.createdDate - b.createdDate
                    : b.createdDate - a.createdDate
            )
            .map((domain) => {
                return {
                    key: domain.id,
                    domain,
                    isActive: domain.isActive,
                    status: domain.status,
                };
            }) ?? []
    );
};

export const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
