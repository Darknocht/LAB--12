import {ArticleDetailsPanel} from "../../components/articles/ArticleDetailsPanel.tsx";
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import type {Article} from '../../service/Article.ts';

interface MainPanelProps {
    articles: Article[];
    onDelete: (id: number) => void;
}

export function ArticleList({ articles, onDelete }: MainPanelProps) {
    const [selectedTop, setSelectedTop] = useState<Article | null>(null);
    const navigate = useNavigate();

    return (
        <div className="main-panel">
            <div className="main-content">
                <div className="articles-grid">
                    <Link to="/AddArticle">
                        <button className="btn-add">Add article</button>
                    </Link>
                    {articles.map(article => (
                        <div key={article.id} className="article-tile">
                            <h3>{article.name}</h3>
                            <p className="category-tag">{article.category}</p>
                            <div className="tile-actions">
                                <button
                                    onClick={() => setSelectedTop(article)}
                                    className={selectedTop?.id === article.id ? "btn-active" : ""}
                                >Details</button>
                                <button onClick={() => navigate(`/edit/${article.id}`)}>Edit</button>
                                <button
                                    onClick={() => onDelete(article.id)}
                                    className="btn-close"
                                >Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="side-panels">
                <ArticleDetailsPanel article={selectedTop} onClose={() => setSelectedTop(null)}/>
            </div>
        </div>
    );
}