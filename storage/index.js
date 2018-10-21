import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

export const storage = new Storage({
	// maximum capacity, default 1000 
	size: 1000,

	// Use AsyncStorage for RN apps, or window.localStorage for web apps.
	// If storageBackend is not set, data will be lost after reload.
	storageBackend: AsyncStorage, // for web: window.localStorage
	
	// expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
	// can be null, which means never expire.
	defaultExpires: 1000 * 3600 * 24 * 10,
	
	// cache data in the memory. default is true.
	enableCache: true,
	
	// if data was not found in storage or expired data was found,
	// the corresponding sync method will be invoked returning 
	// the latest data.
	sync : {
		// we'll talk about the details later.
	}
});

export const getItem = async (config) => {
    try {
        const data = await storage.load({
            key: config.key
        });
        return data;
    } catch(e) {
        return null;
    }
}

export const setItem = async (config) => {
    try {
        const data = await storage.save({
            key: config.key,
            data: config.data
        });
        return data;
    } catch(e) {
        return null;
    }
}

global.storage = storage;
