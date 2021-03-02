
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';
import style from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

    const {activeChallenge,resetChallenge,completeChallenge} = useContext(ChallengesContext)
    const {resetCountDown} = useContext(CountDownContext);
    
    function handleChallengeSucceeded(){
        completeChallenge()
        resetCountDown()
    }

    function handleChallengeFailed(){
        resetCountDown()
        resetChallenge()
    }


    return(
        <div className={style.challengeBoxContainer}>
            {
                activeChallenge ?
                (
                    <div className={style.challengeActive}>
                        <header>Ganhe {activeChallenge.amount} xp</header>
                        <main>
                            <img src={`icons/${activeChallenge.type}.svg`} />
                            <strong>
                                Novo Desafio                                
                            </strong>
                            <p>
                                {activeChallenge.description} 
                            </p>
                        </main>
                        <footer>
                            <button
                                type="button"
                                className={style.challengeFailedButton}
                                onClick={handleChallengeFailed}
                            >
                                Flahei
                            </button>

                            <button
                                 type="button"
                                 className={style.challengeSucceedButton}
                                 onClick={handleChallengeSucceeded}
                            >
                                Completei
                            </button>
                        </footer>
                    </div>
                )
                :
                (
                    <div className={style.challengeNotActive}>
                        <strong>
                            Finalize um ciclo para receber um desafio
                        </strong>
                        <p>
                            <img src="icons/level-up.svg"/>
                            Avance de level completando os desafios
                        </p>
                    </div>
                )
            }
        </div>
    );
}