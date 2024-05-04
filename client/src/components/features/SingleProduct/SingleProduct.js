import { useParams } from "react-router-dom";
import { getProductById } from "../../../redux/productsRedux";
import { Card,Row, Col, Button } from "react-bootstrap";
import ButtonsGroup from "../../common/ButtonsGroup/ButtonsGroup";
import { useDispatch, useSelector } from "react-redux";
import { IMAGES_URL } from "../../../config";
import { addToBag, addToBagRequest, getAllBagProducts } from "../../../redux/bagRedux";
import { useState } from "react";
import { updateBag } from "../../../redux/bagRedux";
import styles from '../SingleProduct/SingleProduct.module.scss';
import Tabs from "../../common/Tabs/Tabs";
import Gallery from "../../views/Gallery/Gallery";
import  Zoom  from 'react-medium-image-zoom';
import { clsx } from "clsx";
import 'react-medium-image-zoom/dist/styles.css';


const SingleProduct = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const productData = useSelector(state => getProductById(state, id));
  console.log(productData, 'product');

  const bag = useSelector(state => getAllBagProducts(state));
  console.log(bag)
  const galleryImages = productData.gallery.split(',');
  const size = productData.size.split(',');

  const [quantity, setQuantity] = useState(1); 
  const [chosenSize, setChosenSize] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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
    const existingProduct = bag.findIndex(item => item.id === id);
  
    if (existingProduct !== -1) {
      const updatedBag = [...bag];
      updatedBag[existingProduct].quantity += quantity;
      updatedBag[existingProduct].subTotal += subtotal;
      updatedBag[existingProduct].size += size[chosenSize];
      dispatch(addToBagRequest(updatedBag));

    } else {
      const product = {
        id: productData.id,
        quantity: quantity,
        subTotal: subtotal,
        size: size[chosenSize]
      };
      dispatch(addToBagRequest(product)); 
    }
};


  return (
    <div className={styles.box}>
      <Card style={{ width: '75rem', border: 'none' }}>
        <Row>

          <Col className="m-3">
            <div className="d-flex justify-content-center align-items-center">
              <Zoom>
                <Card.Img 
                  src={`${IMAGES_URL}/${productData.photo}`} 
                  style={{ width: '30rem', height: '30rem', margin: '1rem' ,objectFit: 'cover'}} />
              </Zoom>
            </div>
            <Gallery galleryImages={galleryImages} />
          </Col>

          <Col>
            <Card.Body className="py-4">
              <h1 className={styles.title}>{productData.name}</h1>
              <div className={styles.content}>
                <p className="py-2" ><b>Price:</b>{productData.price}zl</p>
                <p className="py-2"> <b>Size:</b>{" "}
                  {size.map((sizeElement, index) => (
                  
                    <span key={index} variant="outline-secondary mx-2" className={clsx(styles.size, {[styles.isChosenSize]: index === chosenSize})} 
                      onClick={() => handleChoseSize(index)} 
                    >
                      {sizeElement}
                    </span>
                 
                  ))}
                </p>
                <p className="py-2"><b>Category:</b> {productData.category}</p>
                <p className="py-2"><b>Quantity:</b>
                  <ButtonsGroup quantity={quantity} handleDecrement={handleDecrement} handleIncrement={handleIncrement}/>
                </p>
              </div>
            </Card.Body>
            <Button variant="dark" size="lg" className="px-5 my-2 mx-3 mb-4" onClick={handleAddProductToBag}>Add to bag</Button>
            <p className="py-4"><i>We can deliver your order at any place or you can but the product in our local department.</i></p>
          </Col>
        </Row>

        <Tabs 
          descriptionContent={productData.description}
          reviewsContent="Reviews content goes here..."
        />

      </Card>
    </div>
  );
}

export default SingleProduct;