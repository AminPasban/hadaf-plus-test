import { FormEvent, useEffect, useRef, useState } from "react";
import { Input, InputRef, Select, Typography } from "antd";
// constants
import { DOMAIN_REGEX } from "../../constants";
// types
import { IDomain, IDomainFormErrors, IDomainStatus } from "../../types";

const { Text } = Typography;

interface Props {
    isDrawerOpen: boolean;
    editingDomain: IDomain | null;
    handleManageDomain: (formDate: Partial<IDomain>) => Promise<IDomain>;
}

function ManageDomainDrawerForm({ isDrawerOpen, editingDomain, handleManageDomain }: Readonly<Props>) {
    const inputRef = useRef<InputRef>(null);
    const [formData, setFormData] = useState<Partial<IDomain>>({});
    const [formErrors, setFormErrors] = useState<IDomainFormErrors>({});
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitClicked(true);
        if (Object.values(formErrors).some((error) => error)) return;

        handleManageDomain(formData).then(() => {
            setFormData({});
            setIsSubmitClicked(false);
        });
    };

    const handleChange = (name: string, value: string | boolean) => {
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        setFormErrors(() => ({
            domainRequired: !formData.domain,
            domainInvalidFormat: !!formData.domain && !DOMAIN_REGEX.test(formData.domain),
            isActiveMissing: formData.isActive === undefined,
            statusMissing: !formData.status,
        }));
    }, [formData]);

    useEffect(() => {
        setIsSubmitClicked(false);
        setFormData({
            domain: editingDomain?.domain,
            isActive: editingDomain?.isActive,
            status: editingDomain?.status,
        });
    }, [editingDomain]);

    useEffect(() => {
        const timer = setTimeout(() => inputRef.current?.focus(), 100);
        return () => clearTimeout(timer);
    }, [isDrawerOpen]);

    return (
        <form id="DomainForm" onSubmit={handleSubmit} className="mb-8">
            {/*---- Domain input ----start-*/}
            <div className="flex flex-col gap-2">
                <Input
                    ref={inputRef}
                    maxLength={253}
                    value={formData.domain}
                    placeholder="EX: https://www.bridged.media"
                    className="h-12"
                    onChange={(event) => handleChange("domain", event.target.value)}
                />
                {isSubmitClicked && formErrors.domainRequired && <Text type="danger">Domain is required!</Text>}
                {isSubmitClicked && formErrors.domainInvalidFormat && (
                    <Text type="danger">Please enter a valid domain</Text>
                )}
            </div>
            {/*---- Domain input ----end-*/}

            <div className="flex gap-8 mt-8">
                {/*---- Activation select ----start-*/}
                <div className="w-full flex flex-col gap-2">
                    <Select
                        value={formData.isActive}
                        placeholder="Active Status"
                        className="w-full !h-12"
                        onChange={(value) => handleChange("isActive", value)}
                        options={[
                            { value: true, label: <span>Active</span> },
                            { value: false, label: <span>Not Active</span> },
                        ]}
                    />
                    {isSubmitClicked && formErrors.isActiveMissing && (
                        <Text type="danger">Active Status is required!</Text>
                    )}
                </div>
                {/*---- Activation select ----end-*/}

                {/*---- Verification select ----start-*/}
                <div className="w-full flex flex-col gap-2">
                    <Select
                        value={formData.status}
                        placeholder="Verification Status"
                        className="w-full !h-12"
                        onChange={(value) => handleChange("status", value)}
                        options={[
                            { value: IDomainStatus.Verified, label: <span>Verified</span> },
                            { value: IDomainStatus.Pending, label: <span>Pending</span> },
                            { value: IDomainStatus.Rejected, label: <span>Rejected</span> },
                        ]}
                    />
                    {isSubmitClicked && formErrors.statusMissing && (
                        <Text type="danger">Verification Status is required!</Text>
                    )}
                </div>
                {/*---- Verification select ----end-*/}
            </div>
        </form>
    );
}

export default ManageDomainDrawerForm;
