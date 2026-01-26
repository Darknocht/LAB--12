import './App.css'
import {MenuBar} from "./components/MenuBar.tsx";
import {ArticleList} from "./templates/articles/ArticleList.tsx";
import {FooterBar} from "./components/FooterBar.tsx";
import {Route, Routes, useNavigate} from "react-router-dom"; // Ajout de useNavigate
import {About} from "./templates/About.tsx";
import {AddArticle} from "./templates/articles/AddArticle.tsx";
import {useState, useEffect} from "react";
import type {Article} from './service/Article.ts';
import {articleService} from "./service/articleService.ts";
import {EditArticle} from "./templates/articles/EditArticle.tsx";

function App() {
    const [articles, setArticles] = useState<Article[]>([]);
    const navigate = useNavigate();

    const loadArticles = () => {
        articleService.getAllArticles()
            .then(data => setArticles(data))
            .catch(err => console.error("Error:", err));
    };

    useEffect(() => {
        loadArticles();
    }, []);

    const handleArticleCreated = (newArticle: Article) => {
        setArticles([...articles, newArticle]);
        navigate("/");
    };

    const handleArticleUpdated = () => {
        loadArticles(); // On recharge tout pour être sûr d'avoir les données à jour
    };

    const handleDeleteArticle = async (id: number) => {
        if (window.confirm("Deleting the article ?")) {
            await articleService.deleteArticle(id);
            setArticles(articles.filter(a => a.id !== id));
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
                    <Route path="/about" element={<About/>}/>
                    <Route path="/AddArticle" element={
                        <AddArticle onArticleCreated={handleArticleCreated}/>
                    }/>
                    <Route path="/edit/:id" element={
                        <EditArticle onArticleUpdated={handleArticleUpdated} />
                    } />
                    <Route path="*" element={<h1>Error 404</h1>}/>
                </Routes>
            </main>
            <FooterBar/>
        </div>
    );
}

export default App;