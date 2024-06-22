import React from 'react';
import { useGetCategoriesQuery } from '../../slices/usersApiSlice';
import Loader from '../Loader';
import Header from '../Header';
import Footer from '../Footer';

const CategoriesList = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading categories</div>;

  const categories = data?.data || [];

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4 text-center text-primary">Categories List</h1>
        <div className="space-y-4 max-w-lg mx-auto">
          {categories.map((category) => (
            <div key={category._id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl">{category.name}</div>
              <div className="text-gray-600">{category.description}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoriesList;
