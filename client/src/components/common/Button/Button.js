import styles from '../Button/Button.module.scss'

const Button = ({ children }) => (
  <button className={styles.shopBtn}>{children}</button>
);
  
export default Button;
  