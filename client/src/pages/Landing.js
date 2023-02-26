import {Link} from "react-router-dom";

import {Logo} from "../components/index";
import MainSvg from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/Testing";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby ethical four loko selfies pickled cronut bruh sustainable
            cornhole. Skateboard ascot 3 wolf moon kombucha. Flannel +1
            helvetica, distillery letterpress scenester enamel pin blue bottle
            migas organic tousled sus kitsch. Intelligentsia JOMO vice
            farm-to-table, ugh shaman lomo selvage hell of helvetica church-key
          </p>
          <Link to='/register' className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={MainSvg} alt="Job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};



export default Landing;
