import { useState } from 'react';
import { Screen1DeliveryDetails } from './components/Screen1DeliveryDetails';
import { Screen2VehicleSelection } from './components/Screen2VehicleSelection';
import { Screen3PricingReview } from './components/Screen3PricingReview';
import { Screen4Checkout } from './components/Screen4Checkout';
import { Screen5Confirmation } from './components/Screen5Confirmation';

export interface BookingData {
  pickup: string;
  drop: string;
  distance: number;
  estimatedTime: string;
  serviceType: 'express' | 'normal';
  vehicle: 'bike' | 'eco-van' | 'heavy-truck';
  packageCategory: string;
  packageWeight: number;
  packageDimensions: {
    length: number;
    width: number;
    height: number;
  };
  senderName: string;
  senderPhone: string;
  receiverName: string;
  receiverPhone: string;
  baseFare: number;
  distanceCharge: number;
  expressCharge: number;
  totalFare: number;
  orderId?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  
  const [bookingData, setBookingData] = useState<BookingData>({
    pickup: 'Andheri East, Mumbai',
    drop: 'Linking Road, Bandra',
    distance: 4.2,
    estimatedTime: '25–35 mins',
    serviceType: 'express',
    vehicle: 'bike',
    packageCategory: 'Fragile Items',
    packageWeight: 12,
    packageDimensions: {
      length: 30,
      width: 20,
      height: 20,
    },
    senderName: '',
    senderPhone: '',
    receiverName: '',
    receiverPhone: '',
    baseFare: 120,
    distanceCharge: 30,
    expressCharge: 50,
    totalFare: 200,
  });

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  const goToScreen = (screen: number) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {currentScreen === 1 && (
        <Screen1DeliveryDetails
          bookingData={bookingData}
          onNext={() => goToScreen(2)}
        />
      )}
      
      {currentScreen === 2 && (
        <Screen2VehicleSelection
          bookingData={bookingData}
          updateBookingData={updateBookingData}
          onNext={() => goToScreen(3)}
          onBack={() => goToScreen(1)}
        />
      )}
      
      {currentScreen === 3 && (
        <Screen3PricingReview
          bookingData={bookingData}
          onNext={() => goToScreen(4)}
          onBack={() => goToScreen(2)}
          onEditDetails={() => goToScreen(1)}
          onChangeVehicle={() => goToScreen(2)}
        />
      )}
      
      {currentScreen === 4 && (
        <Screen4Checkout
          bookingData={bookingData}
          updateBookingData={updateBookingData}
          onNext={() => {
            // Generate order ID
            updateBookingData({ orderId: 'LS-9920' });
            goToScreen(5);
          }}
          onBack={() => goToScreen(3)}
        />
      )}
      
      {currentScreen === 5 && (
        <Screen5Confirmation
          bookingData={bookingData}
          onTrackOrder={() => alert('Live tracking would open here')}
          onReturnToDashboard={() => goToScreen(1)}
        />
      )}
    </div>
  );
}
