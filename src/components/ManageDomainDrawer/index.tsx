import { Drawer } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// store
import { RootState } from "../../store";
import { setDrawerOpen } from "../../store/manageDomainDrawerSlice";
// context
import { useMessageApi } from "../../contexts/MessageContext";
// sections
import DrawerFooter from "./DrawerFooter";
import ManageDomainDrawerForm from "./ManageDomainDrawerForm";
// services
import { useAddDomainMutation, useEditDomainMutation } from "../../services/domain";
// utils
import { getApiErrorMessage } from "../../utils";
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
            : addDomain({ ...formData, createdDate: Math.floor(Date.now() / 1000) });

        return payload.unwrap();
    };

    const handleClose = () => {
        if (isError || isSuccess) {
            addDomainResult.reset();
            editDomainResult.reset();
        }
        dispatch(setDrawerOpen(false));
    };

    useEffect(() => {
        if (isSuccess) {
            messageApi.success(`Domain was successfully ${editingDomain ? "edited" : "added"}`);
            handleClose();
        }
        if (isError && error) {
            messageApi.error(getApiErrorMessage(error));
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
            <ManageDomainDrawerForm
                isDrawerOpen={isOpen}
                editingDomain={editingDomain}
                handleManageDomain={handleManageDomain}
            />
        </Drawer>
    );
}

export default ManageDomainDrawer;
