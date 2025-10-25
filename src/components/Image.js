import "./Image.css";

function Image({title, text, image, height, titleSize, textSize}) {
    return (
        <div className="image-container" style={{backgroundImage: `url(${image})`, height: height }}>
            <div className="image-title" style={{fontSize: titleSize}}>{title}</div>
            <div className="image-text" style={{fontSize: textSize}}>{text}</div>
        </div>
    );
}
export default Image;