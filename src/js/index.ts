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

let baseUrl: string = "http://anbo-bookstorerest.azurewebsites.net/api/books "

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        name: "",
        greeting: "",
        books: [],
        id: "",
        book: null,
        inputData: { title: "", author: "", publisher: "", price: 0 },
        addMessage: "",
        idToDelete: 0,
        deleteMessage: "",
        idToMessage: "",
        idToUpdate: "",
        updateData: { id: 0, title: "", author: "", publisher: "", price: 0 },
        updateMessage: ""
    },
    created(): void {
        console.log("created")
        this.getAllBooks();
    },
    methods: {
        getAllBooks(): void  {
            axios.get<IBook[]>(baseUrl)
            .then((response: AxiosResponse<IBook[]>) => {
                this.books = response.data
            })
            .catch((error: AxiosError) => {
                this.message = error.message
            })
        },
        getBook(id: number): void {
            let url: string = baseUrl + "/" + id
            axios.get<IBook>(url)
            .then((response: AxiosResponse<IBook>) => {
                this.book = response.data
            })
            .catch((error: AxiosError) => {
                alert(error.message)
            })
        },
        addBook(): void  {
            console.log("addBook")
            axios.post<number>(baseUrl, this.inputData)
            .then((response: AxiosResponse<number>) => {
                this.addMessage = "Book added"
                this.getAllBooks()
            })
            .catch((error: AxiosError) => {
                alert(error.message)
            })
        },
        updateBook(id: number): void {
            let url : string = baseUrl + "/" + id
            console.log("update book " + url)
            axios.put<number>(url, this.updateData)
            .then((response: AxiosResponse<number>) => {
                if(response.data == 1) {
                    this.updateMessage = "Book updated"
                    this.getAllBooks()
                } else {
                    this.updateMessage = "No such book"
                }
            })
            .catch((error: AxiosError) => {
                alert(error.message)
            })
        },
        deleteBook(id: number): void  {
            let url : string = baseUrl + "/" + id
            console.log("deleteBook" + url)
            axios.delete<number>(url)
            .then((response: AxiosResponse<number>) => {
                console.log("deleteBook result" + response.data)
                if(response.data == 1) {
                this.deleteMessage = "Book deleted"
                this.getAllBooks()
                } else {
                    this.deleteMessage = "No such book"
                }
            })
            .catch((error: AxiosError) => {
                alert(error.message)
            })
        }
    }
})