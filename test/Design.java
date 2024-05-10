public class Book {
  private String name;
  private String author;
  private double price;

  Book(String name, String author, double price) {
    this.name = name;
    this.author = author;
    this.price = price;
  }

  @Override
  public String toString() {
    return "Book Name : " + name + "\nBook Author : " + author
          + "\nBook Price : " + price;
  }
}

public class LibraryManager<T> {
  public static <T> void add(T item) {
    System.out.println("Adding item");
    System.out.println(item);
  }
}

public class Design {
  public static void main(String[] args) {
    Book book = new Book("Hello", "Unknown", 58.99);
    LibraryManager.add(book);
  }
}
