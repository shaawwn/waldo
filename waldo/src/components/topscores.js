import { useState, useEffect } from 'react';
function TopScores(props) {
    // props.scores - an object of the top 10 scores for an image in the form of {score: user}
    console.log("Top score props", props) 
    // Need to set the topscores to be in the format of { score: user }
    const [displayScore, setDisplayScore] = useState();

    function handleModalClick() {
        // close the modal when clicking on it, no, don't do that!
        // props.displayScores[0]()
        // instead, close when username is entered into username box
    }

    function createColumns(scores, colTitle) {
        // create the column for the score
        const sortedScores = Object.keys(scores) // list of sorted scores
        if(colTitle === 'Rank') {
            let div = document.createElement('div')
            div.classList.add('top-scores-column')
            for(let i = 0; i < scores.length; i++) {
                let ranking = document.createElement('p')
                ranking.innerText = i + 1
            }
            return div
        } else if(colTitle === 'Name') {
            let div = document.createElement('div')
            div.classList.add('top-scores-column')
            for(let i = 0; i < scores.length; i++) {
                let ranking = document.createElement('p')
                ranking.innerText = scores[sortedScores[i]]
            }
            return div
        }
        let div = document.createElement('div')
        div.classList.add('top-scores-column')
        for(let i = 0; i < scores.length; i++) {
            let ranking = document.createElement('p')
            ranking.innerText = sortedScores[i]
        }
        return div
    }
    return (
        <div className="top-scores-modal" onClick={handleModalClick}>
            <div className="top-scores">
                <h1>Top Scores</h1>
                <div className="top-scores-container">
                    {/* Loop through scores */}
                    <div className="top-scores-rank">
                        <h1>Rank</h1>
                        <ScoreColumn column={props.scores} title={"rank"} />
                    </div>
                    <div className="top-scores-column">
                        <h1>Name</h1>
                        <ScoreColumn column={props.scores} title={"names"} close={props.close} />                  
                    </div>
                    <div className="top-scores-column">
                        <h1>Score</h1>
                        <ScoreColumn column={props.scores} title={"scores"} />
                    </div>
                </div>
            </div>
        </div>
    )

}

function ScoreColumn(props) {
    // props.column = elements to be rendered
    // props.type = the type of column to be rendered (ie Rank is a 1-10 column, scores the Scores, Names, names)
    const [newTopScore, setNewTopScore] = useState(false) // if user sets new top score, set to true to render input field
    console.log("score column", props.column)
    let sortedScores = Object.keys(props.column)
    // let names = 
    let num = sortedScores.length
    
    function inputNewScore() {
        // split top scores on the index of where a new top score will be, then return old top scores as two objects
        // with new top score splitting the middle 
    }

    function createNumList(number) {
        // create a list of 1-props.scores to use to render Rank#
        let num_list = []
        for(let i = 1; i <= number; i++) {
            num_list.push(i)
        }
        return num_list
    }

    // can infer Names from these two
    if(props.title === 'rank') { // return 1-scores.length
        return(
            <div className="top-scores-column">
                {createNumList(num).map((num) => {
                    return <p className="top-score-item">{num}</p>
                })}
            </div>
        )
    } else if(props.title === 'names') {
        // Display names
        return(
            <div className="top-scores-column">
                {newTopScore
                ?<h1>New score here</h1>
                :sortedScores.map((score) => {
                    if(typeof props.column[score] === 'undefined'){
                        return <ScoreInput close={props.close}/>
                    }
                    return(
                        <p className="top-score-item">{props.column[score]}</p>
                    )
                })
                }
            </div>
        )
    }
    return(
        <div className="top-scores-column">
            {sortedScores.map((score) => {
                return(
                    <p className="top-score-item">{score}</p>
                )
            })}
        </div>
    )
}

function ScoreInput(props) {
    // input when user gets into top 10
    // ranks and score are set and retrieved from props, but username is an input field for user to enter their name
    const [ranking, setRanking ] = useState() // individual score/rank to be set during user entry

    // add 'enter' event listener to input
    function checkEnter(event) {
        // check for listener clicking 'Enter' to record score
        console.log("click event", event)
        event.target.addEventListener('keyup', (event) => {
            if(event.keyCode === 13) {
                // here is where updating the top scores should happen
                let username = event.target.value
                console.log("HITTING ENTER", username)
                props.close()
            }
        })
    }


    function addEnterListener(event) {
        // check for "enter" click
    }
    return(
        <div>
            <input className="score-input" type="text" placeholder="user" onClick={checkEnter}/>
        </div>
    )
}
export default TopScores