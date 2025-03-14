import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LettersUsed, LettersUsedProps } from "./components/LettersUsed";

import { WORDS, Challenge } from "./utils/words";

import { useEffect } from "react";
import { useState } from "react";

function App() {
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [letter, setLetter] = useState("");
    const [letterUsed, setLetterUsed] = useState<LettersUsedProps[]>([]);
    const [challenge, setChallenge] = useState<Challenge | null>(null);

    function handleRestartGame() {
        alert("Reiniciar o jogo!");
    }

    function startGame() {
        // Math floor pega o numero inteiro
        const index = Math.floor(Math.random() * WORDS.length);
        const randomWord = WORDS[index];
        setChallenge(randomWord);

        setAttempts(0);
        setLetter("");
    }

    function handleConfirm() {
        if (!challenge) {
            return;
        }

        if (!letter.trim()) {
            return alert("Digite uma letra!");
        }

        const value = letter.toUpperCase();
        const exists = letterUsed.find(
            (used) => used.value.toLocaleUpperCase() === value,
        );

        if (exists) {
            return alert("Você já utilizou a letra " + value);
        }

        const hits = challenge.word
            .toUpperCase()
            .split("")
            .filter((char) => char === value).length;

        const correct = hits > 0;
        const currentScore = score + hits;

        setLetterUsed((prevState) => [...prevState, { value, correct }]);
        setScore(currentScore);

        setLetter("");
    }

    useEffect(() => {
        startGame();
    }, []);

    if (!challenge) {
        return;
    }

    return (
        <div className={styles.container}>
            <main>
                <Header
                    current={attempts}
                    max={10}
                    onRestart={handleRestartGame}
                ></Header>

                <Tip tip={challenge.tip}></Tip>

                <div className={styles.word}>
                    {challenge.word.split("").map(() => (
                        <Letter value=""></Letter>
                    ))}
                </div>

                <h4>Palpite</h4>

                <div className={styles.guess}>
                    <Input
                        autoFocus
                        maxLength={1}
                        placeholder="?"
                        value={letter}
                        onChange={(e) => setLetter(e.target.value)}
                    ></Input>
                    <Button title="Confirmar" onClick={handleConfirm}></Button>
                </div>

                <LettersUsed data={letterUsed}></LettersUsed>
            </main>
        </div>
    );
}

export default App;
