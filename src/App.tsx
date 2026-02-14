import React, { useState } from 'react';
import { ScreenName, Product, CartItem } from './types/types';
import { products } from './data/data';

// Layout Components
import { TopNav } from './components/layout/TopNav';
import { BottomNav } from './components/layout/BottomNav';
import { Sidebar } from './components/layout/Sidebar';

// Screens
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { HomeScreen } from './screens/public/HomeScreen';
import { SearchScreen } from './screens/public/SearchScreen';
import { ProductDetailsScreen } from './screens/public/ProductDetailsScreen';
import { CartScreen } from './screens/client/CartScreen';
import { ProfileScreen } from './screens/client/ProfileScreen';
import { AdminDashboard } from './screens/admin/AdminDashboard';
import { AdminInventory } from './screens/admin/AdminInventory';
import { AdminCustomers } from './screens/admin/AdminCustomers';

const App = () => {
    const [activeScreen, setActiveScreen] = useState<ScreenName>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<'user' | 'admin'>('user');

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

    const handleLogin = () => {
        setIsLoggedIn(true);
        setActiveScreen('home');
    };

    const renderScreen = () => {
        switch (activeScreen) {
            case 'login': return <LoginScreen onLogin={handleLogin} onGuest={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;
            case 'register': return <RegisterScreen onBack={() => setActiveScreen('login')} onRegister={handleLogin} />;
            case 'home': return <HomeScreen favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => setActiveScreen('search')} />;
            case 'product-details': return selectedProduct ? <ProductDetailsScreen favorites={favorites} onFavoriteToggle={toggleFavorite} product={selectedProduct} onBack={() => setActiveScreen('home')} onAddToCart={addToCart} /> : <HomeScreen favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => setActiveScreen('search')} />;
            case 'cart': return <CartScreen cart={cart} onBack={() => setActiveScreen('home')} onClear={clearCart} />;
            case 'search': return <SearchScreen onBack={() => setActiveScreen('home')} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} />;
            case 'favorites': return isLoggedIn ? <SearchScreen onBack={() => setActiveScreen('home')} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} /> : <LoginScreen onLogin={handleLogin} onGuest={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;
            case 'profile': return <ProfileScreen isLoggedIn={isLoggedIn} onLoginClick={() => setActiveScreen('login')} onLogout={() => { setIsLoggedIn(false); setActiveScreen('home'); }} onAdminClick={() => { setUserRole('admin'); setActiveScreen('admin-dashboard'); }} />;
            case 'admin-dashboard': return <AdminDashboard />;
            case 'admin-inventory': return <AdminInventory />;
            case 'admin-customers': return <AdminCustomers />;
            default: return <HomeScreen favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => setActiveScreen('search')} />;
        }
    };

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

                {/* Bottom Nav for Mobile */}
                {!isAuthScreen && !selectedProduct && activeScreen !== 'cart' && activeScreen !== 'product-details' && !isAdminScreen && (
                    <BottomNav
                        active={activeScreen}
                        onChange={setActiveScreen}
                        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
                    />
                )}

                {isAdminScreen && (
                    <Sidebar active={activeScreen} onChange={setActiveScreen} />
                )}
            </div>
        </div>
    );
};

export default App;
