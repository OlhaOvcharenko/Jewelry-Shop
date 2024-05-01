
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageContainer from "../../common/PageContainer/PageContainer";

const LogOut = () => {
  return (
    <PageContainer>
      <Alert>
        <Alert.Heading>You have been logged out!</Alert.Heading>
        <Link to="/">Come back home</Link>
      </Alert>
    </PageContainer>
  )
};


export default LogOut;