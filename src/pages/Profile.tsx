import { useState } from 'react';
import { User, Wallet } from 'lucide-react';
import { getAuth } from '../utils/auth';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { QRCodeCanvas } from 'qrcode.react';

export function Profile() {
  const { user } = getAuth();
  const [amount, setAmount] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  if (!user) return null;

  const generateQRCode = (method: 'PIX' | 'PayPal' | 'Bitcoin') => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }

    let data = '';

    switch (method) {
      case 'PIX':
        data = `00020101021226580014BR.GOV.BCB.PIX0114chavepix@example.com520400005303986540${amount}5802BR5925Nome do Recebedor6009Cidade7004DESC6304`;
        break;
      case 'PayPal':
        data = `https://www.paypal.com/pay?amount=${amount}`;
        break;
      case 'Bitcoin':
        data = `bitcoin:yourbitcoinaddress?amount=${amount}`;
        break;
      default:
        return;
    }

    setQrCodeData(data);
    setShowQRCode(true);
  };

  return (
    <div className="min-h-screen bg-background text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-surface rounded-lg p-4 sm:p-8 mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <User className="w-12 h-12 text-primary" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">{user.username}</h2>
              <p className="text-sm sm:text-base text-gray-400">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <p className="text-lg sm:text-xl">
              Saldo: <span className="font-bold">R${user.balance.toFixed(2)}</span>
            </p>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-4 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Adicionar Saldo</h3>
          <div className="space-y-4 sm:space-y-6">
            <Input
              label="Valor"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => generateQRCode('PayPal')}
              >
                Pagar com PayPal
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => generateQRCode('PIX')}
              >
                Pagar com PIX
              </Button>
              <Button
                variant="outline"
                className="w-full sm:col-span-2 lg:col-span-1"
                onClick={() => generateQRCode('Bitcoin')}
              >
                Pagar com Bitcoin
              </Button>
            </div>
          </div>

          {showQRCode && qrCodeData && (
            <div className="mt-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold mb-4">QR Code:</h3>
              <QRCodeCanvas value={qrCodeData} size={256} />
              <p className="text-sm sm:text-base text-gray-400 mt-4 text-center">
                Você está pagando: <span className="font-bold text-primary">R${parseFloat(amount).toFixed(2)}</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
