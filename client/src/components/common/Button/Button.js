import styles from '../Button/Button.module.scss'

const Button = ({ onClick, className, children }) => (
  <button className={`${styles.shopBtn} ${className}`} onClick={onClick}>
    {children}
  </button>
);
  

export default Button;