export const getAll = () => {
  return fetch(`${process.env.PUBLIC_URL}/tasks.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка при загрузке файла tasks.json');
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data); // Здесь вы увидите данные в виде объекта JSON
      return data;
    })
    .catch((error) => {
      console.error('Произошла ошибка:', error);
    });
};
