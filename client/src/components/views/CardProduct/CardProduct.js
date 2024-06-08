import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from "../../../config";
import Button from '../../common/Button/Button';
import styles from './CardProduct.module.scss';

const CardProduct = ({ product }) => {
  return (
    <Col key={product.id}>
      <Card className={`m-2 ${styles.card}`}>
        <div className={styles.imageContainer}>
          <Card.Img
            variant="top"
            src={`${IMAGES_URL}/${product.photo}`}
            style={{ height: '250px', objectFit: 'cover' }}
            className={styles.image}
          />
          <div className={styles.overlay}>
            <Button className={styles.cardBtn}>
              <Link to={`/${product.id}`} className={styles.link}>
                See More
              </Link>
            </Button>
          </div>
        </div>
        <Card.Body>
          <Link to={`/${product.id}`} className={styles.link}>
            <Card.Title className="d-flex justify-content-center">{product.name}</Card.Title>
          </Link>
          <Card.Text className="d-flex justify-content-center">{product.price}zl</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardProduct