// var locations = [{
//         lat: 31.8192778,
//         lng: 35.2394908,
//         label: 'תחנת רכבת קלה יקותיאל אדם פסגת זאב מערב'
//     },
//     {
//         lat: 31.8209677,
//         lng: 35.2418900,
//         label: 'פארק'
//     }, {
//         lat: 31.8241515,
//         lng: 35.2378828,
//         label: 'מרכז קהילתי'
//     }, {
//         lat: 31.8253685,
//         lng: 35.2398462,
//         label: 'חדר כושר'
//     }, {
//         lat: 31.8229619,
//         lng: 35.2434243,
//         label: 'פסל הלטאה'
//     }, {
//         lat: 31.8191878,
//         lng: 35.2443416,
//         label: 'תיכון מדעים ואמנויות'
//     }, {
//         lat: 31.8186225,
//         lng: 35.2509291,
//         label: 'משחקיה'
//     },
//     {
//         lat: 31.8176015,
//         lng: 35.2486760,
//         label: 'בית כנסת'
//     },
//     {
//         lat: 31.8316543,
//         lng: 35.2421170,
//         label: 'מגרש משחקים'
//     },
//     {
//         lat: 31.8308521,
//         lng: 35.2418703,
//         label: 'פארק ארכיאולוגי'
//     },
//     {
//         lat: 31.8278714,
//         lng: 35.2407223,
//         label: 'מצבת גדוד מוריה'
//     },
//     {
//         lat: 31.8322229,
//         lng: 35.2341326,
//         label: 'מיתקן ספורט פיסגת זאב'
//     },
//     {
//         lat: 31.8207161,
//         lng: 35.2494105,
//         label: 'בית כנסת בית יצחק'
//     },
//     {
//         lat: 31.8201873,
//         lng: 35.2563091,
//         label: 'בית הכנסת יוסף חי'
//     },
//     {
//         lat: 31.8412436,
//         lng: 35.2417975,
//         label: 'גינת משחקים'
//     },
//     {
//         lat: 32.0334507,
//         lng: 34.7445459,
//         label: 'בית כנסת זכרון קדושים'
//     },
//     {
//         lat: 32.0339783,
//         lng: 34.7469491,
//         label: 'גן בית דניאל'
//     },
//     {
//         lat: 32.0381438,
//         lng: 34.7458763,
//         label: 'חוף גבעת עליה'
//     },
//     {
//         lat: 32.0376527,
//         lng: 34.7479898,
//         label: 'המסגד'
//     },
//     {
//         lat: 32.0377436,
//         lng: 34.7484297,
//         label: 'הגשר הערבי'
//     },
//     {
//         lat: 32.0382256,
//         lng: 34.7522277,
//         label: 'משחקיה'
//     },
//     {
//         lat: 32.0375617,
//         lng: 34.7544808,
//         label: 'מרכז כדורגל וספורט'
//     },
//     {
//         lat: 32.0361571,
//         lng: 34.7572135,
//         label: 'משחקיה'
//     },
//     {
//         lat: 32.0355478,
//         lng: 34.7597402,
//         label: 'תחנת רכבת וופסון'
//     },
//     {
//         lat: 32.0331194,
//         lng: 34.7587102,
//         label: 'פארק פרלה ולאון'
//     },
//     {
//         lat: 32.035835,
//         lng: 34.7493449,
//         label: 'בית הכנסת רבי מאיר בעל הנס',
//         icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/7/71/Larvitar.png/revision/latest/scale-to-width-down/128?cb=20180409130100'
//     }
// ];


let db = {
    main_menu: [{
            id: 'a1',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/7/75/Mp-Icon_Medals.png',
            name: 'Catch לתפוס',
            mission: null
        },
        {
            id: 'a2',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/5/55/Backpacker_shadow.png',
            name: 'Spin לסובב',
            mission: null
        },
        {
            id: 'a3',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/3/38/Mp-Icon_Appraisal.png',
            name: 'Make לעשות',
            mission: null
        },
        {
            id: 'a4',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/b/b6/Mp-Icon_Attacks.png',
            name: 'Battle / Win להלחם / לתפוס',
            mission: null
        },
        {
            id: 'a5',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/b/bc/Mp-Icon_Eggs.png',
            name: 'Hatch לבקע',
            mission: [{
                    name: 'Hatch an Egg',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/5/5f/Exeggcute.png',
                    ]
                },
                {
                    name: 'Hatch 3 Eggs',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/4/46/Magmar.png',
                    ]
                },
                {
                    name: 'Hatch 5 Eggs',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/2/2b/Chansey.png',
                    ]
                },
            ]
        },
        {
            id: 'a6',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/f/f8/Mp-Icon_Power-Up.png',
            name: 'Power - Up לחזק',
            mission: [{
                    name: 'Pokemon 5 times',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/4/43/Bulbasaur.png',
                        'https://vignette.wikia.nocookie.net/pokemongo/images/5/56/Charmander.png',
                        'https://vignette.wikia.nocookie.net/pokemongo/images/e/e3/Squirtle.png',
                    ]
                },
                {
                    name: 'Pokemon 3 times',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/e/e8/Staryu.png',
                    ]
                },
            ],
        },
        {
            id: 'a7',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/a/af/Mp-Icon_Candy.png',
            name: 'Earn a Candy לקבל סוכריה',
            mission: null
        },
        {
            id: 'a8',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/f/f7/Mp-Icon_Evolution.png',
            name: 'Evolve לפתח',
            mission: [{
                    name: 'Evolve a Pokemon',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/8/8d/Vulpix.png',
                        'https://vignette.wikia.nocookie.net/pokemongo/images/f/f2/Eevee.png'
                    ]
                },
                {
                    name: 'Evolve a Watertype Pokemon',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/9/9d/Water.png',
                        'https://vignette.wikia.nocookie.net/pokemongo/images/f/f1/Seel.png'
                    ]
                },
            ],
        },

    ],
    sub_menu: [{
            id: 'b1',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/f/fd/RT-Icon_Encounter.png',
            name: '',

        },
        {
            id: 'b2',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/a/a2/Rare_Candy.png',
            name: ''
        },
        {
            id: 'b3',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/a/a9/Fast_TM.png',
            name: ''
        },
        {
            id: 'b4',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/6/65/Stardust.png',
            name: ''
        },
        {
            id: 'b5',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/2/24/Berries.png',
            name: ''
        },
        {
            id: 'b6',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/3/3e/Pok%C3%A9_Balls.png',
            name: ''
        },
        {
            id: 'b7',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/0/0e/Revives.png',
            name: ''
        },
        {
            id: 'b8',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/a/a8/Potions.png',
            name: ''
        },

    ]
}