
import { IMAGES_URL } from '../../../config';
import styles from '../Gallery/Gallery.module.scss';

const Gallery = ({ galleryImages }) => (
    
  <div className={`row ${styles.slider}`}>
    <div className={`row justify-content-start`}>
        {galleryImages.map((image, i) => (
        <div key={i} className={`${styles.item}`}> 
            <img
            src={`${IMAGES_URL}/${image}`}
            className='img-fluid w-100'
            />
        </div>
        ))}
    </div>
  </div>
);

export default Gallery;