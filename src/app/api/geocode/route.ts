import { NextRequest, NextResponse } from 'next/server';
import { geocodeCity } from '@/lib/geocoding';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    console.log('Geocoding request for city:', city);
    
    // Use the existing geocoding service from the library
    const result = await geocodeCity(city);
    
    if (result) {
      return NextResponse.json({
        latitude: result.latitude,
        longitude: result.longitude,
        altitude: result.altitude || 0,
        formatted: city
      });
    }
    
    return NextResponse.json(
      { error: 'Location not found' },
      { status: 404 }
    );
    
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { error: 'Geocoding service error' },
      { status: 500 }
    );
  }
}
