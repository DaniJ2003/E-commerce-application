import Categories from "../Components/Categories";
import Newsletter from "../Components/Newsletter";
import Products from "../Components/Products";
import Slider from "../Components/Slider";

export default function Home() {
  return (
    <div>
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
    </div>
  );
}
