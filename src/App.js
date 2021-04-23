import { Route, Switch, Redirect } from "react-router-dom";
//import Header from './components/layout/Header';
//import Home from './pages/Home';
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContextProvider";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrderPage from "./pages/OrderPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderNumberPage from "./pages/OrderNumberPage";
import GetCouponPage from "./pages/GetCouponPage";

const privateRoutes = [
  {
    path: "/ordersummary",
    component: OrderSummaryPage,
  },
  {
    path: "/findorder",
    component: OrderTrackingPage,
  },
  {
    path: "/numberorder",
    component: OrderNumberPage,
  },
  {
    path: "/getcoupon",
    component: GetCouponPage,
  },
];

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/order",
    component: OrderPage,
  },
];

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  //const [isAuthenticated, setIsAuthenticated]= useState(localStorageService.getToken());
  return (
    <Switch>
      {isAuthenticated &&
        privateRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}
      {publicRoutes.map((el, index) => (
        <Route key={index} exact path={el.path} component={el.component} />
      ))}
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
