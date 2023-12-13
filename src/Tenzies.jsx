import React from 'react'

function Tenzies(props) {
    const style = {
        backgroundColor: props.held ? '#59e391' :'white'
     }
      


  return (
    <div>
        <div className={props.className}
         onClick ={props.holdDice}
         style={style}
         >
            <h2>{props.value}</h2>
        </div>
    </div>
  )
}

export default Tenzies