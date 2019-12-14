const isBlank: (data: any, returnValue: any) => Promise<any> = async (data: any, returnValue: any) => {
    return data ? data : returnValue;
};

export default isBlank;
