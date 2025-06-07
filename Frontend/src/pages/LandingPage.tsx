import Navbar from "../components/LandingComponents/Navbar";
import Hero from "../components/LandingComponents/Hero";
import PinGrid from "../components/LandingComponents/PinGrid";
import Categories from "../components/LandingComponents/Categories";
import Testimonials from "../components/LandingComponents/Testimonials";
import CallToAction from "../components/LandingComponents/CallToAction";

const LandingPage:React.FC = () =>{
    return(
        <>
        <Navbar/>
        <Hero/>
        <PinGrid/>
        <Categories/>
        <Testimonials/>
        <CallToAction/>
        


        </>
    )
}
export default LandingPage