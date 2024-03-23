const useURLResolver = () => {

    const getPage = (url) => {
      let params = new URLSearchParams(url);
      return params.get("page")
    }
  
  
    return {getPage}
  }
  
  
  export default useURLResolver;