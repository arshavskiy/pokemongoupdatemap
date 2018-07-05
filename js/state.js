
let app = (function () {
    let selection = 0;
    let locationsDB, startDate, appA, appB, appIcon,
    initLocation, newLocation, image_pokestop, gooleMap; 
    return {
        setGlobalLocation: (loc)=> locationsDB = loc, 
        getGlobalLocation: ()=> locationsDB, 
        setStartDate: (date)=> startDate = date,
        getStartDate: ()=> startDate,
        setGoogleMap:(gm)=> gooleMap = gm,
        getGoogleMap:()=> gooleMap,
        getPokestop_icon: () => image_pokestop = 'https://vignette.wikia.nocookie.net/pokemongo/images/8/87/Pok%C3%A9_Ball.png/revision/latest/scale-to-width-down/32',
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
        count: () => selection++,
        a: (id) => id.includes("a") ? id : "",
        b: (id) => id.includes("b") ? id : "",
    };
})();