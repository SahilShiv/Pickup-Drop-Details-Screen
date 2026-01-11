import { useState, useEffect } from 'react';
import { Header } from './Header';
import { ArrowLeft, ArrowRight, Bike, Truck, Box, Package as PackageIcon, AlertTriangle, Zap, Clock, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { BookingData } from '../App';

interface Screen2Props {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const vehicleData = {
  bike: {
    name: 'Bike',
    icon: Bike,
    maxWeight: 20,
    maxSize: '35×25×25 cm',
    eta: '20–25 mins',
    price: 120,
    badge: 'Fastest',
  },
  'eco-van': {
    name: 'Eco-Van',
    icon: Box,
    maxWeight: 500,
    maxSize: '150×100×100 cm',
    eta: '25–35 mins',
    price: 170,
    badge: null,
  },
  'heavy-truck': {
    name: 'Heavy Truck',
    icon: Truck,
    maxWeight: 2000,
    maxSize: '300×200×200 cm',
    eta: '45–60 mins',
    price: 220,
    badge: null,
  },
};

const packageCategories = [
  'Fragile Items',
  'Electronics',
  'Documents',
  'Food & Beverages',
  'Clothing',
  'General Goods',
];

export function Screen2VehicleSelection({ bookingData, updateBookingData, onNext, onBack }: Screen2Props) {
  const [selectedVehicle, setSelectedVehicle] = useState<'bike' | 'eco-van' | 'heavy-truck'>(bookingData.vehicle);
  const [serviceType, setServiceType] = useState<'express' | 'normal'>(bookingData.serviceType);
  const [packageCategory, setPackageCategory] = useState(bookingData.packageCategory);
  const [packageWeight, setPackageWeight] = useState(bookingData.packageWeight);
  const [length, setLength] = useState(bookingData.packageDimensions.length);
  const [width, setWidth] = useState(bookingData.packageDimensions.width);
  const [height, setHeight] = useState(bookingData.packageDimensions.height);

  // Check if package exceeds vehicle capacity
  const selectedVehicleData = vehicleData[selectedVehicle];
  const exceedsCapacity = packageWeight > selectedVehicleData.maxWeight;

  // Recommended vehicle based on weight
  const recommendedVehicle = packageWeight <= 20 ? 'bike' : packageWeight <= 500 ? 'eco-van' : 'heavy-truck';

  const canProceed = !exceedsCapacity && packageCategory && packageWeight > 0;

  const handleContinue = () => {
    updateBookingData({
      vehicle: selectedVehicle,
      serviceType,
      packageCategory,
      packageWeight,
      packageDimensions: { length, width, height },
    });
    onNext();
  };

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8">
      <Header currentStep={2} title="Vehicle & Package Selection" subtitle="Choose the best transport for your hyperlocal delivery" />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="mt-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Delivery Details</span>
      </button>

      <div className="mt-8 space-y-6">
        {/* Service Type Toggle */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Service Type</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setServiceType('express')}
              className={`flex-1 px-6 py-4 rounded-lg border-2 transition-all ${
                serviceType === 'express'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className={`w-5 h-5 ${serviceType === 'express' ? 'text-blue-600 fill-blue-600' : 'text-slate-400'}`} />
                <span className={`font-semibold ${serviceType === 'express' ? 'text-blue-900' : 'text-slate-700'}`}>
                  Express Delivery
                </span>
              </div>
              <p className="text-xs text-slate-600">Faster delivery with priority rider</p>
            </button>

            <button
              onClick={() => setServiceType('normal')}
              className={`flex-1 px-6 py-4 rounded-lg border-2 transition-all ${
                serviceType === 'normal'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className={`w-5 h-5 ${serviceType === 'normal' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className={`font-semibold ${serviceType === 'normal' ? 'text-blue-900' : 'text-slate-700'}`}>
                  Normal Delivery
                </span>
              </div>
              <p className="text-xs text-slate-600">Standard delivery at lower cost</p>
            </button>
          </div>
        </div>

        {/* Vehicle Selection Cards */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Vehicle</h3>
          <div className="grid grid-cols-3 gap-4">
            {(Object.keys(vehicleData) as Array<keyof typeof vehicleData>).map((vehicleKey) => {
              const vehicle = vehicleData[vehicleKey];
              const Icon = vehicle.icon;
              const isSelected = selectedVehicle === vehicleKey;

              return (
                <motion.button
                  key={vehicleKey}
                  onClick={() => setSelectedVehicle(vehicleKey)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {vehicle.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-md">
                        {vehicle.badge}
                      </span>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-blue-100' : 'bg-slate-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-slate-600'}`} />
                  </div>

                  <h4 className={`font-semibold mb-3 ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                    {vehicle.name}
                  </h4>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Max Weight:</span>
                      <span>{vehicle.maxWeight}kg</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Max Size:</span>
                      <span>{vehicle.maxSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{vehicle.eta}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-slate-900 mt-3 pt-3 border-t border-slate-200">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>₹{vehicle.price}</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Package Details</h3>
          
          <div className="space-y-6">
            {/* Package Category */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <PackageIcon className="w-4 h-4" />
                Package Category
              </label>
              <select
                value={packageCategory}
                onChange={(e) => setPackageCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
              >
                {packageCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Weight Slider */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Package Weight: <span className="text-blue-600">{packageWeight} kg</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={packageWeight}
                onChange={(e) => setPackageWeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1 kg</span>
                <span>100 kg</span>
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Package Dimensions (cm)
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    placeholder="Length"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                  />
                  <span className="text-xs text-slate-500 mt-1 block">Length</span>
                </div>
                <div>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    placeholder="Width"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                  />
                  <span className="text-xs text-slate-500 mt-1 block">Width</span>
                </div>
                <div>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    placeholder="Height"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                  />
                  <span className="text-xs text-slate-500 mt-1 block">Height</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Warning */}
        <AnimatePresence>
          {exceedsCapacity && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900 mb-1">
                  Selected package exceeds {selectedVehicleData.name} capacity
                </p>
                <p className="text-sm text-orange-700">
                  Your package ({packageWeight}kg) exceeds the maximum weight limit of {selectedVehicleData.maxWeight}kg for {selectedVehicleData.name}.{' '}
                  <button
                    onClick={() => setSelectedVehicle(recommendedVehicle as any)}
                    className="font-semibold underline hover:text-orange-900"
                  >
                    {vehicleData[recommendedVehicle as keyof typeof vehicleData].name} is recommended
                  </button>
                  .
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <motion.button
          whileHover={canProceed ? { scale: 1.02, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.2)' } : {}}
          whileTap={canProceed ? { scale: 0.98 } : {}}
          onClick={handleContinue}
          disabled={!canProceed}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            canProceed
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Continue to Pricing
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
