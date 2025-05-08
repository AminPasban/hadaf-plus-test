import { SetStateAction, Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Select, Input, Button } from "antd";
// store
import { setEditingDomain, setDrawerOpen } from "../../store/manageDomainDrawerSlice";
// types
import { IDomainListFilters, IDomainListOrder } from "../../types";

interface Props {
    filter: IDomainListFilters;
    setFilter: Dispatch<SetStateAction<IDomainListFilters>>;
}

function TableToolbar({ filter, setFilter }: Readonly<Props>) {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const handleClickAddDomainBtn = () => {
        dispatch(setEditingDomain(null));
        dispatch(setDrawerOpen(true));
    };

    // Handle debounce search
    useEffect(() => {
        const timer = setTimeout(() => setFilter((prevState) => ({ ...prevState, search: search.trim() })), 500);
        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className="flex items-center mb-12">
            {/*---- Add Domain Button ----start-*/}
            <Button
                size="large"
                type="primary"
                className="!h-12"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18" height="18" fill="#fff">
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                    </svg>
                }
                onClick={handleClickAddDomainBtn}
            >
                Add Domain
            </Button>
            {/*---- Add Domain Button ----end-*/}

            <div className="flex gap-8 ms-auto">
                {/*---- Order Select Box ----start-*/}
                <Select
                    value={filter.order}
                    className="min-w-60 w-60 !h-12"
                    onChange={(order) => setFilter((prevState) => ({ ...prevState, order }))}
                    options={[
                        { value: IDomainListOrder.Ascending, label: <span>Order by Ascending</span> },
                        { value: IDomainListOrder.Descending, label: <span>Order by Decending</span> },
                    ]}
                />
                {/*---- Order Select Box ----end-*/}

                {/*---- Search Box ----start-*/}
                <Input
                    placeholder="search"
                    className="!min-w-60"
                    onChange={(event) => setSearch(event.target.value)}
                    prefix={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="14"
                            height="14"
                            className="me-2 fill-gray-400"
                        >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    }
                />
                {/*---- Search Box ----end-*/}
            </div>
        </div>
    );
}

export default TableToolbar;
