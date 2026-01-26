import {ArticleDetails} from "./ArticleDetails.tsx";
import type {ArticlePanelProps} from "./ArticlePanelProps.ts";

export function ArticleDetailsPanel({ article, onClose }: ArticlePanelProps) {
    return (
        <div className="top-panel">
            <ArticleDetails article={article} onClose={onClose} />
        </div>
    );
}