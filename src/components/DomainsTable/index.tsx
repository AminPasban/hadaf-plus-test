import { useMemo, useState } from "react";
import { Table, Alert } from "antd";
// sections
import TableToolbar from "./TableToolbar";
// services
import { useGetDomainsQuery } from "../../services/domain";
// utils
import { getApiErrorMessage, getDomainTableData } from "../../utils";
// constants
import { TABLE_COLUMNS } from "./TableColumns";
// types
import { IDomainListFilters, IDomainTableData, IDomainListOrder } from "../../types";

function DomainsTable() {
    const { data: domains, isLoading, isError, error,  } = useGetDomainsQuery();
    const [filter, setFilter] = useState<IDomainListFilters>({ order: IDomainListOrder.Descending, search: "" });
    const domainTableData: IDomainTableData[] = useMemo(() => getDomainTableData(filter, domains), [domains, filter]);

    return (
        <>
            <TableToolbar filter={filter} setFilter={setFilter} />
            {isError && (
                <Alert
                    type="error"
                    className="!mb-4"
                    message="Error in getting domains"
                    description={getApiErrorMessage(error)}
                />
            )}
            <Table columns={TABLE_COLUMNS} dataSource={domainTableData} loading={isLoading} bordered />
        </>
    );
}

export default DomainsTable;
