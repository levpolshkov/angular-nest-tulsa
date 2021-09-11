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

	lookupZipcode(zipcode:string) {
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${apiKey}`;
		return this.http.get(url).toPromise().then((res:any) => {
			const result = res?.results.find(r => r.types.find(t => t==='postal_code'));
			if(!result) return null;
			const city = this.extractAddressComponentByType(result.address_components, 'locality');
			const state = this.extractAddressComponentByType(result.address_components, 'administrative_area_level_1');
			const zipcode = this.extractAddressComponentByType(result.address_components,'postal_code');
			console.log('lookupZipcode: result=%o', result, {city,state,zipcode});
			return {city,state,zipcode};
		}, err => null);
	}

	extractAddressComponentByType(addressComponents, type:string) {
		const component = addressComponents.find(c => c.types.find(t => t===type));
		if(!component) return null;
		return component.short_name || component.long_name;
	}
	


}
