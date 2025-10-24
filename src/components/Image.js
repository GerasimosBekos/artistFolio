import "./Image.css";

function Image(props) {
    return (
        <div className="image-container">
            <div className="image-title">{props.title}</div>
            <div className="image-text">{props.text}</div>
        </div>
    );
}
export default Image;