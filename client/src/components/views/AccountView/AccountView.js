import PageContainer from "../../common/PageContainer/PageContainer";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../../redux/usersRedux";
import styles from '../AccountView/AccountView.module.scss';


const AccountView = () => {
  const user = useSelector(getUser);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logoutRequest());
    navigate('/')
  };
  return (
    <>
      {user && (
        <Container>
          <PageContainer>
              <h3 className="text-center">Account information</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Surname:</strong> {user.surname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Country:</strong> {user.country}</p>
              <p className="pb-3"><strong>City:</strong> {user.city}</p>
              <Link onClick={handleLogout} className={styles.btn}>Log out</Link>
          </PageContainer>
        </Container>
      )}
    </>
  );
};
  
export default AccountView;