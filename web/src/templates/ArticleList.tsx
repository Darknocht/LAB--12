import type {Article} from '../service/Article.ts';
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {articleService} from "../service/articleService.ts";

interface MainPanelProps {
    articles: Article[];
    onDelete: (id: number) => void;
    onArticleCreated: (article: Article) => void;
    onArticleUpdated: () => void;
}

export function ArticleList({ articles, onDelete }: MainPanelProps) {
    const activeStyle = { backgroundColor: '#28a745', color: 'white' };
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [error, setError] = useState<string | null>(null);
    const isAdding = location.pathname === "/add";
    const isEditing = (id: number) => location.pathname === `/edit/${id}`;
    const isDetails = (id: number) => location.pathname === `/details/${id}`;

    useEffect(() => {
        if (id) {
            setError(null);
            articleService.getArticleById(Number(id))
                .catch(err => {
                    console.error("Error loading article:", err);
                    setError("Article not found");
                });
        } else {
            setError(null);
        }
    }, [id]);

    if (articles.length === 0) {
        return (
            <div className="main-panel">
                <div className="main-content">
                    <p>Loading data...</p>
                </div>
                <div className="side-panels"><Outlet /></div>
            </div>
        );
    }

    return (
        <div className="main-panel">
            <div className="main-content">
                <div className="articles-grid">
                    <button style={isAdding ? activeStyle : {}} className="btn-add" onClick={() => navigate("/add")}>Add article</button>

                    {articles.map(article => (
                        <div key={article.id} className="article-tile">
                            <h3>{article.name}</h3>
                            <p className="category-tag">{article.category}</p>
                            <div className="tile-actions">
                                <button style={isDetails(article.id) ? activeStyle : {}} onClick={() => navigate(`/details/${article.id}`)}>Details</button>
                                <button style={isEditing(article.id) ? activeStyle : {}} onClick={() => navigate(`/edit/${article.id}`)}>Edit</button>
                                <button className="btn-close" onClick={() => onDelete(article.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="side-panels">
                {error ? (
                    <div className="top-panel error-message">
                        <div className="main-content">
                            <h4>Error</h4>
                            <p>{error}</p>
                            <button onClick={() => navigate("/")} className="btn-close">Close</button>
                        </div>
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}