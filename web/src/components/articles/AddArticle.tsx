import { useState, useEffect } from "react";
import { articleService } from "../../service/articleService.ts";
import { categoryService } from "../../service/categoryService.ts"; // Import du service de catégories
import type { Category } from "../../service/Category.ts"; // Import du type

interface Props {
    onArticleCreated: (newArticle: any) => void;
    onClose: () => void;
}

export function AddArticle({onArticleCreated, onClose}: Props) {
    const [formData, setFormData] = useState({ name: '', category: '', price: 0, description: '' });
    const [categories, setCategories] = useState<Category[]>([]); // État pour stocker les catégories de la DB

    useEffect(() => {
        categoryService.getAllCategories()
            .then(data => {
                setCategories(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, category: data[0].name }));
                }
            })
            .catch(err => console.error("Error loading categories:", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newArticle = await articleService.createArticle(formData);
            onArticleCreated(newArticle);
            setFormData({
                name: '',
                category: categories.length > 0 ? categories[0].name : '',
                price: 0,
                description: ''
            });
        } catch (err) {
            alert("Error creating article");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="article-form">
            <h3>Add an article</h3>
            <p>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                />
            </p>
            <p>
                <select
                    id="category-select"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    required
                >
                    <option value="" disabled>Select a category</option>
                    {/* Génération dynamique des options */}
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </p>
            <p>
                <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                    required
                />
            </p>
            <p>
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                />
            </p>
            <p>
                <button type="submit">Add</button>
            </p>
            <div className="panel-controls">
                <button type="button" onClick={onClose} className="btn-close">Close</button>
            </div>
        </form>
    );
}