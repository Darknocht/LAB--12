import {ArticleDetails} from "./ArticleDetails.tsx";
import type {PanelProps} from "./PanelProps.ts";

export function TopPanel({ article, onClose, onSwitch }: PanelProps) {
    return (
        <div className="top-panel">
            <ArticleDetails article={article} onClose={onClose} onSwitch={onSwitch} />
        </div>
    );
}