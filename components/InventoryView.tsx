
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';
import { SearchIcon } from './icons/SearchIcon';
import { PlusIcon } from './icons/PlusIcon';
import { Modal } from './common/Modal';

const AddProductForm: React.FC<{ onAdd: (product: Omit<Product, 'id' | 'imageUrl'>) => void; onClose: () => void }> = ({ onAdd, onClose }) => {
    // This is a simplified form for demonstration
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newProduct = {
            name: formData.get('name') as string,
            sku: formData.get('sku') as string,
            category: formData.get('category') as string,
            price: parseFloat(formData.get('price') as string),
            stock: parseInt(formData.get('stock') as string, 10),
        };
        onAdd(newProduct);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300">Product Name</label>
                <input type="text" name="name" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">SKU</label>
                    <input type="text" name="sku" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Category</label>
                    <input type="text" name="category" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Price</label>
                    <input type="number" name="price" step="0.01" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Stock</label>
                    <input type="number" name="stock" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
            </div>
            <div className="flex justify-end pt-4 space-x-2">
                <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-md">Cancel</button>
                <button type="submit" className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-md">Add Product</button>
            </div>
        </form>
    );
};


export const InventoryView: React.FC = () => {
    const [inventory, setInventory] = useState<Product[]>(MOCK_PRODUCTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredInventory = useMemo(() =>
        inventory.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [inventory, searchTerm]
    );

    const handleAddProduct = (newProductData: Omit<Product, 'id' | 'imageUrl'>) => {
        const newProduct: Product = {
            ...newProductData,
            id: (inventory.length + 1).toString(),
            imageUrl: `https://picsum.photos/seed/${newProductData.name.replace(/\s+/g, '')}/200`,
        };
        setInventory(prev => [newProduct, ...prev]);
    };

    return (
        <div className="p-6 h-full flex flex-col">
            <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-xs">
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Product
                </button>
            </div>
            <div className="flex-grow overflow-y-auto bg-gray-800/50 rounded-lg border border-gray-700">
                <table className="w-full text-left">
                    <thead className="sticky top-0 bg-gray-800">
                        <tr className="border-b border-gray-700">
                            <th className="p-4">Image</th>
                            <th className="p-4">SKU</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4 text-right">Price</th>
                            <th className="p-4 text-right">Stock</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredInventory.map(product => (
                            <tr key={product.id} className="hover:bg-gray-700/50">
                                <td className="p-4"><img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-md"/></td>
                                <td className="p-4 font-mono text-sm text-gray-400">{product.sku}</td>
                                <td className="p-4 font-semibold">{product.name}</td>
                                <td className="p-4 text-gray-300">{product.category}</td>
                                <td className="p-4 text-right font-semibold text-indigo-400">${product.price.toFixed(2)}</td>
                                <td className={`p-4 text-right font-bold ${product.stock < 30 ? 'text-red-400' : 'text-green-400'}`}>{product.stock}</td>
                                <td className="p-4 text-center">
                                    <button className="text-gray-400 hover:text-white mr-2">Edit</button>
                                    <button className="text-red-500 hover:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Product">
                <AddProductForm onAdd={handleAddProduct} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};
