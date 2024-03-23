import { IMAGES_URL } from '../../../config';
import styles from '../Gallery/Gallery.module.scss';
import  Zoom  from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const Gallery = ({ galleryImages }) => (
    
  <div className={`row ${styles.slider}`}>
    <div className={`row justify-content-start`}>
        {galleryImages.map((image, i) => (
        <div key={i} className={`${styles.item}`}> 
          <Zoom>
            <img
            src={`${IMAGES_URL}/${image}`}
            className='img-fluid w-100'
            />
          </Zoom>
        </div>
        ))}
    </div>
  </div>
);

export default Gallery;