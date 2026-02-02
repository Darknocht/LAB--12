import './App.css'
import {MenuBar} from "./components/MenuBar.tsx";
import {ArticleList} from "./templates/ArticleList.tsx";
import {FooterBar} from "./components/FooterBar.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import {About} from "./templates/About.tsx";
import {useState, useEffect} from "react";
import type {Article} from './service/Article.ts';
import {articleService} from "./service/articleService.ts";
import {CategoryList} from "./templates/CategoryList.tsx";
import {categoryService} from "./service/categoryService.ts";
import type {Category} from "./service/Category.ts";
import {AddArticle} from "./components/articles/AddArticle.tsx";
import {EditArticle} from "./components/articles/EditArticle.tsx";
import {ArticleDetailsPanel} from "./components/articles/ArticleDetailsPanel.tsx";
import {AddCategory} from "./components/categories/AddCategory.tsx";
import {EditCategory} from "./components/categories/EditCategory.tsx";

function App() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [category, setCategory] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [serverError, setServerError] = useState<string | null>(null);
    const navigate = useNavigate();

    const loadData = async () => {
        setIsLoading(true);
        setServerError(null);
        try {
            const [articlesData, categoriesData] = await Promise.all([
                articleService.getAllArticles(),
                categoryService.getAllCategories()
            ]);
            setArticles(articlesData);
            setCategory(categoriesData);
        } catch (err) {
            setServerError("Server is unreachable. Please make sure the backend is running on port 3000.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleArticleCreated = (newArticle: Article) => {
        setArticles(prev => [...prev, newArticle]);
    };

    const handleCategoryCreated = (newCategory: Category) => {
        setCategory(prev => [...prev, newCategory]);
    };

    const handleArticleUpdated = () => loadData();
    const handleCategoryUpdated = () => loadData();

    const handleDeleteArticle = async (id: number) => {
        if (window.confirm("Deleting the article?")) {
            await articleService.deleteArticle(id);
            setArticles(articles.filter(a => a.id !== id));
        }
    };

    const handleDeleteCategory = async (id: number) => {
        if (window.confirm("Deleting the category with all the articles?")) {
            try {
                const categoryObj = category.find(c => c.id === id);
                const nameToFilter = categoryObj ? categoryObj.name : null;

                await categoryService.deleteCategory(id);
                setCategory(prev => prev.filter(c => c.id !== id));

                if (nameToFilter) {
                    setArticles(prev => prev.filter(a => a.category !== nameToFilter));
                }
                loadData();
            } catch (err) {
                console.error(err);
                alert("Error deleting the category");
            }
        }
    };

    if (serverError) {
        return (
            <div className="container">
                <MenuBar/>
                <main>
                    <Routes>
                        <Route path="/" element={
                            <div className="error-screen">
                                <h1>Connection Error</h1>
                                <p>{serverError}</p>
                                <button onClick={loadData} className="btn-retry">Retry connection</button>
                            </div>
                        }>
                        </Route>
                        <Route path="/about" element={<About/>}/>
                        <Route path="*" element={
                            <div className="error-screen">
                            <h1>Connection Error</h1>
                            <p>{serverError}</p>
                            <button onClick={loadData} className="btn-retry">Retry connection</button>
                        </div>}/>
                    </Routes>
                </main>
                <FooterBar/>
            </div>
        );
    }

    if (isLoading) {
        return <div className="loading-screen"><h1>Loading data...</h1></div>;
    }

    return (
        <div className="container">
            <MenuBar/>
            <main>
                <Routes>
                    <Route path="/" element={
                        <ArticleList
                            articles={articles}
                            onDelete={handleDeleteArticle}
                            onArticleCreated={handleArticleCreated}
                            onArticleUpdated={handleArticleUpdated}
                        />
                    }>
                        <Route path="add" element={<AddArticle onArticleCreated={handleArticleCreated} onClose={() => navigate("/")} />} />
                        <Route path="edit/:id" element={<EditArticle onArticleUpdated={handleArticleUpdated} onClose={() => navigate("/")} />} />
                        <Route path="details/:id" element={<ArticleDetailsPanel article={null} onClose={() => navigate("/")} />} />
                    </Route>
                    <Route path="/category" element={
                        <CategoryList
                            categories={category}
                            onDelete={handleDeleteCategory}
                            onCategoryCreated={handleCategoryCreated}
                            onCategoryUpdated={handleCategoryUpdated}
                        />
                    }>
                        <Route path="add" element={<AddCategory onCategoryCreated={handleCategoryCreated} onClose={() => navigate("/category")} />} />
                        <Route path="edit/:id" element={<EditCategory onCategoryUpdated={handleCategoryUpdated} onClose={() => navigate("/category")} />} />
                    </Route>

                    <Route path="/about" element={<About/>}/>
                    <Route path="*" element={<h1>Error 404</h1>}/>
                </Routes>
            </main>
            <FooterBar/>
        </div>
    );
}

export default App;