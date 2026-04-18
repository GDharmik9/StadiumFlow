import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

interface RoleSelectorProps {
  uid: string;
  onRoleSelected: (roleId: string) => void;
}

export function RoleSelector({ uid, onRoleSelected }: RoleSelectorProps) {

  const handleSelectRole = async (testerIndex: number) => {
    const roleId = `User_${testerIndex}`;
    const ticketId = `SF-2026-NMS-00${testerIndex}`;
    
    try {
      await setDoc(doc(db, "users", roleId), {
        tester_id: roleId,
        uid: uid,
        hasEntered: true, // Auto-trigger simulation entry
        target_seat_id: ticketId,
        current_coords: { x: 500, y: 500 } // initial default spawn payload
      });
      console.log(`Successfully bound ${uid} to ${roleId}`);
      onRoleSelected(roleId);
    } catch (err) {
      console.error("Error binding role:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Tester Identity</Text>
      {[1, 2, 3, 4].map(idx => (
        <TouchableOpacity 
          key={idx} 
          style={styles.button}
          onPress={() => handleSelectRole(idx)}
        >
          <Text style={styles.btnText}>Claim Tester {idx}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});
