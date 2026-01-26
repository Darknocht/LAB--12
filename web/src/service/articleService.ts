import type {Article} from './Article.ts';

const API_URL = 'http://localhost:3000/api';

export const articleService = {
    async getAllArticles(): Promise<Article[]> {
        const response = await fetch(`${API_URL}/articles`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    async deleteArticle(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/articles/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete article');
    },

    async createArticle(article: Omit<Article, 'id'>): Promise<Article> {
        const response = await fetch(`${API_URL}/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(article),
        });
        if (!response.ok) throw new Error('Failed to create article');
        return response.json();
    },

    async getArticleById(id: number): Promise<Article> {
        const response = await fetch(`${API_URL}/articles/${id}`);
        if (!response.ok) throw new Error('Article not found');
        return response.json();
    },

    async updateArticle(id: number, article: Partial<Article>): Promise<void> {
        const response = await fetch(`${API_URL}/articles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(article),
        });
        if (!response.ok) throw new Error('Error updating article');
    }
};