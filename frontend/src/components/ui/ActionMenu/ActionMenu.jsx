import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import "./ActionMenu.css";

const DROPDOWN_WIDTH = 180;
const VIEWPORT_MARGIN = 8;

function ActionMenu({
    onEdit,
    onDelete,
    extraActions = [],
    deleteLabel = "Delete"
}) {

    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState(null);

    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    const updatePosition = useCallback(() => {

        const trigger = triggerRef.current;
        if (!trigger) return;

        const rect = trigger.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = rect.right - DROPDOWN_WIDTH;
        left = Math.max(
            VIEWPORT_MARGIN,
            Math.min(left, viewportWidth - DROPDOWN_WIDTH - VIEWPORT_MARGIN)
        );

        const dropdownHeight = dropdownRef.current?.offsetHeight || 0;
        const spaceBelow = viewportHeight - rect.bottom;
        const shouldOpenUpwards =
            dropdownHeight > 0 &&
            spaceBelow < dropdownHeight + VIEWPORT_MARGIN &&
            rect.top > dropdownHeight;

        const top = shouldOpenUpwards
            ? rect.top - dropdownHeight - 6
            : rect.bottom + 6;

        setCoords({ top, left });

    }, []);

    useEffect(() => {

        if (!isOpen) return;

        function handleClickOutside(event) {

            if (
                triggerRef.current?.contains(event.target) ||
                dropdownRef.current?.contains(event.target)
            ) {
                return;
            }

            setIsOpen(false);

        }

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };

    }, [isOpen, updatePosition]);

    useLayoutEffect(() => {

        if (!isOpen) return;

        updatePosition();
        updatePosition();

    }, [isOpen, updatePosition]);

    const closeMenu = () => setIsOpen(false);

    if (!onEdit && !onDelete && extraActions.length === 0) {
        return null;
    }

    return (
        <div className="action-menu">

            <button
                ref={triggerRef}
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
                isOpen && createPortal(
                    <div
                        ref={dropdownRef}
                        className="action-menu-dropdown"
                        style={
                            coords
                                ? { top: coords.top, left: coords.left, visibility: "visible" }
                                : { top: 0, left: 0, visibility: "hidden" }
                        }
                    >

                        {
                            onEdit && (
                                <button
                                    type="button"
                                    className="action-menu-item"
                                    onClick={() => {

                                        closeMenu();

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

                                        closeMenu();

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

                                        closeMenu();

                                        onDelete();

                                    }}
                                >
                                    <Trash2 size={15} />

                                    {deleteLabel}

                                </button>
                            )
                        }

                    </div>,
                    document.body
                )
            }

        </div>
    );
}

export default ActionMenu;
