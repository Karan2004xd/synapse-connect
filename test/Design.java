import java.util.ArrayList;

public enum Color { red, green, blue };
public enum Size { large, medium, small };

public class Product {
  public String name;
  public Color color;
  public Size size;
}

public abstract class Specification<T> {
  public abstract bool isSatisfied(T item);
}

public abstract class Filter<T> {
  public abstract ArrayList<T> filter(ArrayList<T> items, Specification<T> spec);
}

public class ProductFilter extends Filter<Product> {
  @Override
  public ArrayList<Product> filter(ArrayList<Product> items, Specification<Product> spec) {
    ArrayList<Product> result = new ArrayList<>();
    for (Product prod : items) {
      if (spec.isSatisfied(prod)) {
        result.add(prod);
      }
    }
    return result;
  }
}

public class ColorSpecification extends Specification<ColorSpecification> {
  private Color color;
  public ColorSpecification(Color color) {
    this.color = color;
  }

  @Override
  public bool isSatisfied(ColorSpecification item) {
    return color == item.color;
  }
}

public class SizeSpecification extends Specification<SizeSpecification> {
  private Size size;
  public SizeSpecification(Size size) {
    this.size = size;
  }

  @Override
  public bool isSatisfied(SizeSpecification item) {
    return item.size == size;
  }
}

public class MultipleSpecification<T> extends Specification<MultipleSpecification> {
  private ArrayList<Specification<T>> specs;

  public MultipleSpecification(ArrayList<Specification<T>> specs) {
    this.specs = specs;
  }
  
  @Override
  public bool isSatisfied(MultipleSpecification item) {
    for (Specification<T> spec : specs) {
      if (!spec.isSatisfied(item)) return false;
    }
    return true;
  }
}

public class Design {
  public static void main(String[] args) {
    Product p1 = new Product("Apple", Color.red, Size.medium);
    Product p2 = new Product("Tree", Color.green, Size.large);
    Product p3 = new Product("Strawberry", Color.red, Size.small);

    ArrayList<Product> items = new ArrayList<>(p1, p2, p3);
    ProductFilter pFilter = new ProductFilter();

    ColorSpecification cSpec = new ColorSpecification(Color.red);
    SizeSpecification sSpec = new SizeSpecification(Size.small);

    ArrayList<Specification<Product>> spec = new ArrayList<>(cSpec, sSpec);
    MultipleSpecification<Product> mSpec = new MultipleSpecification(spec);

    for (Product i : pFilter.filter(items, mSpec)) {
      System.out.println("Name: " + i.name + ", who is red and small");
    }
  }
}
