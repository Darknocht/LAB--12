import {Link, useNavigate} from "react-router-dom";
import type {Category} from "../../service/Category.ts";

interface MainPanelProps {
    categories: Category[];
    onDelete: (id: number) => void;
}

export function CategoryList({ categories, onDelete }: MainPanelProps){
    const navigate = useNavigate();
    return (
        <>
            <div className="main-panel">
                <div className="main-content">
                    <div className="articles-grid">
                        <Link to="/AddCategory">
                            <button className="btn-add">Add Category</button>
                        </Link>
                        {categories.map(category => (
                            <div key={category.id} className="article-tile">
                                <h3>{category.name}</h3>
                                <div className="tile-actions">
                                    <button onClick={() => navigate(`/editCategory/${category.id}`)}>Edit</button>
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

                </div>
            </div>
        </>
    );
}