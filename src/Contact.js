import "./Contact.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


function Contact(props) {
    return (
        <div className="contact">
            <Header />
            <h1>Welcome to the Contact Page</h1>
            <p>This is the Contact of the application.</p>
            <Footer />
        </div>
    );
}
export default Contact;