Vue.component('paginate', VuejsPaginate)

new Vue({
    el: '#search',
    data: {
        info: {},
        found: false,
        errored: false,
        searchTerm: '',
        base_URL: 'https://gregoria.pythonanywhere.com',
        page: 1,
    },
    methods: {
        clickCallback(pageNum) {
            this.search(this.searchTerm, pageNum);
            console.log(pageNum);
        },

        renderComic(date) {
            //TODO: Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily
            // lead to XSS vulnerabilities. Only use HTML interpolation on trusted content and never on user-provided content.
            return date.display_name + `<br><a href="https://www.gocomics.com/foxtrot/` + date.filename.replace(/[-]/g,"/",-1) + `"><img src ="https://ft962543676.files.wordpress.com/2018/11/` + date.filename + `.gif"></a>`
        },
        search(term, target_page) {
            this.found  = true;
            axios.post(
                this.base_URL+ '/json/search/',
                JSON.stringify({text: this.searchTerm, target_page: target_page}))
                .then(response => (this.info = response.data))
                .catch(error => {
                    console.log(error);
                    this.errored = true
                });
        },
    },
});
