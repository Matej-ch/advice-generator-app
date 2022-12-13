import {useEffect, useState} from 'react'
import './AdviceApp.scss'
import patternDividerSvg from './assets/pattern-divider-desktop.svg'
import diceSvg from './assets/icon-dice.svg'

function AdviceApp() {

    const [quote, setQuote] = useState<{ id: number, advice: string }>({id: 0, advice: ''})

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchAdvice()
    }, []);

    const handleClick = () => {
        setLoading(true);
        fetchAdvice()
    }

    const fetchAdvice = () => {
        return fetch(`https://api.adviceslip.com/advice`)
            .then(res => res.json())
            .then(
                ({slip}) => {
                    setQuote(slip)
                    setLoading(false);
                },

                (error) => {
                    setLoading(false);
                    setError(error);
                }
            )
    }

    return (
        <div className="advice">
            <h1 className="title">Advice #{quote.id}</h1>

            <p className={'quote'}>“{quote.advice}”</p>

            <div className={'divider'}>
                <img src={patternDividerSvg}/>
            </div>

            <button className={'dice'} onClick={handleClick} aria-label="Load new advice">
                <img src={diceSvg} className={loading ? 'loading' : ''} width='24' height='24'/>
            </button>
        </div>
    )
}

export default AdviceApp
