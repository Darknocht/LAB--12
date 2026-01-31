import {ArticleDetailsPanel} from "../components/articles/ArticleDetailsPanel.tsx";
import {useState} from "react";
import type {Article} from '../service/Article.ts';
import {AddArticle} from "../components/articles/AddArticle.tsx";
import {EditArticle} from "../components/articles/EditArticle.tsx";

interface MainPanelProps {
    articles: Article[];
    onDelete: (id: number) => void;
    onArticleCreated: (article: Article) => void;
    onArticleUpdated: () => void;
}

export function ArticleList({ articles, onDelete, onArticleCreated, onArticleUpdated }: MainPanelProps) {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [view, setView] = useState<'details' | 'add' | 'edit' | null>(null);

    const closePanel = () => {
        setView(null);
        setSelectedArticle(null);
    };

    // Style pour le bouton vert sélectionné
    const activeStyle = { backgroundColor: '#28a745', color: 'white' };

    return (
        <div className="main-panel">
            <div className="main-content">
                <div className="articles-grid">
                    <button
                        className="btn-add"
                        style={view === 'add' ? activeStyle : {}}
                        onClick={() => { setView('add'); setSelectedArticle(null); }}
                    >
                        Add article
                    </button>

                    {articles.map(article => (
                        <div key={article.id} className="article-tile">
                            <h3>{article.name}</h3>
                            <p className="category-tag">{article.category}</p>
                            <div className="tile-actions">
                                <button
                                    onClick={() => { setSelectedArticle(article); setView('details'); }}
                                    style={view === 'details' && selectedArticle?.id === article.id ? activeStyle : {}}
                                >
                                    Details
                                </button>
                                <button
                                    onClick={() => { setSelectedArticle(article); setView('edit'); }}
                                    style={view === 'edit' && selectedArticle?.id === article.id ? activeStyle : {}}
                                >
                                    Edit
                                </button>
                                <button onClick={() => onDelete(article.id)} className="btn-close">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="side-panels">
                {view === 'details' && (
                    <ArticleDetailsPanel article={selectedArticle} onClose={closePanel}/>
                )}
                {view === 'add' && (
                    <div className="top-panel">
                        <AddArticle onArticleCreated={(art) => { onArticleCreated(art)}} onClose={closePanel} />
                    </div>
                )}
                {view === 'edit' && selectedArticle && (
                    <div className="top-panel">
                        <EditArticle
                            idFromProps={selectedArticle.id}
                            onArticleUpdated={() => { onArticleUpdated()}}
                            onClose={closePanel}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}