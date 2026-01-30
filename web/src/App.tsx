import './App.css'
import {MenuBar} from "./components/MenuBar.tsx";
import {ArticleList} from "./templates/articles/ArticleList.tsx";
import {FooterBar} from "./components/FooterBar.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import {About} from "./templates/About.tsx";
import {AddArticle} from "./templates/articles/AddArticle.tsx";
import {useState, useEffect} from "react";
import type {Article} from './service/Article.ts';
import {articleService} from "./service/articleService.ts";
import {EditArticle} from "./templates/articles/EditArticle.tsx";
import {CategoryList} from "./templates/categories/CategoryList.tsx";
import {categoryService} from "./service/categoryService.ts";
import type {Category} from "./service/Category.ts";
import {AddCategory} from "./templates/categories/AddCategory.tsx";
import {EditCategory} from "./templates/categories/EditCategory.tsx";

function App() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [category, setCategory] = useState<Category[]>([]);
    const navigate = useNavigate();

    const loadArticles = () => {
        articleService.getAllArticles()
            .then(data => setArticles(data))
            .catch(err => console.error("Error:", err));
    };

    const loadCategories = () => {
        categoryService.getAllCategories()
        .then(data => setCategory(data))
        .catch(err => console.error("Error:", err));

    }

    useEffect(() => {
        loadArticles();
        loadCategories();
    }, []);

    const handleArticleCreated = (newArticle: Article) => {
        setArticles([...articles, newArticle]);
        navigate("/");
    };

    const handleCategoryCreated = (newCategory: Category) => {
        setCategory([...category, newCategory]);
        navigate("/category");
    };

    const handleArticleUpdated = () => {
        loadArticles();
    };

    const handleCategoryUpdated = () => {
        loadCategories()
    };

    const handleDeleteArticle = async (id: number) => {
        if (window.confirm("Deleting the article ?")) {
            await articleService.deleteArticle(id);
            setArticles(articles.filter(a => a.id !== id));
        }
    };

    const handleDeleteCategory = async (id: number) => {
        if (window.confirm("Deleting the category ?")) {
            await categoryService.deleteCategory(id);
            setCategory(category.filter(c => c.id !== id));
        }
    };

    return (
        <div className="container">
            <MenuBar/>
            <main>
                <Routes>
                    <Route path="/" element={
                        <ArticleList
                            articles={articles}
                            onDelete={handleDeleteArticle}
                        />
                    }/>
                    <Route path="/category" element={
                        <CategoryList
                            categories={category}
                            onDelete={handleDeleteCategory}
                        />
                    }/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/AddArticle" element={
                        <AddArticle onArticleCreated={handleArticleCreated}/>
                    }/>
                    <Route path="/edit/:id" element={
                        <EditArticle onArticleUpdated={handleArticleUpdated} />
                    } />
                    <Route path="/AddCategory" element={
                        <AddCategory onCategoryCreated={handleCategoryCreated}/>
                    }/>
                    <Route path="/editCategory/:id" element={
                        <EditCategory onCategoryUpdated={handleCategoryUpdated} />
                    } />
                    <Route path="*" element={<h1>Error 404</h1>}/>
                </Routes>
            </main>
            <FooterBar/>
        </div>
    );
}

export default App;