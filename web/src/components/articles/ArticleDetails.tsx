import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { articleService } from "../../service/articleService.ts";
import type { Article } from "../../service/Article.ts";

interface Props {
    onClose: () => void;
}

export function ArticleDetails({ onClose }: Props) {
    const { id } = useParams<{ id: string }>(); // Récupère l'ID de l'URL
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        if (id) {
            articleService.getArticleById(Number(id))
                .then(setArticle)
                .catch(err => console.error("Error loading article details:", err));
        }
    }, [id]);

    if (!article) return <div className="placeholder"><p>Loading details...</p></div>;

    return (
        <div className="article-details">
            <div>
                <h4>Details</h4>
                <p><strong>Name:</strong> {article.name}</p>
                <p><strong>Category:</strong> {article.category}</p>
                <p><strong>Price:</strong> {article.price}€</p>
                <p><strong>Description:</strong> {article.description}</p>
                <div className="panel-controls">
                    <button onClick={onClose} className="btn-close">Close</button>
                </div>
            </div>
        </div>
    );
}