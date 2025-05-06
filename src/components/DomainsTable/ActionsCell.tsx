import { useEffect } from "react";
import { Dropdown, Spin } from "antd";
// context
import { useMessageApi } from "../../contexts/MessageContext";
// services
import { useDeleteDomainMutation, useEditDomainMutation } from "../../services/domain";
// types
import { IDomain, IDomainStatus } from "../../types";

interface Props {
    domain: IDomain;
}

function ActionsCell({ domain }: Readonly<Props>) {
    const messageApi = useMessageApi();
    const [deleteDomain, deleteDomainResult] = useDeleteDomainMutation();
    const [editDomain, editDomainResult] = useEditDomainMutation();

    const isLoading = deleteDomainResult.isLoading || editDomainResult.isLoading;
    const isSuccess = deleteDomainResult.isSuccess || editDomainResult.isSuccess;
    const isError = deleteDomainResult.isError || editDomainResult.isError;
    const error = deleteDomainResult.error || editDomainResult.error;

    const isDomainVerified = domain.status === IDomainStatus.Verified;

    const handleEditDomain = () => editDomain({ id: domain.id, data: { status: IDomainStatus.Verified } }).unwrap();
    const handleDeleteDomain = () => deleteDomain(domain.id).unwrap();

    useEffect(() => {
        if (isSuccess) {
            messageApi.success("Domain was successfully deleted");
        }
        if (isError && error && "status" in error) {
            messageApi.error(`${error.status} ${JSON.stringify(error.data)}`);
        }
    }, [isLoading, isSuccess, isError]);

    return (
        <Dropdown
            overlayClassName="w-40"
            disabled={isLoading}
            menu={{
                items: [
                    {
                        key: "1",
                        label: isDomainVerified ? "Verified" : "Verify",
                        disabled: isDomainVerified,
                        onClick: handleEditDomain,
                    },
                    {
                        key: "2",
                        label: "Delete",
                        danger: true,
                        onClick: handleDeleteDomain,
                    },
                ],
            }}
        >
            <a className="size-8 inline-flex items-center justify-center">
                {isLoading ? (
                    <Spin />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width="16" height="16">
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                    </svg>
                )}
            </a>
        </Dropdown>
    );
}

export default ActionsCell;
