import React, { useState } from 'react';
import { Card, Button } from '@material-tailwind/react';
import Metamask from '../../assets/icons/metamask.svg';

const LoginPage = () => {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    try {
      // Kiểm tra xem Ethereum Provider có khả dụng không
      if (window.ethereum) {
        // Yêu cầu quyền truy cập ví từ người dùng
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        // accounts[0] chứa địa chỉ Ethereum của người dùng sau khi kết nối thành công
        setWalletAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
        console.log('Connected with address:', walletAddress);
      } else {
        console.log('MetaMask is not available.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card
        className="bg-gradient-to-r from-blue-700 to-blue-600 flex items-center rounded-2xl shadow-lg py-5"
        style={{ width: '400px', height: 'fit-content' }}
      >
        <div className="font-extrabold text-white text-3xl mb-8">
          ChainCertify
        </div>
        <Button
          color="white"
          className="flex items-center justify-center gap-3 rounded-full w-2/3 shadow-md transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
          onClick={connectWallet}
        >
          <div className="flex items-center gap-3">
            {walletAddress !== '' ? (
              <>
                <span>{walletAddress.substring(0, 15)}...</span>
                <img src={Metamask} alt="metamask" className="h-6 w-6" />
              </>
            ) : (
              <>
                <img src={Metamask} alt="metamask" className="h-6 w-6" />
                <span>Connect Wallet</span>
              </>
            )}
          </div>
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
