let buttonCounter = {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
}



let vm = new Vue({
    el: '#app',
    data: {
        appName: 'PockemonMap',
        query: '',
        locations: locations,
    },
    created: function () {
        // `this` points to the vm instance
        console.log('1. appName is: ' + this.appName);
    },

    methods: {
        init: function () {
            console.log('2. init......');
        },
        search: function (t, e) {
            console.log('token:', t);
            console.log('this:', this.query);
            console.log('event.path:', e.path);
            console.log('event.target.innerText:', event.target.innerText);
        },

    },
    components: {
        'button-counter': buttonCounter,
        'google-map': googleMap,
    },

});


vm.init();

console.log(
    vm.locations === locations, // => true
    vm.$el === document.getElementById('app') // => true
);

// $watch is an instance method
vm.$watch('query', function (newValue, oldValue) {
    // This callback will be called when `vm.a` changes
    console.log('newValue', newValue);
    console.log('oldValue', oldValue);
})