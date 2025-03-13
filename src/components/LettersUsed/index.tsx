import styles from "./styles.module.css";

import { Letter } from "../Letter";

export function LettersUsed() {
    return (
        <div className={styles.lettersUsed}>
            <h5>Letras utilizadas</h5>

            <div>
                <Letter value="R" size="small"></Letter>
                <Letter value="X" size="small"></Letter>
            </div>
        </div>
    );
}
