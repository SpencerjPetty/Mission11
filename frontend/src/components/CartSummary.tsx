import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Calculate total amount by multiplying price and quantity for each item
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity, // Multiply price by quantity
    0
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒<strong>{totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
