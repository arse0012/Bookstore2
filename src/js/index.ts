import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IBook {
    id: number
    title: string
    author: string
    publisher: string
    price: number
}

let baseUrl: string = "https://arsen-bookstore.azurewebsites.net/"

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        books: [],
        vendortoGetby: "",
        singleBook: 0,
        deleteId: 0,
        deleteMessage: "",
        addData: { model: "", vendor: "", price: 0 },
        addMessage: "",
        putData: { id: 0, model: "", vendor: "", price: 0 },
        putMessage: ""
    },
    methods: {
        getAllBooks() {
            this.helperGetAndShow(baseUrl)
        },
        helperGetAndShow(url: string ) {
            axios.get<IBook[]>(url)
            .then((response: AxiosResponse<IBook[]>) => {
                this.books = response.data
            })
            .catch((error: AxiosError) => {
                alert(error.message)
            })
        },
        addBook() {
            axios.post<IBook>(baseUrl, this.addData)
                .then((response: AxiosResponse) => {
                    let message: string = "response" + response.status + " " + response.statusText
                    this.addMessage = message
                    this.getAllBooks()
                })
                .catch((error: AxiosError) => {

                    alert(error.message)
                })
        },
        getById() {

        },
        putbook() {

        },
        deleteBook() {

        }
    }
})