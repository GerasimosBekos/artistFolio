import "./Main.css";
import Header from "./components/Header";
import Footer from "./components/Footer";   

function Main(props) {
    return (
        <div className="main">
            <Header />
            <div>
                <img src="/public/images/logo.png"/>
            </div>
            <h1>Welcome to the Main Page</h1>
            <p>This is the main content of the application.</p>
            <Footer />
        </div>
    );
}
export default Main;