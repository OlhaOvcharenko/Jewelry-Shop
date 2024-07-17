import { Container } from "react-bootstrap";
import BreadCrambSection from "../../common/Breadcramb/Breadcramb";
import PageContainer from "../../common/PageContainer/PageContainer";

const About = () => {
  return(
    <div>
      <BreadCrambSection title='ABOUT' link='Home' />
      <h1 className=" pt-4 text-center">TRENDY JEWELERY</h1>
      <p className=" pt-3 text-center">
        Suspendisse in ipsum sollicitudin, blandit purus id, blandit diam.
      </p>
      <p className=" pt-1 text-center">
        Vivamus vulputate tincidunt elit aliquam malesuada. Quisque vel fringilla sapien.
      </p>
      <p className=" p-1 text-center">
        Ut sollicitudin hendrerit eros et sodales. Donec
        Mauris cursus mattis molestie a iac.
      </p>
      <Container>
        <img 
          src="https://images.pexels.com/photos/3474504/pexels-photo-3474504.jpeg" 
          alt="Trendy Jewelry" 
          style={{ maxWidth: '100%', height: '500px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
        />
      </Container>
    </div>
  )
};
  
export default About;