import { useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    console.log('Cart updated:', cart);
  }, [cart]);

  return (
    <>
      <WelcomeBand />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="alert alert-info text-center">
            Your cart is empty.
          </div>
        ) : (
          <div className="card shadow-sm p-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: CartItem) => (
                  <tr key={item.bookID}>
                    <td>{item.title}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.bookID)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <h3 className="mt-4 text-end">Total: ${totalAmount.toFixed(2)}</h3>
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-success">Checkout</button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/books`)}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}

export default CartPage;
