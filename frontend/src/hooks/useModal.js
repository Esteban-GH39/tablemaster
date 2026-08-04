import { useState } from "react";

function useModal() {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const open = () => {
        setSelectedItem(null);
        setIsOpen(true);
    };

    const close = () => {
        setSelectedItem(null);
        setIsOpen(false);
    };

    const edit = (item) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    return {
        isOpen,
        selectedItem,
        open,
        close,
        edit
    };

}

export default useModal;