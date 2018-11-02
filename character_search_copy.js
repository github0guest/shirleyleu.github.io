Vue.component('paginate', VuejsPaginate)

new Vue({
    el: '#search',
    data: {
        info: {},
        found: false,
        errored: false,
        searchTerm: '',
        base_URL: 'http://127.0.0.1:5000',
        current_page: 1,
    },
    methods: {
        clickCallback: function(pageNum) {
            console.log(pageNum)
        },
        renderComic(date) {
            //TODO: Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily
            // lead to XSS vulnerabilities. Only use HTML interpolation on trusted content and never on user-provided content.
            return date.display_name + `<br /><img src="` + this.base_URL + `/static/images/` + date.filename + `.gif">`
        },
        search(term, target_page) {
            this.found  = true;
            axios.post(
                this.base_URL+ '/json/search/',
                JSON.stringify({text: this.searchTerm, current_page: target_page}))
                .then(response => (this.info = response.data))
                .catch(error => {
                    console.log(error);
                    this.errored = true
                });
            // if(this.info !== []){
            //     this.found = true;
            // }
        },
    },
});
