import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { articleService } from "../../service/articleService.ts";
import { categoryService } from "../../service/categoryService.ts"; // Import du service de catégories
import type { Article } from "../../service/Article.ts";
import type { Category } from "../../service/Category.ts"; // Import du type

interface Props {
    onArticleUpdated: () => void;
    idFromProps?: number;
    onClose: () => void;
}

export function EditArticle({ onArticleUpdated, idFromProps, onClose }: Props) {
    const { id: urlId } = useParams();
    const effectiveId = idFromProps || Number(urlId);
    const [article, setArticle] = useState<Article | null>(null);
    const [categories, setCategories] = useState<Category[]>([]); // État pour stocker les catégories

    useEffect(() => {
        if (effectiveId) {
            articleService.getArticleById(effectiveId).then(setArticle);
        }

        categoryService.getAllCategories()
            .then(setCategories)
            .catch(err => console.error("Error loading categories:", err));
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
                <input
                    type="text"
                    value={article.name}
                    onChange={e => setArticle({...article, name: e.target.value})}
                    required
                />
            </p>
            <p>
                <select
                    value={article.category}
                    onChange={e => setArticle({...article, category: e.target.value})}
                    required
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </p>
            <p>
                <input
                    type="number"
                    value={article.price}
                    onChange={e => setArticle({...article, price: parseFloat(e.target.value)})}
                    required
                />
            </p>
            <p>
                <textarea
                    value={article.description}
                    onChange={e => setArticle({...article, description: e.target.value})}
                />
            </p>
            <p>
                <button type="submit">Update</button>
            </p>
            <div className="panel-controls">
                <button type="button" onClick={onClose} className="btn-close">Close</button>
            </div>
        </form>
    );
}