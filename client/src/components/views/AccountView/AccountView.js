import PageContainer from "../../common/PageContainer/PageContainer";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../../redux/usersRedux";

const AccountView = () => {
  const user = useSelector(getUser);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  
  return (
    <>
      {user && (
        <Container>
          <PageContainer>
         
              <h1 >{user.name} {user.surname}</h1>
       
              <Link onClick={handleLogout}>Log out</Link>
          </PageContainer>
        </Container>
      )}
    </>
  );
};
  
export default AccountView;