import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { articleService } from "../../service/articleService.ts";
import type { Article } from "../../service/Article.ts";

interface Props {
    onArticleUpdated: () => void;
    idFromProps?: number;
    onClose: () => void;
}

export function EditArticle({ onArticleUpdated, idFromProps, onClose }: Props) {
    const { id: urlId } = useParams();
    const effectiveId = idFromProps || Number(urlId);
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        if (effectiveId) {
            articleService.getArticleById(effectiveId).then(setArticle);
        }
    }, [effectiveId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (article && effectiveId) {
            await articleService.updateArticle(effectiveId, article);
            onArticleUpdated();
        }
    };

    if (!article) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="article-form">
            <h3>Edit Article</h3>
            <p>
                <input type="text" value={article.name} onChange={e => setArticle({...article, name: e.target.value})} />
            </p>
            <p>
                <select value={article.category} onChange={e => setArticle({...article, category: e.target.value})}>
                    <option value="fruit">Fruit</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="other">Other</option>
                </select>
            </p>
            <p>
                <input type="number" value={article.price} onChange={e => setArticle({...article, price: parseFloat(e.target.value)})} />
            </p>
            <p>
                <textarea value={article.description} onChange={e => setArticle({...article, description: e.target.value})} />
            </p>
            <p>
                <button type="submit">Update</button>
            </p>
            <div className="panel-controls">
                <button onClick={onClose} className="btn-close">Close</button>
            </div>
        </form>
    );
}