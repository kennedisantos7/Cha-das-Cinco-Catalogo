import { Product, Order, Customer } from '../types/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Pão de Fermentação Natural',
    description: 'Pão rústico de fermentação natural recém-assado, com crosta crocante e miolo macio e aerado.',
    price: 12.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9FtpTO0rA23tCJ6tpbUYPBk8gcubkmty7BB4i3dmiivLT0zrHv4hcRrd0w17s9cCwC3DxpPVhqcNDLqwjODDoLa1fRvJCjnjh9fFZd-Zci7qW6sbmm9OEagv6zOeyy2ch7CwGHuI36cg9eYpT82ZBXvLvJVn0PupvxDSySu1iPD2v4HLcz3vk3rGC50plNGVDmUcQDySnZsfukS6EFRQeiPob-2SNkLK5rSJHdHrWvHg80mvxChLiGrahM8ryJJZNfvwkkLQIaEQI',
    category: 'SEM GLÚTEN',
    stock: 24,
    unit: 'Pão',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB9FtpTO0rA23tCJ6tpbUYPBk8gcubkmty7BB4i3dmiivLT0zrHv4hcRrd0w17s9cCwC3DxpPVhqcNDLqwjODDoLa1fRvJCjnjh9fFZd-Zci7qW6sbmm9OEagv6zOeyy2ch7CwGHuI36cg9eYpT82ZBXvLvJVn0PupvxDSySu1iPD2v4HLcz3vk3rGC50plNGVDmUcQDySnZsfukS6EFRQeiPob-2SNkLK5rSJHdHrWvHg80mvxChLiGrahM8ryJJZNfvwkkLQIaEQI']
  },
  {
    id: '2',
    name: 'Baguete Artesanal',
    description: 'Baguete crocante por fora e macia por dentro, ideal para sanduíches e antepastos.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddf13da?w=800&auto=format&fit=crop&q=60',
    category: 'TRADICIONAIS',
    stock: 15,
    unit: 'Unidade',
    images: []
  },
  {
    id: '3',
    name: 'Croissant Recheado',
    description: 'Massa folhada amanteigada com recheio cremoso de chocolate belga.',
    price: 9.90,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=60',
    category: 'SEM GLÚTEN FOLHEADOS',
    stock: 12,
    unit: 'Unidade',
    images: []
  },
  {
    id: '4',
    name: 'Combo Especial Café',
    description: 'Kit completo para seu café da tarde com pães, bolos e frios selecionados.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60',
    category: 'KIT',
    stock: 6,
    unit: 'Kit',
    images: []
  },
  {
    id: '5',
    name: 'Mix de Pães de Queijo',
    description: 'Pão de queijo tradicional feito com queijo canastra meia cura, crocante por fora e puxa-puxa por dentro.',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc3605e?w=800&auto=format&fit=crop&q=60',
    category: 'LANCHINHOS',
    stock: 50,
    unit: 'Porção',
    images: []
  },
  {
    id: '6',
    name: 'Esfiha de Carne',
    description: 'Esfiha aberta tradicional com tempero sírio autêntico e massa leve.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1628113310821-91a2d5961984?w=800&auto=format&fit=crop&q=60',
    category: 'ESFIHA',
    stock: 30,
    unit: 'Unidade',
    images: []
  },
  {
    id: '7',
    name: 'Sonho de Doce de Leite',
    description: 'Massa leve e fofinha recheada com doce de leite artesanal.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=800&auto=format&fit=crop&q=60',
    category: 'SONHOS',
    stock: 18,
    unit: 'Unidade',
    images: []
  },
  {
    id: '8',
    name: 'Pamonha Assada',
    description: 'Pamonha de milho verde de verdade, assada na palha com queijo coalho.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&auto=format&fit=crop&q=60',
    category: 'PAMONHAS',
    stock: 10,
    unit: 'Unidade',
    images: []
  }
];

export const orders: Order[] = [
  {
    id: '1',
    date: '2023-11-01',
    status: 'Entregue',
    total: 55.00,
    items: ['Pão de Fermentação Natural', 'Bolo de Frutas Vermelhas'],
    image: products[0].image
  },
  {
    id: '2',
    date: '2023-11-05',
    status: 'Preparando',
    total: 25.00,
    items: ['Chá English Breakfast', 'Croissant Clássico'],
    image: products[4].image
  }
];

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Marina Silva',
    email: 'marina.silva@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJZ9LPPKoMwWduMbPAaemL7dB1orifC6wOA56CVMtaLGY5hQGUc4EzUOzHLjjVF58f-oH0r7ZTyaQo0xi_metM6ZfdxKZQ1Lk7-adWM_dCAcW6y0bKLn4J011ufPwX9KfUFtmgG8aOv8C0pQgEeqPRdL3lL-uHP5wl9DGNyu97Qah9kdnT54-x2DWGbSGOnC3JFaplC2fw0tiP97Lv5QPnXICi2XrPDu4SAm2vQOKx0BbzI0qmFUloZ6o1b4TiRdtPk8nKbqsU0rhg',
    status: 'Ativo',
    ordersCount: 12
  },
  {
    id: '2',
    name: 'João Souza',
    email: 'joao.souza@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9FtpTO0rA23tCJ6tpbUYPBk8gcubkmty7BB4i3dmiivLT0zrHv4hcRrd0w17s9cCwC3DxpPVhqcNDLqwjODDoLa1fRvJCjnjh9fFZd-Zci7qW6sbmm9OEagv6zOeyy2ch7CwGHuI36cg9eYpT82ZBXvLvJVn0PupvxDSySu1iPD2v4HLcz3vk3rGC50plNGVDmUcQDySnZsfukS6EFRQeiPob-2SNkLK5rSJHdHrWvHg80mvxChLiGrahM8ryJJZNfvwkkLQIaEQI',
    status: 'Inativo',
    ordersCount: 2
  }
];