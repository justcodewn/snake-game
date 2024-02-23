function randomNumber(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

function detectCollision({
    boundA = {
        x:0,y:0,height:10, width:10
    },
    boundB = {
        x:0,y:0,height:10, width:10
    }
}){
    return(
        boundA.x<boundB.x+boundB.width&&
        boundA.x+boundA.width>boundB.x&&
        boundA.y<boundB.y+boundB.height&&
        boundA.y+boundB.height>boundB.y
    )
}