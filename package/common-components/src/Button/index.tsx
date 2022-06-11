import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  type?: 'submit' | 'button';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, type, ...props }, ref) => (
    // eslint-disable-next-line react/button-has-type
    <button ref={ref} type={type} {...props}>
      {label}
    </button>
  )
);

export default Button;
