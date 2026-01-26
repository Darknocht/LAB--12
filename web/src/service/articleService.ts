import type {Article} from './Article.ts';

const API_URL = 'http://localhost:3000/api';

export const articleService = {
    async getAllArticles(): Promise<Article[]> {
        const response = await fetch(`${API_URL}/articles`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    async deleteArticle(id: number): Promise<void> {
        await fetch(`http://localhost:3000/removeArticle/${id}`, { method: 'GET' });
    }
};