import { ShieldCheck, Clock, Ban } from 'lucide-react';
import { Button } from '../components/Button';
import { addToCart } from '../utils/cart';

const products = [
  {
    id: 1,
    name: 'Bypass',
    price: 20.99,
    description: 'Evite detecção',
    icon: Clock,
  },
  {
    id: 2,
    name: 'Acesso Mensal',
    price: 50.99,
    description: '30 dias de acesso ilimitado',
    icon: ShieldCheck,
  },
  {
    id: 3,
    name: 'Desban',
    price: 20.99,
    description: 'Remova restrições',
    icon: Ban,
  },
];

export function Home() {
  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
          Escolha Seu Plano
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-surface p-4 sm:p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <product.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">
                {product.name}
              </h2>
              <p className="text-sm sm:text-base text-gray-400 text-center mb-4">
                {product.description}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-center text-primary mb-4 sm:mb-6">
                R${product.price.toFixed(2)}
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleAddToCart(product)}
              >
                Adicionar ao Carrinho
              </Button>
            </div>
          ))}
        </div>

        { }
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <img
            src="/imgs/bypass.jpg"
            alt="Imagem 1"
            className="w-full h-auto rounded-lg"
          />
          <img
            src="/imgs/xit.jpg"
            alt="Imagem 2"
            className="w-full h-auto rounded-lg"
          />
          <img
            src="/imgs/desban.jpg"
            alt="Imagem 3"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
