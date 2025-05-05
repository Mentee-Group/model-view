import React from "react";

type BaseProps = {
  label: string;
  name: string;
  type?: "text" | "textarea" | "select" | string;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type FormFieldProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

export function FormField({
  label,
  name,
  type = "text",
  required = false,
  className = "",
  children,
  ...props
}: FormFieldProps) {
  let Component: React.ElementType = "input";

  if (type === "textarea") {
    Component = "textarea";
  } else if (type === "select") {
    Component = "select";
  }

  return (
    <div className="mb-8">
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Component
        id={name}
        name={name}
        className={`w-full border rounded p-2 ${className}`}
        required={required}
        {...props}
        {...(type !== "textarea" && type !== "select" ? { type } : {})}
      >
        {children}
      </Component>
    </div>
  );
}