import {useState} from "react";
import {articleService} from "../../service/articleService.ts";

interface Props {
    onArticleCreated: (newArticle: any) => void;
    onClose: () => void;
}

export function AddArticle({onArticleCreated, onClose}: Props) {
    const [formData, setFormData] = useState({ name: '', category: 'other', price: 0, description: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newArticle = await articleService.createArticle(formData);
            onArticleCreated(newArticle);
            setFormData({ name: '', category: 'other', price: 0, description: '' }); // Reset
        } catch (err) {
            alert("Error creating article");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="article-form">
            <h3>Add an article</h3>
            <p><input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></p>
            <p>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="fruit">Fruit</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="other">Other</option>
                </select>
            </p>
            <p>
                <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} required />
            </p>
            <p>
                <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </p>
            <p>
                <button type="submit">Add</button>
            </p>
            <div className="panel-controls">
                <button onClick={onClose} className="btn-close">Close</button>
            </div>
        </form>
    );
}