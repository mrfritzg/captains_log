import React from 'react'

//import framing layout
// import DefaultLayout from '../layouts/DefaultLayout'

function Show(props) {
    return (
        <div>
            <h1>Show View</h1>
            <p>The <strong>{props.result.title}</strong> </p>
            <p>{props.result.shipIsBroken ? 'The ship is Broken' : 'The Ship is working'}</p>
            <p><strong>Entry: </strong>{props.result.entry}</p>

            {/* <a href={`/fruits/${props.fruit._id}/edit`}>Edit</a>
            
            <br /><br />


            <form action={`/fruits/${props.fruit._id}?_method=DELETE`} method="POST">
                <button>Delete</button>
            </form> */}

            <br />

            

            <a href="/">Home</a>
        </div>
    )
}

export default Show;