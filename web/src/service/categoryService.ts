import type {Category} from "./Category.ts";

const API_URL = 'http://localhost:3000/api';

export const categoryService = {
    async getAllCategories(): Promise<Category[]> {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) throw new Error('Error network');
        return response.json();
    },

    async createCategory(name: string): Promise<Category> {
        const response = await fetch(`${API_URL}/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        return response.json();
    },

    async deleteCategory(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/categories/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete article');
    },

    async getCategoryById(id: number): Promise<Category> {
        const response = await fetch(`${API_URL}/categories/${id}`);
        if (!response.ok) throw new Error('Category not found');
        return response.json();
    },

    async updateCategory(id: number, name: string): Promise<void> {
        const response = await fetch(`${API_URL}/editCategory`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name }),
        });
        if (!response.ok) throw new Error('Error updating category');
    }
}