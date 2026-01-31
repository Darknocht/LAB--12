import { useState } from "react";
import { AddCategory } from "../components/categories/AddCategory.tsx";
import { EditCategory } from "../components/categories/EditCategory.tsx";
import type { Category } from "../service/Category.ts";

interface MainPanelProps {
    categories: Category[];
    onDelete: (id: number) => void;
    onCategoryCreated: (newCategory: Category) => void;
    onCategoryUpdated: () => void;
}

export function CategoryList({ categories, onDelete, onCategoryCreated, onCategoryUpdated }: MainPanelProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [view, setView] = useState<'add' | 'edit' | null>(null);

    const closePanel = () => {
        setView(null);
        setSelectedCategory(null);
    };

    const activeStyle = { backgroundColor: '#28a745', color: 'white' };

    return (
        <div className="main-panel">
            <div className="main-content">
                <div className="articles-grid">
                    <button
                        className="btn-add"
                        style={view === 'add' ? activeStyle : {}}
                        onClick={() => { setView('add'); setSelectedCategory(null); }}
                    >
                        Add Category
                    </button>

                    {categories.map(category => (
                        <div key={category.id} className="article-tile">
                            <h3>{category.name}</h3>
                            <div className="tile-actions">
                                <button
                                    onClick={() => { setSelectedCategory(category); setView('edit'); }}
                                    style={view === 'edit' && selectedCategory?.id === category.id ? activeStyle : {}}
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
                {view === 'add' && (
                    <div className="top-panel">
                        <AddCategory onCategoryCreated={(cat) => { onCategoryCreated(cat);}}
                        onClose={closePanel}/>
                    </div>
                )}
                {view === 'edit' && selectedCategory && (
                    <div className="top-panel">
                        <EditCategory
                            idFromProps={selectedCategory.id}
                            onCategoryUpdated={() => { onCategoryUpdated();}}
                            onClose={closePanel}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}