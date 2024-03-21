import styles from '../PageContainer/PageContainer.module.scss'

const PageContainer = ({ children }) => (
  <div className={styles.pageContainer}>
    {children}
  </div>
);
  
export default PageContainer;
  