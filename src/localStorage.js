export const loadState =()=>{
    try{
        const serializedState = localStorage.state;
        //console.log("load state ", serializedState);
        if(serializedState === null){
            return undefined;
        }
        //.log("load state ", serializedState);
        return JSON.parse(serializedState);

    }catch(err){
        console.log("load state ", err);
        return undefined;
    }
}
export const saveState=(state)=>{
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);

    }catch{
        //ignore errors 
    }
}