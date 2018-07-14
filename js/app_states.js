
let app = (function () {

    let selection = 0,
    token=['pika', 'bulba', 'char' , 'squir', 'chiko', 'cynda', 'toto', 'treec', 'torch', 'mudk'],
    locationsDB, startDate, appA, appB, appIcon, gpsAddMissonClicked, token_used,
    initLocation, newLocation, image_pokestop, gooleMap,  superToken='pikapi';
    return {
        setGpsAddMisson: ()=>gpsAddMissonClicked = '(by GPS Location)',
        getGpsAddMisson: ()=>gpsAddMissonClicked,
        setGlobalLocation: (loc)=> locationsDB = loc, 
        getGlobalLocation: ()=> locationsDB, 
        setStartDate: (date)=> startDate = date,
        getStartDate: ()=> startDate,
        setGoogleMap:(gm)=> gooleMap = gm,
        getGoogleMap:()=> gooleMap,
        getPokestop_icon: () => icon = 'https://vignette.wikia.nocookie.net/pokemongo/images/8/87/Pok%C3%A9_Ball.png/revision/latest/scale-to-width-down/56',
        setPokestop_icon: (icon) => image_pokestop = icon,
        setA: (a) => appA = a,
        getA: () => appA,
        setB: (b) => appB = b,
        getB: () => appB,
        setIcon: (icon) => appIcon = icon,
        getIcon: ()=> appIcon,
        setInitLocation: (location)=> initLocation = location,
        setNewLocation: (New_location)=> newLocation = New_location,
        getInitLocation: () => initLocation,
        getNewLocation: () => newLocation,
        getToken: (t)=> token.indexOf(t),
        setTokenUsed:(t)=> token_used = t,
        getTokenUsed:()=> token_used,
        getSuperToken:()=> superToken,
        setCount: () => selection++,
        getCount: () => selection,
        a: (id) => id.includes("a") ? id : "",
        b: (id) => id.includes("b") ? id : "",
    };
})();