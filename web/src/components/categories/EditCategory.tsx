import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { categoryService } from "../../service/categoryService.ts";
import type { Category } from "../../service/Category.ts";

interface Props {
    onCategoryUpdated: () => void;
    onClose: () => void;
}

export function EditCategory({ onCategoryUpdated, onClose }: Props) {
    const { id } = useParams<{ id: string }>();
    const [category, setCategory] = useState<Category | null>(null);

    useEffect(() => {
        if (id) {
            categoryService.getCategoryById(Number(id))
                .then(setCategory)
                .catch(err => console.error("Error loading category:", err));
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (category && id) {
            try {
                await categoryService.updateCategory(Number(id), category.name);
                onCategoryUpdated();
                onClose();
            } catch (err) {
                alert("Failed to update category");
            }
        }
    };

    if (!category) return <div className="top-panel"><p>Loading...</p></div>;

    return (
        <div className="top-panel">
            <form onSubmit={handleSubmit} className="article-form">
                <h3>Edit Category</h3>
                <p>
                    <input
                        type="text"
                        value={category.name}
                        onChange={e => setCategory({...category, name: e.target.value})}
                        required
                    />
                </p>
                <button type="submit" className="btn btn-primary">Update</button>
                <div className="panel-controls">
                    <button type="button" onClick={onClose} className="btn-close">Close</button>
                </div>
            </form>
        </div>
    );
}