import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoryService } from "../../service/categoryService.ts";
import type { Category } from "../../service/Category.ts";

interface Props {
    onCategoryUpdated: () => void;
}

export function EditCategory({ onCategoryUpdated }: Props) {
    const { id } = useParams();
    const navigate = useNavigate();
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
                navigate("/category");
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
            <button type="button" onClick={() => navigate("/category")}>Cancel</button>
        </form>
    );
}