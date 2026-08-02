import { useState } from "react"

import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import "./ActionMenu.css";

function ActionMenu({ onEdit, onDelete }) {

    const [open, setOpen] = useState(false);

    return (
        <div className="action-menu">
            <button
                className="icon-button"
                onClick={() => setOpen(!open)}
            >
                <MoreVertical size={18} />
            </button>
            {
                open && (
                    <div className="action-dropdown">
                        <button onClick={onEdit}>
                            <Pencil size={16}/>
                            Edit
                        </button>
                        <button
                            onClick={onDelete}
                            className="danger"
                        >
                            <Trash2 size={16}/>
                            Delete
                        </button>
                    </div>
                )
            }
        </div>
    );

}

export default ActionMenu;