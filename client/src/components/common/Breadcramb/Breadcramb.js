import styles from '../Breadcramb/Breadcramb.module.scss'
import { Link } from 'react-router-dom';


const BreadCrambSection = ({ title, link }) => (
  <div className={styles.header}>
    <h1 className={styles.title}>{title}</h1>
    <Link to="/"  className={styles.headerLink}><b>{link}</b></Link>
  </div>
);
  

export default BreadCrambSection;