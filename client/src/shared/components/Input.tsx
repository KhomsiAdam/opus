interface InputConfig {
  inputName: string;
  inputType: string;
  placeholderText: string;
  labelText: string;
  errorMessage: any;
  inputValidation: any;
}

export const Input = ({ inputName, placeholderText, inputType, labelText, errorMessage, inputValidation }: InputConfig) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <label htmlFor={inputName} className="text-lg font-medium text-gray-800">
        {labelText}:
      </label>
      <input
        id={inputName}
        name={inputName}
        className="input-primary"
        placeholder={placeholderText}
        {...inputValidation}
        type={inputType}
      />
      <p className="text-lg font-medium text-red-500">
        {errorMessage}
      </p>
    </div>
  );
};
