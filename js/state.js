
let state = (function () {
    let selection = 0;
    let stateA, stateB, stateIcon, initLocation, newLocation, image_pokestop, gooleMap; 
    return {
        setGoogleMap:(gm)=> {
            gooleMap = gm;
        },
        getGoogleMap:()=> { 
            return gooleMap
        },
        getPokestop_icon: () => image_pokestop = 'https://vignette.wikia.nocookie.net/pokemongo/images/8/87/Pok%C3%A9_Ball.png/revision/latest/scale-to-width-down/32',
        setPokestop_icon: (icon) => image_pokestop = icon,
        setA: (a) => stateA = a,
        getA: () => stateA,
        setB: (b) => stateB = b,
        getB: () => stateB,
        setIcon: (icon) => stateIcon = icon,
        getIcon: ()=> stateIcon,
        setInitLocation: (location)=> initLocation = location,
        setNewLocation: (New_location)=> newLocation = New_location,
        getInitLocation: () => initLocation,
        getNewLocation: () => newLocation,
        count: () => selection++,
        a: (id) => id.includes("a") ? id : "",
        b: (id) => id.includes("b") ? id : "",
    };
})();