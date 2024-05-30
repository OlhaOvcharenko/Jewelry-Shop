import { useParams } from "react-router-dom";
import { getProductById } from "../../../redux/productsRedux";
import { Card,Row, Col, Button } from "react-bootstrap";
import ButtonsGroup from "../../common/ButtonsGroup/ButtonsGroup";
import { useDispatch, useSelector } from "react-redux";
import { IMAGES_URL } from "../../../config";
import { addToBagRequest, getAllBagProducts} from "../../../redux/bagRedux";
import { useState } from "react";
import styles from '../SingleProduct/SingleProduct.module.scss';
import Tabs from "../../common/Tabs/Tabs";
import Gallery from "../../views/Gallery/Gallery";
import  Zoom  from 'react-medium-image-zoom';
import { clsx } from "clsx";
import 'react-medium-image-zoom/dist/styles.css';
import { getRequest } from "../../../redux/bagRedux";
import ModalBag from "../ModalBag/ModalBag";
import { useEffect } from "react";

const SingleProduct = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  
  const productData = useSelector(state => getProductById(state, id));
  const bag = useSelector(state => getAllBagProducts(state));
  const request = useSelector(getRequest);
  
  const galleryImages = productData.gallery.split(',');
  const size = productData.size.split(',');

  const [quantity, setQuantity] = useState(productData.quantity); 
  const [chosenSize, setChosenSize] = useState(1);
  
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDecrement = () => {
    if( quantity > 1) {
      setQuantity( quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleChoseSize = (clickedSize) => {
    setChosenSize(prevChosenSize => (prevChosenSize === clickedSize ? null : clickedSize));
  }

  const handleAddProductToBag = () => {
    const subtotal = productData.price * quantity;
    const productToAdd = {
      id: productData.id,
      quantity: quantity,
      subTotal: subtotal,
      size: size[chosenSize],
    };
  
    dispatch(addToBagRequest(productToAdd));
  }

  useEffect(() => {
    if (request['app/bag/ADD_TO_BAG']?.success) {
        handleShowModal();
    }
  }, [request]);

  return (
    <>
      {(request['app/bag/ADD_TO_BAG']?.success) && (
        <ModalBag show={showModal} onHide={handleCloseModal} product={productData} />
      )}

      <div className={styles.box}>
        <Card style={{ width: '75rem', border: 'none' }}>
          <Row>
              <Col className="m-3">
                  <div className="d-flex justify-content-center align-items-center">
                      <Zoom>
                          <Card.Img
                              src={`${IMAGES_URL}/${productData.photo}`}
                              style={{ width: '30rem', height: '30rem', margin: '1rem', objectFit: 'cover' }}
                          />
                      </Zoom>
                  </div>
                  <Gallery galleryImages={galleryImages} />
              </Col>

              <Col>
                <Card.Body className="py-4">
                  <h1 className={styles.title}>{productData.name}</h1>
                    <div className={styles.content}>
                        <p className="py-2">
                          <b>Price:</b> {productData.price}zl
                        </p>
                        <p className="py-2">
                          <b>Size:</b>{" "}
                            {size.map((sizeElement, index) => (
                              <span
                                key={index}
                                className={clsx(styles.size, { [styles.isChosenSize]: index === chosenSize })}
                                onClick={() => handleChoseSize(index)}
                              >
                                {sizeElement}
                              </span>
                            ))}
                          </p>
                          <p className="py-2">
                            <b>Category:</b> {productData.category}
                          </p>
                          <p className="py-2">
                            <b>Quantity:</b>
                            <ButtonsGroup quantity={quantity} handleDecrement={handleDecrement} handleIncrement={handleIncrement} />
                          </p>
                      </div>
                  </Card.Body>
                  <Button variant="dark" size="lg" className="px-5 my-2 mx-3 mb-4" onClick={handleAddProductToBag}>
                      Add to bag
                  </Button>
                  <p className="py-4">
                      <i>We can deliver your order at any place or you can buy the product in our local department.</i>
                  </p>
              </Col>
          </Row>

          <Tabs descriptionContent={productData.description} reviewsContent="Reviews content goes here..." />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;