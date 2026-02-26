
import React, { useState, useEffect } from 'react';
import { ProductCategory, Product, CartItem, ScreenName } from './types/types';
import { products as initialProducts } from './data/data';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext';
import { supabase } from './lib/supabase';

// Layout Components
import { TopNav } from './components/layout/TopNav';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { ShoppingBag } from 'lucide-react';

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
import { SettingsScreen } from './screens/client/SettingsScreen';

const AppContent = () => {
    const [activeScreen, setActiveScreen] = useState<ScreenName>('home');
    const [searchCategory, setSearchCategory] = useState<ProductCategory | 'Todos'>('Todos');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cha-das-cinco-cart');
        try {
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (e) {
            console.error("Erro ao carregar carrinho do localStorage", e);
            return [];
        }
    });
    const [favorites, setFavorites] = useState<string[]>(() => {
        const savedFavs = localStorage.getItem('cha-das-cinco-favorites');
        try {
            return savedFavs ? JSON.parse(savedFavs) : [];
        } catch (e) {
            console.error("Erro ao carregar favoritos do localStorage", e);
            return [];
        }
    });
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [productsLoading, setProductsLoading] = useState(true);
    const [featuredProduct, setFeaturedProduct] = useState<Product>(() => {
        return initialProducts[Math.floor(Math.random() * initialProducts.length)];
    });
    const [showRecoveryPopup, setShowRecoveryPopup] = useState(false);

    // Auth from Context
    const { session, loading: authLoading, signOut } = useAuth();
    const isLoggedIn = !!session;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Products
                const { data: prodData } = await supabase.from('products').select('*');
                if (prodData && prodData.length > 0) {
                    const mappedData = prodData.map((item: any) => {
                        // `images` is always a proper array from the DB
                        // `image_url` is a PostgreSQL set-format string (not a plain URL), so we ignore it
                        const images: string[] = Array.isArray(item.images) && item.images.length > 0
                            ? item.images
                            : [];
                        const image = images[0] || '';
                        return {
                            ...item,
                            images,
                            image,
                        };
                    });
                    setProducts(mappedData);

                    // Check for deep link (?product=id)
                    const params = new URLSearchParams(window.location.search);
                    const productId = params.get('product');
                    if (productId) {
                        const sharedProduct = mappedData.find((p: Product) => p.id === productId);
                        if (sharedProduct) {
                            setSelectedProduct(sharedProduct);
                            setActiveScreen('product-details');
                            // Clean URL without reloading
                            const newUrl = window.location.pathname;
                            window.history.replaceState({}, '', newUrl);
                        }
                    }

                    // Pre-select and pre-load banner image
                    let featured = featuredProduct;
                    const found = mappedData.find((p: Product) => p.id === featuredProduct.id);
                    if (found) {
                        featured = found;
                    } else {
                        featured = mappedData[Math.floor(Math.random() * mappedData.length)];
                    }
                    setFeaturedProduct(featured);

                }

                // Fetch Favorites if logged in
                if (session?.user?.id) {
                    const { data: favData } = await supabase
                        .from('user_favorites')
                        .select('product_id')
                        .eq('user_id', session.user.id);

                    if (favData) {
                        const cloudFavs = favData.map(f => f.product_id);
                        setFavorites(cloudFavs);
                        // Update local cache with cloud data when logged in
                        localStorage.setItem('cha-das-cinco-favorites', JSON.stringify(cloudFavs));
                    }
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setProductsLoading(false);
            }
        };
        fetchData();
    }, [session?.user?.id]);

    // Persist cart changes
    useEffect(() => {
        localStorage.setItem('cha-das-cinco-cart', JSON.stringify(cart));
    }, [cart]);

    // Persist local favorites only when guest
    useEffect(() => {
        if (!session) {
            localStorage.setItem('cha-das-cinco-favorites', JSON.stringify(favorites));
        }
    }, [favorites, session]);

    // Check for recovering cart on mount
    useEffect(() => {
        const hasRecoveredCart = cart.length > 0;
        const alreadyShown = sessionStorage.getItem('recovery_popup_shown');

        if (hasRecoveredCart && !alreadyShown) {
            // Wait a bit for the app to settle
            const timer = setTimeout(() => {
                setShowRecoveryPopup(true);
                sessionStorage.setItem('recovery_popup_shown', 'true');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []); // Run only once on mount

    const addToCart = (product: Product, quantity: number) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === product.id);
            if (existing) {
                const newQuantity = existing.quantity + quantity;
                if (newQuantity <= 0) {
                    return prev.filter(p => p.id !== product.id);
                }
                return prev.map(p => p.id === product.id ? { ...p, quantity: newQuantity } : p);
            }
            if (quantity <= 0) return prev;
            return [...prev, { ...product, quantity }];
        });
        if (activeScreen !== 'cart') {
            setActiveScreen('cart');
        }
    };

    const toggleFavorite = async (id: string) => {
        const isFavorited = favorites.includes(id);

        // guest mode - local only
        if (!isLoggedIn || !session?.user?.id) {
            setFavorites(prev => isFavorited ? prev.filter(fid => id !== fid) : [...prev, id]);
            return;
        }

        // Optimistic update
        setFavorites(prev => isFavorited ? prev.filter(fid => id !== fid) : [...prev, id]);

        let error;
        if (isFavorited) {
            const { error: delError } = await supabase
                .from('user_favorites')
                .delete()
                .eq('user_id', session.user.id)
                .eq('product_id', id);
            error = delError;
        } else {
            const { error: insError } = await supabase
                .from('user_favorites')
                .insert({ user_id: session.user.id, product_id: id });
            error = insError;
        }

        if (error) {
            console.error("Error updating favorite:", error);
            // Rollback optimistic update on error
            setFavorites(prev => isFavorited ? [...prev, id] : prev.filter(fid => id !== fid));
            alert("Erro ao salvar favorito. Certifique-se de que os produtos foram carregados corretamente.");
        }
    };

    const clearCart = () => setCart([]);

    const handleLogout = async () => {
        await signOut();
        setFavorites([]); // Clear favorites on logout
        setActiveScreen('home');
    };

    const renderScreen = () => {
        // Special case: Favorites and Orders require login
        if (!isLoggedIn && (activeScreen === 'favorites' || activeScreen === 'orders')) {
            return <LoginScreen onLogin={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;
        }

        switch (activeScreen) {
            case 'login': return <LoginScreen onLogin={() => setActiveScreen('home')} onRegister={() => setActiveScreen('register')} />;
            case 'register': return <RegisterScreen onBack={() => setActiveScreen('login')} onRegister={() => setActiveScreen('login')} />;
            case 'home': return <HomeScreen onAddToCart={addToCart} favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} featuredProduct={featuredProduct} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => { setSearchCategory('Todos'); setActiveScreen('search'); }} onCategoryClick={(cat) => { setSearchCategory(cat); setActiveScreen('search'); }} />;
            case 'product-details': return selectedProduct ? <ProductDetailsScreen favorites={favorites} onFavoriteToggle={toggleFavorite} product={selectedProduct} onBack={() => setActiveScreen('home')} onAddToCart={addToCart} onSeeCatalog={() => { setSearchCategory('Todos'); setActiveScreen('search'); }} onHome={() => setActiveScreen('home')} /> : <HomeScreen onAddToCart={addToCart} favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} featuredProduct={featuredProduct} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => { setSearchCategory('Todos'); setActiveScreen('search'); }} onCategoryClick={(cat) => { setSearchCategory(cat); setActiveScreen('search'); }} />;
            case 'cart': return <CartScreen onAddToCart={addToCart} onFavoriteToggle={toggleFavorite} favorites={favorites} products={products} cart={cart} onBack={() => setActiveScreen('home')} onClear={clearCart} />;
            case 'search': return <SearchScreen onAddToCart={addToCart} products={products} favorites={favorites} onFavoriteToggle={toggleFavorite} onBack={() => setActiveScreen('home')} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} initialCategory={searchCategory} />;
            case 'favorites': return <FavoritesScreen favorites={favorites} products={products} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onBack={() => setActiveScreen('home')} onFavoriteToggle={toggleFavorite} />;
            case 'profile': return <ProfileScreen isLoggedIn={isLoggedIn} onLoginClick={() => setActiveScreen('login')} onLogout={handleLogout} onOrdersClick={() => setActiveScreen('orders')} onSettingsClick={() => setActiveScreen('settings')} onFavoritesClick={() => setActiveScreen('favorites')} />;
            case 'orders': return <OrdersScreen onBack={() => setActiveScreen('profile')} onAddToCart={addToCart} />;
            case 'settings': return <SettingsScreen onBack={() => setActiveScreen('profile')} />;
            default: return <HomeScreen onAddToCart={addToCart} favorites={favorites} onFavoriteToggle={toggleFavorite} products={products} featuredProduct={featuredProduct} onItemClick={(p) => { setSelectedProduct(p); setActiveScreen('product-details'); }} onSeeAll={() => { setSearchCategory('Todos'); setActiveScreen('search'); }} onCategoryClick={(cat) => { setSearchCategory(cat); setActiveScreen('search'); }} />;
        }
    };

    if (authLoading || productsLoading) {
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

            {!isAuthScreen && activeScreen !== 'product-details' && (
                <BottomNav
                    active={activeScreen}
                    onChange={setActiveScreen}
                    cartCount={cartCount}
                />
            )}

            {/* Cart Recovery Popup */}
            {showRecoveryPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl animate-scale-up border border-primary/10">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="text-primary w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-dark-green text-center mb-3 tracking-tight">Pedido em aberto!</h2>
                        <p className="text-accent-sage text-center mb-8 font-medium leading-relaxed">
                            Você deixou alguns itens deliciosos na sua cesta. Gostaria de finalizar seu pedido agora?
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {
                                    setActiveScreen('cart');
                                    setShowRecoveryPopup(false);
                                }}
                                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all active:scale-[0.98]"
                            >
                                Ver Minha Cesta
                            </button>
                            <button
                                onClick={() => setShowRecoveryPopup(false)}
                                className="w-full bg-gray-50 text-accent-sage py-4 rounded-2xl font-bold text-base hover:bg-gray-100 transition-all active:scale-[0.98]"
                            >
                                Continuar Comprando
                            </button>
                        </div>
                    </div>
                </div>
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
