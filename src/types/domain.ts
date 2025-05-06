import { Key } from "react";

export enum IDomainStatus {
    Pending = "pending",
    Verified = "verified",
    Rejected = "rejected",
}

export interface IDomain {
    id: string;
    domain: string;
    isActive: boolean;
    status: IDomainStatus;
    createdDate: number;
}

export interface IDomainTableData {
    key: Key;
    domain: IDomain;
    isActive: boolean;
    status: IDomainStatus;
}
