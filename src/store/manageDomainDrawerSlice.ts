import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import { IDomain } from "../types";

interface ManageDomainDrawerState {
    isOpen: boolean;
    editingDomain: IDomain | null;
}

const manageDomainDrawerSlice = createSlice({
    name: "manageDomainDrawer",
    initialState: { isOpen: false, editingDomain: null } as ManageDomainDrawerState,
    reducers: {
        setDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setEditingDomain: (state, action: PayloadAction<IDomain | null>) => {
            state.editingDomain = action.payload;
        },
    },
});

export const { setDrawerOpen, setEditingDomain } = manageDomainDrawerSlice.actions;
export default manageDomainDrawerSlice.reducer;
