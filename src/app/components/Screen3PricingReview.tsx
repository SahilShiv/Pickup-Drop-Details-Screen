import { Header } from './Header';
import { MapView } from './MapView';
import { ArrowLeft, ArrowRight, MapPin, Navigation, Edit2, Bike, Box, Truck, IndianRupee } from 'lucide-react';
import { motion } from 'motion/react';
import type { BookingData } from '../App';

interface Screen3Props {
  bookingData: BookingData;
  onNext: () => void;
  onBack: () => void;
  onEditDetails: () => void;
  onChangeVehicle: () => void;
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

const vehicleMaxWeights = {
  bike: '20kg',
  'eco-van': '500kg',
  'heavy-truck': '2000kg',
};

export function Screen3PricingReview({ bookingData, onNext, onBack, onEditDetails, onChangeVehicle }: Screen3Props) {
  const VehicleIcon = vehicleIcons[bookingData.vehicle];

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8">
      <Header currentStep={3} title="Fare Review" subtitle="Review your delivery details and pricing" />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="mt-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Vehicle Selection</span>
      </button>

      <div className="grid grid-cols-2 gap-8 mt-8">
        {/* LEFT COLUMN - Summary & Pricing */}
        <div className="space-y-6">
          {/* Trip Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Trip Summary</h3>
              <button
                onClick={onEditDetails}
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Details
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Navigation className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-600 mb-0.5">Pickup Location</p>
                  <p className="text-sm font-medium text-slate-900">{bookingData.pickup}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-600 mb-0.5">Drop-off Location</p>
                  <p className="text-sm font-medium text-slate-900">{bookingData.drop}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Distance</p>
                  <p className="text-sm font-semibold text-slate-900">{bookingData.distance} km</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Estimated Time</p>
                  <p className="text-sm font-semibold text-slate-900">{bookingData.estimatedTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Vehicle */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Selected Vehicle</h3>
              <button
                onClick={onChangeVehicle}
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Change Vehicle
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
                <VehicleIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-1">{vehicleNames[bookingData.vehicle]}</h4>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span>Max {vehicleMaxWeights[bookingData.vehicle]}</span>
                  <span>•</span>
                  <span className="capitalize">{bookingData.serviceType} Delivery</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-600 mb-1">Package Category</p>
                  <p className="font-medium text-slate-900">{bookingData.packageCategory}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Package Weight</p>
                  <p className="font-medium text-slate-900">{bookingData.packageWeight} kg</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Base Fare</span>
                <span className="font-medium text-slate-900 flex items-center">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {bookingData.baseFare}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Distance Charge ({bookingData.distance} km)</span>
                <span className="font-medium text-slate-900 flex items-center">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {bookingData.distanceCharge}
                </span>
              </div>

              {bookingData.serviceType === 'express' && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Express Charge</span>
                  <span className="font-medium text-slate-900 flex items-center">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {bookingData.expressCharge}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tax</span>
                  <span className="text-sm font-medium text-slate-900">Included</span>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-slate-900">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Total Fare</span>
                  <span className="text-2xl font-bold text-blue-600 flex items-center">
                    <IndianRupee className="w-5 h-5" />
                    {bookingData.totalFare}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="w-full py-4 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all duration-200"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
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
