export interface ButtonProps {
  size?: string;
  type?: string;
  color?: string;
  disabled?: boolean;
  text: string;
  className?: string;
  as?: 'link';
  href?: string;
  onClick: () => void;
}
