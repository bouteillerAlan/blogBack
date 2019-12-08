const handleLocalStorage: (type: string, key: string, value?: any) => Promise<any> = async (type: string, key: string, value?: any) => {
  if (type === 'delete') {
    // delete
    return localStorage.removeItem(key);
  } else if (type === 'create' || type === 'update') {
    // create & update
    await localStorage.setItem(key, value);
    return {status: true, message: `${key}:${value} created`};
  } else if (type === 'read') {
    // read
    return localStorage.getItem(key);
  } else if (type === 'purge') {
    // remove all
    return localStorage.clear();
  } else {
    return 'type dosen\'t exist';
  }
};

export default handleLocalStorage;
