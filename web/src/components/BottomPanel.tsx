import {ArticleDetails} from "./ArticleDetails.tsx";
import type {PanelProps} from "./PanelProps.ts";

export function BottomPanel({ article, onSwitch, onClose }: PanelProps) {
    return (
        <div className="bottom-panel">
            <ArticleDetails article={article} onClose={onClose} onSwitch={onSwitch} />
        </div>
    );
}