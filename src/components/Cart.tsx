import { ShoppingCart, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './Button';
import { getCart, removeFromCart } from '../utils/cart';

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState(getCart());

  // Listen for cart updates
  useEffect(() => {
    const handleStorageChange = () => {
      setCart(getCart());
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for cart updates
    window.addEventListener('cartUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdate', handleStorageChange);
    };
  }, []);

  const handleRemoveFromCart = (itemId: number) => {
    removeFromCart(itemId);
    setCart(getCart());
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white"
        aria-label="Abrir carrinho"
      >
        <ShoppingCart className="w-6 h-6" />
        {cart.items.length > 0 && (
          <span className="bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cart.items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-xl z-50">
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-4">Carrinho</h3>
            {cart.items.length === 0 ? (
              <p className="text-gray-400">Seu carrinho está vazio</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-white">{item.name}</p>
                        <p className="text-sm text-gray-400">
                          {item.quantity}x R${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-gray-400 hover:text-white"
                        aria-label={`Remover ${item.name} do carrinho`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-white mb-4">
                    <span>Total:</span>
                    <span>R${cart.total.toFixed(2)}</span>
                  </div>
                  <Button className="w-full">Finalizar Compra</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}