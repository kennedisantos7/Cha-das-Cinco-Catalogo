import { Product, Order, Customer } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Pão de Fermentação Natural',
    description: 'Pão rústico de fermentação natural recém-assado, com crosta crocante e miolo macio e aerado.',
    price: 12.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9FtpTO0rA23tCJ6tpbUYPBk8gcubkmty7BB4i3dmiivLT0zrHv4hcRrd0w17s9cCwC3DxpPVhqcNDLqwjODDoLa1fRvJCjnjh9fFZd-Zci7qW6sbmm9OEagv6zOeyy2ch7CwGHuI36cg9eYpT82ZBXvLvJVn0PupvxDSySu1iPD2v4HLcz3vk3rGC50plNGVDmUcQDySnZsfukS6EFRQeiPob-2SNkLK5rSJHdHrWvHg80mvxChLiGrahM8ryJJZNfvwkkLQIaEQI',
    category: 'Pães',
    rating: 4.8,
    reviews: 85,
    stock: 24,
    unit: 'Pão'
  },
  {
    id: '2',
    name: 'Croissant Clássico',
    description: 'Croissant francês amanteigado e folhado, assado fresco todas as manhãs.',
    price: 4.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa4z29QVmwZ7bvszVs9u1yTa6flvHrrz08AgKSEOrOObovWC5duilexxXsAkfREZqZI6cpNRpSr-8mGXR3mK01Cmd8I8jPxypQd4hHcfNg3hOKqDrKIPGWHE13wAL_aXcc3gEGi1ZLDyRZEzCxeE8znhkZ2Abymrp5Ixhz4-th3QudIRZQIS-qpv5prYsDFnh6Bi4ojwmiyeQgBmIV8pcXbrlnYHVf-NL1utpuevwxNEgwhYu8HKmJefRKExmby8NROu5LD7MvOgIS',
    category: 'Folhados',
    rating: 4.9,
    reviews: 124,
    stock: 3,
    unit: 'Unidade'
  },
  {
    id: '3',
    name: 'Fatia de Ganache Meio Amargo',
    description: 'Fatia de bolo de ganache de chocolate úmido feito com 70% de chocolate belga.',
    price: 6.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE7zTFAkSdc96c_kNLicrCXnUqHPmRPB0QkcYPlNKOda4EVUorqNDBMNXvcxtFPILYtUQX6nHIXmg_ioRNz1coPIU3jCtf5ipmyhvqo072RiKvORJ8mYujQYAuC3moZQDiPjGq5Iz971OC14H4sMmfgyO9MNnMlV7eKXXeriD_2xtwn0FFYedDbZOWUQX2gz8PGgz7cY3-26jgAGBnKyqFMuUuOLTmUEzTFiIW_6mVmxSWK15hDZDtxf0o3ZaQScl6N8Z8iBjB0GP7',
    category: 'Bolos',
    rating: 5.0,
    reviews: 42,
    stock: 12,
    unit: 'Fatia'
  },
  {
    id: '4',
    name: 'Pão Multigrãos da Fazenda',
    description: 'Pão artesanal integral repleto de sementes e nutrientes.',
    price: 7.25,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWYBOqV0i95Nkss6SAqCpE4S78iEW0DUu6ztn5ylVgC48FpEMv-m4Evgn6CFQP8x_HIuainRMi4ricnjhyWdgxu8048hEWl3XhcI1qyeSG8_gEajbzgm4PKWTAcFW2mQT1NANrcrFi-Qc9WROjiVo-T1kHOzz_MiCOKxGDKOPb2px6ynC_OyRCOSv4YPvalHLe1LwrxgB3MJNseeJBZnPsclhyjPZRBkze6nVLR1jChX6cgi_cOWb8Z77Tqn5ZBAa7-S0BcWNA1XAd',
    category: 'Pães',
    rating: 4.7,
    reviews: 30,
    stock: 15,
    unit: 'Pão'
  },
  {
    id: '5',
    name: 'Chá English Breakfast',
    description: 'Xícara fumegante de chá English Breakfast, perfeito para começar o dia.',
    price: 3.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrWyZSfd77s9IFHspduPLohtnqyeEzsilFmXBYpF3MQYKW9BPubiIOmL0-DIkNQjOwpGMnFr5hLiQIbmDsGYkESOgmuksp2NXiOoLCj8YRONskfdyXvdgwWOVout6nXGJuzouZFVYMJGyFtXi_M8r2dWMaWgjt7LvaTkwOJkaO2JxIZAS3IQtRfLYWsddlCTqYT_2EZ0NedI4NFrHk39Ac4Hl_3mpVu8zAsQ3kzwZbIfcHfOK0oTafo3G5OIub4bKgqY74qzA-uq_4',
    category: 'Chás',
    rating: 4.6,
    reviews: 56,
    stock: 100,
    unit: 'Xícara'
  },
  {
    id: '6',
    name: 'Bolo de Frutas Vermelhas',
    description: 'Massa amanteigada leve e aerada, harmonizada com um recheio generoso de frutas vermelhas frescas.',
    price: 85.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeRaG_0b5JNxr7mD_qPCitJBlIf5cspb-gxX5Fl2W09OayOXRpBj93OHB8u1dVsTfut8QvgZNefZ9FVRUq8YKWh4iDHq6jIg7v2EtiVlx-yrqVNDVGTN35b2q1LTHUUubKPpnK2GLGrt-ACAkAJd9VyfXXpKw8TlOWLrB4cglp162cWmiDMxQROJ55rKDwvqyJgZotyA4rPAJYyzClJHccBUy0Kf7K1zqXXEcT39xhoRafonVtOeD-tavRpFFVj9LPcNcIpOOOX21_',
    category: 'Bolos',
    rating: 4.9,
    reviews: 124,
    stock: 5,
    unit: 'Bolo Inteiro'
  },
  {
    id: '7',
    name: 'Chá de Hibisco e Frutas',
    description: 'Infusão Natural (500ml) refrescante e deliciosa.',
    price: 14.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc-g3NNVlrgyU6Xm_fsRL5M-QukCTuijR5jZGNlNsOiGXUiQPGRvpt7wmzYjHY7UO4C2B1gxjmtyqaQtefijE29QcEQjG1MhJOYZkUWBlq1kiX81oHExsQ8xKOIgfKbiXK7QT09bpiPs4LK7sNja3ifGK-Tgr5xMdfIedE3E0eRQFNPZBWVJxzo-D8Yp0tgTFDaTrP2kOvumefpHW5zEr2LOlzWOi57Pl9CCUd8APAGYSOLGWypHZXph4bEJ7rYZsO8eRyKXy0X1eW',
    category: 'Chás',
    rating: 4.8,
    reviews: 92,
    stock: 50,
    unit: 'Garrafa'
  },
  {
      id: '8',
      name: 'Muffin de Mirtilo',
      description: 'Muffin fofinho repleto de mirtilos frescos e uma cobertura crocante de açúcar.',
      price: 5.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa4z29QVmwZ7bvszVs9u1yTa6flvHrrz08AgKSEOrOObovWC5duilexxXsAkfREZqZI6cpNRpSr-8mGXR3mK01Cmd8I8jPxypQd4hHcfNg3hOKqDrKIPGWHE13wAL_aXcc3gEGi1ZLDyRZEzCxeE8znhkZ2Abymrp5Ixhz4-th3QudIRZQIS-qpv5prYsDFnh6Bi4ojwmiyeQgBmIV8pcXbrlnYHVf-NL1utpuevwxNEgwhYu8HKmJefRKExmby8NROu5LD7MvOgIS',
      category: 'Bolos',
      rating: 4.5,
      reviews: 45,
      stock: 18,
      unit: 'Unidade'
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