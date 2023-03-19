import React from 'react'

//import framing layout
// import DefaultLayout from '../layouts/DefaultLayout'

function Index(props) {
    // can't use hooks or state 
    // can't use event listeners in the same way
    return (
        <div>
            <h1>Captains Log (Index View)</h1>
            <ul>
                {props.results.map((logdata, index) => 
                    <li key={index}>
                      
                        <a href={`/logs/${logdata._id}`}><strong>{logdata.title}</strong></a>
                    </li>
                )}
            </ul>
            <a href="/logs/new">Add...</a>
            <br/><br/><br/>

            <form action="/logs/seed" method="POST">
                <button>SEED</button>
            </form>

            <br/>

            <form action="/logs/clear?_method=DELETE" method="POST">
                <button>CLEAR</button>
            </form>
        </div>
    )
}

export default Index