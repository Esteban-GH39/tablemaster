import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import "./ActionMenu.css";

function ActionMenu({
    onEdit,
    onDelete,
    extraActions = [],
    deleteLabel = "Delete"
}) {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    return (
        <div
            className="action-menu"
            ref={menuRef}
        >

            <button
                type="button"
                className="action-menu-trigger"
                onClick={() =>
                    setIsOpen((prev) => !prev)
                }
                aria-label="Open actions menu"
            >
                <MoreVertical size={18} />
            </button>

            {
                isOpen && (
                    <div className="action-menu-dropdown">

                        {
                            onEdit && (
                                <button
                                    type="button"
                                    className="action-menu-item"
                                    onClick={() => {

                                        setIsOpen(false);

                                        onEdit();

                                    }}
                                >
                                    <Pencil size={15} />
                                    Edit
                                </button>
                            )
                        }

                        {
                            extraActions.map((action) => (

                                <button
                                    key={action.label}
                                    type="button"
                                    className="action-menu-item"
                                    disabled={action.disabled}
                                    onClick={() => {

                                        setIsOpen(false);

                                        action.onClick?.();

                                    }}
                                >
                                    {action.icon}

                                    {action.label}

                                </button>

                            ))
                        }

                        {
                            onDelete && (
                                <button
                                    type="button"
                                    className="action-menu-item action-menu-item-danger"
                                    onClick={() => {

                                        setIsOpen(false);

                                        onDelete();

                                    }}
                                >
                                    <Trash2 size={15} />

                                    {deleteLabel}

                                </button>
                            )
                        }

                    </div>
                )
            }

        </div>
    );
}

export default ActionMenu;