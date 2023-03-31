import axios from 'axios';

export const getAll = async () => {
  try {
    const response = await axios.get('http://localhost:5000/todos');
    return response.data;
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw new Error('Ошибка при загрузке данных с сервера');
  }
};


export const addNew = async (newDate) => {
  try {
    const response = await axios.post('http://localhost:5000/todos', newDate);
    return response.data.id;
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw new Error('Ошибка при добавлении новой задачи');
  }
};

// Обновление данных
export const update = async (id, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:5000/todos/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw new Error('Ошибка при обновлении данных на сервере');
  }
};

// Удаление данных
export const remove = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw new Error('Ошибка при удалении данных на сервере');
  }
};
