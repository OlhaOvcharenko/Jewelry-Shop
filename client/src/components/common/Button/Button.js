import styles from '../Button/Button.module.scss'

const Button = ({ onClick, children }) => (
  <button className={styles.shopBtn} onClick={onClick}>
    {children}
  </button>
);

export default Button;