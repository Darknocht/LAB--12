import { useState } from "react";
import { categoryService } from "../../service/categoryService.ts"; // Utilise le bon service

interface Props {
    onCategoryCreated: (newCategory: any) => void;
    onClose: () => void;
}

export function AddCategory({ onCategoryCreated, onClose }: Props) {
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
            <h3>Add a new Category</h3>
            <p>
                <input
                    id="catName"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </p>
            <button type="submit" className="btn btn-primary">Add Category</button>
            <div className="panel-controls">
                <button onClick={onClose} className="btn-close">Close</button>
            </div>
        </form>
    );
}