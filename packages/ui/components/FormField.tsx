import { Input } from "./Input";
import { Textarea } from "./Textarea";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends React.HTMLProps<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  isTextarea?: boolean;
}

export const InputField: React.FC<Props> = (props) => {
  const { isTextarea = false, label, error, className, ...rest } = props;
  const hasError = Boolean(error);

  const labelCommonStyles = "block text-sm font-medium";
  const labelDefaultStyles = "text-gray-900 dark:text-white";
  const labelErrorStyles = "text-red-700 dark:text-red-500";

  const field = isTextarea ? (
    <Textarea
      {...(rest as React.HTMLProps<HTMLTextAreaElement>)}
      className="mt-2"
    />
  ) : (
    <Input {...(rest as React.HTMLProps<HTMLInputElement>)} className="mt-2" />
  );

  return (
    <div className="pb-7 relative">
      <label
        className={twMerge(
          labelCommonStyles,
          hasError ? labelErrorStyles : labelDefaultStyles
        )}
      >
        {label}
        {field}
      </label>

      {error && (
        <p className="absolute bottom-0 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{error}</span>
        </p>
      )}
    </div>
  );
};
