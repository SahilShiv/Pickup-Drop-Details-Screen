import { Header } from './Header';
import { CheckCircle2, MapPin, Navigation, Bike, Box, Truck, IndianRupee, Radio, Package as PackageIcon, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';
import type { BookingData } from '../App';

interface Screen5Props {
  bookingData: BookingData;
  onTrackOrder: () => void;
  onReturnToDashboard: () => void;
}

const vehicleIcons = {
  bike: Bike,
  'eco-van': Box,
  'heavy-truck': Truck,
};

const vehicleNames = {
  bike: 'Bike',
  'eco-van': 'Eco-Van',
  'heavy-truck': 'Heavy Truck',
};

export function Screen5Confirmation({ bookingData, onTrackOrder, onReturnToDashboard }: Screen5Props) {
  const VehicleIcon = vehicleIcons[bookingData.vehicle];

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8">
      <Header currentStep={5} title="Booking Confirmed" subtitle="Your shipment is being processed" />

      <div className="mt-12 max-w-4xl mx-auto">
        {/* Success State */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle2 className="w-16 h-16 text-green-600" strokeWidth={2} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-slate-900 mb-2"
          >
            Order Placed Successfully!
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <span className="text-sm text-slate-600">Order ID:</span>
            <span className="text-lg font-bold text-blue-600">{bookingData.orderId}</span>
          </motion.div>
        </motion.div>

        {/* Delivery Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-6"
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Delivery Summary</h3>

          <div className="space-y-6">
            {/* Route */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Pickup Location</p>
                  <p className="text-sm font-semibold text-slate-900">{bookingData.pickup}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Drop-off Location</p>
                  <p className="text-sm font-semibold text-slate-900">{bookingData.drop}</p>
                </div>
              </div>
            </div>

            {/* Vehicle & Details */}
            <div className="pt-6 border-t border-slate-200">
              <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <VehicleIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-0.5">Vehicle</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {vehicleNames[bookingData.vehicle]}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">({bookingData.serviceType})</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-0.5">ETA</p>
                    <p className="text-sm font-semibold text-slate-900">{bookingData.estimatedTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-0.5">Fare Paid</p>
                    <p className="text-sm font-semibold text-green-600">₹{bookingData.totalFare}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-8 mb-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Next Steps</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  <Radio className="w-5 h-5" />
                </div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-blue-300" />
              </div>
              <div className="flex-1 pt-1.5">
                <h4 className="font-semibold text-slate-900 mb-1">Driver Assignment</h4>
                <p className="text-sm text-slate-600">We're finding the nearest available driver for your delivery</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center text-white font-semibold">
                  <Navigation className="w-5 h-5" />
                </div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-200" />
              </div>
              <div className="flex-1 pt-1.5">
                <h4 className="font-medium text-slate-700 mb-1">Pickup</h4>
                <p className="text-sm text-slate-500">Driver will arrive at pickup location</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center text-white font-semibold">
                <PackageIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 pt-1.5">
                <h4 className="font-medium text-slate-700 mb-1">Delivery</h4>
                <p className="text-sm text-slate-500">Package delivered to destination</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-200">
            <div className="flex items-center gap-3 text-blue-900">
              <Radio className="w-5 h-5 animate-pulse" />
              <p className="font-medium">
                Finding your nearest driver. This usually takes under 2 minutes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-3 gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onTrackOrder}
            className="col-span-2 py-4 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all duration-200"
          >
            <Radio className="w-5 h-5" />
            Live Tracking
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReturnToDashboard}
            className="py-4 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 transition-all duration-200"
          >
            Dashboard
          </motion.button>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <button className="text-sm text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 mx-auto">
            <PhoneCall className="w-4 h-4" />
            Contact 24/7 Support
          </button>
        </motion.div>
      </div>
    </div>
  );
}
