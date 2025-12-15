import Navbar from "../Layout/Navbar.jsx";
import Hero from "../Home/Hero.jsx";
import Categories from "../Home/Categorias.jsx";
import Footerpage from "../Layout/Footer.jsx";
import Newsletter from "../Home/Newsletter.jsx";
import FeaturedProducts from "../Home/Feacturedproducts.jsx";

export default function Home(){
    return(
        <>
    <Navbar/>
    <Hero/>
    <Categories/>
    <Footerpage/>
    <FeaturedProducts/>
    <Newsletter/>
    </>
    );
}