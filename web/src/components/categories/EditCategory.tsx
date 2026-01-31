import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { categoryService } from "../../service/categoryService.ts";
import type { Category } from "../../service/Category.ts";

interface Props {
    onCategoryUpdated: () => void;
    idFromProps?: number;
    onClose: () => void;
}

export function EditCategory({ onCategoryUpdated, idFromProps, onClose }: Props) {
    const { id: urlId } = useParams();
    const effectiveId = idFromProps || Number(urlId); // Utilise la prop ou l'URL
    const [category, setCategory] = useState<Category | null>(null);

    useEffect(() => {
        if (effectiveId) {
            categoryService.getCategoryById(effectiveId)
                .then(setCategory)
                .catch(err => console.error("Error loading category:", err));
        }
    }, [effectiveId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (category && effectiveId) {
            try {
                await categoryService.updateCategory(effectiveId, category.name);
                onCategoryUpdated();
                // Suppression de navigate car on reste sur la même page
            } catch (err) {
                alert("Failed to update category");
            }
        }
    };

    if (!category) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="article-form">
            <h3>Edit Category</h3>
            <p>
                <label>Name</label>
                <input
                    type="text"
                    value={category.name}
                    onChange={e => setCategory({...category, name: e.target.value})}
                    required
                />
            </p>
            <button type="submit" className="btn btn-primary">Update</button>
            <div className="panel-controls">
                <button onClick={onClose} className="btn-close">Close</button>
            </div>
        </form>
    );
}