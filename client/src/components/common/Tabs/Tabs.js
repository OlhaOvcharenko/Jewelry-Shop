import { Tab } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import styles from '../Tabs/Tabs.module.scss'

const Tabs = ({ descriptionContent, reviewsContent }) => (
  <Tab.Container id="item-tabs" defaultActiveKey="description">
    <Nav justify variant="tabs" className="my-4 mx-0">
      <Nav.Item>
        <Nav.Link eventKey="description"><span className={styles.link}>Description</span></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="reviews"><span className={styles.link}>Reviews</span></Nav.Link>
      </Nav.Item>
    </Nav>
    <Tab.Content>
      <Tab.Pane eventKey="description" className="py-2 px-3">
        <p className={styles.content}>{descriptionContent}</p>
      </Tab.Pane>
      <Tab.Pane eventKey="reviews" className="py-2">
        <p className={styles.content}>{reviewsContent}</p>
      </Tab.Pane>
    </Tab.Content>
  </Tab.Container>
);
  
export default Tabs;