export interface ButtonProps {
  size?: string;
  type?: 'button' | 'submit' | 'reset';
  styleType?: string;
  color?: string;
  disabled?: boolean;
  text: string;
  className?: string;
  as?: 'link';
  href?: string;
  styleObj?: IBtnStyles;
  onClick?: () => void;
}

export interface IBtnStyles {
  [key: string]: string;
}
