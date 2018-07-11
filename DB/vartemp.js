let db = {
    main_menu: [
        {
            id: 'a1',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/7/75/Mp-Icon_Medals.png',
            name: 'Catch לתפוס',
            mission: [{
                    name: '3 Grass, Fire or Water Type Pokemon',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/7/77/Pikachu.png',
                    ]
                },
                {
                    name: 'a Dragon-type Pokemon',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/9/99/Dratini.png',
                    ]
                },
                {
                    name: 'Catch 10 Pokemon',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/0/01/Magikarp.png',
                    ]
                },
                {
                    name: 'Catch 5 Pokemon with Weather Boost',
                    options: [
                        'http://pokemongo.wikia.com/wiki/Poliwag',
                        'http://pokemongo.wikia.com/wiki/Vulpix',
                    ]
                },
            ]
        },
        {
            id: 'a2',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/c/c6/RT-Icon_Item-Reward.png/',
            name: 'Use Berries לתת ברי',
            mission: [{
                name: 'Use 5 Berries to help catch Pokemmon',
                options: [
                    'https://vignette.wikia.nocookie.net/pokemongo/images/a/ab/Lickitung.png',
                ]
            }, ]
        },
        {
            id: 'a3',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/3/38/Mp-Icon_Appraisal.png',
            name: 'Make/Land לעשות',
            mission: [{
                    name: 'Nice Curveball throw/3 Great Throws',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/c/c1/Gastly.png',
                    ]
                },
                {
                    name: '3 Great Throws in a row',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/b/b2/Onix.png',
                    ]
                },
                {
                    name: '3 Excellent Throws in a row',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/7/71/Larvitar.png',
                    ]
                }
            ]
        },
        {
            id: 'a4',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/b/b6/Mp-Icon_Attacks.png',
            name: 'Battle / Win להלחם / לתפוס',
            mission: [{
                    name: 'a level 3 or higher Raid',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/9/99/Dratini.png',
                    ]
                },
                {
                    name: 'Win a Gym battle',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/8/8b/Mankey.png',
                        'https://vignette.wikia.nocookie.net/pokemongo/images/6/6c/Horsea.png',
                    ]
                },
                {
                    name: 'Win 3 Gym battles',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/2/2b/Machop.png',
                    ]
                },
                {
                    name: 'Battle in a Gym 5 times',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/e/e2/Jynx.png',
                    ]
                },
                {
                    name: 'super-effective Charged attack in 7 Gym battles',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/3/3a/Electabuzz.png',
                    ]
                },
            ]
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
            mission: [{
                name: 'walking a Buddy',
                options: [
                    'https://vignette.wikia.nocookie.net/pokemongo/images/d/da/Krabby.png',
                ]
            }, ]
        },
        {
            id: 'a8',
            icon: 'https://vignette.wikia.nocookie.net/pokemongo/images/f/f7/Mp-Icon_Evolution.png',
            name: 'Evolve לפתח',
            mission: [{
                    name: 'Evolve 1 Water, Electric or Fire Type Pokemon',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/f/f2/Eevee.png'
                    ]
                },
                {
                    name: 'Evolve a Grass Type Pokemon',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/4/43/Bulbasaur.png',
                    ]
                },
                {
                    name: 'Evolve a Fire Type Pokemon',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/5/56/Charmander.png',
                    ]
                },
                {
                    name: 'Evolve a Water Type Pokemon',
                    options: [
                        'https://vignette.wikia.nocookie.net/pokemongo/images/e/e3/Squirtle.png',
                    ]
                },
            ],
        },

    ]
};

sub_menu = [
    {
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
];
