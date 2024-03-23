import { useParams } from "react-router-dom";
import { getProductById } from "../../../redux/productsRedux";
import { Card,Row, Col, Button } from "react-bootstrap";
import ButtonsGroup from "../../common/ButtonsGroup/ButtonsGroup";
import { useDispatch, useSelector } from "react-redux";
import { IMAGES_URL } from "../../../config";
import { addToBag, getAllBagProducts } from "../../../redux/bagRedux";
import { useState } from "react";
import { updateBag } from "../../../redux/bagRedux";
import styles from '../SingleProduct/SingleProduct.module.scss';
import Tabs from "../../common/Tabs/Tabs";
import Gallery from "../../views/Gallery/Gallery";

const SingleProduct = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const productData = useSelector(state => getProductById(state, id));
  const bag = useSelector(state => getAllBagProducts(state));
  const galleryImages = productData.gallery.split(',');
  const size = productData.size.split(',');

  const [quantity, setQuantity] = useState(1); 

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };


  const handleAddProductToBag = () => {
    const subtotal = productData.price * quantity;
    const existingProductIndex = bag.findIndex(item => item.id === id);
  
    if (existingProductIndex !== -1) {
      const updatedBag = [...bag];
      updatedBag[existingProductIndex].quantity += quantity;
      updatedBag[existingProductIndex].subTotal += subtotal;
      dispatch(updateBag(updatedBag));

    } else {
      const product = {
        ...productData,
        subTotal: subtotal
      };
      dispatch(addToBag(product)); 
    }
  };

  return (
    <div className={styles.box}>
      <Card style={{ width: '75rem', border: 'none' }}>
        <Row>

          <Col>
            <div className="d-flex justify-content-center align-items-center">
              <Card.Img src={`${IMAGES_URL}/${productData.photo}`} style={{ width: '30rem', margin: '1rem' }} />
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
                    <span key={index} className={styles.size}>
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