import { formLabel, inputLabel, titleLabel } from "./formLabel.module.scss";
import debounce from "lodash.debounce";

interface FormLabel {
  title: string;
  defaultValue: string;
  key: string;
  onChange: (
    key: string,
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => void;
}

export const FormLabel = ({
  title,
  defaultValue,
  key,
  onChange,
}: FormLabel) => {
  return (
    <label className={formLabel}>
      <span className={titleLabel}>{title}</span>
      <input
        onBlur={(e) => {
          onChange(key, e);
        }}
        onChange={debounce((e) => {
          console.log(e.target.value);
          onChange(key, e);
        }, 500)}
        type="text"
        className={inputLabel}
        defaultValue={defaultValue}
      />
    </label>
  );
};
