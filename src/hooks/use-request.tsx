import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

type AIData = {
    classification: string,
    confidence: number
}

type APIResponse = {
    status: number, 
    statusText: string,
    data?: AIData
    error: unknown
    loading: boolean
    executePostRequest: (dataToSend: any) => Promise<void>
    clearResponseState: () => void
}

export const usePost = (url: string, options?: AxiosRequestConfig ): APIResponse => {
    const [status, setStatus] = useState<number>(0);
    const [statusText, setStatusText] = useState<string>('');
    const [data, setData] = useState<AIData>();
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const config = {
        ...options,  //include other options
        headers: {
            ...options?.headers, //include other header 
            'Content-Type': options?.headers?.['Content-Type'] || 'application/json' //default application/json
        },
    };

    // This method is used for firing the put request
    const executePostRequest  = async (dataToSend: any) => {
        setLoading(true);
        try{
            const response: AxiosResponse = await axios.post(url, dataToSend, config);
            setStatus(response.status);
            setStatusText(response.statusText);
            if(response.data){
                setData(response.data)
            }
        } catch(error: unknown){
            setError(error)
        } finally{
            setLoading(false);
        }
    }

    // reset states so that next request is not tied with past request's state
    const clearResponseState  = () => {
        setStatus(0);
        setStatusText('');
        setError(null)
    } 

    return {status, statusText, data, error, loading, executePostRequest , clearResponseState };    
}