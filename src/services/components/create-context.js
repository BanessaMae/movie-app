import React, {createContext} from 'react';

const { Provider: GenresProvider, Consumer: GenresConsumer } = React.createContext();
 const GlobalContext = createContext();
export { GenresProvider, GenresConsumer, GlobalContext };