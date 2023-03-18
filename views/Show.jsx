import React from 'react'

//import framing layout
// import DefaultLayout from '../layouts/DefaultLayout'

function Show(props) {
    return (
        <div>
            <h1>Show View</h1>
            <p><strong>Title: </strong>{props.result.title}</p>
            <p><strong>Ship&#39;s Status: </strong>{props.result.shipIsBroken ? 'The Issue is ongoing and the Ship is Broken' : 'The Issue has been fixed and the Ship is working'}</p>
            <p><strong>Entry: </strong>{props.result.entry}</p>

            <a href={`/logs/${props.result._id}/edit`}>Edit</a>
            
            <br /><br />


            <form action={`/logs/${props.result._id}?_method=DELETE`} method="POST">
                <button>Delete</button>
            </form>

            <br />

            

            <a href="/logs">Home</a>
        </div>
    )
}

export default Show;