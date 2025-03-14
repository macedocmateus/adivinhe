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

const ATTEMPTS_MARGIN = 5;

function App() {
    const [score, setScore] = useState(0);
    const [letter, setLetter] = useState("");
    const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
    const [challenge, setChallenge] = useState<Challenge | null>(null);

    function handleRestartGame() {
        alert("Reiniciar o jogo!");
    }

    function startGame() {
        // Math floor pega o numero inteiro
        const index = Math.floor(Math.random() * WORDS.length);
        const randomWord = WORDS[index];
        setChallenge(randomWord);

        setScore(0);
        setLetter("");
        setLettersUsed([]);
    }

    function handleConfirm() {
        if (!challenge) {
            return;
        }

        if (!letter.trim()) {
            return alert("Digite uma letra!");
        }

        const value = letter.toUpperCase();
        const exists = lettersUsed.find(
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

        setLettersUsed((prevState) => [...prevState, { value, correct }]);
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
                    current={lettersUsed.length}
                    max={challenge.word.length + ATTEMPTS_MARGIN}
                    onRestart={handleRestartGame}
                ></Header>

                <Tip tip={challenge.tip}></Tip>

                <div className={styles.word}>
                    {challenge.word.split("").map((letter, index) => {
                        const letterUsed = lettersUsed.find(
                            (used) =>
                                used.value.toUpperCase() ===
                                letter.toUpperCase(),
                        );

                        return (
                            <Letter
                                key={index}
                                value={letterUsed?.value}
                                color={
                                    letterUsed?.correct ? "correct" : "default"
                                }
                            ></Letter>
                        );
                    })}
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

                <LettersUsed data={lettersUsed}></LettersUsed>
            </main>
        </div>
    );
}

export default App;
