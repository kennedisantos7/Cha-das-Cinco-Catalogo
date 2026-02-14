import React, { useState, useEffect } from 'react';
import { 
  Home, Search, ShoppingBag, User, Heart, 
  ChevronLeft, Plus, Minus, X, Filter, SlidersHorizontal,
  Compass, Receipt, Settings, LogOut, Camera,
  Share2, Edit3, Trash2, ArrowRight, Menu
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { products, orders, customers } from './data';
import { Product, CartItem, ScreenName } from './types';

// --- Helper Components ---

const TopNav = ({ active, onChange, cartCount, isLoggedIn, onLoginClick }: { 
  active: ScreenName, 
  onChange: (s: ScreenName) => void, 
  cartCount: number,
  isLoggedIn: boolean,
  onLoginClick: () => void 
}) => (
  <nav className="hidden md:flex fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-accent-sage/20 z-50 px-8 py-4 justify-between items-center transition-all duration-300">
    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onChange('home')}>
       <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
         <span className="text-2xl">☕</span>
       </div>
       <div>
         <h1 className="text-xl font-bold text-dark-green tracking-tight leading-none">Chá das Cinco</h1>
         <p className="text-[10px] text-accent-sage font-bold uppercase tracking-widest">Artesanal</p>
       </div>
    </div>
    
    <div className="flex items-center gap-8 font-medium text-accent-sage bg-white/50 px-6 py-2 rounded-full border border-accent-sage/10">
        <button onClick={() => onChange('home')} className={`hover:text-primary transition-colors ${active === 'home' ? 'text-primary font-bold' : ''}`}>Início</button>
        <button onClick={() => onChange('search')} className={`hover:text-primary transition-colors ${active === 'search' ? 'text-primary font-bold' : ''}`}>Cardápio</button>
        <button onClick={() => onChange('favorites')} className={`hover:text-primary transition-colors ${active === 'favorites' ? 'text-primary font-bold' : ''}`}>Favoritos</button>
    </div>

    <div className="flex items-center gap-4">
        <button onClick={() => onChange('cart')} className="relative p-2.5 hover:bg-primary/10 rounded-full transition-colors text-dark-green group">
            <ShoppingBag size={22} className="group-hover:scale-110 transition-transform"/>
            {cartCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">{cartCount}</span>}
        </button>
        {isLoggedIn ? (
            <button onClick={() => onChange('profile')} className="p-2.5 hover:bg-primary/10 rounded-full transition-colors text-dark-green">
                <User size={22} />
            </button>
        ) : (
            <button onClick={onLoginClick} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-105 active:scale-95 transition-all text-sm flex items-center gap-2">
                <User size={18} />
                Entrar
            </button>
        )}
    </div>
  </nav>
);

const BottomNav = ({ active, onChange, cartCount }: { active: ScreenName, onChange: (s: ScreenName) => void, cartCount: number }) => (
  <div className="md:hidden fixed bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-accent-sage/20 pb-8 pt-3 px-6 flex justify-between items-center z-50 rounded-t-[2rem] shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
    <button onClick={() => onChange('home')} className={`flex flex-col items-center gap-1 transition-colors ${active === 'home' ? 'text-primary' : 'text-accent-sage'}`}>
      <Home size={24} />
      <span className="text-[10px] font-bold">Início</span>
    </button>
    <button onClick={() => onChange('search')} className={`flex flex-col items-center gap-1 transition-colors ${active === 'search' ? 'text-primary' : 'text-accent-sage'}`}>
      <Compass size={24} />
      <span className="text-[10px] font-medium">Explorar</span>
    </button>
    <button onClick={() => onChange('cart')} className={`flex flex-col items-center gap-1 transition-colors ${active === 'cart' ? 'text-primary' : 'text-accent-sage'} relative`}>
      <div className="relative">
        <ShoppingBag size={24} />
        {cartCount > 0 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-bordeaux text-white text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
      </div>
      <span className="text-[10px] font-medium">Cesta</span>
    </button>
    <button onClick={() => onChange('profile')} className={`flex flex-col items-center gap-1 transition-colors ${active === 'profile' ? 'text-primary' : 'text-accent-sage'}`}>
      <User size={24} />
      <span className="text-[10px] font-medium">Perfil</span>
    </button>
  </div>
);

const AdminNav = ({ active, onChange }: { active: ScreenName, onChange: (s: ScreenName) => void }) => (
  <div className="fixed bottom-0 w-full md:w-64 md:left-0 md:top-0 md:h-full md:border-r md:flex-col md:justify-start md:items-stretch md:bg-white md:p-6 bg-white/95 backdrop-blur-xl border-t md:border-t-0 border-accent-sage/20 pb-8 pt-3 px-6 md:px-0 flex justify-between md:gap-4 items-center z-50 rounded-t-[2rem] md:rounded-none">
    
    <div className="hidden md:flex items-center gap-3 mb-8 px-2">
       <span className="text-2xl">☕</span>
       <h1 className="text-xl font-bold text-dark-green">Admin</h1>
    </div>

    <button onClick={() => onChange('admin-dashboard')} className={`flex md:flex-row flex-col items-center md:items-center md:gap-3 gap-1 md:px-4 md:py-3 md:rounded-xl md:w-full transition-colors ${active === 'admin-dashboard' ? 'md:bg-primary/10 text-primary' : 'text-accent-sage hover:bg-gray-50'}`}>
      <Home size={24} />
      <span className="text-[10px] md:text-sm font-bold">Início</span>
    </button>
    <button onClick={() => onChange('admin-inventory')} className={`flex md:flex-row flex-col items-center md:items-center md:gap-3 gap-1 md:px-4 md:py-3 md:rounded-xl md:w-full transition-colors ${active === 'admin-inventory' ? 'md:bg-primary/10 text-primary' : 'text-accent-sage hover:bg-gray-50'}`}>
      <ShoppingBag size={24} />
      <span className="text-[10px] md:text-sm font-medium">Itens</span>
    </button>
    <button onClick={() => onChange('admin-customers')} className={`flex md:flex-row flex-col items-center md:items-center md:gap-3 gap-1 md:px-4 md:py-3 md:rounded-xl md:w-full transition-colors ${active === 'admin-customers' ? 'md:bg-primary/10 text-primary' : 'text-accent-sage hover:bg-gray-50'}`}>
      <User size={24} />
      <span className="text-[10px] md:text-sm font-medium">Usuários</span>
    </button>
    
    <div className="md:mt-auto">
      <button onClick={() => onChange('home')} className="flex md:flex-row flex-col items-center md:items-center md:gap-3 gap-1 md:px-4 md:py-3 md:rounded-xl md:w-full text-accent-sage hover:bg-red-50 hover:text-bordeaux transition-colors">
        <LogOut size={24} />
        <span className="text-[10px] md:text-sm font-medium">Sair</span>
      </button>
    </div>
  </div>
);

// --- Screens ---

const LoginScreen = ({ onLogin, onRegister, onGuest, isGuestAllowed = true }: { onLogin: () => void, onRegister: () => void, onGuest: () => void, isGuestAllowed?: boolean }) => (
  <div className="flex flex-col min-h-full items-center justify-center bg-background-cream p-8 relative overflow-hidden w-full">
     <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-soft-pink opacity-20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
     <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary opacity-10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
     
     <div className="w-full max-w-md z-10">
        <div className="mb-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/60 shadow-xl">
              <span className="text-5xl">☕</span>
            </div>
            <h1 className="text-4xl font-bold text-dark-green tracking-tight mb-2">Chá das Cinco</h1>
            <p className="text-accent-sage font-medium uppercase tracking-widest text-xs bg-white/50 px-4 py-1 rounded-full">Artesanal & Delicado</p>
        </div>

        <div className="bg-white/40 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-xl space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-dark-green/60 ml-1">E-mail</label>
              <input className="w-full bg-white/70 border-white border rounded-xl py-3.5 px-5 text-dark-green placeholder-accent-sage/70 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" placeholder="exemplo@email.com" type="email"/>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-dark-green/60 ml-1">Senha</label>
              <input className="w-full bg-white/70 border-white border rounded-xl py-3.5 px-5 text-dark-green placeholder-accent-sage/70 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" placeholder="••••••••" type="password"/>
            </div>
            
            <button onClick={onLogin} className="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all mt-2">
              Entrar
            </button>
            
            {isGuestAllowed && (
                <button onClick={onGuest} className="w-full bg-transparent border-2 border-dark-green/10 text-dark-green font-bold text-sm py-3 rounded-xl hover:bg-dark-green/5 transition-all">
                  Continuar sem login
                </button>
            )}
        </div>

        <p className="text-center text-sm text-dark-green/70 mt-8 cursor-pointer hover:text-primary transition-colors" onClick={onRegister}>
           Não tem uma conta? <span className="text-primary font-bold">Cadastre-se</span>
        </p>
     </div>
  </div>
);

const RegisterScreen = ({ onBack, onRegister }: { onBack: () => void, onRegister: () => void }) => (
  <div className="flex flex-col min-h-full items-center justify-center bg-background-cream p-8 relative w-full">
     <div className="w-full max-w-md">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 text-primary hover:bg-primary/10 rounded-full mb-6">
            <ChevronLeft size={28} />
        </button>
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark-green mb-2">Crie sua Conta</h1>
            <p className="text-accent-sage font-medium">Junte-se à nossa experiência artesanal</p>
        </div>
        <div className="bg-white/40 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-xl space-y-4">
            <input className="w-full bg-white/70 border-white rounded-2xl py-3.5 px-5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder-accent-sage/50" placeholder="Nome Completo" />
            <input className="w-full bg-white/70 border-white rounded-2xl py-3.5 px-5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder-accent-sage/50" placeholder="E-mail" />
            <input className="w-full bg-white/70 border-white rounded-2xl py-3.5 px-5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder-accent-sage/50" placeholder="Senha" type="password" />
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" className="text-primary rounded border-accent-sage focus:ring-primary w-4 h-4" />
              <span className="text-sm text-dark-green/80">Aceito os termos e condições</span>
            </div>
            <button onClick={onRegister} className="w-full bg-primary text-white font-bold text-lg py-4 rounded-2xl shadow-lg mt-4 hover:brightness-105 transition-all">
              Cadastrar agora
            </button>
        </div>
     </div>
  </div>
);

const HomeScreen = ({ products, onItemClick, onSeeAll, onFavoriteToggle, favorites }: { products: Product[], onItemClick: (p: Product) => void, onSeeAll: () => void, onFavoriteToggle: (id: string) => void, favorites: string[] }) => (
  <div className="flex-1 w-full max-w-7xl mx-auto md:px-6 py-6 pb-32">
    <div className="relative w-full md:h-[400px] h-[300px] bg-accent-pink rounded-3xl overflow-hidden mb-8 group cursor-pointer shadow-lg" onClick={() => onItemClick(products[0])}>
       <div className="absolute inset-0 flex items-center p-8 md:p-12 z-10 bg-gradient-to-r from-accent-pink/90 to-transparent">
          <div className="max-w-[80%] md:max-w-[50%] animate-slide-up">
             <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3 block">Padaria Artesanal</span>
             <h2 className="text-3xl md:text-5xl font-extrabold text-dark-green leading-tight mb-4 drop-shadow-sm">{products[0].name}</h2>
             <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-primary/20 transition-all transform hover:scale-105">
               Ver Coleção
             </button>
          </div>
       </div>
       <img src={products[0].image} className="absolute right-0 top-0 h-full w-full md:w-2/3 object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" alt="Hero" />
    </div>

    <div className="mb-10">
       <div className="flex items-center justify-between mb-6 px-4 md:px-0">
          <h3 className="font-bold text-xl md:text-2xl text-dark-green">Categorias</h3>
          <button className="text-primary text-sm font-bold hover:underline" onClick={onSeeAll}>Ver Todas</button>
       </div>
       <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 px-4 md:px-0">
          {['Pães', 'Bolos', 'Chás', 'Biscoitos', 'Salgados'].map((cat, i) => (
             <button key={cat} className="flex flex-col items-center gap-3 min-w-[90px] group transition-all">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${i === 0 ? 'bg-primary text-white shadow-lg scale-105' : 'bg-white border border-accent-sage/20 text-accent-sage group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-md'}`}>
                   <span className="text-2xl md:text-3xl">{i === 0 ? '🥐' : i === 1 ? '🍰' : i === 2 ? '☕' : i === 3 ? '🍪' : '🍕'}</span>
                </div>
                <span className={`text-sm font-bold ${i===0 ? 'text-dark-green' : 'text-accent-sage group-hover:text-dark-green'}`}>{cat}</span>
             </button>
          ))}
       </div>
    </div>

    <div className="px-4 md:px-0">
       <h3 className="font-bold text-xl md:text-2xl mb-6 text-dark-green">Recomendados para Você</h3>
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(product => {
             const isFav = favorites.includes(product.id);
             return (
             <div key={product.id} className="bg-white border border-accent-sage/10 rounded-2xl p-3 md:p-4 shadow-sm flex flex-col group hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4" onClick={() => onItemClick(product)}>
                   <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <button 
                      onClick={(e) => { e.stopPropagation(); onFavoriteToggle(product.id); }}
                      className={`absolute top-2 right-2 w-8 h-8 md:w-10 md:h-10 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 ${isFav ? 'bg-accent-pink text-bordeaux' : 'bg-white/80 text-primary'}`}
                   >
                      <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                   </button>
                </div>
                <h4 className="font-bold text-sm md:text-base mb-1 text-dark-green leading-snug truncate" onClick={() => onItemClick(product)}>{product.name}</h4>
                <p className="text-xs text-accent-sage mb-3">{product.category}</p>
                <div className="flex items-center justify-between mt-auto">
                   <span className="text-primary font-bold text-lg">R$ {product.price.toFixed(2)}</span>
                   <button 
                     onClick={(e) => { e.stopPropagation(); onItemClick(product); }}
                     className="w-8 h-8 md:w-10 md:h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-dark shadow-md transition-colors"
                   >
                      <Plus size={18} />
                   </button>
                </div>
             </div>
          )})}
       </div>
    </div>
  </div>
);

const ProductDetailsScreen = ({ product, onBack, onAddToCart, onFavoriteToggle, favorites }: { product: Product, onBack: () => void, onAddToCart: (p: Product, qty: number) => void, onFavoriteToggle: (id: string) => void, favorites: string[] }) => {
  const [qty, setQty] = useState(1);
  const isFav = favorites.includes(product.id);

  return (
    <div className="flex flex-col h-full bg-background-cream md:bg-gray-50/50 md:flex-row md:items-center md:justify-center md:p-10 animate-fade-in">
       {/* Mobile Layout Wrapper / Desktop Modal-like Card */}
       <div className="flex flex-col h-full md:h-auto md:max-h-[85vh] md:w-full md:max-w-6xl md:bg-white md:rounded-3xl md:shadow-2xl md:overflow-hidden md:flex-row relative">
         
         <div className="md:hidden absolute top-4 left-6 right-6 flex justify-between z-20">
             <button onClick={onBack} className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur rounded-full shadow-sm text-dark-green"><ChevronLeft size={24}/></button>
             <div className="flex gap-3">
                <button onClick={() => onFavoriteToggle(product.id)} className={`w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur rounded-full shadow-sm ${isFav ? 'text-bordeaux' : 'text-accent-pink'}`}><Heart fill={isFav ? "currentColor" : "none"} size={24}/></button>
                <button className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur rounded-full shadow-sm text-dark-green"><Share2 size={24}/></button>
             </div>
         </div>

         {/* Image Section */}
         <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-full bg-gray-200 group overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            
            {/* Desktop Back Button */}
            <button onClick={onBack} className="hidden md:flex absolute top-6 left-6 w-12 h-12 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg text-dark-green transition-all transform hover:scale-105 z-10">
              <ChevronLeft size={28}/>
            </button>
         </div>

         {/* Details Section */}
         <div className="flex-1 flex flex-col bg-background-cream md:bg-white relative rounded-t-3xl md:rounded-none -mt-6 md:mt-0 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] md:shadow-none z-10">
            <div className="flex-1 px-6 md:px-10 py-8 md:py-10 overflow-y-auto pb-32 md:pb-10 custom-scrollbar">
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary/80 bg-primary/10 px-2 py-1 rounded-md">{product.category}</span>
                    <span className="flex items-center gap-1 text-xs font-medium text-dark-green/60">
                        <span className="text-yellow-500">★</span> {product.rating} ({product.reviews} avaliações)
                    </span>
                  </div>
                  
                  {/* Desktop Actions */}
                  <div className="hidden md:flex gap-3">
                      <button onClick={() => onFavoriteToggle(product.id)} className={`w-12 h-12 flex items-center justify-center rounded-full border ${isFav ? 'bg-accent-pink border-accent-pink text-bordeaux' : 'border-gray-200 hover:bg-gray-50 text-gray-400'}`}>
                        <Heart fill={isFav ? "currentColor" : "none"} size={22}/>
                      </button>
                      <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 text-dark-green">
                        <Share2 size={22}/>
                      </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-primary leading-tight mb-2">{product.name}</h1>
                  <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-dark-green">R$ {product.price.toFixed(2)}</span>
                      <span className="text-sm text-dark-green/60 font-medium">/ {product.unit}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-dark-green/40 mb-3">Descrição</h3>
                  <p className="text-dark-green leading-relaxed font-medium text-lg opacity-90">{product.description}</p>
                </div>

                <div className="mb-8 md:mb-0">
                  <div className="flex items-center gap-2 mb-4">
                      <Edit3 size={18} className="text-primary"/>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-dark-green/40">Observações</h3>
                  </div>
                  <textarea className="w-full h-32 p-4 rounded-xl border border-accent-sage/20 bg-white md:bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent text-dark-green placeholder:text-dark-green/30 resize-none font-medium transition-all" placeholder="Ex: Retirar azeitonas, caprichar no molho..."></textarea>
                </div>

            </div>

            {/* Bottom Action Bar */}
            <div className="md:relative fixed bottom-0 w-full p-6 bg-white/90 md:bg-white backdrop-blur border-t md:border-none border-dark-green/5 z-[60] md:z-auto">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="flex items-center bg-gray-100 p-1.5 rounded-xl">
                      <button onClick={() => setQty(Math.max(1, qty-1))} className="w-12 h-12 flex items-center justify-center rounded-lg bg-white text-dark-green shadow-sm hover:shadow-md transition-all"><Minus size={20}/></button>
                      <span className="w-12 text-center font-bold text-dark-green text-xl">{qty}</span>
                      <button onClick={() => setQty(qty+1)} className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary text-white shadow-sm hover:brightness-110 transition-all"><Plus size={20}/></button>
                  </div>
                  <button onClick={() => onAddToCart(product, qty)} className="flex-1 h-14 md:h-16 bg-dark-green hover:bg-dark-green/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-dark-green/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
                      <ShoppingBag size={22}/>
                      <span>Adicionar à Cesta</span>
                  </button>
                </div>
            </div>

         </div>
       </div>
    </div>
  );
};

const CartScreen = ({ cart, onBack, onClear }: { cart: CartItem[], onBack: () => void, onClear: () => void }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const handleCheckout = () => {
      // Simulate WhatsApp checkout
      const message = `Olá, gostaria de fazer um pedido:\n\n${cart.map(i => `${i.quantity}x ${i.name}`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`;
      alert(`Redirecionando para WhatsApp com a mensagem:\n\n${message}`);
  };

  return (
    <div className="flex flex-col h-full bg-background-cream md:bg-gray-50 items-center justify-center md:py-10">
       <div className="w-full h-full md:max-w-4xl md:h-auto md:bg-white md:rounded-3xl md:shadow-xl md:overflow-hidden flex flex-col md:flex-row">
           
           <div className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="sticky top-0 z-10 bg-background-cream/95 md:bg-white/95 backdrop-blur-md px-6 py-6 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors md:hidden"><ChevronLeft size={24}/></button>
                        <h1 className="text-2xl font-bold text-dark-green">Sua Cesta</h1>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">{cart.length} itens</span>
                    </div>
                    {cart.length > 0 && <button onClick={onClear} className="text-sm font-bold text-bordeaux hover:bg-bordeaux/10 px-3 py-1.5 rounded-lg transition-colors">Limpar</button>}
                </header>
                
                <main className="flex-grow px-6 py-4 space-y-4 overflow-y-auto pb-64 md:pb-6 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 md:h-96 opacity-50">
                            <ShoppingBag size={64} className="mb-4 text-dark-green"/>
                            <p className="text-lg font-medium text-dark-green">Sua cesta está vazia</p>
                            <button onClick={onBack} className="mt-4 text-primary font-bold hover:underline">Continuar comprando</button>
                        </div>
                    ) : (
                        cart.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="bg-white p-4 rounded-2xl flex items-center gap-5 shadow-sm border border-gray-100 hover:border-primary/20 transition-colors">
                            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg text-dark-green leading-tight truncate pr-4">{item.name}</h3>
                                    <span className="font-bold text-primary whitespace-nowrap">R$ {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                <p className="text-sm text-accent-sage font-medium mb-3">{item.category}</p>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                        R$ {item.price.toFixed(2)} un.
                                    </div>
                                    <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                        <span className="text-sm font-bold text-dark-green px-3">Qtd: {item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))
                    )}
                    {cart.length > 0 && (
                        <div className="mt-8 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-bold text-dark-green mb-3 px-1">
                                <Edit3 size={16} className="text-primary"/>
                                Observações do Pedido
                            </label>
                            <textarea className="w-full bg-gray-50 border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 transition-all" placeholder="Ex: Entregar na portaria, campainha não funciona..." rows={2}></textarea>
                        </div>
                    )}
                </main>
           </div>

           {/* Checkout Sidebar/Footer */}
           {cart.length > 0 && (
            <div className="md:w-[350px] bg-white md:border-l border-gray-100 md:bg-gray-50/50 p-8 flex flex-col justify-center shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)] md:shadow-none z-10">
                <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-bold text-dark-green mb-4 hidden md:block">Resumo</h3>
                    <div className="flex justify-between text-dark-green/70 text-sm"><span>Subtotal</span><span>R$ {total.toFixed(2)}</span></div>
                    <div className="flex justify-between text-dark-green/70 text-sm"><span>Taxa de Entrega</span><span className="text-primary font-bold">Grátis</span></div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between text-dark-green pt-2"><span className="text-lg font-bold">Total</span><span className="text-2xl font-extrabold text-primary">R$ {total.toFixed(2)}</span></div>
                </div>
                <button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 text-white font-bold text-lg">
                    <span>Finalizar no WhatsApp</span>
                    <ArrowRight size={20}/>
                </button>
                <p className="text-center text-xs text-gray-400 mt-4 px-4 leading-relaxed">
                    Ao clicar, você será redirecionado para o WhatsApp da loja com os detalhes do seu pedido preenchidos.
                </p>
            </div>
           )}
       </div>
    </div>
  );
};

const ProfileScreen = ({ isLoggedIn, onLoginClick, onLogout, onAdminClick }: { isLoggedIn: boolean, onLoginClick: () => void, onLogout: () => void, onAdminClick: () => void }) => {
    
    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-background-cream">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-md text-primary animate-bounce">
                    <User size={40} />
                </div>
                <h2 className="text-2xl font-bold text-dark-green mb-2">Faça Login</h2>
                <p className="text-accent-sage mb-8 max-w-xs">Acesse seu perfil para ver seus pedidos anteriores e itens favoritos.</p>
                <button onClick={onLoginClick} className="bg-primary text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:brightness-105 transition-all">
                    Entrar ou Cadastrar
                </button>
            </div>
        )
    }

    return (
        <div className="bg-background-cream md:bg-gray-50 h-full overflow-y-auto pb-32">
            <div className="w-full max-w-4xl mx-auto md:py-10">
                <div className="bg-white md:rounded-3xl shadow-sm md:shadow-xl overflow-hidden">
                    <div className="h-32 bg-primary/10 w-full relative">
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0">
                            <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJZ9LPPKoMwWduMbPAaemL7dB1orifC6wOA56CVMtaLGY5hQGUc4EzUOzHLjjVF58f-oH0r7ZTyaQo0xi_metM6ZfdxKZQ1Lk7-adWM_dCAcW6y0bKLn4J011ufPwX9KfUFtmgG8aOv8C0pQgEeqPRdL3lL-uHP5wl9DGNyu97Qah9kdnT54-x2DWGbSGOnC3JFaplC2fw0tiP97Lv5QPnXICi2XrPDu4SAm2vQOKx0BbzI0qmFUloZ6o1b4TiRdtPk8nKbqsU0rhg" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-20 pb-8 px-6 text-center md:text-left md:flex md:justify-between md:items-end md:px-10">
                        <div>
                            <h1 className="text-2xl font-bold text-dark-green">Marina Silva</h1>
                            <p className="text-accent-sage text-sm font-medium">marina.silva@email.com</p>
                        </div>
                        <button onClick={onAdminClick} className="mt-4 md:mt-0 bg-dark-green hover:bg-dark-green/90 text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-md text-sm">
                            Painel Administrativo
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 border-t border-gray-100">
                         {['Meus Pedidos', 'Endereços', 'Favoritos', 'Configurações'].map((item, i) => (
                            <div key={item} className="bg-white p-6 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-white group-hover:shadow-sm flex items-center justify-center text-primary transition-all">
                                    {i === 0 ? <Receipt size={22}/> : i === 1 ? <Compass size={22}/> : i === 2 ? <Heart size={22}/> : <Settings size={22}/>}
                                    </div>
                                    <span className="font-bold text-dark-green text-lg">{item}</span>
                                </div>
                                <div className="text-gray-300 group-hover:text-primary transition-colors">
                                    <ArrowRight size={20}/>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-gray-50">
                         <button onClick={onLogout} className="flex items-center gap-2 text-bordeaux font-bold hover:underline">
                            <LogOut size={20}/>
                            Sair da conta
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SearchScreen = ({ onBack, onItemClick }: { onBack: () => void, onItemClick: (p: Product) => void }) => {
  const [showFilter, setShowFilter] = useState(false);
  
  return (
    <div className="h-full bg-background-cream md:bg-gray-50 flex flex-col pt-20 md:pt-24 pb-20">
       <div className="w-full max-w-7xl mx-auto px-6 h-full flex flex-col">
            <header className="mb-6 flex items-center gap-4">
                <div className="relative flex-grow max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search size={22} className="text-accent-sage"/></div>
                    <input autoFocus className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent focus:border-primary focus:ring-0 rounded-2xl text-dark-green placeholder-accent-sage/70 transition-all shadow-sm text-lg" placeholder="O que você procura hoje?" type="text"/>
                </div>
                <button onClick={() => setShowFilter(true)} className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-dark-green"><SlidersHorizontal size={24} /></button>
            </header>
            
            <section className="mb-8 overflow-x-auto hide-scrollbar">
                <div className="flex space-x-3 pb-2">
                    <button className="flex-shrink-0 px-6 py-2.5 bg-primary text-white rounded-full font-bold shadow-md shadow-primary/20 text-sm hover:scale-105 transition-transform">Todos</button>
                    <button className="flex-shrink-0 px-6 py-2.5 bg-white text-dark-green font-bold rounded-full shadow-sm text-sm hover:bg-gray-50 border border-gray-100">Pães</button>
                    <button className="flex-shrink-0 px-6 py-2.5 bg-white text-dark-green font-bold rounded-full shadow-sm text-sm hover:bg-gray-50 border border-gray-100">Bolos</button>
                    <button className="flex-shrink-0 px-6 py-2.5 bg-white text-dark-green font-bold rounded-full shadow-sm text-sm hover:bg-gray-50 border border-gray-100">Sem Glúten</button>
                </div>
            </section>
            
            <main className="flex-1 overflow-y-auto hide-scrollbar md:pr-2 custom-scrollbar">
                <h2 className="text-xl font-bold text-dark-green mb-6">Resultados</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map(p => (
                        <div key={p.id} onClick={() => onItemClick(p)} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer group transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-dark-green text-sm md:text-base truncate mb-1">{p.name}</h3>
                                <p className="text-xs text-accent-sage font-medium mb-3">{p.category}</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-primary text-lg">R$ {p.price.toFixed(2)}</span>
                                    <button className="w-8 h-8 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-colors text-dark-green"><Plus size={18}/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
       </div>
       
       {showFilter && (
          <div className="fixed inset-0 z-[60] flex flex-col justify-end md:justify-center md:items-center bg-black/40 backdrop-blur-sm animate-fade-in">
             <div className="bg-background-cream w-full md:w-[500px] md:rounded-3xl rounded-t-[3rem] flex flex-col max-h-[90%] md:max-h-[80vh] shadow-2xl animate-slide-up">
                <div className="md:hidden w-10 h-1 bg-gray-300 rounded-full mx-auto my-3"></div>
                <div className="px-8 pt-4 pb-6 flex justify-between items-center border-b border-accent-sage/20">
                   <h2 className="text-2xl font-bold text-dark-green tracking-tight">Filtros</h2>
                   <button onClick={() => setShowFilter(false)} className="w-8 h-8 rounded-full bg-accent-sage/10 flex items-center justify-center text-dark-green hover:bg-accent-sage/20"><X size={20}/></button>
                </div>
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
                   <section>
                      <h3 className="text-dark-green font-bold text-lg mb-4">Categorias</h3>
                      <div className="flex flex-wrap gap-2">
                         <span className="px-4 py-2 rounded-full bg-primary text-white font-bold text-sm shadow-md">Pães Artesanais</span>
                         <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-dark-green font-medium text-sm hover:bg-gray-50 cursor-pointer">Doces</span>
                         <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-dark-green font-medium text-sm hover:bg-gray-50 cursor-pointer">Bebidas</span>
                      </div>
                   </section>
                   <div className="h-px bg-accent-sage/20"></div>
                   <section>
                      <div className="flex justify-between items-center mb-6">
                         <h3 className="text-dark-green font-bold text-lg">Faixa de Preço</h3>
                         <span className="text-dark-green font-bold bg-white px-3 py-1 rounded-lg text-sm shadow-sm border border-gray-100">R$ 15 — R$ 85</span>
                      </div>
                      <input type="range" className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                   </section>
                </div>
                <div className="p-8 border-t border-accent-sage/20 bg-white/50 flex items-center gap-6">
                   <button onClick={() => setShowFilter(false)} className="text-bordeaux font-bold text-sm tracking-wide shrink-0 hover:underline">Limpar</button>
                   <button onClick={() => setShowFilter(false)} className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-105 transition-all">Ver Resultados</button>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};

// Admin Components (Simplified for brevity, wrapped in container)
const AdminContainer = ({ children }: { children?: React.ReactNode }) => (
    <div className="h-full bg-gray-50 overflow-y-auto pb-32 md:pb-0 p-6 md:pl-72 pt-20">
        {children}
    </div>
);

const AdminDashboard = () => {
   const data = [
      { name: 'Seg', value: 400 },
      { name: 'Ter', value: 300 },
      { name: 'Qua', value: 600 },
      { name: 'Qui', value: 800 },
      { name: 'Sex', value: 500 },
      { name: 'Sab', value: 900 },
      { name: 'Dom', value: 700 },
   ];

   return (
      <AdminContainer>
         <header className="flex items-center justify-between mb-8">
            <div>
               <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Visão Geral</p>
               <h1 className="text-3xl font-bold text-slate-900">Bom dia, Admin</h1>
            </div>
         </header>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 font-bold text-sm">Vendas Hoje</span>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">$</div>
               </div>
               <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">R$ 1.482</span>
                  <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full">+12%</span>
               </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 font-bold text-sm">Pedidos Pendentes</span>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">#</div>
               </div>
               <span className="text-3xl font-bold text-slate-900">24</span>
            </div>
         </div>

         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 h-80">
            <h3 className="font-bold text-slate-800 mb-6">Vendas da Semana</h3>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                    <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                    <Line type="monotone" dataKey="value" stroke="#4ca99d" strokeWidth={4} dot={{r: 4, fill: '#4ca99d'}} />
                </LineChart>
            </ResponsiveContainer>
         </div>
      </AdminContainer>
   );
};

const AdminInventory = () => (
   <AdminContainer>
      <header className="mb-8">
         <h1 className="text-3xl font-bold text-slate-900">Estoque</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {products.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
               <img src={p.image} className="w-16 h-16 rounded-lg object-cover" alt={p.name} />
               <div>
                  <h3 className="font-bold text-slate-900">{p.name}</h3>
                  <p className="text-sm text-slate-500">{p.stock} unidades</p>
               </div>
            </div>
         ))}
      </div>
   </AdminContainer>
);

const AdminCustomers = () => (
   <AdminContainer>
      <header className="mb-8">
         <h1 className="text-3xl font-bold text-slate-900">Clientes</h1>
      </header>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
         {customers.map((c, i) => (
            <div key={c.id} className={`p-6 flex items-center gap-4 ${i !== customers.length - 1 ? 'border-b border-gray-100' : ''}`}>
               <img src={c.avatar} className="w-12 h-12 rounded-full" alt={c.name} />
               <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{c.name}</h3>
                  <p className="text-sm text-slate-500">{c.email}</p>
               </div>
               <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{c.status}</span>
            </div>
         ))}
      </div>
   </AdminContainer>
);

// --- Main App Component ---

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
    // Optional: Auto open cart or show toast. For now, navigating to cart is fine for mobile flow.
    // For Desktop, maybe just stay? Let's go to cart for clarity.
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
    switch(activeScreen) {
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
             <AdminNav active={activeScreen} onChange={setActiveScreen} />
          )}
       </div>
    </div>
  );
};

export default App;
