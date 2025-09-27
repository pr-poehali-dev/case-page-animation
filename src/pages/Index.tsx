import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

function Index() {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Минималистичная ваза",
      price: 3500,
      image: "/img/3e3b5a28-8de9-40c6-a095-cf1ca79ec721.jpg",
      description: "Элегантная керамическая ваза для современного интерьера",
      category: "Декор"
    },
    {
      id: 2,
      name: "Дизайнерская лампа",
      price: 8900,
      image: "/img/1ff2ac2b-57d6-44ec-8557-fc81c95d4dd4.jpg", 
      description: "Настольная лампа с LED подсветкой",
      category: "Освещение"
    },
    {
      id: 3,
      name: "Органайзер для стола",
      price: 2100,
      image: "/img/dc0445e7-8346-4cc6-b8b3-b165923d4605.jpg",
      description: "Функциональный органайзер из натурального дерева",
      category: "Организация"
    },
    {
      id: 4,
      name: "Керамическая кружка",
      price: 1200,
      image: "/img/3e3b5a28-8de9-40c6-a095-cf1ca79ec721.jpg",
      description: "Handmade керамическая кружка для кофе",
      category: "Посуда"
    },
    {
      id: 5,
      name: "Текстильная подушка",
      price: 2800,
      image: "/img/1ff2ac2b-57d6-44ec-8557-fc81c95d4dd4.jpg",
      description: "Декоративная подушка из натуральных тканей",
      category: "Текстиль"
    },
    {
      id: 6,
      name: "Деревянная разделочная доска",
      price: 1800,
      image: "/img/dc0445e7-8346-4cc6-b8b3-b165923d4605.jpg",
      description: "Разделочная доска из массива дуба",
      category: "Кухня"
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-black">STORE</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Главная</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Каталог</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">О нас</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Контакты</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10"
                />
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <Icon name="ShoppingCart" size={20} />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-black mb-6 animate-fade-in">
            Минималистичный дизайн
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Откройте для себя коллекцию современных товаров с чистыми линиями и продуманной функциональностью
          </p>
          <Button size="lg" className="text-lg px-8">
            Посмотреть каталог
          </Button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-black mb-12 text-center">Наши товары</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in border-gray-100" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-semibold text-black">{product.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(product.id)}
                      className="shrink-0"
                    >
                      <Icon
                        name={favorites.includes(product.id) ? "Heart" : "Heart"}
                        size={18}
                        className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                      />
                    </Button>
                  </div>
                  <CardDescription className="text-gray-600 mb-4">
                    {product.description}
                  </CardDescription>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-black">
                      {product.price.toLocaleString()} ₽
                    </span>
                    <Button 
                      onClick={() => addToCart(product)}
                      className="hover:scale-105 transition-transform"
                    >
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Корзина</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center">Корзина пуста</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 pb-4 border-b">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-gray-600 text-sm">{item.quantity} × {item.price.toLocaleString()} ₽</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Итого:</span>
                  <span className="text-lg font-bold">{cartTotal.toLocaleString()} ₽</span>
                </div>
                <Button className="w-full" size="lg">
                  Оформить заказ
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;