import { TableColumnsType } from "antd";
// components
import DomainCell from "./DomainCell";
import ActionsCell from "./ActionsCell";
// utils
import { capitalizeFirstLetter } from "../../utils";
// types
import { IDomainStatus, IDomainTableData } from "../../types";

export const TABLE_COLUMNS: TableColumnsType<IDomainTableData> = [
    {
        dataIndex: "domain",
        title: "Domain URL",
        className: "!border-e-0 font-medium",
        width: "50%",
        render: (domain) => <DomainCell domain={domain} />,
    },
    {
        dataIndex: "isActive",
        title: "Active Status",
        className: "!border-e-0 font-medium",
        width: "20%",
        onCell: ({ isActive }) => ({ className: isActive ? "text-green-600" : "text-red-600" }),
        render: (isActive) => (isActive ? "Active" : "Not Active"),
    },
    {
        dataIndex: "status",
        title: "Verification Status",
        className: "!border-e-0 font-medium",
        width: "20%",
        onCell: ({ status }) => ({
            className:
                status === IDomainStatus.Verified.toLowerCase()
                    ? "text-green-600"
                    : status === IDomainStatus.Pending
                    ? "text-yellow-600"
                    : "text-red-600",
        }),
        render: (status) => capitalizeFirstLetter(status),
    },
    {
        width: "10%",
        align: "end",
        className: "!p-2 !pe-8 leading-2",
        render: ({ domain }) => <ActionsCell domain={domain} />,
    },
];
