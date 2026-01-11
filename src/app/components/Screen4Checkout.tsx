import { useState } from 'react';
import { Header } from './Header';
import { MapView } from './MapView';
import { ArrowLeft, User, Phone, IndianRupee, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { BookingData } from '../App';

interface Screen4Props {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Screen4Checkout({ bookingData, updateBookingData, onNext, onBack }: Screen4Props) {
  const [senderName, setSenderName] = useState(bookingData.senderName);
  const [senderPhone, setSenderPhone] = useState(bookingData.senderPhone);
  const [receiverName, setReceiverName] = useState(bookingData.receiverName);
  const [receiverPhone, setReceiverPhone] = useState(bookingData.receiverPhone);
  const [isLoading, setIsLoading] = useState(false);

  // Validate phone number (10 digits)
  const isPhoneValid = (phone: string) => /^\d{10}$/.test(phone);

  const canProceed =
    senderName.trim() !== '' &&
    isPhoneValid(senderPhone) &&
    receiverName.trim() !== '' &&
    isPhoneValid(receiverPhone);

  const handleConfirmBooking = () => {
    updateBookingData({
      senderName,
      senderPhone,
      receiverName,
      receiverPhone,
    });

    setIsLoading(true);

    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1500);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8">
      <Header currentStep={4} title="Checkout" subtitle="Enter contact details to confirm your booking" />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="mt-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Fare Review</span>
      </button>

      <div className="grid grid-cols-2 gap-8 mt-8">
        {/* LEFT COLUMN - Contact Forms */}
        <div className="space-y-6">
          {/* Sender Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Sender Details</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter sender's full name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={`w-full px-4 py-3 rounded-lg border transition-all text-sm outline-none ${
                    senderPhone && !isPhoneValid(senderPhone)
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                  }`}
                />
                <AnimatePresence>
                  {senderPhone && !isPhoneValid(senderPhone) && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-600 mt-1"
                    >
                      Please enter a valid 10-digit mobile number
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Receiver Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Receiver Details</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="Enter receiver's full name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={receiverPhone}
                  onChange={(e) => setReceiverPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={`w-full px-4 py-3 rounded-lg border transition-all text-sm outline-none ${
                    receiverPhone && !isPhoneValid(receiverPhone)
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                  }`}
                />
                <AnimatePresence>
                  {receiverPhone && !isPhoneValid(receiverPhone) && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-600 mt-1"
                    >
                      Please enter a valid 10-digit mobile number
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Order Summary - Compact */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Payment Summary</h3>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center justify-between text-slate-700">
                <span>Base Fare</span>
                <span className="flex items-center">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {bookingData.baseFare}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Distance Charge</span>
                <span className="flex items-center">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {bookingData.distanceCharge}
                </span>
              </div>
              {bookingData.serviceType === 'express' && (
                <div className="flex items-center justify-between text-slate-700">
                  <span>Express Charge</span>
                  <span className="flex items-center">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {bookingData.expressCharge}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-700">
                <span>Tax</span>
                <span>Included</span>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-blue-300 flex items-center justify-between">
              <span className="font-bold text-slate-900">Total Fare</span>
              <span className="text-2xl font-bold text-blue-600 flex items-center">
                <IndianRupee className="w-5 h-5" />
                {bookingData.totalFare}
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <motion.button
            whileHover={canProceed && !isLoading ? { scale: 1.02, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.2)' } : {}}
            whileTap={canProceed && !isLoading ? { scale: 0.98 } : {}}
            onClick={handleConfirmBooking}
            disabled={!canProceed || isLoading}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
              canProceed && !isLoading
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Confirming Booking...
              </>
            ) : (
              'Confirm Booking'
            )}
          </motion.button>
        </div>

        {/* RIGHT COLUMN - Map */}
        <div className="sticky top-8 h-fit">
          <MapView
            pickup={bookingData.pickup}
            drop={bookingData.drop}
            distance={bookingData.distance}
            estimatedTime={bookingData.estimatedTime}
            costPreview={bookingData.baseFare}
          />
        </div>
      </div>
    </div>
  );
}
