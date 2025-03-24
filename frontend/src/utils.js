export const checkUrl = (url) => {
    const pattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})/; 
    return pattern.test(url)
}