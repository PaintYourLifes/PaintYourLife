import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [messages, setMessages] = useState({});
  const [favorites, setFavorites] = useState([]);

  // Alternar obra nos favoritos
  const toggleFavorite = (artwork) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === artwork.id);
      if (exists) {
        return prev.filter((item) => item.id !== artwork.id);
      }
      return [...prev, artwork];
    });
  };

  // Verificar se a obra está favoritada
  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  // Funções do Carrinho
  const addToCart = (artwork) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === artwork.id);
      if (existing) {
        return prev.map((item) =>
          item.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...artwork, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const sendMessage = (artworkId, text) => {
    setMessages((prev) => ({
      ...prev,
      [artworkId]: [...(prev[artworkId] || []), { id: Date.now().toString(), text, sender: 'user' }]
    }));
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        messages,
        sendMessage,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);