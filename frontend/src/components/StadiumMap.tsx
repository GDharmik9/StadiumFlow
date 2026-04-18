import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

// Use the screen width to make the map responsive
const SCREEN_WIDTH = Dimensions.get('window').width;

// Normalized coordinate type (0-1000 scale)
interface Coordinate {
    x: number;
    y: number;
}

interface StadiumMapProps {
    userLocation: Coordinate; // Current user position from Firestore
    navigationPath?: Coordinate[]; // Array of waypoints for the path
}

/**
 * StadiumMap Component
 * Visualizes the Narendra Modi Stadium layout and overlays user position
 * and navigation guidance.
 */
export const StadiumMap: React.FC<StadiumMapProps> = ({
    userLocation,
    navigationPath = []
}) => {

    // Helper function to translate 0-1000 grid coordinates to screen pixels
    const translateCoord = (coord: number) => (coord / 1000) * SCREEN_WIDTH;

    // Convert the navigation path array into a string format for SVG Polyline: "x,y x,y ..."
    const pointsString = navigationPath
        .map((p) => `${translateCoord(p.x)},${translateCoord(p.y)}`)
        .join(' ');

    return (
        <View style={styles.container}>
            {/* 1. Base Layer: The Stadium Seating Plan */}
            <Image
                // Ensure you have saved your uploaded stadium image to this path
                source={require('../../assets/stadium-map.png')}
                style={styles.mapImage}
                resizeMode="contain"
            />

            {/* 2. Navigation Layer: SVG Polyline for the pathing line */}
            {navigationPath.length > 0 && (
                <Svg
                    height={SCREEN_WIDTH}
                    width={SCREEN_WIDTH}
                    style={StyleSheet.absoluteFill}
                >
                    <Polyline
                        points={pointsString}
                        fill="none"
                        stroke="#007AFF" // Blue theme for navigation
                        strokeWidth="4"
                        strokeDasharray="10, 5" // Creates the dotted/dashed effect
                        strokeLinecap="round"
                    />
                </Svg>
            )}

            {/* 3. User Layer: The "You are here" Location Dot */}
            <View
                style={[
                    styles.userDot,
                    {
                        left: translateCoord(userLocation.x),
                        top: translateCoord(userLocation.y)
                    }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH, // 1:1 Aspect Ratio for the stadium layout
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    userDot: {
        position: 'absolute',
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#007AFF',
        borderWidth: 3,
        borderColor: 'white',
        // Shadow to make the dot pop on the detailed seating plan
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // Center the dot exactly on the coordinate
        transform: [{ translateX: -8 }, { translateY: -8 }],
    },
});