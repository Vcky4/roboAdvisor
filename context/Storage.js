import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RiskContext = createContext();

export const RiskContextProvider = ({ children }) => {
    const [risks, setRisks] = useState([]);

    const addRisk = (newRisk) => {
        setRisks(newRisk);
        AsyncStorage.setItem('risks', JSON.stringify(newRisk));
    }

    const getRisks = async () => {
        try {
            let risk = await AsyncStorage.getItem('risks');
            setRisks(risk ? JSON.parse(risk) : []);
        } catch (error) {
            console.log('get risk error:', error);
        }
    }

    useEffect(() => {
        getRisks();
    }, []);
    return (
        <RiskContext.Provider value={{ risks, addRisk }}>
            {children}
        </RiskContext.Provider>

    );
}