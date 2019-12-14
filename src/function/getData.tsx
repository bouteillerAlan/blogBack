const getData: (url: string, token: string) => Promise<any> = async (url: string, token: string) => {

    const res = await fetch(url, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    });

    if (res.status === 200) {
        return res.json()
    } else if (res.status === 401) {
        return {status:false, data:'unauthorized'}
    } else if (res.status === 404) {
        return {status:false, data:'not found'}
    } else {
        return {status:false, data:'critical error'}
    }
};

export default getData;
