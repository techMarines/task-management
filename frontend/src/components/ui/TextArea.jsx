export default function TextArea({ id, name, placeholder, onChange, isRequired, cssClasses }) {
    return (
        <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            className={`mb-5 w-full rounded bg-gray-700 p-3 font-mono md:w-10/12 ${cssClasses}`}
            onChange={onChange}
            required={isRequired}
        />
    );
}
