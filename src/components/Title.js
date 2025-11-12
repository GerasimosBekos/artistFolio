import "./Title.css";

function Title({title , subtitle}) {
    return (
        <div>
            <div className="subtitle">
                {subtitle}
            </div>
            <div className="title">
                {title}
            </div>
        </div>
    );
}

export default Title