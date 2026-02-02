export function MenuBar() {
    return (
        <div className="menu-bar">
            <nav>
                <h1>MyArticles</h1>
                <a href="/"><button>Articles</button></a>
                <a href="/category"><button>Category</button></a>
                <a href="/about"><button>About</button></a>
            </nav>
        </div>
    );
}