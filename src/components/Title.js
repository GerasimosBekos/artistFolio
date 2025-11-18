import "./Title.css";

function Title({title , subtitle}) {
    return (
        <div>
            <div className="title-subtitle">
                {subtitle}
            </div>
            <div className="title-title">
                {title}
            </div>
        </div>
    );
}

export default Title