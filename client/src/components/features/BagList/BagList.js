import { useSelector } from "react-redux";
import { getAllBagItems } from "../../../redux/bagRedux";
import { Container } from "react-bootstrap";
import BagItem from "../BagItem/BagItem";
import styles from '../BagList/BagList.module.scss'
const BagList = () => {
  const bagItems = useSelector(state => getAllBagItems(state))
  
  return(
    <Container >
     <div className={styles.bagContainer}>
      {bagItems.map((item) => (
        <BagItem  key={item.id} bagItem={item} />
      ))}
      </div>
    </Container>
  )
}
  
export default BagList;