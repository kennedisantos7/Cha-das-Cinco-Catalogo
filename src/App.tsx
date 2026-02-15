
import React, { useState, useEffect } from 'react';
import { ScreenName, Product, CartItem } from './types/types';
import { products as initialProducts } from './data/data';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext';
import { supabase } from './lib/supabase';

// Layout Components
import { TopNav } from './components/layout/TopNav';
import { BottomNav } from './components/layout/BottomNav';
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

const AppContent = () => {
    const [activeScreen, setActiveScreen] = useState<ScreenName>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>(initialProducts);

    // Auth from Context
    const { session, loading, signOut } = useAuth();
    const isLoggedIn = !!session;

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await supabase.from('products').select('*');
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
        setFavorites(prev => prev.includes(id) ? prev.filter(fid => id !== fid) : [...prev, id]);
    };

    const clearCart = () => setCart([]);

    const handleLogout = async () => {
        await signOut();
        setActiveScreen('home');
    };

    const renderScreen = () => {
        // Force Login/Register if not logged in
        if (!isLoggedIn) {
            if (activeScreen === 'register') {
                return <RegisterScreen onBack={() => setActiveScreen('login')} onRegister={() => setActiveScreen('login')} />;
            }
            return <LoginScreen onLogin={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;
        }

        switch (activeScreen) {
            case 'login': return <LoginScreen onLogin={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;
            case 'register': return <RegisterScreen onBack={() => setActiveScreen('login')} onRegister={() => setActiveScreen('login')} />;
            case 'home': return <HomeScreen onAddToCart={addToCart} favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => setActiveScreen('search')} />;
            case 'product-details': return selectedProduct ? <ProductDetailsScreen favorites={favorites} onFavoriteToggle={toggleFavorite} product={selectedProduct} onBack={() => setActiveScreen('home')} onAddToCart={addToCart} /> : <HomeScreen onAddToCart={addToCart} favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => setActiveScreen('search')} />;
            case 'cart': return <CartScreen onAddToCart={addToCart} onFavoriteToggle={toggleFavorite} favorites={favorites} products={products} cart={cart} onBack={() => setActiveScreen('home')} onClear={clearCart} />;
            case 'search': return <SearchScreen onAddToCart={addToCart} products={products} favorites={favorites} onFavoriteToggle={toggleFavorite} onBack={() => setActiveScreen('home')} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} />;
            case 'favorites': return <FavoritesScreen favorites={favorites} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onBack={() => setActiveScreen('home')} onFavoriteToggle={toggleFavorite} />;
            case 'profile': return <ProfileScreen isLoggedIn={isLoggedIn} onLoginClick={() => setActiveScreen('login')} onLogout={handleLogout} onOrdersClick={() => setActiveScreen('orders')} />;
            case 'orders': return <OrdersScreen onBack={() => setActiveScreen('profile')} />;
            default: return <HomeScreen onAddToCart={addToCart} favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => setActiveScreen('search')} />;
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col h-screen items-center justify-center bg-background-cream gap-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-secondary font-bold animate-pulse tracking-widest text-sm uppercase">Carregando experiência...</p>
            </div>
        );
    }

    const isAuthScreen = activeScreen === 'login' || activeScreen === 'register';
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="min-h-screen flex flex-col bg-background-cream text-secondary font-sans selection:bg-primary/20">
            {!isAuthScreen && (
                <TopNav
                    active={activeScreen}
                    onChange={setActiveScreen}
                    cartCount={cartCount}
                    isLoggedIn={isLoggedIn}
                    onLoginClick={() => setActiveScreen('login')}
                />
            )}

            <div className="flex-1 flex flex-col relative">
                <main className="flex-1 pb-20 md:pb-0">
                    {renderScreen()}
                </main>

                {!isAuthScreen && activeScreen !== 'cart' && (
                    <Footer />
                )}
            </div>

            {!isAuthScreen && (
                <BottomNav
                    active={activeScreen}
                    onChange={setActiveScreen}
                    cartCount={cartCount}
                />
            )}
        </div>
    );
};

const App = () => (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
);

export default App;
