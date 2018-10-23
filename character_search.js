new Vue({
    el: '#search',
    data: {
        info: null,
        errored: false,
        searchTerm: '',
    },
    methods: {
        search(term) {
            this.newSearchTerm = term;
            axios.post('https://gregoria.pythonanywhere.com/json/search/', JSON.stringify({text: this.searchTerm}))
                .then(response => (this.info = response.data))
                .catch(error => {
                    console.log(error);
                    this.errored = true
                })
        },
        renderComic(date) {
            //TODO: Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily
            // lead to XSS vulnerabilities. Only use HTML interpolation on trusted content and never on user-provided content.
            return date + `<img src="https://shirleyleu.github.io/static/images/` + date + `.gif">`
        }
    },
});
