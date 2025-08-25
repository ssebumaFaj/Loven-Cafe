
import React, { useState, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';
import { PlusIcon } from './icons/PlusIcon';
import { MinusIcon } from './icons/MinusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { SearchIcon } from './icons/SearchIcon';

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => (
    <div 
        className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 cursor-pointer hover:border-indigo-500 transition-all duration-200 flex flex-col group"
        onClick={() => onAddToCart(product)}
    >
        <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover" />
        <div className="p-3 flex-grow flex flex-col justify-between">
            <h3 className="font-semibold text-sm text-white truncate">{product.name}</h3>
            <p className="text-indigo-400 font-bold mt-1">${product.price.toFixed(2)}</p>
        </div>
        <div className="bg-indigo-600 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Add to Cart</div>
    </div>
);

export const POSView: React.FC = () => {
    const [products] = useState<Product[]>(MOCK_PRODUCTS);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => 
        products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())), 
        [products, searchTerm]
    );

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart(prevCart => {
            const item = prevCart.find(i => i.id === productId);
            if(item && item.quantity + delta <= 0) {
                return prevCart.filter(i => i.id !== productId);
            }
            return prevCart.map(i => 
                i.id === productId ? { ...i, quantity: i.quantity + delta } : i
            );
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Products Grid */}
            <div className="w-3/5 p-4 flex flex-col">
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-grow overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Cart Section */}
            <div className="w-2/5 bg-gray-800/50 border-l border-gray-700 flex flex-col p-4">
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Current Order</h2>
                <div className="flex-grow overflow-y-auto">
                    {cart.length === 0 ? (
                        <p className="text-gray-400 text-center mt-10">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-3">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center bg-gray-800 p-2 rounded-lg">
                                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{item.name}</p>
                                        <p className="text-xs text-gray-400">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded-full bg-gray-700 hover:bg-gray-600"><MinusIcon className="w-4 h-4" /></button>
                                        <span className="font-bold w-6 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded-full bg-gray-700 hover:bg-gray-600"><PlusIcon className="w-4 h-4" /></button>
                                    </div>
                                    <div className="w-20 text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-400 hover:text-red-300"><TrashIcon className="w-5 h-5" /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="border-t border-gray-700 pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-xl">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button 
                        onClick={() => alert(`Charged: $${total.toFixed(2)}`)}
                        disabled={cart.length === 0}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg mt-4 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Charge ${total.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    );
};
