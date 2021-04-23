import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { OrderContext } from "../../contexts/OrderContextProvider";
import axios from "../../config/axios";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

function Banner() {
  const { coupon, setCoupon } = useContext(OrderContext);
  const history = useHistory();
  const [error, setError] = useState({});

  const handlerGetCoupon = async (e) => {
    e.preventDefault();
    axios
      .get("/coupon/createcoupon")
      .then((res) => {
        setCoupon(res.data.coupon);
        history.push("/getcoupon");
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };
  return (
    <>
      <OwlCarousel className="owl-theme" loop margin={15} nav>
        <div class="item">
          <img src="https://res.cloudinary.com/dux0yt3qn/image/upload/v1618631536/myProjectFood/BannerFOODSAI/2_qqgkub.jpg" />
        </div>
        <div class="item">
          <img src="https://res.cloudinary.com/dux0yt3qn/image/upload/v1618631531/myProjectFood/BannerFOODSAI/3_s74b63.jpg" />
        </div>
        <div class="couponItem">
          <img
            onClick={(e) => handlerGetCoupon(e)}
            src="https://res.cloudinary.com/dux0yt3qn/image/upload/v1619149277/Red_and_Yellow_Barbecue___Grill_Restaurant_Deals___Promo_and_Deliveries_Food_Instagram_Post_hltxvk.jpg"
          />
        </div>
      </OwlCarousel>
      ;
    </>
  );
}
export default Banner;
