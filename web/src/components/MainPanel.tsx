import {TopPanel} from "./TopPanel.tsx";
import {BottomPanel} from "./BottomPanel.tsx";
import {useState, useEffect} from "react";
import type {Article} from '../service/Article.ts';
import {articleService} from "../service/articleService.ts";

export function MainPanel() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedTop, setSelectedTop] = useState<Article | null>(null);
    const [selectedBottom, setSelectedBottom] = useState<Article | null>(null);

    useEffect(() => {
        articleService.getAllArticles()
            .then(data => setArticles(data))
            .catch(err => console.error("Error:", err));
    }, []);

    const handleSwitch = () => {
        const temp = selectedTop;
        setSelectedTop(selectedBottom);
        setSelectedBottom(temp);
    };

    return (
        <div className="main-panel">
            <div className="main-content">
                <div className="articles-grid">
                    {articles.map(article => {
                        const isSelectedTop = selectedTop?.id === article.id;
                        const isSelectedBottom = selectedBottom?.id === article.id;

                        return (
                            <div key={article.id} className="article-tile">
                                <h3>{article.name}</h3>
                                <p className="category-tag">{article.category}</p>
                                <div className="tile-actions">
                                    <button
                                        onClick={() => setSelectedTop(article)}
                                        className={isSelectedTop ? "btn-active" : ""}
                                    >
                                        Top
                                    </button>
                                    <button
                                        onClick={() => setSelectedBottom(article)}
                                        className={isSelectedBottom ? "btn-active" : ""}
                                    >
                                        Bottom
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="side-panels">
                <TopPanel
                    article={selectedTop}
                    onClose={() => setSelectedTop(null)}
                    onSwitch={handleSwitch}/>
                <BottomPanel
                    article={selectedBottom}
                    onClose={() => setSelectedBottom(null)}
                    onSwitch={handleSwitch}/>
            </div>
        </div>
    );
}