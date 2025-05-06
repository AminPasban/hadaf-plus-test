import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
// store
import { RootState } from "../../store";
import { setDrawerOpen } from "../../store/manageDomainDrawerSlice";
// context
import { useMessageApi } from "../../contexts/MessageContext";
// sections
import ManageDomainDrawerForm from "./ManageDomainDrawerForm";
import DrawerFooter from "./DrawerFooter";
// services
import { useAddDomainMutation, useEditDomainMutation } from "../../services/domain";
// types
import { IDomain } from "../../types";

function ManageDomainDrawer() {
    const dispatch = useDispatch();
    const messageApi = useMessageApi();
    const { isOpen, editingDomain } = useSelector((state: RootState) => state.manageDomainDrawer);

    const [addDomain, addDomainResult] = useAddDomainMutation();
    const [editDomain, editDomainResult] = useEditDomainMutation();

    const isLoading = addDomainResult.isLoading || editDomainResult.isLoading;
    const isSuccess = addDomainResult.isSuccess || editDomainResult.isSuccess;
    const isError = addDomainResult.isError || editDomainResult.isError;
    const error = addDomainResult.isError ? addDomainResult.error : editDomainResult.error;

    const handleManageDomain = async (formData: Partial<IDomain>) => {
        const payload = editingDomain
            ? editDomain({ id: editingDomain.id, data: formData })
            : addDomain({ ...formData, createdDate: Date.now() });

        return payload.unwrap();
    };

    const handleClose = () => {
        addDomainResult.reset();
        editDomainResult.reset();
        dispatch(setDrawerOpen(false));
    };

    useEffect(() => {
        if (isSuccess) {
            messageApi.success(`Domain was successfully ${editingDomain ? "edited" : "added"}`);
            handleClose();
        }
        if (isError && error && "status" in error) {
            messageApi.error(`${error.status} ${JSON.stringify(error.data)}`);
        }
    }, [isSuccess, isError]);

    return (
        <Drawer
            open={isOpen}
            size="large"
            title={editingDomain ? "Edit domain" : "Add domain"}
            onClose={handleClose}
            styles={{
                header: { borderBottom: 0 },
                footer: { borderTop: 0, padding: "1.5rem 2rem" },
            }}
            footer={<DrawerFooter isLoading={isLoading} isEditMode={!!editingDomain} handleClose={handleClose} />}
        >
            <ManageDomainDrawerForm editingDomain={editingDomain} handleManageDomain={handleManageDomain} />
        </Drawer>
    );
}

export default ManageDomainDrawer;
