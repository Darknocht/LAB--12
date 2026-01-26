import {TopPanel} from "./TopPanel.tsx";
import {BottomPanel} from "./BottomPanel.tsx";
import {useState} from "react";
import type {Article} from '../service/Article.ts';

interface MainPanelProps {
    articles: Article[];
    onDelete: (id: number) => void;
}

export function MainPanel({ articles, onDelete }: MainPanelProps) {
    const [selectedTop, setSelectedTop] = useState<Article | null>(null);
    const [selectedBottom, setSelectedBottom] = useState<Article | null>(null);

    const handleSwitch = () => {
        const temp = selectedTop;
        setSelectedTop(selectedBottom);
        setSelectedBottom(temp);
    };

    return (
        <div className="main-panel">
            <div className="main-content">
                <div className="articles-grid">
                    <a href="/addArticle"><button>Add article</button></a>
                    {articles.map(article => (
                        <div key={article.id} className="article-tile">
                            <h3>{article.name}</h3>
                            <p className="category-tag">{article.category}</p>
                            <div className="tile-actions">
                                <button
                                    onClick={() => setSelectedTop(article)}
                                    className={selectedTop?.id === article.id ? "btn-active" : ""}
                                >Top</button>
                                <button
                                    onClick={() => setSelectedBottom(article)}
                                    className={selectedBottom?.id === article.id ? "btn-active" : ""}
                                >Bottom</button>
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
                <TopPanel article={selectedTop} onClose={() => setSelectedTop(null)} onSwitch={handleSwitch}/>
                <BottomPanel article={selectedBottom} onClose={() => setSelectedBottom(null)} onSwitch={handleSwitch}/>
            </div>
        </div>
    );
}