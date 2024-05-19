import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Modal from 'react-bootstrap/Modal';
import { Card, Col,Row, Image } from 'react-bootstrap';
import { IMAGES_URL } from '../../../config';

const ModalBag = ({ show, onHide, product }) => {
  return (
      <Modal size="lg" show={show} onHide={onHide} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
              <Modal.Title>Item has been added to bag.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Card key={product.id} className="mb-1" style={{ border: 'none' }}>
                  <Card.Body>
                      <Row className="align-items-center">
                          <Col lg={2}>
                              <Image src={`${IMAGES_URL}/${product.photo}`} alt={product.name} rounded style={{ width: '50px' }} />
                          </Col>
                          <Col>
                              <div>
                                  <h5>{product.name}</h5>
                              </div>
                          </Col>
                          <Col>
                              <p>Quantity: {product.quantity}</p>
                          </Col>
                      </Row>
                  </Card.Body>
              </Card>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                  Continue shopping
              </Button>
              <Link to="/bag" className="btn btn-secondary">Go to Bag</Link>
          </Modal.Footer>
      </Modal>
  );
};

export default ModalBag;