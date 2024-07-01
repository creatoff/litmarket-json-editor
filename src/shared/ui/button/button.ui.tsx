import { ButtonHTMLAttributes } from 'react';
import classes from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, ...otherProps }: ButtonProps) {
  return (
    <button className={`${className} ${classes.button}`} {...otherProps} />
  );
}
