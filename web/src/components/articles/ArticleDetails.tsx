import type {ArticlePanelProps} from "./ArticlePanelProps.ts";

export function ArticleDetails({ article, onClose}: ArticlePanelProps){
    return (
        <div className="article-details">
            {article ? (
                <div>
                    <h4>Details</h4>
                    <p><strong>Name:</strong> {article.name}</p>
                    <p><strong>Price:</strong> {article.price}€</p>
                    <p><strong>Description:</strong> {article.description}</p>
                    <div className="panel-controls">
                        <button onClick={onClose} className="btn-close">Close</button>
                    </div>
                </div>
            ) : (
                <div className="placeholder">
                    <p>No article selected</p>
                </div>
            )}
        </div>
    );
}