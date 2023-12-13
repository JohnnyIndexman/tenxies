import React, { useEffect, useState } from 'react'
import Tenzies from './Tenzies'
import { nanoid } from 'nanoid'


function Main() {


    const create = () => {
        let newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }


    const [dice, setDice] = useState(create)
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const sameValue = dice.every(die => die.value === firstValue)
        if (allHeld && sameValue) {
            setTenzies(true)
        }
    }, [dice])

    function holdDice(id) {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld }
                : die
        })
        )
    }


    const created = dice.map(die => (
        <Tenzies
            held={die.isHeld}
            key={die.id}
            className='tenz'
            value={die.value}
            holdDice={() => holdDice(die.id)}
        />
    ))


    function setNewDice() {
        if(!tenzies){
            setDice(prevDice => prevDice.map(die => {
                return die.isHeld ? die : {
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false,
                    id: nanoid()
                }
            }))
       }
       else{
        setTenzies(false)
        setDice(create)
       }
       
    }


    return (
        <div className='main'>
            <Confetti />
            <h1>{tenzies ? 'You Win!!!' :'Tenzies'}</h1>
            <p>Roll until all dice are the same.
                Click each die to freeze it at
                its current value between rolls </p>
            <div className="die">
                {created}
            </div>
            <button onClick={setNewDice}>
                {tenzies ? 'New Game' : 'Roll'}
            </button>

        </div>
    )
}

export default Main