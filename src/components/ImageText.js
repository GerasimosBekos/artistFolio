import "./ImageText.css";

function ImageText({title, text, image, height, titleSize, textSize}) {
    return (
        <div className="image-container" style={{backgroundImage: `url(${image})`, height: height }}>
            {title && <div className="image-title" style={{fontSize: titleSize}}>{title}</div>}
            <div className="image-text" style={{fontSize: textSize}}>{text}</div>
        </div>
    );
}

// Set default props
ImageText.defaultProps = {
    title: "",
    titleSize: "2rem",
    textSize: "1.5rem"
};

export default ImageText;