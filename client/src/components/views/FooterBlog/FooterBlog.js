import styles from '../FooterBlog/FooterBlog.module.scss'

const FooterBlog = () => (
  <section className={styles.blog}>
    <div className={styles.content}>
      <div  className={styles.block}>
        <h5 className={styles.blockTitle}>USEFUL LINKS</h5>
        <a href="#" >Legal&Privacy</a>
        <a href="#">Contact</a>
        <a href="#" >Gift card</a>
        <a href="#">Customer service</a>
      </div>
      <div className={styles.block}>
        <h5 className={styles.blockTitle}>MY ACCOUNT</h5>
        <a href="#" >My profile</a>
        <a href="#">My order history</a>
        <a href="#">My wishlist</a>
        <a href="#">My shopping bag</a>
      </div>
      <div className={styles.block}>
        <h5 className={styles.blockTitle}>SHOP</h5>
        <a href="#">All products</a>
        <a href="#">New Collection</a>
        <a href="#">Top Selling Products</a>
        <a href="#">Best Choice</a>
      </div>
      <div className={styles.block}>
        <h5 className={styles.blockTitle}>COMPANY</h5>
        <a href="#">About us</a>
        <a href="#">Blog</a>
        <a href="#">Services</a>
        <a href="#">Contact Us</a>
      </div>
      <div className={styles.details}>
        <h4 className={styles.detailsTitle}>GOT A  QUESTION? CALL US 24/7</h4>
        <h4 className={styles.number} >777-880-345</h4>
        <p>Monday-Friday: 9:00-20:00</p>
        <p>Saturday: 9:00-18:00</p>
      </div>
    </div>
    <div className='text-center mt-5'>
      <p>Copyright © Jewels 2024</p>
    </div>
  </section>
);
  
export default FooterBlog;