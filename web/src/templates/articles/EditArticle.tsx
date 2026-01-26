import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { articleService } from "../../service/articleService.ts";
import type { Article } from "../../service/Article.ts";

interface Props {
    onArticleUpdated: () => void;
}

export function EditArticle({ onArticleUpdated }: Props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        if (id) {
            articleService.getArticleById(Number(id)).then(setArticle);
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (article && id) {
            await articleService.updateArticle(Number(id), article);
            onArticleUpdated();
            navigate("/");
        }
    };

    if (!article) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="article-form">
            <h3>Éditer l'article</h3>
            <input type="text" value={article.name} onChange={e => setArticle({...article, name: e.target.value})} />
            <select value={article.category} onChange={e => setArticle({...article, category: e.target.value})}>
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
                <option value="other">Other</option>
            </select>
            <input type="number" value={article.price} onChange={e => setArticle({...article, price: parseFloat(e.target.value)})} />
            <textarea value={article.description} onChange={e => setArticle({...article, description: e.target.value})} />
            <button type="submit">Update</button>
        </form>
    );
}