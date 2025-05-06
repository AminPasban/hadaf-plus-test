import { Button } from "antd";

interface Props {
    isEditMode: boolean;
    isLoading: boolean;
    handleClose: () => void;
}

function DrawerFooter({ isEditMode, isLoading, handleClose }: Readonly<Props>) {
    return (
        <div className="flex justify-end gap-4">
            <Button size="large" onClick={handleClose}>
                Cancel
            </Button>
            <Button htmlType="submit" form="DomainForm" type="primary" size="large" loading={isLoading}>
                {isLoading ? (isEditMode ? "Editing..." : "Adding...") : isEditMode ? "Edit" : "Add"}
            </Button>
        </div>
    );
}

export default DrawerFooter;
