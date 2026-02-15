
import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, Upload } from 'lucide-react';
import { AdminContainer } from '../../components/layout/AdminContainer';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types/types';

export const AdminInventory = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data } = await supabase.from('products').select('*');
        if (data) {
            const mappedData = data.map((item: any) => ({
                ...item,
                image: item.image_url || item.image
            }));
            setProducts(mappedData);
        }
    };

    const openModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setName(product.name);
            setPrice(product.price.toString());
            setCategory(product.category);
            setDescription(product.description);
            setStock(product.stock.toString());
        } else {
            setEditingProduct(null);
            setName('');
            setPrice('');
            setCategory('');
            setDescription('');
            setStock('');
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            let imageUrl = editingProduct?.image || 'https://via.placeholder.com/150';

            // Upload Image
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const { data, error } = await supabase.storage.from('product-images').upload(fileName, imageFile);

                if (error) throw error;
                if (data) {
                    const { data: publicDesc } = supabase.storage.from('product-images').getPublicUrl(fileName);
                    imageUrl = publicDesc.publicUrl;
                }
            }

            const productData = {
                name,
                price: parseFloat(price),
                category,
                description,
                stock: parseInt(stock),
                image_url: imageUrl,
            };

            if (editingProduct) {
                await supabase.from('products').update(productData).eq('id', editingProduct.id);
            } else {
                await supabase.from('products').insert(productData);
            }

            setIsModalOpen(false);
            fetchProducts();
        } catch (error: any) {
            alert('Erro ao salvar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir?')) {
            await supabase.from('products').delete().eq('id', id);
            fetchProducts();
        }
    };

    return (
        <AdminContainer>
            <header className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900">Estoque</h1>
                <button onClick={() => openModal()} className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-105">
                    <Plus size={20} /> Novo Produto
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(p => (
                    <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 group">
                        <img src={p.image || (p as any).image_url} className="w-16 h-16 rounded-lg object-cover" alt={p.name} />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 truncate">{p.name}</h3>
                            <p className="text-sm text-slate-500">{p.stock} unidades • R$ {p.price}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openModal(p)} className="p-2 bg-gray-100 rounded-lg hover:bg-blue-50 hover:text-blue-600"><Edit3 size={18} /></button>
                            <button onClick={() => handleDelete(p.id)} className="p-2 bg-gray-100 rounded-lg hover:bg-red-50 hover:text-red-600"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
                            <button onClick={() => setIsModalOpen(false)}><X size={24} className="text-slate-400 hover:text-slate-600" /></button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Nome</label>
                                <input className="w-full border rounded-lg p-2.5" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Preço</label>
                                    <input type="number" className="w-full border rounded-lg p-2.5" value={price} onChange={e => setPrice(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Estoque</label>
                                    <input type="number" className="w-full border rounded-lg p-2.5" value={stock} onChange={e => setStock(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Categoria</label>
                                <select className="w-full border rounded-lg p-2.5" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="">Selecione...</option>
                                    <option value="Pães Tradicionais">Pães Tradicionais</option>
                                    <option value="Pães Sem Glúten">Pães Sem Glúten</option>
                                    <option value="Doces">Doces</option>
                                    <option value="Salgados">Salgados</option>
                                    <option value="Bebidas">Bebidas</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Descrição</label>
                                <textarea className="w-full border rounded-lg p-2.5 h-24" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Imagem</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 text-center relative">
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setImageFile(e.target.files?.[0] || null)} accept="image/*" />
                                    <Upload size={24} className="text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">{imageFile ? imageFile.name : 'Clique para enviar'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-600 font-bold hover:bg-gray-100 rounded-xl transition-colors">Cancelar</button>
                            <button onClick={handleSave} disabled={loading} className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:brightness-105 transition-all shadow-lg shadow-primary/20 disabled:opacity-70">
                                {loading ? 'Salvando...' : 'Salvar Produto'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminContainer>
    );
};
