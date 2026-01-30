import { useState } from "react";
import { categoryService } from "../../service/categoryService.ts"; // Utilise le bon service

interface Props {
    onCategoryCreated: (newCategory: any) => void;
}

export function AddCategory({ onCategoryCreated }: Props) {
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newCategory = await categoryService.createCategory(name);
            onCategoryCreated(newCategory);

            setName('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="article-form">
            <h1>Add a new Category</h1>
            <p>
                <label htmlFor="catName">Category Name</label>
                <input
                    id="catName"
                    type="text"
                    placeholder="e.g. Dairy, Drinks..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </p>
            <button type="submit" className="btn btn-primary">Add Category</button>
        </form>
    );
}