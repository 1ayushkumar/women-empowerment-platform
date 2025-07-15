import { useState  } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  HeartIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  SparklesIcon,
  ComputerDesktopIcon,
  GiftIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Map()); // Map to store product ID and quantity
  const [showCartModal, setShowCartModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [messageData, setMessageData] = useState({
    message: '',
    contactInfo: ''
  });

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'fashion', label: 'Fashion & Accessories' },
    { id: 'beauty', label: 'Beauty & Wellness' },
    { id: 'tech', label: 'Technology' },
    { id: 'food', label: 'Food & Beverages' },
    { id: 'home', label: 'Home & Garden' },
    { id: 'jewelry', label: 'Jewelry & Accessories' },
    { id: 'art', label: 'Art & Crafts' }
  ];

  const sortOptions = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'recent', label: 'Recently Added' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Highest Rated' }
  ];

  const products = [
    {
      id: 1,
      name: 'Eco-Friendly Tote Bag',
      category: 'fashion',
      price: 2999,
      rating: 4.8,
      reviews: 124,
      seller: 'EcoStyle Fashion',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center',
      description: 'Handcrafted sustainable tote bag made from recycled materials.',
      tags: ['eco-friendly', 'handmade', 'sustainable']
    },
    {
      id: 2,
      name: 'Natural Skincare Set',
      category: 'beauty',
      price: 7499,
      rating: 4.9,
      reviews: 256,
      seller: 'Organic Beauty Co',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop&crop=center',
      description: 'Complete skincare set made with organic ingredients.',
      tags: ['organic', 'vegan', 'cruelty-free']
    },
    {
      id: 3,
      name: 'Smart Home Assistant',
      category: 'tech',
      price: 10799,
      rating: 4.7,
      reviews: 189,
      seller: 'Tech Solutions Inc',
      image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=400&h=400&fit=crop&crop=center',
      description: 'Voice-controlled smart home assistant with advanced features.',
      tags: ['smart-home', 'tech', 'innovation']
    },
    {
      id: 4,
      name: 'Artisan Coffee Set',
      category: 'food',
      price: 3799,
      rating: 4.6,
      reviews: 98,
      seller: 'Coffee Culture Co',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center',
      description: 'Premium coffee beans with handcrafted ceramic mug.',
      tags: ['coffee', 'artisan', 'gourmet']
    },
    {
      id: 5,
      name: 'Handwoven Scarf',
      category: 'fashion',
      price: 3799,
      rating: 4.6,
      reviews: 89,
      seller: 'Artisan Textiles',
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop&crop=center',
      description: 'Beautiful handwoven scarf made from sustainable materials.',
      tags: ['handmade', 'sustainable', 'fashion']
    },
    {
      id: 6,
      name: 'Organic Honey Set',
      category: 'food',
      price: 2749,
      rating: 4.9,
      reviews: 156,
      seller: 'Pure Nature Co',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&crop=center',
      description: 'Pure organic honey collection from local beekeepers.',
      tags: ['organic', 'natural', 'local']
    },
    {
      id: 7,
      name: 'Ceramic Plant Pot',
      category: 'home',
      price: 2399,
      rating: 4.7,
      reviews: 203,
      seller: 'Clay Creations',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&crop=center',
      description: 'Handcrafted ceramic plant pot perfect for indoor plants.',
      tags: ['handmade', 'ceramic', 'home-decor']
    },
    {
      id: 8,
      name: 'Artisan Jewelry Set',
      category: 'jewelry',
      price: 5649,
      rating: 4.8,
      reviews: 134,
      seller: 'Silver Moon Designs',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
      description: 'Elegant handcrafted jewelry set with natural stones.',
      tags: ['handmade', 'jewelry', 'natural-stones']
    },
    {
      id: 9,
      name: 'Hand-Painted Canvas Art',
      category: 'art',
      price: 7149,
      rating: 4.9,
      reviews: 67,
      seller: 'Creative Canvas Studio',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
      description: 'Original abstract painting on canvas, perfect for modern home decor.',
      tags: ['handmade', 'original-art', 'canvas', 'abstract']
    },
    {
      id: 10,
      name: 'Macrame Wall Hanging',
      category: 'art',
      price: 3569,
      rating: 4.8,
      reviews: 134,
      seller: 'Boho Craft Co',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center',
      description: 'Beautiful handwoven macrame wall hanging made with natural cotton.',
      tags: ['macrame', 'boho', 'wall-decor', 'handwoven']
    },
    {
      id: 11,
      name: 'Handmade Pottery Bowl Set',
      category: 'art',
      price: 4899,
      rating: 4.7,
      reviews: 89,
      seller: 'Earth & Clay Studio',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop&crop=center',
      description: 'Set of 4 handcrafted ceramic bowls, perfect for serving or decoration.',
      tags: ['pottery', 'ceramic', 'handcrafted', 'kitchen']
    },
    {
      id: 12,
      name: 'Embroidered Throw Pillow',
      category: 'art',
      price: 3069,
      rating: 4.6,
      reviews: 156,
      seller: 'Stitch & Story',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&crop=center',
      description: 'Hand-embroidered decorative pillow with intricate floral patterns.',
      tags: ['embroidery', 'home-decor', 'handmade', 'pillow']
    },
    {
      id: 13,
      name: 'Wooden Cutting Board',
      category: 'art',
      price: 4069,
      rating: 4.9,
      reviews: 203,
      seller: 'Rustic Wood Works',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop&crop=center',
      description: 'Handcrafted wooden cutting board made from sustainable bamboo.',
      tags: ['woodwork', 'kitchen', 'sustainable', 'handcrafted']
    },
    {
      id: 14,
      name: 'Knitted Baby Blanket',
      category: 'art',
      price: 5479,
      rating: 4.8,
      reviews: 178,
      seller: 'Cozy Knits Studio',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&crop=center',
      description: 'Soft hand-knitted baby blanket made with organic cotton yarn.',
      tags: ['knitting', 'baby', 'organic', 'soft']
    },
    {
      id: 15,
      name: 'Handmade Soap Collection',
      category: 'art',
      price: 2489,
      rating: 4.7,
      reviews: 245,
      seller: 'Pure Soap Artisans',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center',
      description: 'Set of 6 artisan soaps made with natural ingredients and essential oils.',
      tags: ['soap', 'natural', 'essential-oils', 'artisan']
    },
    {
      id: 16,
      name: 'Watercolor Art Print Set',
      category: 'art',
      price: 3319,
      rating: 4.6,
      reviews: 112,
      seller: 'Watercolor Dreams',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&crop=center',
      description: 'Set of 3 original watercolor prints featuring botanical themes.',
      tags: ['watercolor', 'prints', 'botanical', 'wall-art']
    }
  ];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
          return b.id - a.id;
        default:
          return b.reviews - a.reviews;
      }
    });

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const addToCart = (productId) => {
    setCart(prev => {
      const newCart = new Map(prev);
      const currentQuantity = newCart.get(productId) || 0;
      newCart.set(productId, currentQuantity + 1);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = new Map(prev);
      const currentQuantity = newCart.get(productId) || 0;
      if (currentQuantity <= 1) {
        newCart.delete(productId);
      } else {
        newCart.set(productId, currentQuantity - 1);
      }
      return newCart;
    });
  };

  const getCartQuantity = (productId) => {
    return cart.get(productId) || 0;
  };

  const getTotalCartItems = () => {
    return Array.from(cart.values()).reduce((total, quantity) => total + quantity, 0);
  };

  const getCartItems = () => {
    const cartItems = [];
    for (const [productId, quantity] of cart.entries()) {
      const product = products.find(p => p.id === productId);
      if (product) {
        cartItems.push({
          ...product,
          quantity,
          subtotal: product.price * quantity
        });
      }
    }
    return cartItems;
  };

  const getCartTotal = () => {
    return getCartItems().reduce((total, item) => total + item.subtotal, 0);
  };

  const clearCart = () => {
    setCart(new Map());
  };

  const handleShare = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} - ${product.description} - Price: ₹${product.price}`,
        url: window.location.href
      })
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `${product.name} - ${product.description} - Price: ₹${product.price}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Product details copied to clipboard!');
      });
    }
  };

  const handleMessageClick = (product) => {
    setSelectedProduct(product);
    setShowMessageModal(true);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    alert(`Message sent to seller about ${selectedProduct.name}!`);
    setShowMessageModal(false);
    setMessageData({ message: '', contactInfo: '' });
  };

  const handleMessageInputChange = (e) => {
    const { name, value } = e.target;
    setMessageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Cart Badge */}
      {getTotalCartItems() > 0 && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowCartModal(true)}
            className="relative hover:scale-105 transition-transform"
          >
            <div className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
            </div>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
              {getTotalCartItems()}
            </div>
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-md space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 flex-1">
            <select
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>

            <select
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      {getTotalCartItems() > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 text-white p-2 rounded-full">
                <ShoppingCartIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">
                  {getTotalCartItems()} item{getTotalCartItems() !== 1 ? 's' : ''} in cart
                </h3>
                <p className="text-sm text-green-600">
                  Ready to checkout when you are!
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCartModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
              >
                {favorites.has(product.id) ? (
                  <HeartIconSolid className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.seller}</p>
                </div>
                <p className="text-lg font-semibold text-purple-600">
                  ₹{product.price}
                </p>
              </div>

              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {product.reviews} reviews
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mobile-first action buttons */}
              <div className="space-y-3">
                {/* Cart Actions */}
                <div className="flex justify-center">
                  {getCartQuantity(product.id) === 0 ? (
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center space-x-3 w-full">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="bg-gray-100 px-4 py-2 rounded-lg font-medium min-w-[3rem] text-center">
                        {getCartQuantity(product.id)}
                      </span>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Secondary Actions */}
                <div className="flex items-center justify-center space-x-6">
                  <button
                    onClick={() => handleShare(product)}
                    className="flex items-center text-purple-600 hover:text-purple-800 text-sm"
                  >
                    <ShareIcon className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  <button
                    onClick={() => handleMessageClick(product)}
                    className="flex items-center text-purple-600 hover:text-purple-800 text-sm"
                  >
                    <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Message</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No products match your criteria.</p>
        </div>
      )}

      {/* Seller Resources */}
      <div className="bg-purple-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Want to Start Selling?</h3>
        <p className="text-gray-600 mb-4">
          Join our marketplace and reach thousands of potential customers.
          We provide tools and support to help you succeed.
        </p>
        <button
          className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          onClick={() => {
            // Handle seller registration
            console.log('Starting seller registration');
          }}
        >
          Become a Seller
        </button>
      </div>

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            {/* Cart Header */}
            <div className="bg-purple-600 text-white p-4 sm:p-6 flex justify-between items-center">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <h2 className="text-lg sm:text-xl font-semibold">Your Cart</h2>
                <span className="bg-purple-800 px-2 py-1 rounded-full text-xs sm:text-sm">
                  {getTotalCartItems()} items
                </span>
              </div>
              <button
                onClick={() => setShowCartModal(false)}
                className="text-white hover:text-gray-300 transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            {/* Cart Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {getCartItems().length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add some products to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getCartItems().map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.seller}</p>
                        <p className="text-purple-600 font-medium">₹{item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="bg-gray-100 px-3 py-1 rounded font-medium min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition-colors"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ₹{item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {getCartItems().length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-purple-600">
                    ₹{getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => {
                      // Handle checkout
                      console.log('Proceeding to checkout with items:', getCartItems());
                      alert('Checkout functionality would be implemented here!');
                    }}
                    className="flex-2 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Message Seller</h2>
                <p className="text-gray-600">About: {selectedProduct.name}</p>
              </div>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={messageData.message}
                  onChange={handleMessageInputChange}
                  placeholder="Write your message to the seller..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Contact Information
                </label>
                <input
                  type="text"
                  name="contactInfo"
                  required
                  value={messageData.contactInfo}
                  onChange={handleMessageInputChange}
                  placeholder="Email or phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Marketplace;
