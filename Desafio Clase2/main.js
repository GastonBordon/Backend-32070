class Usuario {
  constructor(name, surname, books, pets) {
    this.name = name;
    this.surname = surname;
    this.books = books;
    this.pets = pets;
  }

  getFullName() {
    let completeName = `${this.name} ${this.surname}`;
    return completeName;
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  countPets() {
    let count = this.pets.length;
    return count;
  }

  addBook({ name, author }) {
    this.books.push({ name, author });
  }

  getBooksNames() {
    let booksNames = [];
    for (let i = 0; i < this.books.length; i++) {
      const bookName = this.books[i].name;
      booksNames.push(bookName);
    }
    return booksNames;
  }
}

const usuario = new Usuario("Gaston", "Bordon", [], []);

const nameUsuario = usuario.getFullName();
console.log(nameUsuario);

usuario.addPet("gato");
usuario.addPet("perro");
usuario.addPet("tortuga");
console.log(usuario.pets);

const petsQuantity = usuario.countPets();
console.log(petsQuantity);

usuario.addBook({
  name: "Harry Potter",
  author: "J.K. Rowling",
});
usuario.addBook({
  name: "El Señor De Los Anillos",
  author: "J.R.R. Tolkien",
});
console.log(usuario.books);

const booksNames = usuario.getBooksNames();
console.log(booksNames);
