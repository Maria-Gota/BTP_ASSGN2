import * as SecureStore from "expo-secure-store";

const saveKey = async (key, value) => {
    await SecureStore
        .setItemAsync(key, value);
}

const deleteKey = async (key) => {
    await SecureStore
        .deleteItemAsync(key);
}

const getKey = async (key) => {
    const item = await SecureStore.getItemAsync(key);
    return item;
}

export {saveKey, deleteKey, getKey}