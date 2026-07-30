import "./Input.css";

function Input({
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    disabled = false
}) {
    return (
        <input
            className="tm-input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            disabled={disabled}
        />
    );
}

export default Input;