
import React, { useState, useEffect } from 'react';
import { ScreenName, Product, CartItem } from './types/types';
import { products as initialProducts } from './data/data'; // Fallback

// Auth
import { AuthProvider, useAuth } from './context/AuthContext';
import { supabase } from './lib/supabase';

// Layout Components
import { TopNav } from './components/layout/TopNav';
import { BottomNav } from './components/layout/BottomNav';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Screens
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { HomeScreen } from './screens/public/HomeScreen';
import { SearchScreen } from './screens/public/SearchScreen';
import { ProductDetailsScreen } from './screens/public/ProductDetailsScreen';
import { CartScreen } from './screens/client/CartScreen';
import { ProfileScreen } from './screens/client/ProfileScreen';
import { FavoritesScreen } from './screens/client/FavoritesScreen';
import { OrdersScreen } from './screens/client/OrdersScreen';
import { AdminDashboard } from './screens/admin/AdminDashboard';
import { AdminInventory } from './screens/admin/AdminInventory';
import { AdminCustomers } from './screens/admin/AdminCustomers';

const AppContent = () => {
    const [activeScreen, setActiveScreen] = useState<ScreenName>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

    // Auth from Context
    const { session, loading, signOut, isAdmin } = useAuth();
    const isLoggedIn = !!session;

    // Products State (for fetching from DB)
    const [products, setProducts] = useState<Product[]>(initialProducts);

    useEffect(() => {
        // Fetch products from DB
        const fetchProducts = async () => {
            const { data, error } = await supabase.from('products').select('*');
            if (data && data.length > 0) {
                const mappedData = data.map((item: any) => ({
                    ...item,
                    image: item.image_url || item.image
                }));
                setProducts(mappedData);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product: Product, quantity: number) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === product.id);
            if (existing) {
                return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p);
            }
            return [...prev, { ...product, quantity }];
        });
        setActiveScreen('cart');
    };

    const toggleFavorite = (id: string) => {
        if (!isLoggedIn) {
            alert("Por favor, faça login para favoritar itens.");
            setActiveScreen('login');
            return;
        }
        setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
    };

    const clearCart = () => setCart([]);

    const handleLogout = async () => {
        await signOut();
        setActiveScreen('home');
    };

    const renderScreen = () => {
        switch (activeScreen) {
            case 'login': return <LoginScreen onLogin={() => setActiveScreen('home')} onGuest={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;
            case 'register': return <RegisterScreen onBack={() => setActiveScreen('login')} onRegister={() => setActiveScreen('login')} />;
            case 'home': return <HomeScreen favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => setActiveScreen('search')} />;
            case 'product-details': return selectedProduct ? <ProductDetailsScreen favorites={favorites} onFavoriteToggle={toggleFavorite} product={selectedProduct} onBack={() => setActiveScreen('home')} onAddToCart={addToCart} /> : <HomeScreen favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => setActiveScreen('search')} />;
            case 'cart': return <CartScreen cart={cart} onBack={() => setActiveScreen('home')} onClear={clearCart} />;
            case 'search': return <SearchScreen favorites={favorites} onFavoriteToggle={toggleFavorite} onBack={() => setActiveScreen('home')} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} />;
            case 'favorites': return isLoggedIn ? <FavoritesScreen favorites={favorites} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onBack={() => setActiveScreen('home')} onFavoriteToggle={toggleFavorite} /> : <LoginScreen onLogin={() => setActiveScreen('home')} onGuest={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;
            case 'profile': return <ProfileScreen isLoggedIn={isLoggedIn} onLoginClick={() => setActiveScreen('login')} onLogout={handleLogout} onAdminClick={() => setActiveScreen('admin-dashboard')} onOrdersClick={() => setActiveScreen('orders')} />;
            case 'orders': return isLoggedIn ? <OrdersScreen onBack={() => setActiveScreen('profile')} /> : <LoginScreen onLogin={() => setActiveScreen('orders')} onGuest={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;

            // Admin Screens (Protected)
            case 'admin-dashboard': return isAdmin ? <AdminDashboard /> : <LoginScreen onLogin={() => setActiveScreen('admin-dashboard')} onGuest={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;
            case 'admin-inventory': return isAdmin ? <AdminInventory /> : <LoginScreen onLogin={() => setActiveScreen('admin-inventory')} onGuest={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;
            case 'admin-customers': return isAdmin ? <AdminCustomers /> : <LoginScreen onLogin={() => setActiveScreen('admin-customers')} onGuest={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;

            default: return <HomeScreen favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => setActiveScreen('search')} />;
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center bg-background-cream text-primary">Carregando...</div>;

    const isAdminScreen = activeScreen.startsWith('admin');
    const isAuthScreen = activeScreen === 'login' || activeScreen === 'register';

    return (
        <div className="flex justify-center bg-gray-100 min-h-screen">
            <div className="w-full bg-background-light relative overflow-hidden flex flex-col min-h-screen">

                {/* Top Nav for Desktop */}
                {!isAuthScreen && !isAdminScreen && (
                    <TopNav
                        active={activeScreen}
                        onChange={setActiveScreen}
                        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
                        isLoggedIn={isLoggedIn}
                        onLoginClick={() => setActiveScreen('login')}
                    />
                )}

                <div className="flex-1 overflow-hidden relative flex flex-col pt-0 md:pt-20">
                    {renderScreen()}
                </div>

                {/* Footer logic */}
                {!isAuthScreen && !isAdminScreen && activeScreen !== 'cart' && (
                    <Footer onAdminClick={() => {
                        if (isAdmin) {
                            setActiveScreen('admin-dashboard');
                        } else {
                            // If not logged in or not admin, go to login
                            // You might want a specific 'admin-login' state if distinguishing is needed,
                            // but for now reusing 'login' is fine.
                            setActiveScreen('login');
                        }
                    }} />
                )}

                {/* Bottom Nav for Mobile */}
                {!isAuthScreen && !selectedProduct && activeScreen !== 'cart' && activeScreen !== 'product-details' && !isAdminScreen && (
                    <BottomNav
                        active={activeScreen}
                        onChange={setActiveScreen}
                        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
                    />
                )}

                {isAdminScreen && isAdmin && (
                    <Sidebar active={activeScreen} onChange={setActiveScreen} />
                )}
            </div>
        </div>
    );
};

const App = () => (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
);

export default App;
