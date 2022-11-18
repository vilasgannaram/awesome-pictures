import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: process.env.REACT_APP_ACCESS_KEY });

// photos
export const getPhotos = async (page_number = 1) => {
  const result = await unsplash.photos.list({ page: page_number, perPage: 15 });
  const { response } = result;
  return response.results;
};

export const getPhoto = async (photoID = 'iDbvfTsgO8Y') => {
  const result = await unsplash.photos.get({ photoId: photoID });
  if (result.errors) console.log(result.errors[0]);
  return result.response;
};

export const getStats = async (photoID = 'iDbvfTsgO8Y') => {
  const result = await unsplash.photos.getStats({ photoId: photoID });
  return result;
  // console.log(result);
};

export const getRandomPhotos = async () => {
  const result = await unsplash.photos.getRandom({});
  console.log(result);
};

// user
export const getUser = async () => {
  const result = await unsplash.users.get({ username: 'microsoft365' });
  return result.response;
  // console.log(result.response);
};

export const getUserPhotos = async () => {
  const result = await unsplash.users.getPhotos({
    username: 'microsoft365',
    page: 1,
    perPage: 10,
    orderBy: 'latest',
    orientation: 'landscape',
  });
  const { response } = result;
  console.log(response.results);

  return response.results;
};

export const getUserLikedPhotos = async () => {
  const result = await unsplash.users.getLikes({
    username: 'naoufal',
    page: 1,
    perPage: 10,
    orderBy: 'latest',
    orientation: 'landscape',
  });

  const { response } = result;
  console.log(response.results);

  return response.results;
};

export const getUserCollections = async () => {
  const result = await unsplash.users.getCollections({
    username: 'naoufal',
    page: 1,
    perPage: 10,
  });

  const { response } = result;
  console.log(response.results);

  return response.results;
};

// topics

export const getTopics = async () => {
  const result = await unsplash.topics.list({
    page: 1,
    perPage: 10,
    topicIdsOrSlugs: ['fashion', 'architecture', '6sMVjTLSkeQ'],
  });
  const { response } = result;
  console.log(response.results);
  return response.results;
};
