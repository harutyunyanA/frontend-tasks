import { useState } from "react";

export default function App() {
  const [products, setProducts] = useState([
    {
      id: 101,
      title: "Psychology",
      price: 28,
      picture: "https://images.booksense.com/images/568/458/9781465458568.jpg",
    },
    {
      id: 102,
      title: "Economics",
      price: 25,
      picture: "https://pictures.abebooks.com/isbn/9780756698270-us.jpg",
    },
    {
      id: 103,
      title: "Anthropology",
      price: 32,
      picture: "https://images.penguinrandomhouse.com/cover/9780593966815",
    },
    {
      id: 104,
      title: "Art",
      price: 7,
      picture: "https://images.booksense.com/images/372/453/9781465453372.jpg",
    },
    {
      id: 105,
      title: "Business",
      price: 13,
      picture: "https://images.booksense.com/images/886/475/9781465475886.jpg",
    },
    {
      id: 106,
      title: "Design",
      price: 23,
      picture: "https://www.kennys.ie/products/full/9780241257074.jpg",
    },
    {
      id: 107,
      title: "Astronomy",
      price: 20,
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_2x4a_NsAr30kf3BTAoxB3RpGaFTndcoKQ&s",
    },
    {
      id: 108,
      title: "History",
      price: 30,
      picture:
        "https://hive.dmmserver.com/media/640/97802412/9780241225929.jpg",
    },
  ]);
  const [basket, setBasket] = useState([]);
  const moveToCart = (product) => {
    const found = basket.find((item) => item.id === product.id);
    if (!found) {
      setBasket([...basket, { ...product, quantity: 1 }]);
    } else {
      found.quantity++;
      setBasket([...basket]);
    }
  };
  const reOrder = (hint) => {
    if (hint === "product") {
      setBasket([...basket].sort((a, b) => a.title.localeCompare(b.title)));
    } else if (hint === "subtotal") {
      setBasket(
        [...basket].sort((a, b) => a.quantity * a.price - b.quantity * b.price)
      );
    } else {
      setBasket([...basket].sort((a, b) => a[hint] - b[hint]));
    }
  };

  return (
    <div className="container">
      <h1 className="display-3">Shopping Card</h1>
      <div className="row">
        <div className="col-md-8">
          <h2>Products</h2>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-3 my-2">
                <img
                  src={product.picture}
                  style={{ width: 170, height: 200 }}
                />
                <p>{product.title}</p>
                <p className="text-danger">{product.price}USD</p>
                <button
                  onClick={() => moveToCart(product)}
                  className="btn btn-outline-danger"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <h2>Basket</h2>
          <table className="table table-dark table-bordered table-striped">
            <thead>
              <tr>
                <th className="heading" onClick={() => reOrder("product")}>
                  PRODUCT
                </th>
                <th
                  className="heading"
                  onClick={() => {
                    reOrder("price");
                  }}
                >
                  PRICE
                </th>
                <th
                  className="heading"
                  onClick={() => {
                    reOrder("quantity");
                  }}
                >
                  QUANTITY
                </th>
                <th className="heading" onClick={() => reOrder("subtotal")}>
                  SUBTOTAL
                </th>
                <th className="heading">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {basket.map((item) => {
                const filled =
                  item.price * item.quantity > 500
                    ? { letterSpacing: "4px" }
                    : "";
                return (
                  <tr className={filled} key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>x {item.quantity}</td>
                    <td>{item.price * item.quantity} USD</td>
                    <td>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => {
                          item.quantity++;
                          setBasket([...basket]);
                        }}
                      >
                        +
                      </button>
                      <button
                        disabled={item.quantity < 2}
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => {
                          item.quantity--;
                          setBasket([...basket]);
                        }}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          setBasket(
                            basket.filter((product) => item.id !== product.id)
                          )
                        }
                      >
                        x
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
