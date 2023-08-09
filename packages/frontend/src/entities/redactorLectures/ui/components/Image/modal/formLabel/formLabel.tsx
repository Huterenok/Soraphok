"use client";
import { formLabel, inputLabel, titleLabel } from "./formLabel.module.scss";
import debounce from "lodash.debounce";

interface FormLabel {
  title: string;
  defaultValue: string;
  keyImage: string;
  onChange: (key: string, e: string) => void;
}

export const FormLabel = ({
  title,
  defaultValue,
  keyImage,
  onChange,
}: FormLabel) => {
  return (
    <fieldset
      className={formLabel}
      onSelect={(event) => event.preventDefault()}
    >
      <span className={titleLabel}>{title}</span>

      <input
        onBlur={(e) => {
          onChange(keyImage, e.target.value);
        }}
        onChange={debounce((e) => {
          onChange(keyImage, e.target.value);
        }, 500)}
        type="text"
        className={inputLabel}
        defaultValue={defaultValue}
      />
    </fieldset>
  );
};
