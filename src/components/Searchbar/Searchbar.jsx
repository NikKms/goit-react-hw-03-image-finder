import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Formik } from 'formik';
import { Header, Button, Input, SearchForm } from './Searchbar.styled';

const initialValues = {
  query: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.query);

    resetForm();
  };

  return (
    <Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <SearchForm>
          <Button type="submit">
            <AiOutlineSearch size={35} />
          </Button>
          <Input
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Header>
  );
};
