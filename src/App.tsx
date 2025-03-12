import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Tip } from "./components/Tip";

function App() {
    function handleRestartGame() {
        alert("Reiniciar o jogo!");
    }

    return (
        <div className={styles.container}>
            <main>
                <Header
                    current={5}
                    max={10}
                    onRestart={handleRestartGame}
                ></Header>
                <Tip tip="Uma das linguagens de programação mais utilizadas"></Tip>
            </main>
        </div>
    );
}

export default App;
