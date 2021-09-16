import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiKey = 'AIzaSyAUS6vZiILR5ypmGFLs6Je-m0E06TKEYg4';

@Injectable({
	providedIn: 'root'
})
export class GoogleMapsService {
	constructor(private http:HttpClient) {
		// this.lookupZipcode('74133');
	}

	lookupAddress(address:string) {
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
		return this.http.get(url).toPromise().then((res:any) => {
			console.log('GoogleMapsService.lookupAddress: address=%o, result=%o', address, res);
			const result = res?.results[0];
			if(!result) return null;
			const streetNumber = this.extractAddressComponentByType(result.address_components, 'street_number');
			const streetName = this.extractAddressComponentByType(result.address_components, 'route');
			const street = [streetNumber,streetName].filter(p => p).join(' ');
			const city = this.extractAddressComponentByType(result.address_components, 'locality');
			const state = this.extractAddressComponentByType(result.address_components, 'administrative_area_level_1');
			const stateName = this.extractAddressComponentByType(result.address_components, 'administrative_area_level_1', true);
			const zipcode = this.extractAddressComponentByType(result.address_components,'postal_code');
			const formatted = result.formatted_address;
			const info = {street,city,state,zipcode,formatted,stateName};
			console.log('lookupZipcode: result=%o, info=%o', result, info);
			return info;
		}, err => null);
	}

	extractAddressComponentByType(addressComponents, type:string, longName=false) {
		const component = addressComponents.find(c => c.types.find(t => t===type));
		if(!component) return null;
		if(longName && component.long_name) return  component.long_name;
		return component.short_name || component.long_name;
	}

}
