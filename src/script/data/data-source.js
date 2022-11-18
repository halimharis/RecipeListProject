class DataSource {
  static listCategory() {
    return fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          if (responseJson.categories) {
            return Promise.resolve(responseJson.categories);
          } else {
            return Promise.reject(`${keyword} is not found`);
          }
        });
  }

  static resultCategory(category) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          if (responseJson) {
            return Promise.resolve(responseJson);
          } else {
            return Promise.reject(`${keyword} is not found`);
          }
        });
  }
  
  static getID(id) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          if (responseJson) {
            return Promise.resolve(responseJson);
          } else {
            return Promise.reject(`${keyword} is not found`);
          }
        });
  }
}
 
export default DataSource;