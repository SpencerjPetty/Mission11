import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Calculate total amount by multiplying price and quantity for each item
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
        marginBottom: '20px', // Add margin to separate it from the book list
      }}
    >
      <button
        style={{
          background: '#007bff',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/cart')}
      >
        🛒 View Cart - ${totalAmount.toFixed(2)}
      </button>
    </div>
  );
};

export default CartSummary;
