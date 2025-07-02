'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet } from 'lucide-react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

interface WalletDonationProps {
  compact?: boolean
}

export function WalletDonation({ compact = false }: WalletDonationProps): JSX.Element {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { sendTransaction, isPending } = useSendTransaction()
  
  const [donationAmount, setDonationAmount] = useState<string>('')
  const [isDonating, setIsDonating] = useState<boolean>(false)

  const connectWallet = async (): Promise<void> => {
    try {
      // Use the first available connector (usually injected/MetaMask)
      const connector = connectors[0]
      if (connector) {
        connect({ connector })
      }
    } catch (error) {
      console.error('Wallet connection failed:', error)
    }
  }

  const makeDonation = async (amount: string): Promise<void> => {
    if (!isConnected) {
      await connectWallet()
      return
    }

    setIsDonating(true)
    try {
      const result = await sendTransaction({
        to: '0x742d35Cc6634C0532925a3b8D87C4F8d30d6BF95', // Replace with your donation address
        value: parseEther(amount),
      })
      
      console.log('Donation transaction:', result)
      alert(`Thank you for your ${amount} ETH donation! 🙏`)
    } catch (error) {
      console.error('Donation failed:', error)
      alert('Donation failed. Please try again.')
    } finally {
      setIsDonating(false)
    }
  }

  if (compact) {
    return (
      <motion.button
        onClick={isConnected ? undefined : connectWallet}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm bg-opacity-90"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Wallet className="w-4 h-4" />
        <span className="hidden sm:inline">
          {isConnected ? `Connected: ${address?.slice(0, 6)}...` : 'Connect Wallet'}
        </span>
        <span className="sm:hidden">
          {isConnected ? 'Connected' : 'Connect'}
        </span>
      </motion.button>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🥰</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Loving this app?</h3>
        <p className="text-gray-600">
          If this helped you discover a tasty recipe, consider buying us a coffee! ☕
        </p>
        <p className="text-sm text-gray-500 mt-2">
          💳 Connect your wallet above to show some love!
        </p>
      </div>

      {!isConnected ? (
        <div className="text-center">
          <motion.button
            onClick={connectWallet}
            disabled={isPending}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPending ? 'Connecting...' : 'Connect & Support'}
          </motion.button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Wallet Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['0.001', '0.005', '0.01'].map((amount) => (
              <motion.button
                key={amount}
                onClick={() => makeDonation(amount)}
                disabled={isDonating || isPending}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {amount} ETH
              </motion.button>
            ))}
            <div className="flex">
              <input
                type="number"
                step="0.001"
                placeholder="Custom"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="flex-1 px-3 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
              <motion.button
                onClick={() => makeDonation(donationAmount)}
                disabled={isDonating || isPending || !donationAmount}
                className="px-4 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-r-lg font-medium hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDonating || isPending ? '...' : 'Send'}
              </motion.button>
            </div>
          </div>

          {(isDonating || isPending) && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-blue-600">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Processing donation...
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}