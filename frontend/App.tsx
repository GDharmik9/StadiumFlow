// Inside your main App.tsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { db, auth } from './src/services/firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { TrafficStatusBar } from './src/components/TrafficStatusBar';
import { StadiumMap } from './src/components/StadiumMap';
import { RoleSelector } from './src/components/RoleSelector';

export default function App() {
  const [gateData, setGateData] = useState({ current_pings: 0, capacity: 10 });
  const [userLocation, setUserLocation] = useState({ x: 500, y: 500 });
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);

  useEffect(() => {
    // 1. Listen for authentication state changes (Anonymous Auth)
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Simulation Identity Verified:", user.uid);
        setUid(user.uid);
        setIsAuthReady(true);
      } else {
        console.log("No user signed in, triggering silent anonymous login...");
        signInAnonymously(auth)
          .then(() => console.log("Anonymous Session Created"))
          .catch((error) => console.error("Auth Error:", error.code, error.message));
      }
    });

    // Listen to the stadium zone in real-time
    const unsub = onSnapshot(doc(db, "stadium_zones", "Gate_1"), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setGateData({
          current_pings: data.current_pings,
          capacity: data.capacity
        });
      }
    });
    
    return () => {
      unsub();
      unsubscribeAuth();
    };
  }, []);

  if (!isAuthReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Initializing Secure Session...</Text>
      </View>
    );
  }

  if (isAuthReady && !activeRole) {
    return <RoleSelector uid={uid!} onRoleSelected={setActiveRole} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 1. Status Bar at the very top */}
      <TrafficStatusBar 
        currentPings={gateData.current_pings} 
        capacity={gateData.capacity} 
      />
      
      {/* 2. Map takes up the rest of the space */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <StadiumMap userLocation={userLocation} />
      </View>
    </View>
  );
}