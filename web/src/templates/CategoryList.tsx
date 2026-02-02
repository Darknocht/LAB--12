import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import type { Category } from "../service/Category.ts";
import { useEffect, useState } from "react"; // Ajout de useState
import { categoryService } from "../service/categoryService.ts";

interface MainPanelProps {
    categories: Category[];
    onDelete: (id: number) => void;
}

export function CategoryList({ categories, onDelete }: MainPanelProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();

    const [error, setError] = useState<string | null>(null);

    const activeStyle = { backgroundColor: '#28a745', color: 'white' };
    const isAdding = location.pathname === "/category/add";
    const isEditing = (id: number) => location.pathname === `/category/edit/${id}`;

    useEffect(() => {
        if (id) {
            setError(null);
            categoryService.getCategoryById(Number(id))
                .catch(err => {
                    console.error("Error loading category:", err);
                    setError("Category not found");
                });
        } else {
            setError(null);
        }
    }, [id]);

    if (categories.length === 0) {
        return (
            <div className="main-panel">
                <div className="main-content">
                    <p>Loading data...</p>
                </div>
                <div className="side-panels"><Outlet /></div>
            </div>
        );
    }

    return (
        <div className="main-panel">
            <div className="main-content">
                <div className="articles-grid">
                    <button
                        className="btn-add"
                        style={isAdding ? activeStyle : {}}
                        onClick={() => navigate("add")}
                    >
                        Add Category
                    </button>

                    {categories.map(category => (
                        <div key={category.id} className="article-tile">
                            <h3>{category.name}</h3>
                            <div className="tile-actions">
                                <button
                                    onClick={() => navigate(`edit/${category.id}`)}
                                    style={isEditing(category.id) ? activeStyle : {}}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(category.id)}
                                    className="btn-close"
                                >Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="side-panels">
                {error ? (
                    <div className="top-panel error-message">
                        <div className="main-content">
                            <h4>Error</h4>
                            <p>{error}</p>
                            <button onClick={() => navigate("/category")} className="btn-close">Close</button>
                        </div>
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}