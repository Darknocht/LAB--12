import type {Article} from "../service/Article.ts";

export interface PanelProps {
    article: Article | null;
    onClose: () => void;
    onSwitch: () => void;
}