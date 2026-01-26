import type {Article} from "../../service/Article.ts";

export interface ArticlePanelProps {
    article: Article | null;
    onClose: () => void;
}