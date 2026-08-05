import "./Input.css";

function Input({label, type = "text", placeholder, value, onChange, name, disabled = false, required = false}) {
    return (
        <div className="tm-input-group">
            {
                label && (
                    <label className="tm-input-label" htmlFor={name}>
                        {label}
                    </label>
                )
            }
            <input
                id={name}
                className="tm-input"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                disabled={disabled}
                required={required}
            />
        </div>
    );
}

export default Input;