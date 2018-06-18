var app = new Vue({
    el: '#app',
    data: {
        appName: 'PockemonMap',
        query: '',
    },
    methods: {
        init: function(){
                console.log('init......');
        },
        search: function(t, e){
            console.log('token:', t);
            console.log('this:', this.query);
            console.log('event.path:', e.path);
            console.log('event.target.innerText:', event.target.innerText);
        }
    }
});

app.init();
