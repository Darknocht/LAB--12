import './App.css'
import {MenuBar} from "./components/MenuBar.tsx";
import {MainPanel} from "./components/MainPanel.tsx";
import {FooterBar} from "./components/FooterBar.tsx";
import {Route, Routes, useNavigate} from "react-router-dom"; // Ajout de useNavigate
import {About} from "./templates/About.tsx";
import {AddArticle} from "./templates/articles/AddArticle.tsx";
import {useState, useEffect} from "react";
import type {Article} from './service/Article.ts';
import {articleService} from "./service/articleService.ts";

function App() {
    const [articles, setArticles] = useState<Article[]>([]);
    const navigate = useNavigate();

    // On charge les articles une seule fois au démarrage de l'app
    useEffect(() => {
        articleService.getAllArticles()
            .then(data => setArticles(data))
            .catch(err => console.error("Error:", err));
    }, []);

    const handleArticleCreated = (newArticle: Article) => {
        setArticles([...articles, newArticle]);
        navigate("/"); // Redirige vers la liste après la création
    };

    const handleDeleteArticle = async (id: number) => {
        if (window.confirm("Supprimer cet article ?")) {
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
                        <MainPanel
                            articles={articles}
                            onDelete={handleDeleteArticle}
                        />
                    }/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/AddArticle" element={
                        <AddArticle onArticleCreated={handleArticleCreated}/>
                    }/>
                    <Route path="*" element={<h1>Error 404</h1>}/>
                </Routes>
            </main>
            <FooterBar/>
        </div>
    )
}

export default App;