import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";

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

                <div className={styles.word}>
                    <Letter value="R"></Letter>
                    <Letter value="E"></Letter>
                    <Letter value="A"></Letter>
                    <Letter value="C"></Letter>
                    <Letter value="T"></Letter>
                </div>
            </main>
        </div>
    );
}

export default App;
